"use strict";

/* ---------- CONFIG: change this after deploying the worker ---------- */
const CONFIG = {
  SUBMIT_URL: "https://ambewadi-issues.abhiibelgaonkar.workers.dev/",
  CLOSE_EMAIL: "aavaj.ambewadicha@gmail.com",
  DATA_URL: "data/complaints.json",
};
const MAX_PHOTOS = 3;

/* ---------- Text in three languages ---------- */
const CATS = ["roads", "water", "power", "waste", "health", "school", "transport", "other"];

const T = {
  en: {
    close: "Close",
    viewPhoto: "View photo",
    closeTitle: "Problem fixed? Close the issue",
    closeIntro: "When an issue has been solved, send us a photo of the fixed place and we will mark it Resolved.",
    closeStep1: "Take a photo of the place after it was fixed.",
    closeStep2: "Email the photo to the address below.",
    closeStep3: "In the email, write the issue title and where in Ambewadi it was.",
    closeBtn: "Email the resolved photo",
    closeGmail: "Open in Gmail",
    closeNote: "We mark the issue as Resolved after checking the photo.",
    mailSubject: "Issue resolved: ",
    mailBody: "Issue title:\nLocation in Ambewadi:\nWhat was fixed:\n\n(Attach the photo of the fixed place)",
    checkFields: "Please fill every field. The details need at least 10 characters.",
    title: "Ambewadi’s issues, on record.",
    sub: "Roads, water, drains, cleaning, lights. Report what is broken so the Gram Panchayat can see it, and see what your neighbours have reported.",
    report: "Report an issue",
    reported: "Reported issues",
    category: "What is it about?",
    issueTitle: "Short title",
    where: "Where in Ambewadi?",
    wherePh: "Wadi, lane or landmark, e.g. near the temple",
    details: "Details",
    photos: "Photos (up to 3)",
    addPhotos: "Add photos",
    name: "Your name (optional)",
    nameNote: "Everything you send is public. Do not write phone numbers or other private details.",
    submit: "Send issue",
    sending: "Sending…",
    thanks: "Issue received. It will appear below within a few minutes.",
    failed: "Could not send the issue. Check your internet and try again.",
    photoFailed: "This photo could not be read. Try a JPG or PNG photo.",
    maxPhotos: "You can add up to 3 photos.",
    listTitle: "Reported issues",
    all: "All",
    empty: "No issues in this category yet.",
    loadFailed: "Could not load the issues list. Refresh the page to try again.",
    print: "Print for Gram Panchayat",
    share: "Share on WhatsApp",
    remove: "Remove photo",
    footer: "A citizens’ page for Ambewadi, Belgaum. Not an official Gram Panchayat website.",
    status: { open: "Pending", seen: "Seen by Gram Panchayat", resolved: "Resolved" },
    cat: {
      roads: "Roads & drainage", water: "Drinking water", power: "Electricity & street lights",
      waste: "Cleaning & waste", health: "Health", school: "School & anganwadi",
      transport: "Bus & transport", other: "Other",
    },
  },
  kn: {
    close: "ಮುಚ್ಚಿ",
    viewPhoto: "ಫೋಟೋ ನೋಡಿ",
    closeTitle: "ಸಮಸ್ಯೆ ಪರಿಹಾರವಾಯಿತೇ? ಸಮಸ್ಯೆಯನ್ನು ಮುಚ್ಚಿ",
    closeIntro: "ಸಮಸ್ಯೆ ಪರಿಹಾರವಾದಾಗ, ಸರಿಪಡಿಸಿದ ಸ್ಥಳದ ಫೋಟೋ ಕಳುಹಿಸಿ. ನಾವು ಅದನ್ನು “ಪರಿಹಾರವಾಗಿದೆ” ಎಂದು ಗುರುತಿಸುತ್ತೇವೆ.",
    closeStep1: "ಸರಿಪಡಿಸಿದ ನಂತರ ಆ ಸ್ಥಳದ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
    closeStep2: "ಫೋಟೋವನ್ನು ಕೆಳಗಿನ ವಿಳಾಸಕ್ಕೆ ಇಮೇಲ್ ಮಾಡಿ.",
    closeStep3: "ಇಮೇಲ್‌ನಲ್ಲಿ ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ ಮತ್ತು ಅಂಬೇವಾಡಿಯಲ್ಲಿ ಎಲ್ಲಿತ್ತು ಎಂದು ಬರೆಯಿರಿ.",
    closeBtn: "ಪರಿಹಾರದ ಫೋಟೋ ಇಮೇಲ್ ಮಾಡಿ",
    closeGmail: "Gmail ನಲ್ಲಿ ತೆರೆಯಿರಿ",
    closeNote: "ಫೋಟೋ ಪರಿಶೀಲಿಸಿದ ನಂತರ ನಾವು ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹಾರವಾಗಿದೆ ಎಂದು ಗುರುತಿಸುತ್ತೇವೆ.",
    mailSubject: "ಸಮಸ್ಯೆ ಪರಿಹಾರವಾಗಿದೆ: ",
    mailBody: "ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ:\nಅಂಬೇವಾಡಿಯಲ್ಲಿ ಸ್ಥಳ:\nಏನು ಸರಿಪಡಿಸಲಾಯಿತು:\n\n(ಸರಿಪಡಿಸಿದ ಸ್ಥಳದ ಫೋಟೋ ಲಗತ್ತಿಸಿ)",
    checkFields: "ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ. ವಿವರದಲ್ಲಿ ಕನಿಷ್ಠ ೧೦ ಅಕ್ಷರಗಳಿರಲಿ.",
    title: "ಅಂಬೇವಾಡಿಯ ಸಮಸ್ಯೆಗಳು, ದಾಖಲೆಯಲ್ಲಿ.",
    sub: "ರಸ್ತೆ, ನೀರು, ಚರಂಡಿ, ಸ್ವಚ್ಛತೆ, ದೀಪ. ಏನು ಹಾಳಾಗಿದೆ ಎಂದು ತಿಳಿಸಿ, ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗೆ ಕಾಣುವಂತೆ. ನಿಮ್ಮ ನೆರೆಹೊರೆಯವರು ತಿಳಿಸಿದ ಸಮಸ್ಯೆಗಳನ್ನೂ ನೋಡಿ.",
    report: "ಸಮಸ್ಯೆ ತಿಳಿಸಿ",
    reported: "ವರದಿ ಮಾಡಲಾದ ಸಮಸ್ಯೆಗಳು",
    category: "ಯಾವುದರ ಬಗ್ಗೆ?",
    issueTitle: "ಚಿಕ್ಕ ಶೀರ್ಷಿಕೆ",
    where: "ಅಂಬೇವಾಡಿಯಲ್ಲಿ ಎಲ್ಲಿ?",
    wherePh: "ವಾಡಿ, ಗಲ್ಲಿ ಅಥವಾ ಗುರುತು, ಉದಾ. ದೇವಸ್ಥಾನದ ಹತ್ತಿರ",
    details: "ವಿವರ",
    photos: "ಫೋಟೋಗಳು (೩ ವರೆಗೆ)",
    addPhotos: "ಫೋಟೋ ಸೇರಿಸಿ",
    name: "ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)",
    nameNote: "ನೀವು ಕಳುಹಿಸುವ ಎಲ್ಲವೂ ಎಲ್ಲರಿಗೂ ಕಾಣುತ್ತದೆ. ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ಖಾಸಗಿ ಮಾಹಿತಿ ಬರೆಯಬೇಡಿ.",
    submit: "ಸಮಸ್ಯೆ ಕಳುಹಿಸಿ",
    sending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…",
    thanks: "ಸಮಸ್ಯೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ಕೆಲವು ನಿಮಿಷಗಳಲ್ಲಿ ಕೆಳಗೆ ಕಾಣಿಸುತ್ತದೆ.",
    failed: "ಸಮಸ್ಯೆ ಕಳುಹಿಸಲು ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    photoFailed: "ಈ ಫೋಟೋ ಓದಲು ಆಗಲಿಲ್ಲ. JPG ಅಥವಾ PNG ಫೋಟೋ ಬಳಸಿ.",
    maxPhotos: "ಗರಿಷ್ಠ ೩ ಫೋಟೋ ಸೇರಿಸಬಹುದು.",
    listTitle: "ತಿಳಿಸಿದ ಸಮಸ್ಯೆಗಳು",
    all: "ಎಲ್ಲಾ",
    empty: "ಈ ವಿಭಾಗದಲ್ಲಿ ಇನ್ನೂ ಯಾವುದೇ ಸಮಸ್ಯೆ ಇಲ್ಲ.",
    loadFailed: "ಸಮಸ್ಯೆಗಳ ಪಟ್ಟಿ ಲೋಡ್ ಆಗಲಿಲ್ಲ. ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ.",
    print: "ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗಾಗಿ ಮುದ್ರಿಸಿ",
    share: "WhatsApp ನಲ್ಲಿ ಹಂಚಿ",
    remove: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    footer: "ಅಂಬೇವಾಡಿ, ಬೆಳಗಾವಿಯ ನಾಗರಿಕರ ಪುಟ. ಇದು ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ.",
    status: { open: "ಬಾಕಿ ಇದೆ", seen: "ಪಂಚಾಯಿತಿ ಗಮನಿಸಿದೆ", resolved: "ಪರಿಹಾರವಾಗಿದೆ" },
    cat: {
      roads: "ರಸ್ತೆ ಮತ್ತು ಚರಂಡಿ", water: "ಕುಡಿಯುವ ನೀರು", power: "ವಿದ್ಯುತ್ ಮತ್ತು ಬೀದಿ ದೀಪ",
      waste: "ಸ್ವಚ್ಛತೆ ಮತ್ತು ಕಸ", health: "ಆರೋಗ್ಯ", school: "ಶಾಲೆ ಮತ್ತು ಅಂಗನವಾಡಿ",
      transport: "ಬಸ್ ಮತ್ತು ಸಾರಿಗೆ", other: "ಇತರೆ",
    },
  },
  mr: {
    close: "बंद करा",
    viewPhoto: "फोटो पाहा",
    closeTitle: "समस्या सुटली का? समस्या बंद करा",
    closeIntro: "समस्या सुटल्यावर, दुरुस्त केलेल्या जागेचा फोटो पाठवा. आम्ही ती “सोडवली” म्हणून नोंदवू.",
    closeStep1: "दुरुस्तीनंतर त्या जागेचा फोटो काढा.",
    closeStep2: "फोटो खालील पत्त्यावर ईमेल करा.",
    closeStep3: "ईमेलमध्ये समस्येचे शीर्षक आणि आंबेवाडीत कुठे होती ते लिहा.",
    closeBtn: "सोडवल्याचा फोटो ईमेल करा",
    closeGmail: "Gmail मध्ये उघडा",
    closeNote: "फोटो तपासल्यानंतर आम्ही समस्या सोडवली म्हणून नोंदवू.",
    mailSubject: "समस्या सोडवली: ",
    mailBody: "समस्येचे शीर्षक:\nआंबेवाडीत ठिकाण:\nकाय दुरुस्त केले:\n\n(दुरुस्त केलेल्या जागेचा फोटो जोडा)",
    checkFields: "सर्व रकाने भरा. तपशिलात किमान १० अक्षरे असावीत.",
    title: "आंबेवाडीच्या समस्या, नोंदीवर.",
    sub: "रस्ते, पाणी, गटारे, स्वच्छता, दिवे. काय बिघडले आहे ते कळवा, म्हणजे ग्रामपंचायतीला दिसेल. शेजाऱ्यांनी कळवलेल्या समस्याही पाहा.",
    report: "समस्या नोंदवा",
    reported: "नोंदवलेल्या समस्या",
    category: "कशाबद्दल?",
    issueTitle: "छोटे शीर्षक",
    where: "आंबेवाडीत कुठे?",
    wherePh: "वाडी, गल्ली किंवा खूण, उदा. मंदिराजवळ",
    details: "तपशील",
    photos: "फोटो (३ पर्यंत)",
    addPhotos: "फोटो जोडा",
    name: "तुमचे नाव (ऐच्छिक)",
    nameNote: "तुम्ही पाठवलेली सर्व माहिती सर्वांना दिसते. फोन नंबर किंवा खाजगी माहिती लिहू नका.",
    submit: "समस्या पाठवा",
    sending: "पाठवत आहे…",
    thanks: "समस्या मिळाली. काही मिनिटांत खाली दिसेल.",
    failed: "समस्या पाठवता आली नाही. इंटरनेट तपासा आणि पुन्हा प्रयत्न करा.",
    photoFailed: "हा फोटो वाचता आला नाही. JPG किंवा PNG फोटो वापरा.",
    maxPhotos: "जास्तीत जास्त ३ फोटो जोडता येतात.",
    listTitle: "नोंदवलेल्या समस्या",
    all: "सर्व",
    empty: "या विभागात अजून समस्या नाहीत.",
    loadFailed: "समस्यांची यादी लोड झाली नाही. पान रिफ्रेश करा.",
    print: "ग्रामपंचायतीसाठी छापा",
    share: "WhatsApp वर शेअर करा",
    remove: "फोटो काढा",
    footer: "आंबेवाडी, बेळगावसाठी नागरिकांचे पान. ही ग्रामपंचायतीची अधिकृत वेबसाइट नाही.",
    status: { open: "प्रलंबित", seen: "ग्रामपंचायतीने पाहिले", resolved: "सोडवली" },
    cat: {
      roads: "रस्ते व गटारे", water: "पिण्याचे पाणी", power: "वीज व पथदिवे",
      waste: "स्वच्छता व कचरा", health: "आरोग्य", school: "शाळा व अंगणवाडी",
      transport: "बस व वाहतूक", other: "इतर",
    },
  },
};
const LOCALES = { en: "en-IN", kn: "kn-IN", mr: "mr-IN" };

