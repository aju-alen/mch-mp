/**
 * YouTube-style dynamic rendering middleware.
 *
 * For certain paths, only crawlers get the meta-rich HTML (for link previews).
 * Normal users are redirected to the frontend SPA.
 *
 * Use this when the same URL should serve:
 * - Crawlers (Google, WhatsApp, Facebook, etc.) → HTML with og:image, title, description
 * - Users → redirect to the actual React app
 */

import { requestIsCrawler } from '../utils/crawlerDetect.js';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'https://funyula.com';

/**
 * Paths that support dynamic rendering (no leading slash; router strips mount path).
 * Only these paths will redirect non-crawlers to the frontend.
 */
const DYNAMIC_RENDER_PATHS = ['contribute', 'news'];

/**
 * Returns true if the request path is one we do dynamic render for.
 * @param {string} path - e.g. 'contribute', 'news', 'news/123'
 * @returns {boolean}
 */
function pathIsDynamicRendered(path) {
  const p = (path || '').replace(/^\//, '');
  return DYNAMIC_RENDER_PATHS.some((base) => p === base || p.startsWith(base + '/'));
}

/**
 * Middleware: if request is for a dynamic-rendered path and User-Agent is NOT a crawler,
 * redirect to the frontend. Otherwise call next() so the route handler can serve meta HTML.
 */
export function dynamicRenderRedirect(req, res, next) {
  const path = req.path || req.url?.split('?')[0] || '';
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  if (!pathIsDynamicRendered(path)) return next();

  if (!requestIsCrawler(req)) {
    const base = FRONTEND_BASE_URL.replace(/\/$/, '');
    const pathWithSlash = (path || '').startsWith('/') ? path : `/${path || ''}`;
    const qs = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const redirectTo = `${base}${pathWithSlash}${qs}`;
    return res.redirect(302, redirectTo);
  }

  next();
}
