import express from "express";

const router = express.Router();

// In-memory cache to conserve NewsData.io rate limits and provide instant response
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Niche metadata and NewsData.io query mapping
const NICHE_MAPPINGS = {
  'ai-tech': {
    label: 'AI & TECH',
    category: 'technology',
    q: 'AI OR technology OR artificial intelligence',
    categoryBg: 'bg-[#231b38]',
    categoryText: 'text-[#a78bfa]',
  },
  'financial-markets': {
    label: 'MARKETS',
    category: 'business',
    q: 'markets OR stocks OR finance OR economy',
    categoryBg: 'bg-[#102d2d]',
    categoryText: 'text-[#2dd4bf]',
  },
  'indian-business': {
    label: 'INDIAN BUSINESS',
    category: 'business',
    country: 'in',
    categoryBg: 'bg-[#291e14]',
    categoryText: 'text-[#fb923c]',
  },
  'global-politics': {
    label: 'POLITICS',
    category: 'politics',
    categoryBg: 'bg-[#2b1820]',
    categoryText: 'text-[#f43f5e]',
  },
  'startups': {
    label: 'STARTUPS',
    category: 'business',
    q: 'startup OR venture OR unicorn',
    categoryBg: 'bg-[#261e38]',
    categoryText: 'text-[#c084fc]',
  },
  'science': {
    label: 'SCIENCE',
    category: 'science',
    categoryBg: 'bg-[#0f2922]',
    categoryText: 'text-[#34d399]',
  },
  'geopolitics': {
    label: 'GEOPOLITICS',
    category: 'world',
    categoryBg: 'bg-[#1e2235]',
    categoryText: 'text-[#60a5fa]',
  },
  'health-medicine': {
    label: 'HEALTH',
    category: 'health',
    categoryBg: 'bg-[#281a24]',
    categoryText: 'text-[#f472b6]',
  },
  'climate-energy': {
    label: 'CLIMATE & ENERGY',
    category: 'environment',
    categoryBg: 'bg-[#142a1e]',
    categoryText: 'text-[#4ade80]',
  },
  'sports': {
    label: 'SPORTS',
    category: 'sports',
    categoryBg: 'bg-[#2c2014]',
    categoryText: 'text-[#facc15]',
  },
  'culture-arts': {
    label: 'CULTURE & ARTS',
    category: 'entertainment',
    categoryBg: 'bg-[#281628]',
    categoryText: 'text-[#e879f9]',
  },
  'legal-policy': {
    label: 'LEGAL & POLICY',
    category: 'politics',
    q: 'court OR law OR policy OR legal',
    categoryBg: 'bg-[#1e293b]',
    categoryText: 'text-[#94a3b8]',
  },
};

// Fallback category styling helper
function getCategoryMeta(categoryName, nicheId) {
  if (nicheId && NICHE_MAPPINGS[nicheId]) {
    return NICHE_MAPPINGS[nicheId];
  }

  const cat = (categoryName || '').toLowerCase();
  if (cat.includes('tech') || cat.includes('ai')) {
    return { label: 'AI & TECH', nicheId: 'ai-tech', categoryBg: 'bg-[#231b38]', categoryText: 'text-[#a78bfa]' };
  }
  if (cat.includes('business') || cat.includes('market') || cat.includes('finan')) {
    return { label: 'MARKETS', nicheId: 'financial-markets', categoryBg: 'bg-[#102d2d]', categoryText: 'text-[#2dd4bf]' };
  }
  if (cat.includes('politic')) {
    return { label: 'POLITICS', nicheId: 'global-politics', categoryBg: 'bg-[#2b1820]', categoryText: 'text-[#f43f5e]' };
  }
  if (cat.includes('scienc')) {
    return { label: 'SCIENCE', nicheId: 'science', categoryBg: 'bg-[#0f2922]', categoryText: 'text-[#34d399]' };
  }
  if (cat.includes('health')) {
    return { label: 'HEALTH', nicheId: 'health-medicine', categoryBg: 'bg-[#281a24]', categoryText: 'text-[#f472b6]' };
  }
  if (cat.includes('sport')) {
    return { label: 'SPORTS', nicheId: 'sports', categoryBg: 'bg-[#2c2014]', categoryText: 'text-[#facc15]' };
  }
  if (cat.includes('environ') || cat.includes('climate')) {
    return { label: 'CLIMATE', nicheId: 'climate-energy', categoryBg: 'bg-[#142a1e]', categoryText: 'text-[#4ade80]' };
  }
  if (cat.includes('entertain') || cat.includes('cultur')) {
    return { label: 'CULTURE', nicheId: 'culture-arts', categoryBg: 'bg-[#281628]', categoryText: 'text-[#e879f9]' };
  }

  return {
    label: (categoryName || 'GENERAL').toUpperCase(),
    nicheId: 'ai-tech',
    categoryBg: 'bg-[#1e1e28]',
    categoryText: 'text-[#38bdf8]',
  };
}

// Extract API Key and Base URL safely from process.env.NEWS_API
function getNewsApiConfig() {
  const raw = process.env.NEWS_API || '';
  let apiKey = '';
  let baseUrl = 'https://newsdata.io/api/1/latest';

  if (raw.includes('apikey=')) {
    try {
      const urlObj = new URL(raw);
      apiKey = urlObj.searchParams.get('apikey') || '';
      baseUrl = `${urlObj.origin}${urlObj.pathname}`;
    } catch {
      const parts = raw.split('apikey=');
      apiKey = parts[1]?.split('&')[0] || '';
    }
  } else if (raw.startsWith('pub_')) {
    apiKey = raw;
  } else if (raw.startsWith('http')) {
    baseUrl = raw;
  }

  return { apiKey, baseUrl };
}

