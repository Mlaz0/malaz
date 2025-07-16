import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useChargeWallet,
  useGetUserPayment,
} from "@/hooks/Actions/payment/useCurdsPayment";
import WalletHistoryTable from "@/components/layout/dashboard/user-dashboard/UserWalletPage/WalletHistoryTable";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

export default function UserWalletPage() {
  const { data: userData } = useGetUserProfile();
  console.log(userData);
  const [depositAmount, setDepositAmount] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const { mutate } = useChargeWallet();

  const { data: payments, isPending } = useGetUserPayment();

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg("من فضلك أدخل مبلغ إيداع صالح.");
      return;
    }

    mutate(
      {
        data: {
          amount,
        },
      },
      {
        onSuccess: (data) => {
          window.location.href = data?.data?.data?.sessionUrl;
          setDepositAmount("");
        },
        onError: (error) => {
          setErrorMsg(error?.response?.data?.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          محفظة المستخدم
        </h1>

        <Card className="shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              <span className="mx-1"> رصيد المحفظة</span>
              <span className="text-2xl font-bold">
                {userData?.walletBalance.toFixed(2)} جنيه
              </span>
            </CardTitle>
          </CardHeader>
          {errorMsg && (
            <p className="text-destructive text-center">{errorMsg}</p>
          )}
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Input
              type="number"
              placeholder="أدخل مبلغ الإيداع"
              value={depositAmount}
              onChange={(e) =>
                setDepositAmount(e.target.value) || setErrorMsg("")
              }
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Button
              onClick={handleDeposit}
              className="px-6 cursor-pointer py-2 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              إيداع
            </Button>
          </CardContent>
        </Card>

        {/* جدول العمليات */}
        <Card className="shadow-md  rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold   ">
              سجل العمليات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WalletHistoryTable payments={payments} isPending={isPending} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
