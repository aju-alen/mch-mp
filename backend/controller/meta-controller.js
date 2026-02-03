import { newsItems } from '../utils/newsData.js';
import { extractImageFromContent, extractDescriptionFromContent, escapeHtml } from '../utils/metaUtils.js';

export const getMetaTags = (req, res, next) => {
  try {
    const { id } = req.params;
    const newsItem = newsItems.find(item => item.link === `/news/${id}`);

    if (!newsItem) {
      return res.status(404).send('News article not found');
    }

    // 1. Ensure Absolute Image URL
    let ogImage = extractImageFromContent(newsItem.content);
    if (!ogImage || !ogImage.startsWith('http')) {
      ogImage = 'https://i.postimg.cc/cL5MWGTh/logo.png'; 
    }
    // WhatsApp cache-bust: sometimes appending a small string helps if images changed
    const finalOgImage = ogImage.split('#')[0].trim();

    // 2. Prepare Meta Content
    const description = extractDescriptionFromContent(newsItem.content) || 'Stay updated with Michael H. Mugenya 2027';
    const pageUrl = `https://funyula.com/news/${id}`;
    const pageTitle = `${newsItem.title} | Michael H. Mugenya 2027`;

    // 3. Return Pure HTML (No JS Redirect)
    // The Cloudflare Worker handles the user redirect; the backend just serves the data.
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(newsItem.title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(finalOgImage)}" />
  <meta property="og:url" content="${escapeHtml(pageUrl)}" />
  <meta property="og:site_name" content="Michael H. Mugenya 2027" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(newsItem.title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(finalOgImage)}" />
</head>
<body>
  <h1>${escapeHtml(newsItem.title)}</h1>
  <p>${escapeHtml(description)}</p>
</body>
</html>`;

    res.set('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    next(error);
  }
};