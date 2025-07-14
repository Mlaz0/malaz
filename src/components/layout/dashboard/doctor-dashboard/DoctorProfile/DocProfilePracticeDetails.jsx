import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign } from "lucide-react";

const DocProfilePracticeDetails = ({ doctorData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    التفاصيل
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">الوقت المتاح</h4>
                    {doctorData?.doctorData?.availability.length > 0 ? (
                        <div className="space-y-2">
                            {doctorData?.doctorData?.availability.map((slot, index) => (
                                <Badge key={index} variant="outline">
                                    {slot}
                                </Badge>
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
                    {doctorData?.doctorData?.sessionFee.length > 0 ? (
                        <div className="space-y-2">
                            {doctorData?.doctorData?.sessionFee.map((fee, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 bg-muted rounded"
                                >
                                    <span>{fee.type}</span>
                                    <span className="font-semibold">${fee.amount}</span>
                                </div>
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
