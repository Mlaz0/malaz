import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Badge, Clock, Star } from "lucide-react";

const DocProfileSpecializations = ({ doctorData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          المؤهلات المهنية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Specializations */}
        <div>
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            التخصصات
          </span>
          {doctorData?.doctorData?.specializations?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {doctorData.doctorData.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                >
                  {spec.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">لا توجد تخصصات</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-medium text-gray-700">
              سنوات الخبرة
            </span>
            <p className="text-gray-900">
              {doctorData?.doctorData?.yearsOfExperience || 0} سنوات
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <Star className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-medium text-gray-700">التقييم</span>
            <p className="text-gray-900">
              {doctorData?.doctorData?.ratingNumber?.toFixed(1) || "0.0"} (
              {doctorData?.doctorData?.ratingCount || 0} تقييم)
            </p>
          </div>
        </div>

        {/* Suggested Categories */}
        {doctorData?.doctorData?.suggestedCategory?.length > 0 && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              التصنيفات المقترحة
            </span>
            <div className="flex flex-wrap gap-2">
              {doctorData.doctorData.suggestedCategory.map(
                (category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {category}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocProfileSpecializations;
