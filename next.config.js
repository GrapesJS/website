const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const config = {
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

module.exports = withMDX(config);