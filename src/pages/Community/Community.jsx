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
import { cn } from "@/lib/utils";

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

  // Check if user is authenticated
  const isAuthenticated = token && user?.role;

  // Get posts based on user role
  const posts = data?.data?.data?.posts || [];

  return (
    <main className="min-h-screen">
      <section className="w-full my-5 max-w-4xl mx-auto">
        {/* Loading state */}
        {isPending ? (
          <PostSkeleton />
        ) : (
          <>
            {/* Content based on user role */}
            {isAuthenticated ? (
              <>
                {user?.role === "patient" && <CreatePost />}
                <PostList posts={posts} />
              </>
            ) : (
              <NoPosts />
            )}

            {/* Pagination */}
            {posts.length > 0 && (
              <Pagination className="mt-4" disabled={isPending}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer bg-card shadow hover:text-white"
                      )}
                      onClick={() => handlePagination(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        className={cn(
                          "cursor-pointer bg-card shadow hover:text-white",
                          currentPage === i + 1 && "bg-primary text-white"
                        )}
                        isActive={currentPage === i + 1}
                        onClick={() => handlePagination(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        "cursor-pointer bg-card shadow hover:text-white"
                      )}
                      onClick={() => handlePagination(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Community;
