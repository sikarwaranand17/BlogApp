
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}

interface CreatePostData {
  title: string;
  content: string;
}

interface UpdatePostData {
  id: number;
  title: string;
  content: string;
}

interface PostContextType {
  posts: Post[];
  loading: boolean;
  getUserPosts: (userId: number) => Post[];
  getPost: (id: number) => Post | undefined;
  createPost: (data: CreatePostData) => Promise<boolean>;
  updatePost: (data: UpdatePostData) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Mock database for posts
const POSTS_KEY = 'blog_posts';

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load posts on initial render
    const savedPosts = localStorage.getItem(POSTS_KEY);
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Failed to parse saved posts', error);
      }
    } else {
      // Initialize with sample posts if none exist
      const samplePosts = [
        {
          id: 1,
          title: "Getting Started with React",
          content: "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.",
          authorId: 1,
          authorName: "admin",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Why TypeScript Rocks",
          content: "TypeScript adds static typing to JavaScript, helping you catch errors early and making your code more maintainable.",
          authorId: 1,
          authorName: "admin",
          createdAt: new Date().toISOString()
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem(POSTS_KEY, JSON.stringify(samplePosts));
    }
    setLoading(false);
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
  };

  const getUserPosts = (userId: number) => {
    return posts.filter(post => post.authorId === userId);
  };

  const getPost = (id: number) => {
    return posts.find(post => post.id === id);
  };

  const createPost = async (data: CreatePostData): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return false;
    }

    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: data.title,
      content: data.content,
      authorId: user.id,
      authorName: user.username,
      createdAt: new Date().toISOString()
    };

    savePosts([...posts, newPost]);
    toast.success("Post created successfully!");
    return true;
  };

  const updatePost = async (data: UpdatePostData): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to update a post");
      return false;
    }

    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const post = posts.find(p => p.id === data.id);
    
    if (!post) {
      toast.error("Post not found");
      return false;
    }

    if (post.authorId !== user.id) {
      toast.error("You can only edit your own posts");
      return false;
    }

    const updatedPosts = posts.map(p => 
      p.id === data.id 
        ? { ...p, title: data.title, content: data.content } 
        : p
    );

    savePosts(updatedPosts);
    toast.success("Post updated successfully!");
    return true;
  };

  const deletePost = async (id: number): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to delete a post");
      return false;
    }

    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const post = posts.find(p => p.id === id);
    
    if (!post) {
      toast.error("Post not found");
      return false;
    }

    if (post.authorId !== user.id) {
      toast.error("You can only delete your own posts");
      return false;
    }

    const filteredPosts = posts.filter(p => p.id !== id);
    savePosts(filteredPosts);
    toast.success("Post deleted successfully!");
    return true;
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      loading, 
      getUserPosts, 
      getPost, 
      createPost, 
      updatePost, 
      deletePost 
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
