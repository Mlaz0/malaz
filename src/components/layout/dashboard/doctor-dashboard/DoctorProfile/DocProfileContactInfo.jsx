import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import formatDate from "@/utils/formatDate";
import { Calendar, Mail, MapPin, Phone, User, User2Icon } from "lucide-react";

const DocProfileContactInfo = ({ doctorData, fromPatient }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          معلومات الاتصال
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User2Icon className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">
            {doctorData?.doctorData?.bio}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <span>{doctorData?.email}</span>
        </div>
        {!fromPatient && (
          <>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <span>{doctorData?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{doctorData?.doctorData?.clinicLocation}</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>تاريخ الميلاد: {formatDate(doctorData?.dateOfBirth)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocProfileContactInfo;
