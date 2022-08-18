/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
  env: {
    OWNER: process.env.OWNER,
    REPO: process.env.REPO,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    LABELS: 'published',

    // config
    comment: 'true', // true or false
    theme: 'both', // 'light' or 'dark' or 'both'
    rss: 'true', // true or false
    back2top: 'true', // true or false
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  basePath: process.env.DEPLOY_TARGET === 'gh-pages' && process.env.REPO !== `${process.env.OWNER}.github.io`
    ? `/${process.env.REPO}`
    : '',
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = nextConfig
