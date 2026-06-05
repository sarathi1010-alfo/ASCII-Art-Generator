/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://asciiartgenerator.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], // <= exclude here
}
