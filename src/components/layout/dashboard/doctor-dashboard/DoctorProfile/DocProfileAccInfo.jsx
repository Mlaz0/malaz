import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckCircle, Clock, AlertTriangle, Shield } from "lucide-react";
import formatDate from "@/utils/formatDate";

const DocProfileAccInfo = ({ doctorData }) => {
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
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <IconComponent className="h-4 w-4" />
        {config.text}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          معلومات الحساب
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Account Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">حالة الحساب</span>
          {getStatusBadge(doctorData?.doctorData?.currentStatus)}
        </div>

        {/* Status Message */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            رسالة الحالة
          </span>
          <span className="text-sm text-gray-600">
            {doctorData?.doctorData?.statusMessage}
          </span>
        </div>

        {/* Email Verification */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            حالة البريد الإلكتروني
          </span>
          <div className="flex items-center gap-2">
            {doctorData?.isEmailVerified ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                <CheckCircle className="h-3 w-3" />
                موثق
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                <AlertTriangle className="h-3 w-3" />
                غير موثق
              </span>
            )}
          </div>
        </div>

        {/* Reports Count */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            عدد البلاغات
          </span>
          <span className="text-sm text-gray-900">
            {doctorData?.doctorData?.reportsCount || 0}
          </span>
        </div>

        {/* Account ID */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">رقم الحساب</span>
          <span className="text-sm font-mono text-gray-600">
            {doctorData?._id}
          </span>
        </div>

        {/* Registration Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            تاريخ التسجيل
          </span>
          <span className="text-sm text-gray-600">
            {doctorData?.createdAt
              ? new Date(doctorData.createdAt).toLocaleDateString("ar-EG")
              : formatDate(doctorData?.createdAt)}
          </span>
        </div>

        {/* Available Sessions */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            عدد الجلسات المتاحة
          </span>
          <span className="text-sm text-gray-900">
            {doctorData?.doctorData?.availability?.length || 0}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocProfileAccInfo;
