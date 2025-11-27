import { getPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Container from "@/components/Container";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const { posts } = await getPosts(6); // Get first 6 posts

  return (
    <Container className="py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Latest Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to komalog - A personal blog site powered by Notion
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <p>No posts yet. Please add some posts to your Notion database.</p>
          <p className="mt-2 text-sm">
            See <a href="/NOTION_SETUP.md" className="text-blue-600 hover:underline">NOTION_SETUP.md</a> for setup instructions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
