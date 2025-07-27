import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, MapPin, Star, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import DocProfileCertifications from "../layout/dashboard/doctor-dashboard/DoctorProfile/DocProfileCertifications";

const DoctorDetailsForSlots = ({ doctorData }) => {
  const navigate = useNavigate();

  if (!doctorData) return null;

  return (
    <>
      <Card className="w-full mb-8 p-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-6 w-6 text-primary" />
            تفاصيل الطبيب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={doctorData.userImg?.url || "/placeholder.svg"}
                  alt={doctorData.name}
                />
                <AvatarFallback className="text-lg">
                  {doctorData.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">{doctorData.name}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {doctorData.doctorData?.specializations?.map((spec) => (
                    <Badge key={spec.id} variant="outline">
                      {spec.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorData.doctorData?.yearsOfExperience && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {doctorData.doctorData.yearsOfExperience} سنوات خبرة
                    </span>
                  </div>
                )}

                {doctorData.doctorData?.ratingNumber > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {doctorData.doctorData.ratingNumber} (
                      {doctorData.doctorData.ratingCount} تقييم)
                    </span>
                  </div>
                )}
              </div>

              {doctorData.doctorData?.bio && (
                <div>
                  <h4 className="font-medium mb-2">نبذة عن الطبيب</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {doctorData.doctorData.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <Button
          onClick={() => {
            navigate(`/doctors/details/${doctorData?._id}`);
          }}
          variant="secondary"
          className="flex-1 h-12 w-[200px]  my-2 py-3 ml-auto mr-auto md:mr-auto md:ml-0 cursor-pointer group-hover:scale-[1.02] transition-all"
        >
          <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          الملف الشخصي
        </Button>
      </Card>
    </>
  );
};

export default DoctorDetailsForSlots;
