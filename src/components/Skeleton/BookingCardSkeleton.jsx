import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "./skeleton-wrapper";

const BookingCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 mb-6"
          >
            <CardContent className="p-6">
              {/* Header Skeleton */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <Skeleton width={80} height={24} borderRadius={9999} />
                  <Skeleton width={120} height={24} borderRadius={9999} />
                </div>
                <div className="text-right">
                  <Skeleton width={60} height={32} />
                  <Skeleton width={80} height={16} className="mt-1" />
                </div>
              </div>

              {/* Doctor Info Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="flex gap-4">
                  <Skeleton circle width={64} height={64} />
                  <div className="flex-1 space-y-2">
                    <Skeleton width={150} height={24} />
                    <Skeleton width={200} height={16} />
                    <div className="flex items-center gap-2">
                      <Skeleton width={16} height={16} />
                      <Skeleton width={120} height={16} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton width={60} height={24} borderRadius={4} />
                    <Skeleton width={80} height={24} borderRadius={4} />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Session Details Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-card rounded-lg">
                <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <Skeleton width={100} height={16} />
                </div>

                <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <Skeleton width={150} height={16} />
                </div>

                <div className="flex flex-col justify-center items-center shadow-sm border py-2 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <Skeleton width={60} height={16} />
                </div>
              </div>

              {/* Cancel Booking Skeleton */}
              <div className="mt-6 space-y-3">
                <Skeleton height={80} borderRadius={8} />
                <Skeleton
                  width={120}
                  height={40}
                  borderRadius={8}
                  className="ml-auto"
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </SkeletonWrapper>
  );
};

export default BookingCardSkeleton;
