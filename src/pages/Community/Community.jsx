import CreatePost from "@/components/layout/CommunityPage/posts/CreatePost";
import PostList from "@/components/layout/CommunityPage/posts/PostList";
import { useGetAllPosts } from "@/hooks/Actions/posts/usePostsCurds";

const Community = () => {
  const { data } = useGetAllPosts();
  return (
    <main className="min-h-screen">
      <section className="w-full my-5 max-w-4xl mx-auto">
        <CreatePost />
        <PostList posts={data?.posts} />
      </section>
    </main>
  );
};

export default Community;
