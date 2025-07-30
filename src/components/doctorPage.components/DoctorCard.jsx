import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, User, Clock, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardHeader className={`p-6`}>
        <div className={`flex items-start gap-4`}>
          <div className="relative">
            <Avatar className="h-16 w-16 group-hover:scale-110 transition-transform duration-300">
              <AvatarImage
                src={doctor.userImg?.url || "/placeholder.svg"}
                alt={doctor.name}
                className="group-hover:brightness-110 transition-all"
              />
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                  {doctor.name}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                  {doctor.doctorData?.specializations
                    ?.map((spec) => spec.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`p-6`}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {doctor.doctorData?.specializations?.map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs text-white group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-colors"
              >
                {specialty.name}
              </Badge>
            ))}
          </div>

          {/* Session Fees */}
          {doctor.doctorData?.sessionFee &&
            doctor.doctorData.sessionFee.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Banknote className="h-4 w-4" />
                  <span>أسعار الجلسات</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {doctor.doctorData.sessionFee.map((session, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1 text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                    >
                      <Clock className="h-3 w-3" />
                      <span>
                        {session.duration === "30m" ? "30 دقيقة" : "ساعة واحدة"}
                      </span>
                      <span className="font-semibold">
                        {session.price} جنيه
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => {
                navigate(`/doctors/slots/${doctor?._id}`);
              }}
              className="flex-1 h-12 cursor-pointer btn-primary focus-ring group-hover:bg-primary/90 group-hover:scale-[1.02] transition-all"
            >
              <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              حجز موعد
            </Button>

            <Button
              onClick={() => {
                navigate(`/doctors/details/${doctor?._id}`);
              }}
              variant="outline"
              className="flex-1 h-12 cursor-pointer  focus-ring  group-hover:scale-[1.02] transition-all"
            >
              <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              الملف الشخصي
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
