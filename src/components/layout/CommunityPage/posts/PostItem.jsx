import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import formatDate from "@/utils/formatDate";
import isArabic from "@/utils/IsArabic";
import userImg from "../../../../assets/user-img.svg";
import CommentList from "../comments/CommentList";
import PostDetails from "./PostDetails";
import { useAuth } from "@/context/AuthContext";
import PostBtnAction from "./PostBtnAction";
import { useState } from "react";
import { useDeletePost } from "@/hooks/Actions/posts/usePostsCurds";
import { EditPostModal } from "./EditPostModal";

const PostItem = ({ post }) => {
  const { user } = useAuth();
  const [, setSelectedPost] = useState(null);
  const { mutate: deletePost, isPending: isPendingDelete } = useDeletePost();

  /* Controller for Box Model */
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleDeletePost = (post) => {
    setSelectedPost(post?._id);
    deletePost({ id: post?._id });
  };
  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  console.log(post);

  return (
    <>
      {currentPost && (
        <EditPostModal
          post={currentPost}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Post Card */}
      <Card className={"relative"}>
        {/* <span className="absolute top-2 left-2 z-10 bg-primary/50 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-md backdrop-blur-sm transition-all hover:bg-primary/70"></span> */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={post?.isAnonymous ? userImg : post?.author?.userImg?.url}
                  alt={post?.isAnonymous ? "مستخدم مجهول" : post?.author?.name}
                />
                <AvatarFallback>
                  {post?.isAnonymous
                    ? "مستخدم مجهول"
                    : post?.author?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-xl capitalize">
                  {post?.isAnonymous ? "مستخدم مجهول" : post?.author?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(post?.createdAt)}
                </p>
              </div>
            </div>
            {user?.id === post?.author?._id && (
              <PostBtnAction
                post={post}
                isPendingDelete={isPendingDelete}
                handleDeletePost={handleDeletePost}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 ">
          <div className="space-y-3 ">
            <h2
              className={`text-lg font-bold ${
                isArabic(post?.title) ? "rtl" : "ltr"
              }`}
            >
              {post?.title}
            </h2>
            <p
              className="text-muted-foreground dark:text-white overflow-hidden break-all"
              dir={isArabic(post?.content) ? "rtl" : "ltr"}
            >
              {post?.content}
            </p>
            {/* <span
              className={`bg-primary/50 text-white text-sm font-medium px-3 py-1 rounded-lg absolute top-2 left-2 z-10  shadow-md backdrop-blur-sm transition-all hover:bg-primary/70   `}
            >
              {post?.category?.category_name || "بدون تصنيف"}
            </span> */}

            <PostDetails post={post} />

            <CommentList comments={post.comments} postId={post._id} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PostItem;
