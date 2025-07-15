import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmptyHandler = ({ handleOpenModal }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="p-12 rounded-2xl max-w-md mx-auto shadow-sm border ">
          <div className="w-20 h-20 bg-gradient-to-br  rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-primary" />
          </div>
          <p className="text-xl font-medium text-gray-700 mb-2">
            لم تنشر أي مقالات بعد
          </p>
          <p className="text-gray-500 mb-6">
            ابدأ بإنشاء مقالك الأول ومشاركة خبراتك
          </p>
          <Button
            onClick={handleOpenModal}
            className=" bg-primary cursor-pointer hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            إنشاء مقال جديد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyHandler;
