import CreatePost from "@/components/layout/CommunityPage/posts/CreatePost";

const Community = () => {
  return (
    <main className="min-h-screen">
      <section className="w-full my-5 max-w-4xl mx-auto">
        <CreatePost />
      </section>
    </main>
  );
};

export default Community;
