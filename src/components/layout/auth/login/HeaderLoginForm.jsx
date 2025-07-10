import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HeaderLoginForm = () => {
  return (
    <CardHeader className="space-y-4 pb-6">
      <div className="text-center lg:text-right">
        <CardTitle className="text-3xl font-bold text-gray-900">
          سجل دخول
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2">
          املأ معلوماتك للبدء
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export default HeaderLoginForm;
