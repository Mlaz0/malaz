import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDate, formatPrice, formatTime } from "@/utils/formatOperations";

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
      <Badge variant="secondary">{formatPrice(slot.price)}</Badge>
    </div>
  </div>
);

// const FeeItem = ({ fee }) => (
//   <div className="flex justify-between items-center p-2 bg-muted rounded text-sm">
//     <span>{fee.type}</span>
//     <span className="font-semibold">${fee.amount}</span>
//   </div>
// );

const DocProfilePracticeDetails = ({ fromAdmin, doctorData }) => {
  const availability = doctorData?.doctorData?.availability || [];
  // const sessionFees = doctorData?.doctorData?.sessionFee || [];

  console.log(availability);

  const freeAvailability = availability.filter(
    (slot) => slot.status !== "booked"
  );

  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          أوقات الحجز
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">الوقت المتاح</h4>
          {freeAvailability.length > 0 ? (
            <div className="space-y-2">
              {freeAvailability.map((slot) => (
                <TimeSlot key={slot?.id} slot={slot} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              لا يوجد مواعيد متاحة
            </p>
          )}
        </div>

        <Separator />
      </CardContent>
      {!fromAdmin && (
        <Button
          onClick={() => {
            navigate(`/doctors/slots/${doctorData?._id}`);
          }}
          className="flex-1 w-full  sm:w-60 mx-auto h-12 cursor-pointer btn-primary focus-ring group-hover:bg-primary/90 group-hover:scale-[1.02] transition-all"
        >
          <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          حجز موعد
        </Button>
      )}
    </Card>
  );
};

export default DocProfilePracticeDetails;
