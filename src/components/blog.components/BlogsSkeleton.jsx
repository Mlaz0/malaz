import { Card, CardContent, CardFooter } from "@/components/ui/card";

const BlogCardSkeleton = () => {
  return (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-white">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
        <div className="absolute top-3 right-3">
          <div className="h-8 w-8 bg-white/80 rounded-full animate-pulse" />
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-full" />
          <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-gray-50">
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
      </CardFooter>
    </Card>
  );
};

const BlogsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg" />
          <div className="h-10 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsSkeleton;
