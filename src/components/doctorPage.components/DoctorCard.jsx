import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  Banknote,
  Star,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] border-0 shadow-md bg-card">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      <CardHeader className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-white/50 group-hover:ring-primary/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <AvatarImage
                src={doctor.userImg?.url}
                alt={doctor.name}
                className="group-hover:brightness-110 transition-all duration-300"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  {doctor.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-foreground">
                      {doctor.doctorData.ratingNumber}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">
                    ({doctor.doctorData.ratingCount} تقييم)
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{doctor.doctorData.yearsOfExperience} سنوات خبرة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <div className="space-y-4">
          {/* Specializations */}
          <div className="flex flex-wrap gap-2">
            {doctor.doctorData?.specializations?.map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-primary/20 text-primary border border-primary/20 group-hover:scale-105 transition-all duration-200 font-medium"
              >
                {specialty.name}
              </Badge>
            ))}
          </div>

          {doctor.doctorData?.sessionFee &&
            doctor.doctorData.sessionFee.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Banknote className="h-4 w-4 text-green-600" />
                  <span>أسعار الجلسات</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.doctorData.sessionFee.map((session, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 group-hover:shadow-md group-hover:border-green-300 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-green-700">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs font-medium">
                            {session.duration === "30m" ? "30 دقيقة" : "ساعة"}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-green-800">
                          {session.price} ج.م
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="flex gap-3 pt-3">
            <Button
              onClick={() => navigate(`/doctors/slots/${doctor?._id}`)}
              className="flex-1 h-11 bg-primary text-white font-semibold group-hover:scale-[1.02] group-hover:shadow-lg transition-all duration-200 border-0"
            >
              <Calendar className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
              حجز موعد
            </Button>

            <Button
              onClick={() => navigate(`/doctors/details/${doctor?._id}`)}
              variant="outline"
              className="flex-1 h-11 border-2 border-gray-200 hover:border-primary hover:bg-primary text-foreground hover:text-white font-semibold group-hover:scale-[1.02] transition-all duration-200"
            >
              <User className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
              الملف الشخصي
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
