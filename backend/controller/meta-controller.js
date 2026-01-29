import { newsItems } from '../utils/newsData.js';
import { extractImageFromContent, extractDescriptionFromContent, escapeHtml } from '../utils/metaUtils.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const getReports = async (req, res, next) => {
  try {
    // Get query parameters for filtering and pagination
    const { 
      status, 
      phoneNumber, 
      startDate, 
      endDate,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build where clause for filtering
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (phoneNumber) {
      where.phoneNumber = phoneNumber;
    }
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Validate sort order
    const orderBy = {};
    const validSortFields = ['createdAt', 'updatedAt', 'transactionDate', 'amount', 'status'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    orderBy[sortField] = sortOrder === 'asc' ? 'asc' : 'desc';

    // Get total count for pagination
    const totalCount = await prisma.payment.count({ where });

    // Fetch payments with pagination and sorting
    const payments = await prisma.payment.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPreviousPage = pageNum > 1;

    // Calculate summary statistics
    const summary = await prisma.payment.aggregate({
      where,
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    // Get status breakdown
    const statusBreakdown = await prisma.payment.groupBy({
      by: ['status'],
      where,
      _count: {
        status: true,
      },
      _sum: {
        amount: true,
      },
    });

    // Return response with payments and metadata
    res.status(200).json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          limit: limitNum,
          hasNextPage,
          hasPreviousPage,
        },
        summary: {
          totalAmount: summary._sum.amount || 0,
          totalTransactions: summary._count.id || 0,
          statusBreakdown: statusBreakdown.map(item => ({
            status: item.status,
            count: item._count.status,
            totalAmount: item._sum.amount || 0,
          })),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching payment reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};