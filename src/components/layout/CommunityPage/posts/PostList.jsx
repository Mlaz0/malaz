import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts?.map((post, index) => (
        <PostItem key={post?._id} post={post} index={index} />
      ))}
    </div>
  );
};

export default PostList;
