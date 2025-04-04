
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/contexts/PostContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const postId = parseInt(id);
      const fetchedPost = getPost(postId);
      setPost(fetchedPost);
      setLoading(false);
      
      if (!fetchedPost) {
        toast.error("Post not found");
        navigate('/');
      } else if (user && fetchedPost.authorId !== user.id) {
        toast.error("You can only edit your own posts");
        navigate('/');
      }
    }
  }, [id, getPost, navigate, user]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
        <div className="container py-8 text-center">Post not found</div>
      </Layout>
    );
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    setIsSubmitting(true);
    try {
      const success = await updatePost({
        id: post.id,
        title: data.title,
        content: data.content
      });
      
      if (success) {
        navigate(`/post/${post.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <PostForm 
          title={post.title}
          content={post.content}
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          mode="edit" 
        />
      </div>
    </Layout>
  );
}
