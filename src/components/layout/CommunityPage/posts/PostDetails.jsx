import { Separator } from "@/components/ui/separator";
import { usePatchLikePost } from "@/hooks/Actions/posts/usePostsCurds";
import useUserAuth from "@/hooks/Actions/users/useUserAuth";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import PostLikesModal from "./PostLikesModal";

const PostDetails = ({ post }) => {
  const { data: user } = useUserAuth();
  const { mutate, isPending } = usePatchLikePost();
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const isLiked = post?.likes?.some((like) => like._id === user?.user?._id);

  const [liked, setLiked] = useState(isLiked || false);

  const handleShowLikesModal = (post) => {
    setSelectedPost(post);
    setShowLikesModal(true);
  };

  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    setLiked(isLiked || false);
  }, [isLiked]);

  const handleLike = () => {
    const action = liked ? "unlike" : "like";
    const likeUrl = `/posts/${post._id}/like?action=${action}`;

    setLiked((prev) => !prev);

    mutate(
      {
        url: likeUrl,
        data: {},
      },
      {
        onError: () => {
          setLiked((prev) => !prev);
        },
      }
    );
  };

  return (
    <>
      <Separator />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>{post?.comments?.length || 0} comments</span>
          <span
            className={` ${
              post?.likes?.length > 0
                ? "cursor-pointer"
                : "pointer-events-none opacity-50 cursor-not-allowed"
            }`}
            onClick={() => handleShowLikesModal(post)}
          >
            {post?.likes?.length || 0} likes
          </span>
        </div>
        <span>0 shares</span>
      </div>
      <Separator />
      <div className="flex items-center justify-around py-1">
        {/* Like Button */}
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-transparent text-dark shadow-none hover:bg-transparent hover:text-destructive cursor-pointer"
          onClick={handleLike}
          disabled={isPending}
        >
          <Heart
            className={`w-4 h-4 mr-2 hover:drop-shadow-2xl transition-colors ${
              liked
                ? "text-destructive fill-destructive"
                : "text-muted-foreground"
            }`}
          />
          Like
        </Button>

        {/* Comment Button */}
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-transparent hover:bg-transparent text-muted-foreground shadow-none hover:text-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Comment
        </Button>

        {/* Share Button - Hidden on mobile */}
        <Button
          variant="default"
          size="sm"
          className="flex-1 hidden bg-transparent lg:flex hover:bg-transparent text-muted-foreground shadow-none hover:text-success transition-colors"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>

        {/* Save Button - Hidden on mobile */}
        <Button
          variant="default"
          size="sm"
          className="flex-1 hidden lg:flex bg-transparent hover:bg-transparent text-muted-foreground shadow-none hover:text-yellow-600 transition-colors"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
      <Separator />
      {/* Post Likes Modal */}
      <PostLikesModal
        isOpen={showLikesModal}
        onClose={handleCloseLikesModal}
        post={selectedPost}
      />
    </>
  );
};

export default PostDetails;

/* ========================================= */

// import { Separator } from "@/components/ui/separator";
// import { usePatchLikePost } from "@/hooks/Actions/posts/usePostsCurds";
// import useUserAuth from "@/hooks/Actions/users/useUserAuth";
// import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
// import { useState } from "react";
// import { Button } from "../ui/button";

// const PostDetails = ({ post }) => {
//   const { data: user } = useUserAuth();
//   const [liked, setLiked] = useState(false);
//   const { mutate, isPending } = usePatchLikePost();

//   const handleLike = () => {
//     const action = liked ? "unlike" : "like";
//     const likeUrl = `/posts/${post._id}/like?action=${action}`;

//     mutate(
//       {
//         url: likeUrl,
//         data: {},
//       },
//       {
//         onSuccess: () => {
//           setLiked((prev) => !prev);
//         },
//       }
//     );
//   };

