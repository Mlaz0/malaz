import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <PostItem key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
