import { Star, User } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export function DoctorReviews({ reviews, ratingCount, ratingNumber }) {
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews?.forEach((review) => {
    ratingDistribution[5 - review.rating]++;
  });

  return (
    <div className="   p-6 ">
      <h2 className="text-2xl font-bold text-primary mb-6">آراء المرضى</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/*  =================================== */}
        <div className=" p-6 bg-card rounded-xl shadow-sm flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">
              التقييم العام
            </h3>
            <span className="text-sm text-gray-500">{ratingCount} تقييمات</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {ratingNumber?.toFixed(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= Math.round(ratingNumber)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">من 5 نجوم</p>
            </div>
          </div>
        </div>

        {/*  =================================== */}
        <div className=" p-6 bg-card rounded-xl shadow-sm flex-1">
          <h3 className="text-lg font-semibold text-primary mb-4">
            توزيع التقييمات
          </h3>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center w-10">
                  <span className="text-sm mr-1">{stars}</span>
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                </div>

                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (ratingDistribution[5 - stars] / ratingCount) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                <span className="text-sm text-gray-600 w-8 text-left">
                  {ratingDistribution[5 - stars]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  =================================== */}
      <div className="space-y-6 bg-card px-6 py-4 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-primary">أحدث التقييمات</h3>
          {reviews?.length > 3 && (
            <button className="text-primary text-sm font-medium">
              عرض الكل
            </button>
          )}
        </div>

        {reviews?.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">لا توجد تقييمات حتى الآن</p>
          </div>
        ) : (
          <div className="grid  md:grid-cols-2 gap-4">
            {reviews?.slice(0, 4).map((review) => (
              <div
                key={review.createdAt}
                className="rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User size={20} className="text-gray-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(review?.createdAt), "dd MMM yyyy", {
                        locale: ar,
                      })}
                    </span>
                  </div>
                </div>

                {review?.comment && (
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {review?.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