// Calculate audio listen duration (minutes)
function calculateListenTime(text, lang = 'en') {
  if (!text) return { listenTime: lang === 'hi' ? '2 मिनट' : '2 MIN LISTEN', durationMinutes: lang === 'hi' ? '2 मिनट' : '2 MIN' };
  const words = text.trim().split(/\s+/).length;
  // Average speaking rate: ~130 words per minute
  const mins = Math.max(1, Math.min(10, Math.ceil(words / 45)));
  return {
    listenTime: lang === 'hi' ? `${mins} मिनट` : `${mins} MIN LISTEN`,
    durationMinutes: lang === 'hi' ? `${mins} मिनट` : `${mins} MIN`,
  };
}

// Transform raw NewsData.io article to Nuzio format
function formatArticle(item, index, lang = 'en', requestedNiche = null) {
  const categoryRaw = Array.isArray(item.category) ? item.category[0] : (item.category || 'news');
  const meta = getCategoryMeta(categoryRaw, requestedNiche);

  // Clean description or fallback to title
  let snippet = item.description || item.ai_summary || item.title || '';
  if (snippet.startsWith('ONLY AVAILABLE')) {
    snippet = item.title || '';
  }

  const { listenTime, durationMinutes } = calculateListenTime(`${item.title} ${snippet}`, lang);

  const cleanSource = (item.source_name || item.source_id || 'Global Wire').toUpperCase();

  return {
    id: item.article_id || `live-${Date.now()}-${index}`,
    nicheId: requestedNiche || meta.nicheId || 'ai-tech',
    category: meta.label,
    categoryBg: meta.categoryBg,
    categoryText: meta.categoryText,
    title: item.title ? item.title.trim() : 'Live Headline',
    snippet: snippet.trim(),
    source: cleanSource,
    sourceUrl: item.link || item.source_url || 'https://newsdata.io',
    imageUrl: item.image_url || null,
    pubDate: item.pubDate || new Date().toISOString(),
    listenTime,
    durationMinutes,
  };
}

/**
 * @route   GET /api/news
 * @desc    Fetch latest real-time news from NewsData.io with filtering, caching & pagination
 * @query   language (en, hi)
 * @query   niche (e.g. ai-tech, financial-markets, indian-business, sports, etc.)
 * @query   category (optional raw category)
 * @query   q (search keyword)
 * @query   page (pagination cursor)
 * @query   refresh (bypass cache)
 */
router.get("/", async (req, res) => {
  try {
    const {
      language = 'en',
      niche,
      category,
      q,
      page,
      refresh
    } = req.query;

    const lang = language === 'hi' ? 'hi' : 'en';
    const cacheKey = `${lang}_${niche || 'all'}_${category || ''}_${q || ''}_${page || '1'}`;

    // Check memory cache
    if (!refresh && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return res.json({
          success: true,
          fromCache: true,
          totalResults: cached.totalResults,
          nextPage: cached.nextPage,
          count: cached.articles.length,
          articles: cached.articles,
        });
      }
    }

    const { apiKey, baseUrl } = getNewsApiConfig();

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "NewsData.io API Key is not configured in backend .env",
      });
    }

    // Build NewsData.io URL
    const url = new URL(baseUrl);
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('language', lang);

    // If niche is specified, apply relevant category / country / query
    if (niche && NICHE_MAPPINGS[niche]) {
      const mapping = NICHE_MAPPINGS[niche];
      if (mapping.category) {
        url.searchParams.set('category', mapping.category);
      }
      if (mapping.country) {
        url.searchParams.set('country', mapping.country);
      }
      if (mapping.q && !q) {
        // Only set default niche search if user didn't specify their own q
        url.searchParams.set('q', mapping.q);
      }
    } else if (category) {
      url.searchParams.set('category', category);
    }

    if (q) {
      url.searchParams.set('q', q);
    }

    if (page) {
      url.searchParams.set('page', page);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.results)) {
      const formattedArticles = data.results
        .filter(item => item.title && !item.title.toLowerCase().includes('[removed]'))
        .map((item, idx) => formatArticle(item, idx, lang, niche));

      // Cache successful response
      cache.set(cacheKey, {
        timestamp: Date.now(),
        totalResults: data.totalResults || formattedArticles.length,
        nextPage: data.nextPage || null,
        articles: formattedArticles,
      });

      return res.json({
        success: true,
        fromCache: false,
        totalResults: data.totalResults || formattedArticles.length,
        nextPage: data.nextPage || null,
        count: formattedArticles.length,
        articles: formattedArticles,
      });
    } else {
      console.warn("NewsData.io API returned non-success:", data);
      
      // If we have stale cache, serve it
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        return res.json({
          success: true,
          fromCache: true,
          stale: true,
          totalResults: cached.totalResults,
          nextPage: cached.nextPage,
          count: cached.articles.length,
          articles: cached.articles,
        });
      }

      return res.status(502).json({
        success: false,
        message: data.results?.message || data.message || "Failed to retrieve news from NewsData.io",
        data,
      });
    }
  } catch (error) {
    console.error("News API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching news",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/news/niches
 * @desc    Fetch list of available niches and their metadata
 */
router.get("/niches", (req, res) => {
  return res.json({
    success: true,
    niches: Object.entries(NICHE_MAPPINGS).map(([id, meta]) => ({
      id,
      ...meta,
    })),
  });
});

export default router;
