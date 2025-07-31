import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "./skeleton-wrapper";

const DoctorCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <Card className="group relative overflow-hidden transition-all duration-300 border-0 shadow-md bg-card">
        {/* Animated background gradient skeleton */}
        <div className="absolute inset-0 bg-gray-100 opacity-20" />

        <CardHeader className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              {/* Avatar skeleton */}
              <Skeleton circle width={64} height={64} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-2 w-full">
                  {/* Name skeleton */}
                  <Skeleton width="70%" height={24} />

                  {/* Rating skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Skeleton circle width={16} height={16} />
                      <Skeleton width={30} height={16} />
                    </div>
                    <Skeleton width={70} height={16} />
                  </div>

                  {/* Experience skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton circle width={16} height={16} />
                    <Skeleton width={100} height={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          <div className="space-y-4">
            {/* Specializations skeleton */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} width={60} height={24} borderRadius={999} />
              ))}
            </div>

            {/* Session Fees skeleton */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton circle width={16} height={16} />
                <Skeleton width={90} height={16} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Skeleton circle width={12} height={12} />
                        <Skeleton width={50} height={12} />
                      </div>
                      <Skeleton width={40} height={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action buttons skeleton */}
            <div className="flex gap-3 pt-3">
              <Skeleton height={44} width="50%" />
              <Skeleton height={44} width="50%" />
            </div>
          </div>
        </CardContent>
      </Card>
    </SkeletonWrapper>
  );
};

const DoctorsGridSkeleton = () => {
  return (
    <SkeletonWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <Skeleton width={150} height={40} />
            <Skeleton width={120} height={40} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default DoctorsGridSkeleton;
