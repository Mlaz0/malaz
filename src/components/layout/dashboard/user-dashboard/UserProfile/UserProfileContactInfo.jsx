import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import formatDate from "@/utils/formatDate";
import { Calendar, Mail, MapPin, Phone, User, User2Icon } from "lucide-react";

const UserProfileContactInfo = ({ userData }) => {
  return (
    <Card className={"border-0 shadow-none"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          معلومات الاتصال
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <span>{userData?.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-primary" />
          <span>{userData?.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>تاريخ الميلاد: {formatDate(userData?.dateOfBirth)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileContactInfo;
