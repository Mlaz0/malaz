import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import formatDate from "@/utils/formatDate";
import isArabic from "@/utils/IsArabic";
import { Link } from "react-router-dom";
import userImg from "../../../../assets/user-img.svg";

const PostItem = ({ post }) => {
  // const { data: user } = useUserAuth();
  // const [, setSelectedPost] = useState(null);
  // const { mutate: deletePost, isPending: isPendingDelete } = useDeletePost();

  // /* Controller for Box Model */
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [currentPost, setCurrentPost] = useState(null);

  // const handleDeletePost = (post) => {
  //   setSelectedPost(post?._id);
  //   deletePost({ id: post?._id });
  // };
  // const handleEdit = (post) => {
  //   setCurrentPost(post);
  //   setIsEditModalOpen(true);
  // };

  return (
    <>
      {/* {currentPost && (
        <EditPostModal
          post={currentPost}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )} */}

      {/* Post Card */}
      <Card className={"relative"}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/profile/${post?.owner?._id}`}>
                <Avatar>
                  <AvatarImage
                    src={post?.author?.image?.secure_url || userImg}
                    alt={post?.author?.author_name}
                  />
                  <AvatarFallback>
                    {post?.author?.author_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="font-semibold  capitalize">
                  {post?.author?.author_name}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(post?.createdAt)}
                </p>
              </div>
            </div>
            {/* {user?.user?._id === post.owner?._id && (
              <PostBtnAction
                post={post}
                isPendingDelete={isPendingDelete}
                handleDeletePost={handleDeletePost}
                handleEdit={handleEdit}
              />
            )} */}
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
            <span
              className={`bg-primary/50 text-white text-sm font-medium px-3 py-1 rounded-lg absolute top-2 left-2 z-10  shadow-md backdrop-blur-sm transition-all hover:bg-primary/70   `}
            >
              {post?.category?.category_name || "بدون تصنيف"}
            </span>

            {/* <PostDetails post={post} />
            <CommentList comments={post.comments} postId={post._id} /> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PostItem;
