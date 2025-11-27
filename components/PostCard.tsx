import Link from "next/link";
import type { PageMeta } from "@/lib/types";

interface PostCardProps {
  post: PageMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`} className="block group">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <time dateTime={post.publishedDate}>{formattedDate}</time>
          {post.category && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              {post.category}
            </span>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
