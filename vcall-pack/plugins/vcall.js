// plugins/vcall.js  — 2 commands ek hi file mein: .vcall  aur  .vcallend
const { bandah } = require("../command");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

// ---- HIROBOT ka voip module (ESM hai, isliye dynamic import) ----
let VoipClass = null;
async function loadVoip() {
  if (!VoipClass) {
    const mod = await import(
      require("url").pathToFileURL(path.join(__dirname, "../lib/voip/index.js")).href
    );
    VoipClass = mod.default;
  }
  return VoipClass;
}
const voipByConn = new WeakMap();
async function getVoip(conn) {
  let v = voipByConn.get(conn);
  if (!v) {
    const Voip = await loadVoip();
    v = new Voip(conn, { voipLogLevel: "warn" });
    voipByConn.set(conn, v);
  }
  return v;
}

const activeCalls = new Map(); // chat -> { call, number }

// ---- reply ki hui video/audio nikalna (aap ke m.quoted par depend nahi) ----
function getQuotedMsg(mek) {
  const msg = mek?.message || {};
  const type = Object.keys(msg)[0];
  const ctx = msg[type]?.contextInfo;
  const q = ctx?.quotedMessage;
  if (!q) return null;
  // viewOnce / ephemeral wrappers hata do
  return q.ephemeralMessage?.message || q.viewOnceMessage?.message || q.viewOnceMessageV2?.message?.viewOnceMessage || q;
}

async function saveQuotedMedia(mek) {
  const q = getQuotedMsg(mek);
  if (!q) return null;
  let kind = null, node = null;
  if (q.videoMessage) { kind = "video"; node = q.videoMessage; }
  else if (q.audioMessage) { kind = "audio"; node = q.audioMessage; }
  else if (q.documentMessage && /^(video|audio)\//.test(q.documentMessage.mimetype || "")) {
    kind = q.documentMessage.mimetype.startsWith("video") ? "video" : "audio";
    node = q.documentMessage;
  }
  if (!node) return null;

  const stream = await downloadContentFromMessage(node, kind);
  const chunks = [];
  for await (const c of stream) chunks.push(c);
  const buf = Buffer.concat(chunks);
  if (!buf.length) throw new Error("Media download nahi hui.");

  const ext = kind === "video" ? ".mp4" : ".mp3";
  const file = path.join(os.tmpdir(), `vcall_${kind}_${Date.now()}${ext}`);
  fs.writeFileSync(file, buf);
  return { file, kind };
}

// ---------------- .vcall ----------------
// video par reply:  .vcall 923001234567        -> video call, video play
// audio par reply:  .vcall 923001234567 audio  -> audio play
bandah({
  pattern: "vcall",
  alias: ["videocall"],
  desc: "Reply ki hui video/audio ko call par play karo",
  category: "owner",
  react: "📞",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  // sirf owner (warna koi bhi spam calls karwa dega)
  if (typeof isOwner !== "undefined" && !isOwner) return reply("❌ Sirf owner use kar sakta hai.");

  const number = (args[0] || "").replace(/\D/g, "");
  if (!number) return reply("❌ Use:\n• Video par reply: .vcall 923001234567\n• Audio par reply: .vcall 923001234567 audio\nBand karne ke liye: .vcallend");
  if (activeCalls.has(m.from)) return reply("⚠️ Call chal rahi hai. Pehle .vcallend likhein.");

  const wantAudio = /^audio$/i.test(args[1] || "");

  let saved;
  try { saved = await saveQuotedMedia(mek); }
  catch (e) { return reply("❌ " + e.message); }
  if (!saved) return reply("❌ Pehle kisi video ya audio par reply karke command likhein.");

  // audio par reply ho to khud audio call; video par reply + "audio" likha ho to sirf awaaz
  let media = saved.file;
  if (wantAudio && saved.kind === "video") {
    // sirf awaaz chahiye: voip ko .mp3 naam se do taa ke audio treat ho
    const a = saved.file.replace(/\.mp4$/, "_a.mp3");
    fs.copyFileSync(saved.file, a);
    media = a;
  }

  const cleanup = () => { for (const f of [saved.file, media]) { try { fs.unlinkSync(f); } catch {} } };

  try {
    const voip = await getVoip(conn);
    await reply(`📞 ${number} ko call ho rahi hai (${media.endsWith(".mp3") ? "audio" : "video"})...`);
    const call = await voip.call(number, media, undefined, { autoEndCall: true });
    activeCalls.set(m.from, { call, number });

    call.on("connected", () => conn.sendMessage(m.from, { text: "✅ Call connect ho gayi, play ho raha hai." }, { quoted: mek }));
    call.on("ended", (reason) => {
      activeCalls.delete(m.from);
      cleanup();
      conn.sendMessage(m.from, { text: reason === "declined" ? `❌ ${number} ne call decline ki.` : `📴 Call khatam (${reason}).` }, { quoted: mek });
    });
    call.on("error", (err) => conn.sendMessage(m.from, { text: "⚠️ Call error: " + (err?.message || err) }, { quoted: mek }));
  } catch (e) {
    activeCalls.delete(m.from);
    cleanup();
    console.error("[vcall]", e);
    reply("❌ Call fail: " + (e?.message || e));
  }
});

// ---------------- .vcallend ----------------
bandah({
  pattern: "vcallend",
  desc: "Chalti call band karo",
  category: "owner",
  react: "📴",
  filename: __filename
}, async (conn, mek, m, { reply, isOwner }) => {
  if (typeof isOwner !== "undefined" && !isOwner) return reply("❌ Sirf owner.");
  const entry = activeCalls.get(m.from);
  if (!entry) return reply("ℹ️ Is chat mein koi call nahi chal rahi.");
  try { await entry.call.hangup(); reply("📴 Call band ki ja rahi hai..."); }
  catch (e) { activeCalls.delete(m.from); reply("❌ " + e.message); }
});
