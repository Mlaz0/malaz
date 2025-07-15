import {
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MessageSquare,
  TrendingUp,
  Users,
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

export const StatsCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
      <div key={stat.title} className="card-modern  rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <h3 className="text-sm font-medium ">{stat.title}</h3>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <stat.icon className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-primary">{stat.value}</div>
          {/* <div className="flex items-center space-x-2 text-xs">
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
          </div> */}
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);
