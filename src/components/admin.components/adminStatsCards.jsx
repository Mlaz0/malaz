import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import {
  useGetAllDoctors,
  useGetApprovedDoctors,
  useGetPendingDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useGetAllPatients } from "@/hooks/Actions/patients/useCrudsPatients";
import {
  Bandage,
  Brain,
  BriefcaseMedical,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

export const StatsCards = () => {
  const { data: allPatientsDataRes } = useGetAllPatients();
  const allPatientsData = allPatientsDataRes?.data?.data;
  const { data: allDoctorsDataRes } = useGetAllDoctors();
  const allDoctorsData = allDoctorsDataRes?.data?.data;
  const { data: approvedDoctorsDataRes } = useGetApprovedDoctors();
  const approvedDoctorsData = approvedDoctorsDataRes?.data?.data;
  const { data: pendingDoctorsDataRes } = useGetPendingDoctors();
  const pendingDoctorsData = pendingDoctorsDataRes?.data?.data;
  const { data: categoriesRes } = useGetAllCategories();
  const categories = categoriesRes?.data?.data?.categories || [];

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: allPatientsData?.totalPatients + allDoctorsData?.totalDoctors || 0,
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      description: "المستخدمون النشطون هذا الشهر",
    },
    {
      title: "إجمالي المرضى",
      value: allPatientsData?.totalPatients || 0,
      change: "+12.5%",
      changeType: "positive",
      icon: Bandage,
      description: "المستخدمون النشطون هذا الشهر",
    },
    {
      title: "إجمالي الأطباء",
      value: allDoctorsData?.totalDoctors || 0,
      change: "+2.1%",
      changeType: "positive",
      icon: Brain,
      description: "عدد الأطباء المسجلين",
    },
    {
      title: "الأطباء المعتمدون",
      value: approvedDoctorsData?.totalDoctors || 0,
      change: "+1.8%",
      changeType: "positive",
      icon: CheckCircle,
      description: "عدد الأطباء المعتمدين",
    },
    {
      title: "الأطباء المعلقون",
      value: pendingDoctorsData?.totalDoctors || 0,
      change: "+1.8%",
      changeType: "positive",
      icon: Clock,
      description: "عدد الأطباء المعلقين",
    },
    {
      title: "التخصصات",
      value: categories?.length || 0,
      change: "+4.3%",
      changeType: "positive",
      icon: BriefcaseMedical,
      description: "عدد التخصصات المتاحة",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
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
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
