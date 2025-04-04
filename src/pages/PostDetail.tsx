
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/contexts/PostContext";
import { format } from "date-fns";
import { Trash2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getPost, deletePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const postId = parseInt(id);
      const fetchedPost = getPost(postId);
      setPost(fetchedPost);
      setLoading(false);
      
      if (!fetchedPost) {
        toast.error("Post not found");
      }
    }
  }, [id, getPost]);

  const handleDelete = async () => {
    if (!post || !window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const success = await deletePost(post.id);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8 text-center">Loading post...</div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="mb-4">Post not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </Layout>
    );
  }

  const isAuthor = user && user.id === post.authorId;
  const formattedDate = format(new Date(post.createdAt), "MMMM d, yyyy");

  return (
    <Layout>
      <article className="container py-8">
        <header className="mb-8">
          <h1 className="mb-2">{post.title}</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              By {post.authorName} • {formattedDate}
            </p>
            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit/${post.id}`}>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="flex items-center gap-1"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            )}
          </div>
        </header>
        
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Layout>
  );
}
