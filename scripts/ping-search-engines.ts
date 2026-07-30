import https from 'https';
import http from 'http';

const SITE_URL = 'https://devillabs.dev';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = 'devillabs';

// All discoverable URLs to submit for indexing
const ALL_URLS = [
  '/',
  '/services',
  '/products',
  '/solutions',
  '/work',
  '/projects',
  '/about',
  '/pricing',
  '/contact',
  '/process',
  '/insights',
  '/resources',
  '/faq',
  '/services/landing-pages',
  '/services/business-website',
  '/services/ecommerce',
  '/services/fullstack',
  '/services/ai-agents',
  '/services/ai-tools',
  '/services/automation',
  '/services/cloud-hosting',
  '/services/web-apps',
  '/services/vps',
];

function pingUrl(targetUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https') ? https : http;
    client.get(targetUrl, (res) => {
      resolve(`[${res.statusCode}] ${targetUrl}`);
    }).on('error', (err) => {
      resolve(`[ERR] ${targetUrl}: ${err.message}`);
    });
  });
}

function postJson(targetUrl: string, data: object): Promise<string> {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const url = new URL(targetUrl);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      resolve(`[${res.statusCode}] POST ${targetUrl}`);
    });

    req.on('error', (err) => {
      resolve(`[ERR] POST ${targetUrl}: ${err.message}`);
    });

    req.write(body);
    req.end();
  });
}

async function pingSearchEngines() {
  console.log('\n🚀 Devil Labs — Global Search Engine Indexing Pipeline\n');

  // 1. Google Sitemap Ping
  console.log('📌 Step 1: Google Sitemap Ping');
  const googleResult = await pingUrl(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   ${googleResult}`);

  // 2. Bing Sitemap Ping
  console.log('📌 Step 2: Bing Sitemap Ping');
  const bingResult = await pingUrl(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   ${bingResult}`);

  // 3. IndexNow Batch API (Bing, Yandex, Seznam, Naver, DuckDuckGo)
  console.log('📌 Step 3: IndexNow Batch Submission (Bing, Yandex, Seznam, Naver)');
  const indexNowPayload = {
    host: 'devillabs.dev',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: ALL_URLS.map(path => `${SITE_URL}${path}`),
  };

  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  for (const endpoint of indexNowEndpoints) {
    const result = await postJson(endpoint, indexNowPayload);
    console.log(`   ${result} (${ALL_URLS.length} URLs)`);
  }

  // 4. Individual URL pings for critical pages
  console.log('📌 Step 4: Individual Critical Page Pings');
  const criticalPaths = ['/', '/services', '/about', '/pricing', '/contact'];
  for (const path of criticalPaths) {
    const result = await pingUrl(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(SITE_URL + path)}&key=${INDEXNOW_KEY}`);
    console.log(`   ${result}`);
  }

  console.log('\n✅ Search engine indexing pipeline completed!\n');
  console.log(`📊 Total URLs submitted: ${ALL_URLS.length}`);
  console.log(`🌐 Engines notified: Google, Bing, Yandex, Seznam, Naver, DuckDuckGo`);
  console.log(`🔑 IndexNow Key: ${INDEXNOW_KEY}`);
  console.log(`📍 Key Location: ${SITE_URL}/${INDEXNOW_KEY}.txt\n`);
}

pingSearchEngines();
