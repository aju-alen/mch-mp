import { newsItems } from '../utils/newsData.js';
import { extractImageFromContent, extractDescriptionFromContent, escapeHtml } from '../utils/metaUtils.js';

export const getMetaTags = (req, res, next) => {
  try {
    const { id } = req.params;
    const newsItem = newsItems.find(item => item.link === `/news/${id}`);

    if (!newsItem) {
      return res.status(404).send('News article not found');
    }

    // Extract meta data
    let ogImage = extractImageFromContent(newsItem.content);
    
    // Ensure we always have a valid image URL
    if (!ogImage || !ogImage.startsWith('http')) {
      ogImage = 'https://i.postimg.cc/cL5MWGTh/logo.png';
    } else {
      // Clean up image URL - remove any fragments but keep query parameters if they exist
      ogImage = ogImage.split('#')[0];
      // Ensure URL is properly formatted
      ogImage = ogImage.trim();
    }
    
    const description = extractDescriptionFromContent(newsItem.content);
    const pageUrl = `https://funyula.com${newsItem.link}`;
    const pageTitle = `${newsItem.title} | Michael H. Mugenya 2027`;

    // Escape HTML entities for safe rendering
    const escapedTitle = escapeHtml(newsItem.title);
    const escapedDescription = escapeHtml(description);
    const escapedPageTitle = escapeHtml(pageTitle);
    const escapedPageUrl = escapeHtml(pageUrl);
    const escapedOgImage = escapeHtml(ogImage);

    // Generate HTML with meta tags for crawlers
    // This HTML will be read by search engines and social media bots for link previews
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapedPageTitle}</title>
  <meta name="description" content="${escapedDescription}" />
  <meta property="og:title" content="${escapedTitle}" />
  <meta property="og:description" content="${escapedDescription}" />
  <meta property="og:url" content="${escapedPageUrl}" />
  <meta property="og:image" content="${escapedOgImage}" />
  <meta property="og:image:secure_url" content="${escapedOgImage}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="${escapedTitle}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Michael H. Mugenya 2027" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapedTitle}" />
  <meta name="twitter:description" content="${escapedDescription}" />
  <meta name="twitter:image" content="${escapedOgImage}" />
  <meta name="twitter:image:alt" content="${escapedTitle}" />
  <link rel="icon" href="https://i.postimg.cc/cL5MWGTh/logo.png" type="image/png" />
  <script>
    // Redirect to the frontend React app
    window.location.href = "${escapedPageUrl}";
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=${escapedPageUrl}" />
  </noscript>
</head>
<body>
  <p>Redirecting to <a href="${escapedPageUrl}">${escapedPageUrl}</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    next(error);
  }
};
