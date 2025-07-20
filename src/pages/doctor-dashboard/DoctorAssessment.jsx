import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  UserPlus,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle,
  Send,
  Loader2,
  AlertCircle,
  History,
} from "lucide-react";
import PatientForm from "@/components/layout/dashboard/doctor-dashboard/DoctorAssessment/PatientForm";
import ExcelUpload from "@/components/layout/dashboard/doctor-dashboard/DoctorAssessment/ExcelUpload";
import AnalysisReport from "@/components/layout/dashboard/doctor-dashboard/DoctorAssessment/AnalysisReport";
import PreviousAnalysis from "@/components/layout/dashboard/doctor-dashboard/DoctorAssessment/PreviousAnalysis";
import Cookies from "js-cookie";


const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  useEffect(() => {
    if (patients.length > 0) {
      console.log("إرسال بيانات المرضى:", patients);
    }
  }, [patients]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleFormSubmit = (patient) => {
    setPatients((prev) => [...prev, patient]);
    setNotification("تم إضافة المريض بنجاح");
    setActiveView("dashboard");
  };

  const handleExcelData = async (uploadedPatients) => {
    setPatients((prev) => {
      const updated = [...prev, ...uploadedPatients];
      console.log("البيانات المحدثة:", updated);
      return updated;
    });
    setNotification(`تم استيراد ${uploadedPatients.length} سجل بنجاح`);
    setActiveView("dashboard");
  };

  const handleAnalyzePatients = async () => {
    if (patients.length === 0) {
      setNotification("يجب إضافة مرضى أولاً لإجراء التحليل");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const token = Cookies.get("MALAZ_TOKEN");
      const response = await fetch(
        "https://mlaz-backend.vercel.app/api/ai/analysis/analysis-tool",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patients),
        }
      );

      if (!response.ok) {
        console.log(patients);
        const errorData = await response.json(); 
  const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
  throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.status === "success") {
        setAnalysisReport(data);
        setActiveView("report");
        setNotification("تم إنشاء التقرير بنجاح");
      } else {
        console.log(data+"ssssssssssssssssssss");
        
        throw new Error(data.message || "فشل في إنشاء التقرير");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisError(error.message || "حدث خطأ أثناء التحليل");
      setNotification("فشل في إنشاء التقرير");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (activeView === "form") {
    return (
      <PatientForm
        onSubmit={handleFormSubmit}
        onCancel={() => setActiveView("dashboard")}
      />
    );
  }

  if (activeView === "excel") {
    return (
      <ExcelUpload
        onDataParsed={handleExcelData}
        onCancel={() => setActiveView("dashboard")}
      />
    );
  }

  if (activeView === "previous") {
    return <PreviousAnalysis onBack={() => setActiveView("dashboard")} />;
  }

  if (activeView === "report" && analysisReport) {
    return (
      <AnalysisReport
        reportData={analysisReport}
        onBack={() => setActiveView("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* تنبيهات */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
          <div className="bg-card p-4 rounded-lg shadow-lg border border-success flex items-start">
            <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5" />
            <p className="text-sm font-medium text-foreground">
              {notification}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">
                نظام إدارة البيانات النفسية
              </h1>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                نظام متكامل لجمع وتحليل بيانات المرضى للتقييم النفسي
              </p>
            </div>
          </div>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-xl shadow-md border border-border">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="mr-5">
                <p className="text-sm font-medium text-foreground">
                  إجمالي المرضى
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {patients.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-md border border-border">
            <div className="flex items-center">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <div className="mr-5">
                <p className="text-sm font-medium text-foreground">
                  تحليلات جاهزة
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {patients.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-md border border-border">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileSpreadsheet className="h-6 w-6 text-accent" />
              </div>
              <div className="mr-5">
                <p className="text-sm font-medium text-foreground">
                  مصادر البيانات
                </p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* الخيارات الرئيسية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div
            onClick={() => setActiveView("form")}
            className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-primary"
          >
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                إضافة مريض
              </h3>
              <p className="text-foreground mb-6">
                إدخال بيانات المريض يدوياً عبر نموذج متكامل
              </p>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center text-sm text-primary">
                  ابدأ هنا <ArrowRight className="h-4 w-4 mr-1" />
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveView("excel")}
            className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-secondary"
          >
            <div className="text-center">
              <div className="inline-flex p-4 bg-secondary/10 rounded-full mb-6 group-hover:bg-secondary/20 transition-colors">
                <FileSpreadsheet className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                استيراد بيانات
              </h3>
              <p className="text-foreground mb-6">
                رفع ملف إكسل يحتوي على بيانات المرضى
              </p>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center text-sm text-secondary">
                  ابدأ هنا <ArrowRight className="h-4 w-4 mr-1" />
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveView("previous")}
            className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-accent"
          >
            <div className="text-center">
              <div className="inline-flex p-4 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
                <History className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                التقارير السابقة
              </h3>
              <p className="text-foreground mb-6">
                عرض وإدارة جميع تقارير التحليل النفسي السابقة
              </p>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center text-sm text-accent">
                  ابدأ هنا <ArrowRight className="h-4 w-4 mr-1" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* أحدث الإضافات */}
        {patients.length > 0 && (
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              أحدث الإضافات
            </h3>
            <div className="space-y-3">
              {patients
                .slice()
                .reverse()
                .slice(0, 5)
                .map((patient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {patient.patientName}
                      </p>
                      <p className="text-sm text-foreground">
                        {patient.diagnosis}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">
                        العمر: {patient.age}
                      </p>
                      <p className="text-sm text-foreground">
                        {patient.gender}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {patients.length > 0 && (
          <>
            {/* Analysis Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl shadow-lg border border-border p-8 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  إجراء التحليل النفسي
                </h3>
                <p className="text-foreground mb-6 max-w-2xl mx-auto">
                  قم بتحليل بيانات المرضى المدخلة للحصول على تقرير شامل يوضح
                  الأنماط والعلاقات بين الحالات
                </p>

                {analysisError && (
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg mb-6 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                    <p className="text-destructive">{analysisError}</p>
                  </div>
                )}

                <button
                  onClick={handleAnalyzePatients}
                  disabled={isAnalyzing || patients.length === 0}
                  className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-5 w-5 mr-2" />
                      إجراء التحليل النفسي
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;