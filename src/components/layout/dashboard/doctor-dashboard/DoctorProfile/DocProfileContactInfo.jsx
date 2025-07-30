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
        {/* Bio Section */}
        {doctorData?.doctorData?.bio && (
          <div className="flex items-start gap-3">
            <User2Icon className="h-4 w-4 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-sm mb-1">نبذة عن الطبيب</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {doctorData?.doctorData?.bio}
              </p>
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </span>
            <p className="text-gray-900">{doctorData?.email}</p>
          </div>
        </div>

        {/* Phone */}
        {!fromPatient && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-primary" />
            <div>
              <span className="text-sm font-medium text-gray-700">
                رقم الهاتف
              </span>
              <p className="text-gray-900">{doctorData?.phone}</p>
            </div>
          </div>
        )}

        {/* Clinic Location */}
        {!fromPatient && (
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <span className="text-sm font-medium text-gray-700">
                موقع العيادة
              </span>
              <p className="text-gray-900">
                {doctorData?.doctorData?.clinicLocation || "غير محدد"}
              </p>
            </div>
          </div>
        )}

        {/* Date of Birth */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-medium text-gray-700">
              تاريخ الميلاد
            </span>
            <p className="text-gray-900">
              {doctorData?.dateOfBirth
                ? new Date(doctorData.dateOfBirth).toLocaleDateString("ar-EG")
                : formatDate(doctorData?.dateOfBirth)}
            </p>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-primary" />
          <div>
            <span className="text-sm font-medium text-gray-700">الجنس</span>
            <p className="text-gray-900">
              {doctorData?.gender === "male"
                ? "ذكر"
                : doctorData?.gender === "female"
                ? "أنثى"
                : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocProfileContactInfo;
