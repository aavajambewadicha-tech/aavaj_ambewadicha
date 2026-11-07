# Ambewadi Issues

A citizens' page where people of Ambewadi, Belgaum report roads, water, drainage, cleaning and other problems for the Gram Panchayat. English, Kannada and Marathi. Photos and complaints are saved inside this repo.

## How it works

- The site (`index.html`, `style.css`, `app.js`) is plain static files on GitHub Pages.
- GitHub Pages cannot accept uploads by itself, so a tiny free Cloudflare Worker (`worker/worker.js`) receives each complaint and commits it to the repo:
  - photos go to `uploads/`
  - the text goes into `data/complaints.json`
- The page reads `data/complaints.json` to show the list. A new issue shows up for everyone after GitHub Pages rebuilds (usually 1 to 2 minutes).
- The GitHub token is stored only as a Worker secret. It is never in the website code.

## Setup

### 1. Put the site on GitHub Pages
1. Create a public repo, for example `ambewadi-issues`, and upload everything in this folder.
2. Repo **Settings > Pages** > deploy from branch `main`, folder `/ (root)`.
3. Your site will be at `https://<username>.github.io/ambewadi-issues/`.

### 2. Create a GitHub token
1. GitHub **Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token**.
2. Repository access: **Only select repositories** > this repo.
3. Permissions: **Contents: Read and write**. Nothing else.
4. Copy the token.

### 3. Deploy the Worker
1. Make a free account at cloudflare.com > **Workers & Pages > Create > Worker**.
2. Paste in `worker/worker.js` and deploy.
3. Worker **Settings > Variables**, add:
   - `GH_OWNER` = your GitHub username
   - `GH_REPO` = `ambewadi-issues`
   - `GH_BRANCH` = `main`
   - `ALLOWED_ORIGIN` = `https://<username>.github.io` (origin only, no path, no trailing slash)
   - `GITHUB_TOKEN` = the token, added as a **Secret**
4. Copy the Worker URL, for example `https://ambewadi-issues.yourname.workers.dev`.

### 4. Connect the site to the Worker
In `app.js`, set `CONFIG.SUBMIT_URL` to your Worker URL and commit. Done.

## Running the page

- **Mark issues as seen or resolved**: open `data/complaints.json` on GitHub, click the pencil icon, change `"status"` to `"seen"` or `"resolved"`, and commit.
- **Remove a bad or abusive post**: delete its block from `data/complaints.json` and delete its photos from `uploads/`.
- **Take to the Gram Panchayat**: press "Print for Gram Panchayat" on the page to print the full list, or share links on the village WhatsApp group.

## Things to know

- Everything submitted is public. The form tells people not to write phone numbers.
- Anyone can post. Check the page now and then and remove spam. For more protection, add a rate-limiting rule for the Worker in Cloudflare, or Cloudflare Turnstile on the form.
- Photos are shrunk in the browser to at most 1280 px before upload, so each is usually 150 to 400 KB. GitHub recommends keeping a repo under 1 GB, which is thousands of photos.
- This is a citizens' page, not an official Gram Panchayat site, and the footer says so.
