import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// Route-specific meta tags configuration
const routeMetaTags = {
  '/': {
    title: 'Home | Michael H. Mugenya 2027',
    description: 'Certified Website of Michael H. Mugenya',
    ogTitle: 'Michael H. Mugenya 2027',
    ogDescription: 'Certified Website of Michael H. Mugenya',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com',
  },
  '/contribute': {
    title: 'Make a Contribution | Michael H. Mugenya 2027',
    description: 'Support Michael H. Mugenya 2027 by making a secure contribution via M-Pesa. Quick and easy mobile payment process.',
    ogTitle: 'Make a Contribution',
    ogDescription: 'Support Michael H. Mugenya 2027 by making a secure contribution via M-Pesa. Quick and easy mobile payment process.',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/contribute',
  },
  '/platform': {
    title: 'Platform | Michael H. Mugenya 2027',
    description: 'Read the official 2027 Future-Proof Funyula Platform',
    ogTitle: 'Platform | Michael H. Mugenya 2027',
    ogDescription: 'Read the official 2027 Future-Proof Funyula Platform',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/platform',
  },
  '/news': {
    title: 'News | Michael H. Mugenya 2027',
    description: 'Latest news and updates from Michael H. Mugenya 2027',
    ogTitle: 'News | Michael H. Mugenya 2027',
    ogDescription: 'Latest news and updates from Michael H. Mugenya 2027',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/news',
  },
  '/upcoming-projects': {
    title: 'Upcoming Projects | Michael H. Mugenya 2027',
    description: 'Upcoming projects and initiatives from Michael H. Mugenya 2027',
    ogTitle: 'Upcoming Projects | Michael H. Mugenya 2027',
    ogDescription: 'Upcoming projects and initiatives from Michael H. Mugenya 2027',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/upcoming-projects',
  },
  '/gallery': {
    title: 'Gallery | Michael H. Mugenya 2027',
    description: 'Photo gallery of Michael H. Mugenya 2027',
    ogTitle: 'Gallery | Michael H. Mugenya 2027',
    ogDescription: 'Photo gallery of Michael H. Mugenya 2027',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/gallery',
  },
  '/get-involved': {
    title: 'Get Involved | Michael H. Mugenya 2027',
    description: 'Volunteer and get involved with Michael H. Mugenya 2027',
    ogTitle: 'Get Involved | Michael H. Mugenya 2027',
    ogDescription: 'Volunteer and get involved with Michael H. Mugenya 2027',
    ogImage: 'https://i.postimg.cc/cL5MWGTh/logo.png',
    ogUrl: 'https://funyula.com/get-involved',
  },
};

function generateMetaTags(meta) {
  return `
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />
  <meta property="og:url" content="${escapeHtml(meta.ogUrl)}" />
  <meta property="og:image" content="${escapeHtml(meta.ogImage)}" />
  <meta property="og:image:secure_url" content="${escapeHtml(meta.ogImage)}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content="${escapeHtml(meta.ogTitle)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Michael H. Mugenya 2027" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />
  <meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(meta.ogTitle)}" />`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default function prerenderPlugin() {
  return {
    name: 'prerender-routes',
    closeBundle() {
      // This runs after the build is complete
      const distDir = join(process.cwd(), 'dist');
      const indexHtmlPath = join(distDir, 'index.html');
      
      try {
        const baseHtml = readFileSync(indexHtmlPath, 'utf-8');

        // Generate HTML files for each route
        Object.entries(routeMetaTags).forEach(([route, meta]) => {
          // Find existing meta tags in head and replace, or inject before </head>
          let newHtml = baseHtml;
          
          // Remove existing title and meta tags if they exist
          newHtml = newHtml.replace(/<title>.*?<\/title>/i, '');
          newHtml = newHtml.replace(/<meta\s+name=["']description["'].*?>/gi, '');
          newHtml = newHtml.replace(/<meta\s+property=["']og:.*?>/gi, '');
          newHtml = newHtml.replace(/<meta\s+name=["']twitter:.*?>/gi, '');

          // Find the <head> tag and inject meta tags before closing </head>
          const headEndIndex = newHtml.indexOf('</head>');
          if (headEndIndex === -1) {
            console.warn(`Could not find </head> tag for route ${route}`);
            return;
          }

          const metaTags = generateMetaTags(meta);
          newHtml = newHtml.slice(0, headEndIndex) + metaTags + '\n  ' + newHtml.slice(headEndIndex);

          // Determine output path
          let outputPath;
          if (route === '/') {
            outputPath = indexHtmlPath; // Overwrite index.html for root
          } else {
            // Create directory structure for nested routes
            const routePath = route.startsWith('/') ? route.slice(1) : route;
            const routeDir = join(distDir, routePath);
            mkdirSync(routeDir, { recursive: true });
            outputPath = join(routeDir, 'index.html');
          }

          writeFileSync(outputPath, newHtml, 'utf-8');
          console.log(`✓ Generated prerendered HTML for route: ${route}`);
        });
      } catch (error) {
        console.warn('Prerender plugin error:', error.message);
      }
    },
  };
}
