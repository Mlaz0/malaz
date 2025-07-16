import CreatePost from "@/components/layout/CommunityPage/posts/CreatePost";
import NoPosts from "@/components/layout/CommunityPage/posts/NoPosts";
import PostList from "@/components/layout/CommunityPage/posts/PostList";
import { useAuth } from "@/context/AuthContext";
import { useGetAllPosts } from "@/hooks/Actions/posts/usePostsCurds";

const Community = () => {
  const { user, token } = useAuth()
  const { data } = useGetAllPosts();
  return (
    <main className="min-h-screen">
      <section className="w-full my-5 max-w-4xl mx-auto">
        {
          user?.role === "patient" && token ? <>
            <CreatePost />
            <PostList posts={data?.posts} />

          </>
            : user?.role === "doctor" && token ? <>
              <PostList posts={data?.posts} />
            </>
              : <NoPosts />
        }
      </section>
    </main>
  );
};

export default Community;
