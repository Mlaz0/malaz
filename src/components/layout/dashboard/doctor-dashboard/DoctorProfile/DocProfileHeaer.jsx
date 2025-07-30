import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import calculateAge from "@/utils/calcAge";
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const DocProfileHeaer = ({ doctorData }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        color: "bg-green-100 text-green-800",
        text: "موافق",
        icon: CheckCircle,
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        text: "في الانتظار",
        icon: Clock,
      },
      suspended: {
        color: "bg-red-100 text-red-800",
        text: "معلق",
        icon: AlertTriangle,
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    return (
      <Badge
        variant="default"
        className={`${config.color} hover:${config.color}`}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={doctorData?.userImg?.url || "/placeholder.svg"}
                alt={doctorData?.name}
              />
              <AvatarFallback className="text-2xl">
                {doctorData?.name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("") || "DR"}
              </AvatarFallback>
            </Avatar>
            {doctorData?.isEmailVerified && (
              <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">{doctorData?.name}</CardTitle>
              <div className="flex gap-2">
                {getStatusBadge(doctorData?.doctorData?.currentStatus)}
              </div>
            </div>

            <CardDescription className="text-base">
              {doctorData?.role === "doctor" ? "دكتور" : doctorData?.role}•
              {doctorData?.gender === "male"
                ? "ذكر"
                : doctorData?.gender === "female"
                ? "أنثى"
                : doctorData?.gender}{" "}
              • العمر {calculateAge(doctorData?.dateOfBirth)}
            </CardDescription>

            {/* Status Message */}
            {doctorData?.doctorData?.statusMessage && (
              <div className="text-sm text-gray-600">
                {doctorData.doctorData.statusMessage}
              </div>
            )}

            {/* Email */}
            <div className="text-sm text-gray-600">{doctorData?.email}</div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DocProfileHeaer;
