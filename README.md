# komalog

A personal blog site powered by Notion, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📝 Content management with Notion
- 🔍 Search by categories and tags
- 🌓 Dark mode support
- 🌍 Internationalization (Japanese & English)
- 💬 Comment system (Giscus)
- 📊 Analytics (Vercel Analytics)
- 📡 RSS feed
- 🔗 SNS share buttons

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Notion account and API integration

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd komalog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Notion

Follow the instructions in [NOTION_SETUP.md](./NOTION_SETUP.md) to:
- Create a Notion database
- Set up Notion API integration
- Get your API key and database ID

### 4. Configure environment variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Notion credentials:

```env
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
komalog/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components (to be added)
├── lib/                 # Utility functions (to be added)
├── public/              # Static files
├── .env.local.example   # Environment variables template
├── CLAUDE.md           # Claude Code documentation
├── NOTION_SETUP.md     # Notion setup guide
└── README.md           # This file
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add your environment variables in the Vercel project settings.

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Development guide for Claude Code
- [NOTION_SETUP.md](./NOTION_SETUP.md) - Notion database setup instructions

## License

MIT
