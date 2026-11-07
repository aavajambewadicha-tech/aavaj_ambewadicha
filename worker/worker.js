// Cloudflare Worker: receives a complaint from the website and saves it into your GitHub repo.
// The GitHub token lives here as a secret, never in the website code.
//
// Settings to add in Cloudflare (Worker > Settings > Variables):
//   GH_OWNER        your GitHub username            e.g. nova-dev
//   GH_REPO         the repo name                   e.g. ambewadi-issues
//   GH_BRANCH       branch used by GitHub Pages     e.g. main
//   ALLOWED_ORIGIN  your site's origin, no path     e.g. https://nova-dev.github.io
//   GITHUB_TOKEN    (secret) fine-grained token, this repo only, Contents: Read and write

const CATS = ["roads", "water", "power", "waste", "health", "school", "transport", "other"];
const MAX_BODY = 6 * 1024 * 1024;   // 6 MB
const MAX_IMAGES = 3;
const MAX_IMAGE_B64 = 1_400_000;    // about 1 MB per photo after base64

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405, cors);
    if (origin !== env.ALLOWED_ORIGIN) return reply({ error: "Forbidden" }, 403, cors);
    if (Number(req.headers.get("Content-Length") || 0) > MAX_BODY) return reply({ error: "Too large" }, 413, cors);

    let body;
    try { body = await req.json(); } catch { return reply({ error: "Bad JSON" }, 400, cors); }

    // bots fill the hidden field; pretend success and save nothing
    if (body.website) return reply({ ok: true }, 200, cors);

    const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      createdAt: new Date().toISOString(),
      category: clean(body.category, 20),
      title: clean(body.title, 100),
      location: clean(body.location, 120),
      description: clean(body.description, 1500),
      name: clean(body.name, 60),
      images: [],
      status: "open",
    };

    if (!CATS.includes(entry.category) || entry.title.length < 3 || entry.location.length < 2 || entry.description.length < 10) {
      return reply({ error: "Missing fields" }, 400, cors);
    }

    const images = Array.isArray(body.images) ? body.images.slice(0, MAX_IMAGES) : [];
    for (const b64 of images) {
      // client always sends JPEG; JPEG base64 starts with /9j/
      if (typeof b64 !== "string" || !b64.startsWith("/9j/") || b64.length > MAX_IMAGE_B64 || !/^[A-Za-z0-9+/=]+$/.test(b64)) {
        return reply({ error: "Bad image" }, 400, cors);
      }
    }

    try {
      for (let i = 0; i < images.length; i++) {
        const path = `uploads/${entry.id}-${i + 1}.jpg`;
        const r = await gh(env, path, {
          method: "PUT",
          body: JSON.stringify({ message: `Photo for issue ${entry.id}`, content: images[i], branch: env.GH_BRANCH }),
        });
        if (!r.ok) throw new Error("image upload " + r.status);
        entry.images.push(path);
      }

      // add the entry to data/complaints.json; retry if two people submit at the same moment
      let saved = false;
      for (let attempt = 0; attempt < 5 && !saved; attempt++) {
        const cur = await gh(env, `data/complaints.json?ref=${env.GH_BRANCH}`);
        if (!cur.ok) throw new Error("read " + cur.status);
        const file = await cur.json();
        const list = JSON.parse(fromB64(file.content.replace(/\n/g, "")));
        list.unshift(entry);
        const put = await gh(env, "data/complaints.json", {
          method: "PUT",
          body: JSON.stringify({
            message: `New issue: ${entry.title}`,
            content: toB64(JSON.stringify(list, null, 2)),
            sha: file.sha,
            branch: env.GH_BRANCH,
          }),
        });
        if (put.ok) saved = true;
        else if (put.status !== 409 && put.status !== 422) throw new Error("write " + put.status);
      }
      if (!saved) throw new Error("conflict");
    } catch (err) {
      return reply({ error: "Could not save", detail: String(err.message) }, 502, cors);
    }

    return reply({ ok: true, id: entry.id }, 200, cors);
  },
};

function gh(env, path, opts = {}) {
  return fetch(`https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ambewadi-issues-worker",
      "Content-Type": "application/json",
    },
  });
}

function reply(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

function toB64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromB64(b64) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
