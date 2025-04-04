
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { usePosts } from "@/contexts/PostContext";

export default function Index() {
  const { posts, loading } = usePosts();

  return (
    <Layout>
      <div className="container py-8">
        <header className="mb-8 text-center">
          <h1 className="mb-2">Welcome to BlogApp</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A place to share your thoughts, stories, and ideas with the world.
          </p>
        </header>
        
        {loading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                authorName={post.authorName}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found. Be the first to create one!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