//   return (
//     <>
//       <Separator />
//       <div className="flex items-center justify-between text-sm text-gray-500">
//         <div className="flex items-center space-x-2">
//           <span>{post?.comments?.length} comments</span>
//           <span>{post?.likes?.length} likes</span>
//         </div>
//         <span> shares</span>
//       </div>
//       <Separator />
//       <div className="flex items-center justify-around py-1">
//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 bg-transparent text-dark shadow-none hover:bg-transparent  hover:text-destructive cursor-pointer"
//           onClick={handleLike}
//           disabled={isPending}
//         >
//           <Heart
//             className={`w-4 h-4 mr-2 hover:drop-shadow-2xl  ${
//               post?.likes?.some((like) => like._id === user?.user?._id)
//                 ? "text-destructive fill-destructive"
//                 : ""
//             }`}
//           />
//         </Button>

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 bg-transparent hover:bg-transparent text-muted-foreground shadow-none "
//         >
//           <MessageCircle className="w-4 h-4 mr-2" />
//           Comment
//         </Button>

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 hidden bg-transparent lg:flex hover:bg-transparent text-muted-foreground shadow-none  "
//         >
//           <Share2 className="w-4 h-4 mr-2" />
//           Share
//         </Button>

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 hidden lg:flex bg-transparent hover:bg-transparent text-muted-foreground shadow-none "
//         >
//           <Bookmark className="w-4 h-4 mr-2" />
//           Save
//         </Button>
//       </div>
//       <Separator />
//     </>
//   );
// };

// export default PostDetails;

/* ========================================= */

// import { Separator } from "@/components/ui/separator";
// import { usePatchLikePost } from "@/hooks/Actions/posts/usePostsCurds";
// import useUserAuth from "@/hooks/Actions/users/useUserAuth";
// import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";

// const PostDetails = ({ post }) => {
//   const { data: user } = useUserAuth();
//   const { mutate, isPending } = usePatchLikePost();

//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);

//   useEffect(() => {
//     setLiked(post?.likes?.some((like) => like._id === user?.user?._id));
//     setLikesCount(post?.likes?.length || 0);
//   }, [post?.likes, user?.user?._id]);

//   const handleLike = () => {
//     const likeUrl = `/posts/${post._id}/like?action=like`;
//     mutate(
//       { url: likeUrl, data: {} },
//       {
//         onSuccess: () => {
//           setLiked(true);
//           setLikesCount((prev) => prev + 1);
//         },
//       }
//     );
//   };

//   const handleUnlike = () => {
//     const unlikeUrl = `/posts/${post._id}/like?action=unlike`;
//     mutate(
//       { url: unlikeUrl, data: {} },
//       {
//         onSuccess: () => {
//           setLiked(false);
//           setLikesCount((prev) => prev - 1, 0);
//         },
//       }
//     );
//   };

//   return (
//     <>
//       <Separator />
//       <div className="flex items-center justify-between text-sm text-gray-500">
//         <div className="flex items-center space-x-2">
//           <span>{post?.comments?.length} comments</span>
//           <span>{likesCount} likes</span>
//         </div>
//         <span>shares</span>
//       </div>
//       <Separator />

//       <div className="flex items-center justify-around py-1">
//         {liked ? (
//           <Button
//             variant="default"
//             size="sm"
//             className="flex-1 bg-transparent text-destructive shadow-none hover:bg-transparent hover:text-destructive cursor-pointer"
//             onClick={handleUnlike}
//             disabled={isPending}
//           >
//             <Heart className="w-4 h-4 mr-2 text-destructive fill-destructive" />
//           </Button>
//         ) : (
//           <Button
//             variant="default"
//             size="sm"
//             className="flex-1 bg-transparent text-dark shadow-none hover:bg-transparent hover:text-destructive cursor-pointer"
//             onClick={handleLike}
//             disabled={isPending}
//           >
//             <Heart className="w-4 h-4 mr-2" />
//           </Button>
//         )}

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 bg-transparent hover:bg-transparent text-muted-foreground shadow-none "
//         >
//           <MessageCircle className="w-4 h-4 mr-2" />
//           Comment
//         </Button>

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 hidden bg-transparent lg:flex hover:bg-transparent text-muted-foreground shadow-none  "
//         >
//           <Share2 className="w-4 h-4 mr-2" />
//           Share
//         </Button>

//         <Button
//           variant="default"
//           size="sm"
//           className="flex-1 hidden lg:flex bg-transparent hover:bg-transparent text-muted-foreground shadow-none "
//         >
//           <Bookmark className="w-4 h-4 mr-2" />
//           Save
//         </Button>
//       </div>
//       <Separator />
//     </>
//   );
// };

// export default PostDetails;
