// Telegram для SinoVita. Токен — только в TELEGRAM_BOT_TOKEN (Secret) проекта Pages sinovita; в репозитории его нет.
// Группа: TELEGRAM_CHAT_ID или привязка командой /bind (KV LEADS: tg:group).
export const HOST = "sinovita-ingredients.com";
export const tok = (env) => env.TELEGRAM_BOT_TOKEN || "";
export const api = (env, method, body) =>
  fetch(`https://api.telegram.org/bot${tok(env)}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) })
    .then((r) => r.json()).catch(() => ({ ok: false }));
export async function hookSecret(env) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("sinovita-hook:" + tok(env)));
  return [...new Uint8Array(h)].slice(0, 24).map((b) => b.toString(16).padStart(2, "0")).join("");
}
export async function groupId(env) { return env.TELEGRAM_CHAT_ID || (env.LEADS ? await env.LEADS.get("tg:group") : null); }
export const MENU_V = "sv-1";
const MENU = {
  en: [["start", "Start"], ["quote", "Request a quote"], ["products", "Product range"], ["docs", "COA / MSDS / documents"], ["contacts", "Contacts"]],
  ru: [["start", "Начать"], ["quote", "Запросить цену"], ["products", "Ассортимент"], ["docs", "COA / MSDS / документы"], ["contacts", "Контакты"]],
  zh: [["start", "开始"], ["quote", "询价"], ["products", "产品范围"], ["docs", "COA / MSDS / 文件"], ["contacts", "联系方式"]],
};
async function ensureMenu(env) {
  if ((await env.LEADS.get("tg:menu")) === MENU_V) return;
  const cmd = (l) => MENU[l].map(([command, description]) => ({ command, description }));
  const r = [
    await api(env, "setMyCommands", { commands: cmd("en"), scope: { type: "all_private_chats" } }),
    await api(env, "setMyCommands", { commands: cmd("ru"), scope: { type: "all_private_chats" }, language_code: "ru" }),
    await api(env, "setMyCommands", { commands: cmd("zh"), scope: { type: "all_private_chats" }, language_code: "zh" }),
    await api(env, "setMyCommands", { commands: [{ command: "bind", description: "Link this group to the bot" }, { command: "help", description: "Help" }], scope: { type: "all_chat_administrators" } }),
    await api(env, "setChatMenuButton", { menu_button: { type: "commands" } }),
  ];
  if (r.every((x) => x.ok)) await env.LEADS.put("tg:menu", MENU_V); else await env.LEADS.put("tg:menu_error", JSON.stringify(r.filter((x) => !x.ok)).slice(0, 500));
}
let setupDone = false;
export async function ensureSetup(env, host) {
  if (setupDone || !tok(env) || !env.LEADS || host !== HOST) return;
  await ensureMenu(env);
  const sig = (await hookSecret(env)).slice(0, 8);
  if ((await env.LEADS.get("tg:hook")) === sig) { setupDone = true; return; }
  const me = await api(env, "getMe");
  const r = await api(env, "setWebhook", { url: `https://${host}/api/tg`, secret_token: await hookSecret(env), allowed_updates: ["message"], drop_pending_updates: true });
  if (me.ok) await env.LEADS.put("tg:me", JSON.stringify({ username: me.result.username, name: me.result.first_name }));
  if (r.ok) { await env.LEADS.put("tg:hook", sig); setupDone = true; } else await env.LEADS.put("tg:hook_error", JSON.stringify(r).slice(0, 500));
}
