import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAllPatients } from "@/hooks/Actions/patients/useCrudsPatients";
import {
  useGetAllDoctors,
  useGetApprovedDoctors,
  useGetPendingDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import LoadingSpinner from "../shared/LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SimpleChart = () => {
  // Fetch all stats
  const { data: allPatientsDataRes, isLoading: loadingPatients } =
    useGetAllPatients();
  const allPatientsData = allPatientsDataRes?.data?.data;
  const { data: allDoctorsDataRes, isLoading: loadingDoctors } =
    useGetAllDoctors();
  const allDoctorsData = allDoctorsDataRes?.data?.data;
  const { data: approvedDoctorsDataRes, isLoading: loadingApproved } =
    useGetApprovedDoctors();
  const approvedDoctorsData = approvedDoctorsDataRes?.data?.data;
  const { data: pendingDoctorsDataRes, isLoading: loadingPending } =
    useGetPendingDoctors();
  const pendingDoctorsData = pendingDoctorsDataRes?.data?.data;
  const { data: categoriesRes, isLoading: loadingCategories } =
    useGetAllCategories();
  const categories = categoriesRes?.data?.data?.categories || [];

  const isLoading =
    loadingPatients ||
    loadingDoctors ||
    loadingApproved ||
    loadingPending ||
    loadingCategories;

  // Prepare chart data
  const data = {
    labels: [
      "إجمالي المستخدمين",
      "إجمالي المرضى",
      "إجمالي الأطباء",
      "الأطباء المعتمدون",
      "الأطباء المعلقون",
      "التخصصات",
    ],
    datasets: [
      {
        label: "الإحصائيات الحالية",
        data: [
          (allPatientsData?.totalPatients || 0) +
            (allDoctorsData?.totalDoctors || 0),
          allPatientsData?.totalPatients || 0,
          allDoctorsData?.totalDoctors || 0,
          approvedDoctorsData?.totalDoctors || 0,
          pendingDoctorsData?.totalDoctors || 0,
          categories.length || 0,
        ],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e42",
          "#6366f1",
          "#f43f5e",
          "#a3e635",
        ],
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "إحصائيات المنصة الحالية" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="card-modern rounded-lg">
      <div className="p-6 pb-3">
        <h3 className="text-lg font-semibold text-primary">
          إحصائيات المنصة الحالية
        </h3>
        <p className="text-sm text-muted-foreground">
          نظرة عامة على إجمالي المستخدمين، المرضى، الأطباء، والتخصصات
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="h-[300px] flex items-center justify-center bg-gradient-secondary rounded-lg">
          <div className="w-full h-full">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
