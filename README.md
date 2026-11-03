# [GrapesJS Website](https://grapesjs.com/)

The repository for the [GrapesJS Website](https://grapesjs.com/).

# Development

Use Node.js 20.9 or newer and Yarn Classic.

Download the repo and install dependencies.
```sh
git clone https://github.com/GrapesJS/website.git
cd website
yarn
```

Start the dev server
```sh
yarn dev
```

# Build and preview

Check TypeScript, then build the static site:

```sh
yarn typecheck
yarn build
```

The production site is exported to `out/`, which is deployed to GitHub Pages.
Preview that export locally with either command:

```sh
yarn start
# or: yarn serve
```

`next start` does not support `output: 'export'`; both preview commands serve
`out/` with the locally installed `serve` package.

# LLM content index

[`public/llms.txt`](public/llms.txt) is the curated Markdown overview served at
`https://grapesjs.com/llms.txt`. Keep its product descriptions and canonical links
up to date when products, documentation URLs, or public pages change. The shared
layout links to it with `rel="describedby"`; the static export copies it to
`out/llms.txt` automatically.
