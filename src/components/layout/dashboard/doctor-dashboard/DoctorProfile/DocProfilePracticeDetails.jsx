import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, Calendar } from "lucide-react";
import formatDate from "@/utils/formatDate";

const formatTime = (timeString) => {
  if (!timeString) return "";
  try {
    const time = timeString.split("T")[1].split(".")[0];
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "مساءً" : "صباحاً";
    return `${hour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "EGP",
  }).format(price);
};

const TimeSlot = ({ slot }) => (
  <div className="flex justify-between items-center p-2 bg-muted rounded text-sm gap-4">
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-blue-600" />
      <span>{formatDate(slot.date)}</span>
    </div>

    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-green-600" />
      <span>
        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <DollarSign className="h-4 w-4 text-orange-600" />
      <Badge variant="secondary">{formatPrice(slot.price)}</Badge>
    </div>
  </div>
);

const FeeItem = ({ fee }) => (
  <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
    <span>{fee.type}</span>
    <span className="font-semibold">${fee.amount}</span>
  </div>
);

const DocProfilePracticeDetails = ({ doctorData }) => {
  const availability = doctorData?.doctorData?.availability || [];
  const sessionFees = doctorData?.doctorData?.sessionFee || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          التفاصيل
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">الوقت المتاح</h4>
          {availability.length > 0 ? (
            <div className="space-y-2">
              {availability.map((slot) => (
                <TimeSlot key={slot?.id} slot={slot} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لا يوجد توفر</p>
          )}
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            الرسوم
          </h4>
          {sessionFees.length > 0 ? (
            <div className="space-y-2">
              {sessionFees.map((fee, index) => (
                <FeeItem key={index} fee={fee} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لا يوجد رسوم</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocProfilePracticeDetails;
