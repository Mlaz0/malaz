import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Badge } from "lucide-react";

const DocProfileSpecializations = ({ doctorData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          التخصصات
        </CardTitle>
      </CardHeader>
      <CardContent>
        {doctorData?.doctorData?.specializations.length > 0 ? (
          <div className="space-y-3">
            {doctorData?.doctorData?.specializations.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background rounded-lg shadow-md"
              >
                <span className="font-medium">{spec.name}</span>
                <Badge className="text-primary"></Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-primary">لا يوجد تخصصات</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DocProfileSpecializations;
