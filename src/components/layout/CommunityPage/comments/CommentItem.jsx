import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentContent from "./CommentContent";
import imgUser from "../../../../assets/user-img.svg";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import EditComment from "./EditComment";
import { usePatchComments } from "@/hooks/Actions/comments/useCommentsCurds";
const CommentItem = ({ comment, postId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = usePatchComments();

  const validationSchema = useMemo(() => {
    return Yup.object({
      text: Yup.string()
        .min(1)
        .max(2000)
        .trim()
        .required("Content is required"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      text: comment.text,
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        {
          data: { text: values.text },
          id: `/${comment._id}`,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <div className="flex flex-wrap   gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={comment?.author?.userImg?.url || imgUser}
          alt={comment?.author?.author_name}
        />
        <AvatarFallback>
          {comment?.author?.author_name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* comment content && edit */}
      <div className="flex-1">
        {isEditing ? (
          <EditComment
            formik={formik}
            handleCancel={handleCancel}
            isPending={isPending}
          />
        ) : (
          <>
            <CommentContent
              postId={postId}
              comment={comment}
              setIsEditing={setIsEditing}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
