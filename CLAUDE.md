# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the GrapesJS marketing website (https://grapesjs.com/), built with Next.js 14 using the App Router and static export. It serves as the marketing site for GrapesJS, a web template editor framework, and includes product pages, comparison pages, blog posts, and interactive demos.

## Development Commands

**Start development server:**
```bash
yarn dev
```

**Build for production:**
```bash
yarn build
```
This creates a static export in the `out/` directory (configured via `output: 'export'` in next.config.js).

**Serve production build locally:**
```bash
yarn serve
```

**Add shadcn/ui components:**
```bash
yarn shadcn-add
```

## Architecture

### Next.js Configuration
- **Static Export**: The site is configured for static site generation (`output: 'export'`) and deployed to GitHub Pages
- **MDX Support**: Uses `@next/mdx` for MDX processing with rehype-highlight for syntax highlighting
- **Images**: Configured as unoptimized for static export compatibility

### Directory Structure

**`src/app/`** - Next.js App Router pages and layouts
- Route groups like `(demos)/` for organizational purposes without affecting URL structure
- Key pages include AI landing (`/ai`), SDK info (`/sdk`), pricing, blog, and comparison pages (`vs-*`)
- `_components/` - Shared UI components used across pages (Header, Footer, Hero, etc.)

**`src/content/blog/`** - Blog posts in MDX format
- Posts are parsed with gray-matter for frontmatter
- Post metadata includes title, date, coverImage, author, excerpt, and minRead calculation

**`src/components/ui/`** - shadcn/ui component library

**`src/lib/`** - Utility functions and APIs
- `blogApi.ts` - Blog post retrieval and parsing from `src/content/blog/`
- `grapes-api.ts` - API integration with app.grapesjs.com for fetching templates and user data
- `urls.ts` - Centralized URL management with UTM tracking
- `markdownToHtml.ts` - Markdown processing utilities
- `utils.ts` - General utility functions including `slugify()`

**`src/interfaces/`** - TypeScript type definitions

**`src/hooks/`** - Custom React hooks

### Key Patterns

**MDX Rendering:**
- Custom MDX components defined in `src/mdx-components.tsx`
- Uses `next-mdx-remote` with `rehype-highlight` for code syntax highlighting
- Custom styling applied via `markdown-styles.module.css`
- Headings automatically get IDs and anchor links via `slugify()` utility

**Blog System:**
- MDX files in `src/content/blog/` with frontmatter
- Static generation at build time via `getPostBySlug()` and `getAllPosts()`
- Automatic reading time calculation based on word count (200 words/minute)
- Dynamic routes using `[slug]` pattern

**API Integration:**
- `grapes-api.ts` fetches data from app.grapesjs.com
- Environment-aware: uses localhost in dev, production URL otherwise
- Controlled via `NEXT_PUBLIC_API_APP_BASE` environment variable

**Styling:**
- Tailwind CSS with custom theme extensions in `tailwind.config.ts`
- CSS modules for component-specific styles
- Google Fonts: Inter and Manrope
- Custom color palette and spacing system
- shadcn/ui components with HSL-based theming

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in tsconfig.json)

### Internationalization
- Spanish localization under `src/app/es/`
- hreflang links configured in root layout

### Analytics & Tracking
- Google Tag Manager integration
- PostHog analytics
- UTM parameter tracking via `urls.ts`

### SEO & Sitemaps
- **Sitemap**: `src/app/sitemap.ts` generates `sitemap.xml` at build time
  - Includes all static pages, comparison pages (`/vs-*`), and blog posts
  - Uses native Next.js MetadataRoute.Sitemap API
  - Dynamically includes all blog posts from `src/content/blog/`
- **Robots.txt**: `src/app/robots.ts` generates `robots.txt` at build time
  - References both `grapesjs.com/sitemap.xml` and `app.grapesjs.com/sitemap.xml`
  - Cross-domain sitemap linking follows SEO best practices
- Both files are automatically generated during `yarn build` and included in the static export

## Deployment

- Automated deployment via GitHub Actions (`.github/workflows/publish-to-github-pages.yml`)
- Builds on push to `main` branch
- Static files deployed to GitHub Pages from `out/` directory
