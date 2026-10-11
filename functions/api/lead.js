// POST /api/lead — заявка с формы SinoVita. Журнал в KV LEADS; доставка — свой бот (если задан токен и группа)
// или приёмник HIMFORMа (himforma.com/api/lead → группа владельца) с пометкой «SinoVita».
import { groupId, tok } from "../_lib/tg.js";
const clean = (v) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 2000);
export async function onRequestPost({ request, env }) {
  let d; try { d = await request.json(); } catch { return json({ ok: false, error: "bad_json" }, 400); }
  if (d.website) return json({ ok: true });
  const L = { page: clean(d.page), lang: clean(d.lang), name: clean(d.name), company: clean(d.company), email: clean(d.email), phone: clean(d.phone),
              category: clean(d.category), message: clean(d.message) };
  if (!L.name || !L.email || !L.message) return json({ ok: false, error: "required" }, 422);
  const text = [`🔴 Inquiry: SinoVita ${L.page} [${L.lang || "en"}]`, `Name: ${L.name}`, L.company && `Company: ${L.company}`, `Email: ${L.email}`,
    L.phone && `Phone/WhatsApp: ${L.phone}`, L.category && `Category: ${L.category}`, `Inquiry: ${L.message}`].filter(Boolean).join("\n");
  const id = new Date().toISOString() + "-" + crypto.randomUUID().slice(0, 8);
  let stored = false;
  if (env.LEADS) { try { await env.LEADS.put("lead:" + id, JSON.stringify({ ...L, text }), { expirationTtl: 31536000 }); stored = true; } catch {} }
  const chat = await groupId(env);
  if (tok(env) && chat) {
    const r = await fetch(`https://api.telegram.org/bot${tok(env)}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }) }).catch(() => null);
    if (r && r.ok) return json({ ok: true, id });
  }
  const f = await fetch("https://himforma.com/api/lead", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site: "SinoVita", page: L.page, items: L.category, name: L.name, contact: [L.email, L.phone].filter(Boolean).join(", "),
      company: L.company, msg: L.message, pd: true }) }).catch(() => null);
  if (f && f.ok) return json({ ok: true, id });
  return json({ ok: stored, id }, stored ? 200 : 502);
}
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });
