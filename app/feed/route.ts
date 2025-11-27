import { Feed } from "feed";
import { getPosts } from "@/lib/notion";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://komalog.vercel.app";
  const { posts } = await getPosts(50); // Get latest 50 posts for RSS

  const feed = new Feed({
    title: "komalog",
    description: "A personal blog site powered by Notion",
    id: siteUrl,
    link: siteUrl,
    language: "ja",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/feed`,
      json: `${siteUrl}/feed/json`,
      atom: `${siteUrl}/feed/atom`,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      date: new Date(post.publishedDate),
      category: post.category ? [{ name: post.category }] : [],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
