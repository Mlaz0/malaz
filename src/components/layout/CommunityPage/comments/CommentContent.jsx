import formatDate from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Edit } from "lucide-react";
import isArabic from "@/utils/IsArabic";
import { useDeleteComments } from "@/hooks/Actions/comments/useCommentsCurds";

const CommentContent = ({ comment, setIsEditing }) => {
  const { mutate } = useDeleteComments();

  const handleDelete = () => {
    mutate({ id: comment?._id });
  };

  return (
    <>
      <div className="bg-background max shadow space-y-1 rounded-lg px-2 py-2">
        <p className="font-semibold text-sm capitalize m-0">
          {comment?.author?.author_name}
        </p>
        <span className="text-[10px] text-gray-500">
          {formatDate(comment?.createdAt)}
        </span>
        <p
          className="text-sm text-muted-foreground my-2 dark:text-white break-words overflow-hidden break-all "
          dir={isArabic(comment?.text) ? "rtl" : "ltr"}
        >
          {comment?.text}
        </p>
      </div>

      {/* Btn Action */}
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 ">
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs bg-transparent hover:text-primary cursor-pointer hover:bg-transparent text-muted-foreground shadow-none"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-3 h-3 mr-1" />
            تعديل
          </Button>
          <Button
            onClick={handleDelete}
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs bg-transparent hover:text-destructive cursor-pointer hover:bg-transparent text-muted-foreground shadow-none"
          >
            <Edit className="w-3 h-3 mr-1" />
            حذف
          </Button>
        </>
      </div>
    </>
  );
};

export default CommentContent;
