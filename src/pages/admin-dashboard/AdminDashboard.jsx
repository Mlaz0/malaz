"use client";
import {
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Heart,
  Brain,
  Bell,
  Search,
  Download,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
} from "lucide-react";

// إحصائيات البيانات
const stats = [
  {
    title: "إجمالي المستخدمين",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    description: "المستخدمون النشطون هذا الشهر",
  },
  {
    title: "جلسات اليوم",
    value: "156",
    change: "+8.2%",
    changeType: "positive",
    icon: Calendar,
    description: "جلسات العلاج المجدولة",
  },
  {
    title: "الرسائل",
    value: "1,234",
    change: "+23.1%",
    changeType: "positive",
    icon: MessageSquare,
    description: "الرسائل المتبادلة اليوم",
  },
  {
    title: "نقاط العافية",
    value: "87.3%",
    change: "+5.4%",
    changeType: "positive",
    icon: Heart,
    description: "متوسط عافية المستخدمين",
  },
  {
    title: "المعالجون النشطون",
    value: "89",
    change: "+2.1%",
    changeType: "positive",
    icon: Brain,
    description: "المعالجون المتصلون",
  },
  {
    title: "متوسط وقت الجلسة",
    value: "45د",
    change: "-3.2%",
    changeType: "negative",
    icon: Clock,
    description: "متوسط مدة الجلسة",
  },
  {
    title: "معدل الإكمال",
    value: "94.2%",
    change: "+1.8%",
    changeType: "positive",
    icon: CheckCircle,
    description: "معدل إكمال الجلسات",
  },
  {
    title: "معدل النمو",
    value: "15.7%",
    change: "+4.3%",
    changeType: "positive",
    icon: TrendingUp,
    description: "نمو المستخدمين الشهري",
  },
];

// بيانات الأنشطة الحديثة
const activities = [
  {
    id: 1,
    type: "session",
    user: "إيما طومسون",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "أكملت جلسة علاج",
    time: "منذ دقيقتين",
    status: "completed",
    icon: Calendar,
  },
  {
    id: 2,
    type: "message",
    user: "د. مايكل تشين",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "أرسل رسالة للمريض",
    time: "منذ 5 دقائق",
    status: "active",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "registration",
    user: "سارة ويلسون",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "سجلت كمريضة جديدة",
    time: "منذ 12 دقيقة",
    status: "new",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "wellness",
    user: "جيمس رودريغيز",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "حدث فحص العافية",
    time: "منذ 18 دقيقة",
    status: "wellness",
    icon: Heart,
  },
  {
    id: 5,
    type: "alert",
    user: "تنبيه النظام",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "تم تفعيل التدخل في الأزمات",
    time: "منذ 25 دقيقة",
    status: "urgent",
    icon: AlertCircle,
  },
];

const statusColors = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  new: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  wellness: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// مكونات بطاقات الإحصائيات
const StatsCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
      <div
        key={stat.title}
        className="card-modern animate-fade-in-up rounded-lg"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </h3>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <stat.icon className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-primary">{stat.value}</div>
          <div className="flex items-center space-x-2 text-xs">
            <span
              className={`font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
            <span className="text-muted-foreground">من الشهر الماضي</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// مكون الأنشطة الحديثة
const RecentActivity = () => (
  <div className="card-modern animate-fade-in-up rounded-lg">
    <div className="p-6 pb-3">
      <h3 className="text-lg font-semibold text-primary">الأنشطة الحديثة</h3>
      <p className="text-sm text-muted-foreground">
        أحدث تفاعلات المستخدمين وأحداث النظام
      </p>
    </div>
    <div className="p-6 pt-0">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 space-x-reverse animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square h-full w-full"
                  src={activity.avatar || "/placeholder.svg"}
                  alt={activity.user}
                />
              </div>
              <div className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full bg-gradient-primary flex items-center justify-center">
                <activity.icon className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">
                  <span className="gradient-text">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[activity.status]
                  }`}
                >
                  {activity.status === "completed" && "مكتمل"}
                  {activity.status === "active" && "نشط"}
                  {activity.status === "new" && "جديد"}
                  {activity.status === "wellness" && "عافية"}
                  {activity.status === "urgent" && "عاجل"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// مكون الرسم البياني البسيط
const SimpleChart = () => (
  <div className="card-modern animate-fade-in-scale rounded-lg">
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

// مكون لوحة التحكم الرئيسية
const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* قسم الترحيب */}
      <div className="animate-fade-in-up">
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
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SimpleChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* الإجراءات السريعة */}
      <div className="card-modern animate-fade-in-up rounded-lg">
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

      {/* حالة النظام */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-modern animate-fade-in-up rounded-lg">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-semibold text-primary">صحة النظام</h3>
            <p className="text-sm text-muted-foreground">
              مقاييس الأداء الحالية للنظام
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">وقت تشغيل الخادم</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  99.9%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">وقت الاستجابة</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  120ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">الجلسات النشطة</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                  1,247
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">حالة قاعدة البيانات</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  سليمة
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-modern animate-fade-in-up rounded-lg">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-semibold text-primary">
              تنبيهات الأمان
            </h3>
            <p className="text-sm text-muted-foreground">
              أحداث الأمان الحديثة والإشعارات
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">جميع الأنظمة آمنة</p>
                  <p className="text-xs text-muted-foreground">
                    آخر فحص: منذ ساعتين
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    تم إرسال تذكير المصادقة الثنائية
                  </p>
                  <p className="text-xs text-muted-foreground">
                    إلى 15 مستخدم بدون مصادقة ثنائية
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    تم تحديث سياسة كلمة المرور
                  </p>
                  <p className="text-xs text-muted-foreground">
                    الحد الأدنى 12 حرف مطلوب
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
