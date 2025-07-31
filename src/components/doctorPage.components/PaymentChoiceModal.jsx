import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

const PaymentChoiceModal = ({
  isOpen,
  onClose,
  onWalletPayment,
  onDirectPayment,
  slotPrice,
  walletBalance,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            اختر طريقة الدفع
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Price Display */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">سعر الجلسة</p>
            <p className="text-2xl font-bold text-green-600">
              {slotPrice} جنيه مصري
            </p>
          </div>

          {/* Wallet Payment Option */}
          <Button
            onClick={onWalletPayment}
            className="w-full h-16 text-lg"
            variant="outline"
            disabled={walletBalance < slotPrice}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-blue-600" />
                <span>الدفع من المحفظة</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">الرصيد المتاح</p>
                <p className="font-semibold">{walletBalance} جنيه</p>
              </div>
            </div>
          </Button>

          {/* Direct Payment Option */}
          <Button
            onClick={onDirectPayment}
            className="w-full h-16 text-lg"
            variant="outline"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>الدفع المباشر</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">بطاقة ائتمان</p>
                <p className="font-semibold">أو محفظة إلكترونية</p>
              </div>
            </div>
          </Button>

          {/* Warning if insufficient wallet balance */}
          {walletBalance < slotPrice && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 text-center">
                رصيد المحفظة غير كافي. يرجى اختيار الدفع المباشر أو شحن المحفظة.
              </p>
            </div>
          )}

          {/* Cancel Button */}
          <Button onClick={onClose} variant="ghost" className="w-full">
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentChoiceModal;
