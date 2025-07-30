import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";

const EmptyAvalibility = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
      <CardContent className="py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              لا توجد أحداث بعد
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              استخدم النموذج أعلاه لإنشاء أول حدث لك
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <Plus className="h-4 w-4" />
            <span>ابدأ بإنشاء حدث جديد</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyAvalibility;
