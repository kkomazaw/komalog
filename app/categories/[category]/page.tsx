import { getPosts, getCategories } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Container from "@/components/Container";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((category) => category && category.trim() !== '')
    .map((category) => ({
      category: encodeURIComponent(category),
    }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} | komalog`,
    description: `Posts in category: ${category}`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const { posts } = await getPosts(100, undefined, category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
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
