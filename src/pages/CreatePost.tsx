
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/contexts/PostContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { isAuthenticated } = useAuth();
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    setIsSubmitting(true);
    try {
      const success = await createPost(data);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <PostForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          mode="create" 
        />
      </div>
    </Layout>
  );
}
