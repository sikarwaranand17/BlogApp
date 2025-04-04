
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export default function PostCard({ id, title, content, authorName, createdAt }: PostCardProps) {
  // Format the creation date
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Truncate content for preview
  const truncatedContent = content.length > 150 
    ? content.substring(0, 150) + "..." 
    : content;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="hover:text-primary transition-colors">
          <Link to={`/post/${id}`}>{title}</Link>
        </CardTitle>
        <CardDescription>
          By {authorName} • {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{truncatedContent}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link 
          to={`/post/${id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
