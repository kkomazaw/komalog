import Link from "next/link";
import { getCategories, getPosts } from "@/lib/notion";
import Container from "@/components/Container";

export const revalidate = 3600;

export const metadata = {
  title: "Categories | komalog",
  description: "Browse posts by category",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  // Get post count for each category
  const categoryCounts = await Promise.all(
    categories.map(async (category) => {
      const { posts } = await getPosts(100, undefined, category);
      return { category, count: posts.length };
    })
  );

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>

      {categoryCounts.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryCounts.map(({ category, count }) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {count} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
