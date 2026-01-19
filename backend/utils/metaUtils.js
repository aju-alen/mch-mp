/**
 * Extracts the first image URL from HTML content
 * Handles various image tag formats and ensures absolute URLs
 * @param {string} content - HTML content string
 * @returns {string|null} Image URL or null if no image found
 */
export function extractImageFromContent(content) {
  if (!content) return null;
  
  // Try multiple regex patterns to catch different image tag formats
  // Order matters - try most specific first
  const patterns = [
    /<img[^>]*\s+src\s*=\s*["']([^"']+)["'][^>]*>/i,  // src="..." with quotes, anywhere in tag
    /<img[^>]*\s+src\s*=\s*["']([^"']+)["']/i,        // src="..." with quotes
    /<img[^>]+src\s*=\s*["']([^"']+)["']/i,          // Standard src="..."
    /<img[^>]+src\s*=\s*([^\s>]+)/i,                  // src=... without quotes
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      let imageUrl = match[1].trim();
      
      // Remove any trailing characters that might be part of the regex match
      imageUrl = imageUrl.replace(/['"]+$/, '').replace(/['"]+^/, '');
      
      // Clean up any whitespace
      imageUrl = imageUrl.trim();
      
      // Ensure it's a valid URL
      if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
        // Remove any trailing slashes or invalid characters
        imageUrl = imageUrl.replace(/[<>"']/g, '');
        return imageUrl;
      }
      
      // If relative URL, return as is (will be handled by frontend)
      if (imageUrl && imageUrl.length > 0 && !imageUrl.includes('<') && !imageUrl.includes('>')) {
        return imageUrl;
      }
    }
  }
  
  return null;
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
