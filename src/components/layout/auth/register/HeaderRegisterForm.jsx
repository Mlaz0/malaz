import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const HeaderRegisterForm = ({ isDoctor, handleDoctorToggle }) => {
  return (
    <CardHeader className="space-y-4 pb-6">
      <div className="text-center lg:text-right">
        <CardTitle className="text-3xl font-bold ">إنشاء حساب</CardTitle>
        <CardDescription className="text-gray-600 mt-2">
          املأ معلوماتك للبدء
        </CardDescription>
      </div>

      {/* Doctor Toggle */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Switch
          checked={isDoctor}
          onCheckedChange={handleDoctorToggle}
          className="data-[state=checked]:bg-primary"
        />
        <div className="flex flex-col text-right">
          <span className="font-medium text-gray-900">أنا طبيب</span>
          <span className="text-sm text-gray-600">
            فعل هذا الخيار إذا كنت تسجل كمختص في الرعاية الصحية
          </span>
        </div>
      </div>
    </CardHeader>
  );
};

export default HeaderRegisterForm;
