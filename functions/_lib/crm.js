// Копия заявки в Google-таблицу «Заявки — CRM» (веб-приложение Apps Script; адрес — секрет CRM_URL в настройках Pages).
// Скрипт таблицы: b2b-sites/tools/crm_apps_script.gs. Ошибка записи не мешает приёму заявки (журнал KV и Telegram — как раньше).
export async function toCrm(env, row) {
  if (!env.CRM_URL) return;
  const at = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 16).replace("T", " "); // МСК
  try {
    await fetch(env.CRM_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ at, ...row }), redirect: "follow" });
  } catch {}
}
