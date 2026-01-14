/**
 * Extracts the first image URL from HTML content
 * @param {string} content - HTML content string
 * @returns {string|null} Image URL or null if no image found
 */
export function extractImageFromContent(content) {
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Extracts a plain text description from HTML content
 * Strips HTML tags and returns first 160 characters
 * @param {string} content - HTML content string
 * @returns {string} Plain text description (max 160 chars)
 */
export function extractDescriptionFromContent(content) {
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  // Decode HTML entities (basic ones)
  const decoded = textContent
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  // Trim whitespace and get first 160 characters
  const trimmed = decoded.trim().replace(/\s+/g, ' ');
  return trimmed.length > 160 ? trimmed.substring(0, 160) + '...' : trimmed;
}

/**
 * Escapes HTML entities for safe rendering in meta tags
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
