import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { env } from "./env";
import type { NotionPost, PageMeta, PaginatedPosts } from "./types";

// Initialize Notion client
export const notion = new Client({
  auth: env.NOTION_API_KEY,
});

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

// Helper: Extract plain text from Notion rich text
function getPlainText(richText: any[]): string {
  if (!richText || richText.length === 0) return "";
  return richText.map((text) => text.plain_text).join("");
}

// Helper: Extract select property
function getSelect(property: any): string {
  return property?.select?.name || "";
}

// Helper: Extract multi-select property
function getMultiSelect(property: any): string[] {
  if (!property?.multi_select) return [];
  return property.multi_select.map((item: any) => item.name);
}

// Helper: Extract date property
function getDate(property: any): string {
  return property?.date?.start || "";
}

// Helper: Create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Fetch all posts (with optional filtering)
export async function getPosts(
  pageSize: number = 100,
  startCursor?: string,
  category?: string,
  tag?: string
): Promise<PaginatedPosts> {
  const filters: any[] = [];

  if (category) {
    filters.push({
      property: "Category",
      select: { equals: category },
    });
  }

  if (tag) {
    filters.push({
      property: "Tags",
      multi_select: { contains: tag },
    });
  }

  const response = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: filters.length > 0 ? { and: filters } : undefined,
    sorts: [
      {
        property: "Published Date",
        direction: "descending",
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const posts: PageMeta[] = response.results.map((page: any) => {
    const title = getPlainText(page.properties.Title?.title || []);
    return {
      id: page.id,
      title,
      category: getSelect(page.properties.Category),
      tags: getMultiSelect(page.properties.Tags),
      publishedDate: getDate(page.properties["Published Date"]),
      slug: createSlug(title),
    };
  });

  return {
    posts,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
}

// Fetch a single post by ID with content
export async function getPostById(pageId: string): Promise<NotionPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!("properties" in page)) return null;

    const title = getPlainText(page.properties.Title?.title || []);
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const content = n2m.toMarkdownString(mdBlocks).parent;

    return {
      id: page.id,
      title,
      category: getSelect(page.properties.Category),
      tags: getMultiSelect(page.properties.Tags),
      publishedDate: getDate(page.properties["Published Date"]),
      slug: createSlug(title),
      content,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Fetch post by slug
export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  const { posts } = await getPosts(100);
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  return getPostById(post.id);
}

// Get all unique categories
export async function getCategories(): Promise<string[]> {
  const { posts } = await getPosts(100);
  const categories = new Set(posts.map((post) => post.category).filter(Boolean));
  return Array.from(categories).sort();
}

// Get all unique tags
export async function getTags(): Promise<string[]> {
  const { posts } = await getPosts(100);
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}
