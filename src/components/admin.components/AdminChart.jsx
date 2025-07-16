import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// SimpleChart component with Chart.js
export const SimpleChart = () => {
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "تسجيلات المستخدمين",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
      {
        label: "حجوزات الجلسات",
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.3,
      },
      {
        label: "نقاط العافية",
        data: [90, 92, 91, 93, 94, 95],
        fill: false,
        borderColor: "#f59e42",
        backgroundColor: "#f59e42",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "نمو المستخدمين والمشاركة" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card-modern rounded-lg">
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
          <div className="w-full h-full">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
