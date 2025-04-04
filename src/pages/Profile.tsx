
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/contexts/PostContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();
  const { getUserPosts } = usePosts();
  
  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  const userPosts = getUserPosts(user.id);

  return (
    <Layout>
      <div className="container py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Username:</span> {user.username}
              </div>
              <div>
                <span className="font-medium">Posts:</span> {userPosts.length}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h2>Your Posts</h2>
        </div>
        
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPosts.map(post => (
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
            <p className="text-muted-foreground">You haven't created any posts yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
