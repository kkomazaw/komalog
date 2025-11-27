import Link from "next/link";
import { getTags, getPosts } from "@/lib/notion";
import Container from "@/components/Container";

export const revalidate = 3600;

export const metadata = {
  title: "Tags | komalog",
  description: "Browse posts by tag",
};

export default async function TagsPage() {
  const tags = await getTags();

  // Get post count for each tag
  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      const { posts } = await getPosts(100, undefined, undefined, tag);
      return { tag, count: posts.length };
    })
  );

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">Tags</h1>

      {tagCounts.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <p>No tags found.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              #{tag} ({count})
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
