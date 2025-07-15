"use client";
import { SimpleChart } from "@/components/admin.components/AdminChart";
import { StatsCards } from "@/components/admin.components/adminStatsCards";
import { Bell, Search, Download, Plus } from "lucide-react";

// مكون لوحة التحكم الرئيسية
const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* قسم الترحيب */}
      <div className="">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          مرحباً بعودتك، د. سارة! 👋
        </h1>
        <p className="text-muted-foreground">
          إليك ما يحدث في منصة الصحة النفسية اليوم.
        </p>
      </div>

      {/* بطاقات الإحصائيات */}
      <StatsCards />

      {/* الرسوم البيانية والأنشطة */}
      <SimpleChart />

      {/* الإجراءات السريعة */}
      <div className="card-modern  rounded-lg">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-primary">
            الإجراءات السريعة
          </h3>
          <p className="text-sm text-muted-foreground">
            المهام الإدارية الشائعة والاختصارات
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="h-20 flex-col space-y-2 focus-ring bg-transparent border border-input hover:bg-primary hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
              <Plus className="h-6 w-6" />
              <span>إضافة معالج</span>
            </button>
            <button className="h-20 flex-col space-y-2 focus-ring bg-transparent border border-input hover:bg-primary hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
              <Bell className="h-6 w-6" />
              <span>إرسال إشعار</span>
            </button>
            <button className="h-20 flex-col space-y-2 focus-ring bg-transparent border border-input hover:bg-primary hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
              <Download className="h-6 w-6" />
              <span>إنشاء تقرير</span>
            </button>
            <button className="h-20 flex-col space-y-2 focus-ring bg-transparent border border-input hover:bg-primary hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
              <Search className="h-6 w-6" />
              <span>البحث عن مستخدم</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
