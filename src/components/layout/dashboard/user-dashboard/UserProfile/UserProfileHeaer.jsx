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

const UserProfileHeaer = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={userData?.userImg?.url || "/placeholder.svg"}
              alt={userData?.name}
            />
            <AvatarFallback className="text-2xl">
              {userData?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">{userData?.name}</CardTitle>
            </div>

            <CardDescription className="text-base">
              {userData?.role === "patient" ? "مستخدم" : userData?.role}•
              {userData?.gender === "male"
                ? "ذكر"
                : userData?.gender === "female"
                ? "أنثى"
                : userData?.gender}{" "}
              • العمر {calculateAge(userData?.dateOfBirth)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserProfileHeaer;
