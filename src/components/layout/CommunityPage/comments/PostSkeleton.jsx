import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "./skeleton-wrapper";

const PostSkeleton = () => {
  return (
    <SkeletonWrapper>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className={"mb-6"}>
            <CardHeader className="pb-3">
              <div className="flex items-center  justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar skeleton */}
                  <Skeleton circle width={40} height={40} />
                  <div>
                    {/* Author name skeleton */}
                    <Skeleton width={100} height={16} />
                    {/* Time skeleton */}
                    <Skeleton width={70} height={12} />
                  </div>
                </div>
                {/* Menu button skeleton */}
                <Skeleton width={24} height={24} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Title skeleton */}
                <Skeleton width="75%" height={24} />

                {/* Content skeleton - multiple lines */}
                <div className="space-y-2">
                  <Skeleton count={3} height={16} />
                </div>

                {/* Image skeleton */}
                <Skeleton height={250} />

                <Separator />

                {/* Stats skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton width={120} height={16} />
                  <Skeleton width={60} height={16} />
                </div>

                <Separator />

                {/* Action buttons skeleton */}
                <div className="flex items-center justify-around py-1">
                  <Skeleton width={60} height={16} />
                  <Skeleton width={80} height={16} />
                  <Skeleton width={60} height={16} />
                  <Skeleton width={60} height={16} />
                </div>

                <Separator />

                {/* Comment section skeleton */}
                <div className="space-y-3">
                  {/* Add comment form skeleton */}
                  <div className="flex space-x-3">
                    <Skeleton circle width={32} height={32} />
                    <Skeleton width="80%" height={40} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </SkeletonWrapper>
  );
};

export default PostSkeleton;
