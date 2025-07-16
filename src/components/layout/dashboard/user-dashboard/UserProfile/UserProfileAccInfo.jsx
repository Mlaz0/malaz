import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import formatDate from "@/utils/formatDate";

const UserProfileAccInfo = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          معلومات الحساب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">رقم الحساب:</span>
            <span className="ml-2 font-mono text-muted-foreground">
              {userData?._id}
            </span>
          </div>
          <div>
            <span className="font-medium">تاريخ الاضافة:</span>
            <span className="ml-2">{formatDate(userData?.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileAccInfo;
