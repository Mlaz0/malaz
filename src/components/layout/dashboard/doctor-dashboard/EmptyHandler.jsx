import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmptyHandler = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          مقالاتي
        </h1>
        <div className="bg-white p-12 rounded-2xl max-w-md mx-auto shadow-sm border border-blue-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-xl font-medium text-gray-700 mb-2">
            لم تنشر أي مقالات بعد
          </p>
          <p className="text-gray-500 mb-6">
            ابدأ بإنشاء مقالك الأول ومشاركة خبراتك
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            إنشاء مقال جديد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyHandler;
