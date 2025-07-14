
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, User } from "lucide-react";

export const DoctorCard = ({
  doctor,
}) => {
  console.log(doctor);
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
                {doctor.name.split(" ").map((n) => n[0]).join("")}
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
                  {doctor.doctorData?.specializations?.map((spec) => spec.name).join(", ")}

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
                className="text-xs group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-colors"
              >
                {specialty.name}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{doctor.doctorData?.clinicLocation || "غير محدد"}</span>
            </div>
          </div>



          <div className="flex gap-2 pt-2">
            <Button className="flex-1 h-12 cursor-pointer btn-primary focus-ring group-hover:bg-primary/90 group-hover:scale-[1.02] transition-all">
              <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              حجز موعد
            </Button>

            <Button variant="outline" className="flex-1 h-12 cursor-pointer  focus-ring  group-hover:scale-[1.02] transition-all">
              <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />

              الملف الشخصي
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};