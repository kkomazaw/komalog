# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**komalog** - A personal blog site that publishes content managed in Notion, allowing visitors to quickly search articles by categories and tags.

## Requirements Definition

### Technical Stack
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **CMS**: Notion API
- **Deployment**: Vercel
- **Key Libraries**:
  - `@notionhq/client` - Notion API integration
  - `notion-to-md` - Markdown conversion
  - `next-themes` - Dark mode support
  - `next-intl` - Internationalization (Japanese & English)
  - Giscus - Comment functionality
  - Vercel Analytics - Access analytics

### Core Features
- Fetch and display articles from Notion database
- Article classification and search by categories and tags
- Article list page (6 articles per page)
- Pagination

### Additional Features
- ✅ Comment functionality (Giscus)
- ✅ SNS share buttons
- ✅ RSS feed
- ✅ Dark mode
- ✅ Internationalization (Japanese & English)
- ✅ Access analytics (Vercel Analytics)

### Notion Database Structure
Required properties:
- **Title** (Title type)
- **Category** (Select type)
- **Tags** (Multi-select type)
- **Published Date** (Date type)

### Design Guidelines
- Blog-style simple design
- Responsive layout

## MCP Server Configuration

The project has MCP (Model Context Protocol) servers configured in `.claude/settings.local.json`:
- Playwright server is enabled for browser automation and testing
- All project MCP servers are enabled by default

## Development Workflow

### Commands
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Architecture

**Directory Structure:**
```
komalog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with global styles
│   ├── page.tsx           # Home page
│   └── globals.css        # Global CSS with Tailwind directives
├── lib/                    # Core utilities and API integration
│   ├── env.ts             # Environment variable validation (Zod)
│   ├── types.ts           # TypeScript type definitions
│   └── notion.ts          # Notion API client and helpers
├── components/             # React components (to be added)
├── public/                 # Static assets
└── .env.local             # Environment variables (not in git)
```

**Key Files:**
- `lib/env.ts` - Validates required environment variables on build
- `lib/notion.ts` - Contains all Notion API functions:
  - `getPosts()` - Fetch posts with pagination and filtering
  - `getPostById()` - Fetch single post with full content
  - `getPostBySlug()` - Fetch post by URL slug
  - `getCategories()` - Get all unique categories
  - `getTags()` - Get all unique tags
- `lib/types.ts` - Type definitions for posts and pagination

## Node.js & Next.js Best Practices

### Environment Variables
- Store Notion API credentials in `.env.local` (never commit to git)
- Required variables:
  - `NOTION_API_KEY` - Notion integration token
  - `NOTION_DATABASE_ID` - Database ID for blog posts
- Use Next.js built-in environment variable validation with `z` (Zod)

### Data Fetching Strategy
- Use **ISR (Incremental Static Regeneration)** for blog posts to balance performance and freshness
- Set appropriate `revalidate` times (e.g., 3600 seconds for blog content)
- Use **SSG (Static Site Generation)** for category/tag pages
- Cache Notion API responses to minimize API calls

### API Routes & Server Components
- Prefer Server Components for data fetching (no client-side API calls needed)
- Use Server Actions for form submissions if needed
- Keep Notion API logic in server-side utilities only

### Performance Optimization
- Implement proper image optimization using Next.js `<Image>` component
- Use dynamic imports for heavy components (e.g., comment section)
- Minimize client-side JavaScript bundle size
- Leverage Vercel Edge Network for global performance

### Error Handling
- Implement graceful fallbacks for Notion API failures
- Use Error Boundaries for client-side errors
- Log errors appropriately for debugging (consider Vercel's logging)

### Type Safety
- Define TypeScript interfaces for Notion database schema
- Use strict TypeScript configuration
- Validate external data (Notion API responses) with Zod or similar

### Security
- Never expose Notion API keys to the client
- Sanitize Notion content before rendering (prevent XSS)
- Use environment variable validation on build time
- Implement rate limiting for public-facing features if needed
