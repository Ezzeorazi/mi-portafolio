/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://ezequiel-orazi.online',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  transform: async (config, path) => {
    // Blog posts get higher priority
    if (path.startsWith('/blog/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() };
    }
    // Main pages
    if (path === '/') {
      return { loc: path, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
  },
};

module.exports = config;
