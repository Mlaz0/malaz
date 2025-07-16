import { useState } from "react";
import CreateComment from "./CreateComment";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, postId }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="space-y-3 ">
      {/* Toggle Comments Button */}
      {comments.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="text-gray-600 p-2 h-auto cursor-pointer  hover:bg-transparent hover:text-white"
        >
          {showComments ? "إخفاء التعليقات" : "عرض التعليقات"} {comments.length}
        </Button>
      )}

      {/* Comments List */}
      {showComments && (
        <div className="space-y-3  ps-2 border-r-2 border-primary">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={postId} />
          ))}
        </div>
      )}
      {/* Add Comment Form */}

      {user?.role === "doctor" && <CreateComment postId={postId} />}
    </div>
  );
};

export default CommentList;
