import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTogglePostLike } from "@/hooks/Actions/posts/usePostsCurds";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";

const PostDetails = ({ post }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useTogglePostLike();

  const isLiked = post?.likes?.some((like) => like._id === user?.user?.id);
  const [liked, setLiked] = useState(isLiked || false);

  useEffect(() => {
    setLiked(isLiked || false);
  }, [isLiked]);

  const handleLike = () => {
    setLiked((prev) => !prev);

    mutate(
      {
        id: `/${post._id}/toggle-like`,
      },
      {
        onError: () => {
          setLiked((prev) => !prev);
        },
        onSuccess: () => {},
      }
    );
  };

  return (
    <>
      <Separator />
      <div className="text-sm flex items-center gap-2 text-gray-500">
        <span
          className={` ${
            post?.likes?.length > 0
              ? "cursor-pointer hover:text-destructive"
              : "pointer-events-none opacity-50 cursor-not-allowed"
          }`}
        >
          {post?.likes?.length || 0}{" "}
          {post?.likes?.length === 1 ? "اعجاب" : "اعجابات"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isPending}
          className={"cursor-pointer"}
        >
          <Heart
            className={`w-4 h-4 mr-2 transition-colors ${
              liked
                ? "text-destructive fill-destructive"
                : "text-muted-foreground"
            }`}
          />
          {liked ? "اعجبت" : "اعجب"}
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default PostDetails;
