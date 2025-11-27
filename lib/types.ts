// Notion database properties
export interface NotionPost {
  id: string;
  title: string;
  category: string;
  tags: string[];
  publishedDate: string;
  slug: string;
  content: string;
}

// Page metadata
export interface PageMeta {
  id: string;
  title: string;
  category: string;
  tags: string[];
  publishedDate: string;
  slug: string;
}

// Pagination
export interface PaginatedPosts {
  posts: PageMeta[];
  hasMore: boolean;
  nextCursor: string | null;
}
