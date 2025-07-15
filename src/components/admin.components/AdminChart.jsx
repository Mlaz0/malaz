import { BarChart3 } from "lucide-react";

// مكون الرسم البياني البسيط
export const SimpleChart = () => (
  <div className="card-modern  rounded-lg">
    <div className="p-6 pb-3">
      <h3 className="text-lg font-semibold text-primary">
        نمو المستخدمين والمشاركة
      </h3>
      <p className="text-sm text-muted-foreground">
        نظرة عامة شهرية على تسجيلات المستخدمين وحجوزات الجلسات ونقاط العافية
      </p>
    </div>
    <div className="p-6 pt-0">
      <div className="h-[300px] flex items-center justify-center bg-gradient-secondary rounded-lg">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">سيتم عرض الرسم البياني هنا</p>
          <p className="text-sm text-muted-foreground mt-2">
            استبدل بمكتبة الرسوم البيانية المفضلة لديك
          </p>
        </div>
      </div>
    </div>
  </div>
);
