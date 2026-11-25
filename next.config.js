const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const config = {
    output: 'export',
    reactStrictMode: true,
    experimental: {
        agentUpgrade: 'security',
    },
    images: {
        unoptimized: true,
    },
};

module.exports = withMDX(config);