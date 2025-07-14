"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Calendar, Award, Users, Heart, MessageCircle } from "lucide-react";

export const DoctorCard = ({ 
  doctor, 
  viewMode, 
  favorites, 
  toggleFavorite 
}) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardHeader className={`${viewMode === "list" ? "w-1/3 p-6 border-r" : "p-6"}`}>
        <div className={`flex ${viewMode === "list" ? "flex-col items-center" : "items-start"} gap-4`}>
          <div className="relative">
            <Avatar className="h-16 w-16 group-hover:scale-110 transition-transform duration-300">
              <AvatarImage
                src={doctor.userImg?.url || "/placeholder.svg"}
                alt={doctor.name}
                className="group-hover:brightness-110 transition-all"
              />
              <AvatarFallback>
                {doctor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {doctor.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform duration-300"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                  {doctor.name}
                  {doctor.isEmailVerified && (
                    <Award className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform duration-500" />
                  )}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                  طبيب نفسي
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleFavorite(doctor._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-4 right-4 hover:bg-transparent"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(doctor._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  } group-hover:scale-125 transition-transform`}
                />
              </Button>
            </div>

            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(doctor.doctorData?.ratingNumber || 0)
                        ? "fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-transform"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {doctor.doctorData?.ratingNumber || 0}
              </span>
              <span className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
                ({doctor.doctorData?.ratingCount || 0} تقييمات)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`${viewMode === "list" ? "w-2/3 p-6" : "p-6"}`}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {doctor.doctorData?.specializations?.map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-colors"
              >
                {specialty.name}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              {
                icon: <Users className="h-4 w-4" />,
                text: `${doctor.doctorData?.yearsOfExperience || 0} سنوات خبرة`,
              },
              {
                icon: <MapPin className="h-4 w-4" />,
                text: doctor.doctorData?.clinicLocation || "غير محدد",
              },
              {
                icon: <Clock className="h-4 w-4" />,
                text: "متاح اليوم",
              },
              {
                text: doctor.doctorData?.sessionFee?.length
                  ? `${doctor.doctorData.sessionFee[0]} ج.م/جلسة`
                  : "السعر غير محدد",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 group-hover:text-primary transition-colors"
              >
                {item.icon}
                <span className="truncate">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="text-sm font-medium text-green-600 group-hover:text-green-500 transition-colors">
            متاح اليوم
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1 btn-primary focus-ring group-hover:bg-primary/90 group-hover:scale-[1.02] transition-all">
              <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              حجز موعد
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="focus-ring bg-transparent group-hover:border-primary/30 group-hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};