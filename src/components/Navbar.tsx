
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          BlogApp
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create" className="text-sm font-medium hover:text-primary">
                New Post
              </Link>
              
              <Link to="/profile" className="text-sm font-medium hover:text-primary">
                Profile
              </Link>
              
              <Button variant="outline" size="sm" onClick={() => {
                logout();
                navigate('/');
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
