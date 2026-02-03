/**
 * Detect if the request is from a crawler/bot that needs pre-rendered HTML for OG previews.
 * Used for YouTube-style dynamic rendering: serve meta-rich HTML to crawlers, SPA to users.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers
 * @see https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/
 */

const CRAWLER_PATTERNS = [
  // Google
  /googlebot/i,
  /google-inspectiontool/i,
  /adsbot-google/i,
  /mediapartners-google/i,
  /bingbot/i,
  /msnbot/i,
  // Meta (Facebook, Instagram, Messenger, WhatsApp)
  /facebookexternalhit/i,
  /facebot/i,
  /whatsapp/i,
  /instagram/i,
  // Twitter / X
  /twitterbot/i,
  // LinkedIn
  /linkedinbot/i,
  /linkedin/i,
  // Slack, Discord, Telegram
  /slackbot/i,
  /discordbot/i,
  /telegrambot/i,
  // Pinterest
  /pinterest/i,
  // Apple
  /applebot/i,
  // Generic bot hints
  /bot\b/i,
  /crawler/i,
  /spider/i,
  /slurp/i,   // Yahoo
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
];

/**
 * Returns true if the given User-Agent string is likely a crawler/bot
 * that should receive pre-rendered HTML (for link previews / SEO).
 *
 * @param {string} userAgent - req.get('User-Agent') or req.headers['user-agent']
 * @returns {boolean}
 */
export function isCrawler(userAgent) {
  if (!userAgent || typeof userAgent !== 'string') return false;
  return CRAWLER_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Use in Express: req is from a crawler that needs meta HTML.
 *
 * @param {import('express').Request} req
 * @returns {boolean}
 */
export function requestIsCrawler(req) {
  return isCrawler(req.get('User-Agent') || req.get('user-agent') || '');
}
