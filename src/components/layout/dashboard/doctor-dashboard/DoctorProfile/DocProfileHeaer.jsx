import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import calculateAge from "@/utils/calcAge";
import { AlertCircle, CheckCircle } from "lucide-react";

const DocProfileHeaer = ({ doctorData }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage
                            src={doctorData?.userImg?.url || "/placeholder.svg"}
                            alt={doctorData?.name}
                        />
                        <AvatarFallback className="text-2xl">
                            {doctorData?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <CardTitle className="text-2xl">{doctorData?.name}</CardTitle>
                            <div className="flex gap-2">
                                {doctorData?.doctorData?.isApproved ? (
                                    <Badge
                                        variant="default"
                                        className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Approved
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    >
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        في انتظار الموافقة
                                    </Badge>
                                )}

                                {/* Is Email Verified */}
                                {/* {doctorData?.isEmailVerified ? (
              <Badge
                variant="default"
                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
              >
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-red-200 text-red-600"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Unverified
              </Badge>
            )} */}
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

                        {/* Rating */}
                        {/* <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < doctorData?.doctorData?.ratingNumber
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {doctorData?.doctorData?.ratingNumber > 0
              ? `${doctorData?.doctorData?.ratingNumber}/5 (${doctorData?.doctorData?.ratingCount} reviews)`
              : "No reviews yet"}
          </span>
        </div> */}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default DocProfileHeaer;
