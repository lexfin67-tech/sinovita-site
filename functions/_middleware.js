// Основной адрес — sinovita-ingredients.com: www и *.pages.dev → 301. Фоном — настройка бота.
import { ensureSetup, HOST } from "./_lib/tg.js";
export async function onRequest({ request, next, env, waitUntil }) {
  const url = new URL(request.url);
  if (url.hostname === "www." + HOST || url.hostname === "sinovita.pages.dev") { url.hostname = HOST; return Response.redirect(url.toString(), 301); }
  if (/^\/(README\.md|CNAME|functions\/)/.test(url.pathname)) return new Response("Not found", { status: 404 });
  try { waitUntil(ensureSetup(env, url.hostname)); } catch {}
  return next();
}
