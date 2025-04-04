
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <h1 className="mb-4">About BlogApp</h1>
        <div className="space-y-4">
          <p>
            BlogApp is a simple blogging platform that allows users to create, read, update, 
            and delete blog posts. It was built as a demonstration of a CRUD (Create, Read, 
            Update, Delete) application with user authentication.
          </p>
          <p>
            This application is built with React, TypeScript, and uses a local storage 
            "database" to persist data. In a production application, this would be replaced 
            with a real database like MySQL, PostgreSQL, or MongoDB.
          </p>
          <p>
            The design follows modern web principles with responsive layouts, accessible 
            forms, and a clean, minimalist aesthetic.
          </p>
        </div>
      </div>
    </Layout>
  );
}
