import {
  CheckCircle2,
  CornerLeftDown,
  CornerLeftDownIcon,
  CornerUpLeft,
  CornerUpRightIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <Card className="w-full max-w-md border-0 text-center ">
        <CardHeader className="items-center space-y-0 pb-2">
          <CornerLeftDownIcon className="h-20 w-20 text-center block ms-auto  text-emerald-500  " />

          <CardTitle className="mt-6 text-3xl font-bold ">
            تم الدفع بنجاح
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8">
          <p className="text-center text-lg text-gray-600 leading-relaxed">
            تمت عملية الدفع بنجاح. سيتم إرسال تأكيد إلى بريدك الإلكتروني المسجل.
          </p>

          <div className="flex w-full flex-col space-y-4 rtl:space-x-reverse sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              className="w-full py-6 text-lg font-medium cursor-pointer"
              onClick={() => navigate("/patient-dashboard/wallet")}
            >
              الذهاب إلى المحفظة
            </Button>
          </div>

          <div className="pt-4 text-sm text-gray-400">
            شكراً لاستخدامك خدماتنا
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
