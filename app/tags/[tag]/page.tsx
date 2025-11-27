import { getPosts, getTags } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Container from "@/components/Container";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} | komalog`,
    description: `Posts tagged with: ${tag}`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const { posts } = await getPosts(100, undefined, undefined, tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">#{tag}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} with this tag
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}
