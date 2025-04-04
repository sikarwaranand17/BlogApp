
import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <h1 className="mb-4">Privacy Policy</h1>
        <div className="space-y-4">
          <p>
            This is a demo application. In a real-world scenario, this page would contain 
            a comprehensive privacy policy detailing how user data is collected, stored, 
            and processed.
          </p>
          <p>
            For this demo, no real data is collected or shared with third parties. All data 
            is stored locally in your browser's local storage and is not transmitted over 
            the internet.
          </p>
          <p>
            The data stored includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>User accounts (username and password - not encrypted in this demo)</li>
            <li>Blog posts (title, content, author information, and creation date)</li>
          </ul>
          <p>
            In a production application, proper security measures would be implemented, 
            including secure password hashing, HTTPS, and other standard security practices.
          </p>
        </div>
      </div>
    </Layout>
  );
}
