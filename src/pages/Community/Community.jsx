import CreatePost from "@/components/layout/CommunityPage/posts/CreatePost";
import NoPosts from "@/components/layout/CommunityPage/posts/NoPosts";
import PostList from "@/components/layout/CommunityPage/posts/PostList";
import { useAuth } from "@/context/AuthContext";
import { useGetAllPosts } from "@/hooks/Actions/posts/usePostsCurds";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PostSkeleton from "@/components/Skeleton/PostSkeleton";

const Community = () => {
  const { user, token } = useAuth();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isPending } = useGetAllPosts(page, limit);
  const currentPage = data?.data?.data?.currentPage || 1;
  const totalPages = data?.data?.data?.totalPages || 1;

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <main className="min-h-screen">
      <section className="w-full my-5 max-w-4xl mx-auto">
        {user?.role === "patient" && token ? (
          <>
            <CreatePost />
            <PostList posts={data?.data?.data?.posts} />
          </>
        ) : user?.role === "doctor" && token ? (
          <>
            <PostList posts={data?.data?.data?.posts} />
          </>
        ) : (
          <NoPosts />
        )}
        {isPending ? (
          <PostSkeleton />
        ) : (
          <Pagination className="mt-4" disabled={isPending}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePagination(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </main>
  );
};

export default Community;
