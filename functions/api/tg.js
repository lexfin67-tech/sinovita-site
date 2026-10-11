// Вебхук бота SinoVita: клиент пишет боту → сообщение в группу владельца; ответ реплаем → клиенту от имени бота.
// Язык ответов — по language_code клиента (ru / zh / en по умолчанию).
import { api, hookSecret, groupId, tok, HOST } from "../_lib/tg.js";
const TTL = 60 * 60 * 24 * 180;
const S = `https://${HOST}`;
const esc = (s) => String(s ?? "").replace(/[<&>]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
const TXT = {
  en: { start: "Hello! This is SinoVita Ingredients — factory-direct sourcing of nutraceutical and cosmetic raw materials from China: plant extracts, mineral chelates, amino acids, vitamins, capsules and packaging.\n\nSend your product list and target volumes — we will reply with pricing, MOQ and lead times.",
        quote: "Please send in one message:\n• products and specification (e.g. assay, mesh, standard USP/EP)\n• target volume and frequency\n• destination country\n\nWe reply with factory-direct pricing, MOQ and lead time.",
        products: `Product range: ${S}/products.html`, docs: "Each shipment comes with the manufacturer's COA; MSDS and certificate of origin on request. Ask for documents on a specific product here.",
        contacts: `Email: sales@${HOST}\nWebsite: ${S}/contact.html\n\nOr just write here — a manager will answer.`, ack: "Thank you! Your message has been received — a manager will reply shortly." },
  ru: { start: "Здравствуйте! Это SinoVita Ingredients — поставки сырья для БАД и косметики напрямую с фабрик Китая: растительные экстракты, хелаты минералов, аминокислоты, витамины, капсулы и упаковка.\n\nПришлите список продуктов и объёмы — ответим ценой, MOQ и сроками.",
        quote: "Пришлите одним сообщением:\n• продукты и спецификацию (assay, mesh, стандарт USP/EP)\n• объём и периодичность\n• страну доставки\n\nОтветим ценой с фабрики, MOQ и сроками.",
        products: `Ассортимент: ${S}/products.html?lang=ru`, docs: "С каждой партией — COA производителя; MSDS и сертификат происхождения — по запросу. Спросите документы по конкретному продукту здесь.",
        contacts: `Email: sales@${HOST}\nСайт: ${S}/contact.html?lang=ru\n\nИли напишите здесь — ответит менеджер.`, ack: "Спасибо! Сообщение получено, менеджер скоро ответит." },
  zh: { start: "您好！这里是 SinoVita Ingredients —— 中国工厂直供营养品与化妆品原料：植物提取物、矿物螯合物、氨基酸、维生素、空心胶囊及包装。\n\n请发送产品清单和目标数量，我们将回复价格、起订量和交期。",
        quote: "请在一条消息中发送：\n• 产品及规格（含量、目数、USP/EP 标准）\n• 目标数量及频次\n• 目的国\n\n我们将回复工厂价、起订量和交期。",
        products: `产品范围：${S}/products.html?lang=zh`, docs: "每批货物均附生产厂家 COA；MSDS 及原产地证书可按需提供。",
        contacts: `邮箱：sales@${HOST}\n网站：${S}/contact.html?lang=zh\n\n或直接在此留言，客户经理会回复您。`, ack: "谢谢！已收到您的消息，客户经理将尽快回复。" },
};
const L = (m) => { const c = (m.from?.language_code || "").slice(0, 2); return TXT[c] ? c : "en"; };
export async function onRequestPost({ request, env }) {
  if (!tok(env) || !env.LEADS) return new Response("not configured", { status: 503 });
  if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== (await hookSecret(env))) return new Response("forbidden", { status: 403 });
  let u; try { u = await request.json(); } catch { return new Response("ok"); }
  const m = u.message; if (!m || !m.chat) return new Response("ok");
  const text = (m.text || "").trim(); const gid = await groupId(env);
  if (m.chat.type === "group" || m.chat.type === "supergroup") {
    if (/^\/bind(@\w+)?\s*$/.test(text)) {
      if (gid && String(gid) !== String(m.chat.id)) { await api(env, "sendMessage", { chat_id: m.chat.id, text: "Бот уже привязан к другой группе." }); return new Response("ok"); }
      await env.LEADS.put("tg:group", String(m.chat.id));
      await env.LEADS.put("tg:group_info", JSON.stringify({ id: m.chat.id, title: m.chat.title, by: m.from?.id, at: new Date().toISOString() }));
      await api(env, "sendMessage", { chat_id: m.chat.id, text: "✅ Группа привязана к SinoVita. Сюда придут заявки с сайта и сообщения клиентов — отвечайте реплаем." });
      return new Response("ok");
    }
    if (!gid || String(m.chat.id) !== String(gid)) return new Response("ok");
    if (/^\/help/.test(text)) { await api(env, "sendMessage", { chat_id: gid, reply_to_message_id: m.message_id, text: "Заявки с sinovita-ingredients.com и сообщения клиентов из бота. Ответ клиенту — реплаем на его сообщение." }); return new Response("ok"); }
    const rep = m.reply_to_message;
    if (rep && rep.from?.is_bot) {
      const client = await env.LEADS.get("map:" + rep.message_id);
      if (!client) { await api(env, "sendMessage", { chat_id: gid, reply_to_message_id: m.message_id, text: "Не нашёл, кому отправить: ответьте реплаем на сообщение клиента." }); return new Response("ok"); }
      const r = await api(env, "copyMessage", { chat_id: client, from_chat_id: gid, message_id: m.message_id });
      await api(env, "setMessageReaction", { chat_id: gid, message_id: m.message_id, reaction: [{ type: "emoji", emoji: r.ok ? "👍" : "👎" }] });
      if (r.ok) await env.LEADS.put("map:" + m.message_id, client, { expirationTtl: TTL });
    }
    return new Response("ok");
  }
  if (m.chat.type !== "private") return new Response("ok");
  const T = TXT[L(m)];
  const f = m.from || {}; const who = esc([f.first_name, f.last_name].filter(Boolean).join(" ") || "Client") + (f.username ? " @" + esc(f.username) : "") + ` · ${L(m)}`;
  const k = (text.match(/^\/(\w+)/) || [])[1];
  if (k === "start") {
    await api(env, "sendMessage", { chat_id: m.chat.id, text: T.start });
    if (gid) { const h = await api(env, "sendMessage", { chat_id: gid, parse_mode: "HTML", text: `🆕 SinoVita · новый диалог: <b>${who}</b>` }); if (h.ok) await env.LEADS.put("map:" + h.result.message_id, String(m.chat.id), { expirationTtl: TTL }); }
    return new Response("ok");
  }
  if (k && T[k]) { await api(env, "sendMessage", { chat_id: m.chat.id, text: T[k], disable_web_page_preview: true }); return new Response("ok"); }
  if (!gid) { await api(env, "sendMessage", { chat_id: m.chat.id, text: T.ack }); return new Response("ok"); }
  const h = await api(env, "sendMessage", { chat_id: gid, parse_mode: "HTML", text: `💬 SinoVita · <b>${who}</b> · id ${m.chat.id}\n<i>Ответьте реплаем на сообщение ниже — ответ уйдёт клиенту от имени бота.</i>` });
  const c = await api(env, "copyMessage", { chat_id: gid, from_chat_id: m.chat.id, message_id: m.message_id });
  for (const r of [h, c]) if (r.ok) await env.LEADS.put("map:" + r.result.message_id, String(m.chat.id), { expirationTtl: TTL });
  return new Response("ok");
}
