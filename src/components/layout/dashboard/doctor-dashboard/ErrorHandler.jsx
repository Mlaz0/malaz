import { Button } from "@/components/ui/button";

const ErrorHandler = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          مقالاتي
        </h1>
        <div className="bg-white border border-red-100 text-red-600 p-8 rounded-2xl max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium mb-4">حدث خطأ أثناء جلب المقالات</p>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-transparent"
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