/* ---------- State ---------- */
const state = { lang: "en", items: [], filter: "all", photos: [], loadError: false };
try {
  const saved = localStorage.getItem("lang");
  if (saved && T[saved]) state.lang = saved;
} catch (e) { /* storage may be blocked; ignore */ }

const $ = (id) => document.getElementById(id);
const t = (key) => T[state.lang][key] ?? T.en[key];
const catLabel = (id) => T[state.lang].cat[id] ?? id;

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

/* ---------- Language ---------- */
function applyLang() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
  document.querySelectorAll(".lang button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang));
  });

  const sel = $("category");
  const current = sel.value;
  sel.textContent = "";
  const first = el("option", null, "—");
  first.value = "";
  sel.append(first);
  CATS.forEach((c) => { const o = el("option", null, catLabel(c)); o.value = c; sel.append(o); });
  sel.value = current;

  const to = CONFIG.CLOSE_EMAIL;
  const subj = encodeURIComponent(t("mailSubject"));
  const body = encodeURIComponent(t("mailBody"));
  $("closeAddr").textContent = to;
  $("closeAddr").href = "mailto:" + to;
  $("closeMail").href = `mailto:${to}?subject=${subj}&body=${body}`;
  $("closeGmail").href = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${subj}&body=${body}`;

  renderFilters();
  renderList();
  renderPreviews();
}

document.querySelectorAll(".lang button").forEach((b) => {
  b.addEventListener("click", () => {
    state.lang = b.dataset.lang;
    try { localStorage.setItem("lang", state.lang); } catch (e) { /* ignore */ }
    applyLang();
  });
});

/* ---------- Issue list ---------- */
function renderFilters() {
  const box = $("filters");
  box.textContent = "";
  const make = (id, label) => {
    const b = el("button", null, label);
    b.type = "button";
    b.setAttribute("aria-pressed", String(state.filter === id));
    b.addEventListener("click", () => { state.filter = id; renderFilters(); renderList(); });
    box.append(b);
  };
  make("all", t("all"));
  CATS.forEach((c) => make(c, catLabel(c)));
}

function renderList() {
  const box = $("issueList");
  box.textContent = "";
  if (state.loadError) { box.append(el("p", "empty", t("loadFailed"))); return; }

  const rows = state.items
    .filter((i) => state.filter === "all" || i.category === state.filter)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

  if (!rows.length) { box.append(el("p", "empty", t("empty"))); return; }
  rows.forEach((it) => box.append(issueRow(it)));
}

function issueRow(it) {
  const imgs = Array.isArray(it.images) ? it.images : [];
  const a = el("article", "issue" + (imgs.length ? " has-img" : ""));
  a.id = "issue-" + it.id;

  const main = el("div", "issue-main");

  const meta = el("p", "issue-meta");
  meta.append(el("span", "tag", catLabel(it.category)));
  const s = ["open", "seen", "resolved"].includes(it.status) ? it.status : "open";
  meta.append(el("span", "status status-" + s, T[state.lang].status[s]));
  const d = new Date(it.createdAt);
  if (!isNaN(d)) {
    meta.append(el("span", null, d.toLocaleDateString(LOCALES[state.lang], { day: "numeric", month: "short", year: "numeric" })));
  }
  main.append(meta);

  main.append(el("h3", null, it.title));
  main.append(el("p", "issue-where", it.location + (it.name ? " · " + it.name : "")));
  main.append(el("p", "issue-desc", it.description));

  const foot = el("div", "issue-foot");
  const text = `${it.title} – ${it.location}, Ambewadi\n` + location.href.split("#")[0] + "#issue-" + it.id;
  const share = el("a", null, t("share"));
  share.href = "https://wa.me/?text=" + encodeURIComponent(text);
  share.target = "_blank";
  share.rel = "noopener";
  foot.append(share);
  main.append(foot);
  a.append(main);

  if (imgs.length) {
    const th = el("div", "thumbs");
    imgs.forEach((src) => {
      const btn = el("button", "thumb-btn");
      btn.type = "button";
      btn.setAttribute("aria-label", t("viewPhoto"));
      const im = document.createElement("img");
      im.src = src; im.alt = ""; im.loading = "lazy";
      btn.append(im);
      btn.addEventListener("click", () => openPhoto(src));
      th.append(btn);
    });
    a.append(th);
  }
  return a;
}

async function loadIssues() {
  try {
    const r = await fetch(CONFIG.DATA_URL + "?v=" + Date.now(), { cache: "no-store" });
    if (!r.ok) throw new Error(r.status);
    state.items = await r.json();
    state.loadError = false;
  } catch (e) {
    state.loadError = true;
  }
  renderList();
}

/* ---------- Photo popup ---------- */
const imgModal = $("imgModal");
function openPhoto(src) {
  if (typeof imgModal.showModal !== "function") { window.open(src, "_blank", "noopener"); return; }
  $("imgModalImg").src = src;
  imgModal.showModal();
}
$("imgClose").addEventListener("click", () => imgModal.close());
imgModal.addEventListener("click", (e) => { if (e.target === imgModal) imgModal.close(); }); // click outside the photo
imgModal.addEventListener("close", () => { $("imgModalImg").removeAttribute("src"); });

/* ---------- Photos: shrink in the browser before upload ---------- */
async function toJpeg(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("bad image"));
      i.src = url;
    });
    const scale = Math.min(1, 1280 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.75);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function setMsg(text, kind) {
  const m = $("formMsg");
  m.textContent = text || "";
  m.className = "form-msg" + (kind ? " " + kind : "");
}

function renderPreviews() {
  const ul = $("previews");
  ul.textContent = "";
  state.photos.forEach((src, idx) => {
    const li = el("li");
    const im = document.createElement("img");
    im.src = src; im.alt = "";
    const rm = el("button", null, "×");
    rm.type = "button";
    rm.setAttribute("aria-label", t("remove"));
    rm.addEventListener("click", () => { state.photos.splice(idx, 1); renderPreviews(); });
    li.append(im, rm);
    ul.append(li);
  });
}

$("photoInput").addEventListener("change", async (e) => {
  setMsg("");
  const files = Array.from(e.target.files);
  e.target.value = "";
  for (const f of files) {
    if (state.photos.length >= MAX_PHOTOS) { setMsg(t("maxPhotos"), "err"); break; }
    try { state.photos.push(await toJpeg(f)); }
    catch (err) { setMsg(t("photoFailed"), "err"); }
  }
  renderPreviews();
});

/* ---------- Submit ---------- */
$("issueForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;
  const btn = $("submitBtn");
  btn.disabled = true;
  btn.textContent = t("sending");
  setMsg("");

  const payload = {
    category: f.category.value,
    title: f.title.value.trim(),
    location: f.location.value.trim(),
    description: f.description.value.trim(),
    name: f.name.value.trim(),
    website: f.website.value,
    images: state.photos.map((d) => d.split(",")[1]),
  };

  try {
    const r = await fetch(CONFIG.SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (r.status === 400) { setMsg(t("checkFields"), "err"); return; }
    if (!r.ok) throw new Error(r.status);

    // show it right away on this device; the saved copy appears for everyone after the site rebuilds
    state.items.unshift({
      id: "local-" + Date.now(),
      createdAt: new Date().toISOString(),
      category: payload.category, title: payload.title, location: payload.location,
      description: payload.description, name: payload.name,
      images: state.photos.slice(), status: "open",
    });
    f.reset();
    state.photos = [];
    renderPreviews();
    renderList();
    setMsg(t("thanks"), "ok");
  } catch (err) {
    setMsg(t("failed"), "err");
  } finally {
    btn.disabled = false;
    btn.textContent = t("submit");
  }
});

$("printBtn").addEventListener("click", () => window.print());

/* ---------- Start ---------- */
applyLang();
loadIssues();
