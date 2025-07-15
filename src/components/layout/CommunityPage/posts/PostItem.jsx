import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDeletePost } from "@/hooks/Actions/posts/usePostsCurds";
import useUserAuth from "@/hooks/Actions/users/useUserAuth";
import formatDate from "@/utils/formatDate";
import { useState } from "react";
import CommentList from "../comments/CommentList";
import { EditPostModal } from "./EditPostModal";
import PostBtnAction from "./PostBtnAction";
import PostDetails from "./PostDetails";

import isArabic from "@/utils/IsArabic";
import { Link } from "react-router-dom";
import userImg from "../../assets/images/user-img.svg";

const PostItem = ({ post }) => {
  const { data: user } = useUserAuth();
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
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/profile/${post?.owner?._id}`}>
                <Avatar>
                  <AvatarImage
                    src={post?.owner?.image?.secure_url || userImg}
                    alt={post?.owner?.userName}
                  />
                  <AvatarFallback>
                    {post?.owner?.userName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="font-semibold  capitalize">
                  {post?.owner?.userName}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(post?.createdAt)}
                </p>
              </div>
            </div>
            {user?.user?._id === post.owner?._id && (
              <PostBtnAction
                post={post}
                isPendingDelete={isPendingDelete}
                handleDeletePost={handleDeletePost}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4">
          <div className="space-y-3">
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
            {/* Post Images */}
            {post?.images?.length > 0 && (
              <div
                className={
                  post.images.length === 1
                    ? "flex justify-center my-4"
                    : "grid grid-cols-2 gap-4 my-4"
                }
              >
                {post?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={
                      post.images.length === 1 ? "" : "flex justify-center"
                    }
                  >
                    <img
                      src={image.secure_url}
                      alt={`${post.title || "Post"} image ${index + 1}`}
                      className="w-full max-w-md rounded-lg object-cover shadow-md"
                      loading={"lazy"}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                        e.currentTarget.alt = "Image failed to load";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            <PostDetails post={post} />
            <CommentList comments={post.comments} postId={post._id} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PostItem;
