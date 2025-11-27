import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/notion";
import Container from "@/components/Container";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/Comments";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600;

// Generate static params for all posts
export async function generateStaticParams() {
  const { posts } = await getPosts(100);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | komalog`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className="py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.publishedDate}>{formattedDate}</time>
            {post.category && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {post.category}
              </span>
            )}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <ShareButtons
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://komalog.vercel.app'}/posts/${params.slug}`}
          />
        </div>

        <Comments slug={params.slug} />
      </article>
    </Container>
  );
}
