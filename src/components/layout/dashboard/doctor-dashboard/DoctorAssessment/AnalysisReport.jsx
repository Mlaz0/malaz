import React from 'react';
import { ArrowLeft, FileText, Users, Calendar, Brain, TrendingUp, Download, Share2 } from 'lucide-react';

const AnalysisReport = ({ reportData, onBack }) => {
  const { data } = reportData;
  
  // Parse the report text into sections
  const parseReport = (reportText) => {
    const sections = reportText.split('\n\n').filter(section => section.trim());
    return sections;
  };

  const reportSections = parseReport(data.report);
  const createdDate = new Date(data.createdAt).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([data.report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `تقرير_التحليل_${data._id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تقرير التحليل النفسي',
          text: data.report.substring(0, 200) + '...',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(data.report);
      alert('تم نسخ التقرير إلى الحافظة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center flex-wrap gap-4">
              <button
                onClick={onBack}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                العودة للوحة التحكم
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">تقرير التحليل النفسي</h1>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">تم إنشاؤه في {createdDate}</p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors w-full md:w-auto justify-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                مشاركة
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                تحميل التقرير
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-card p-4 md:p-6 rounded-xl shadow-md border border-border dark:border-border/50">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                  <Users className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                </div>
                <div className="mr-3 md:mr-4">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">عدد المرضى</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{data.inputCases.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 md:p-6 rounded-xl shadow-md border border-border dark:border-border/50">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-secondary/10 rounded-lg">
                  <Brain className="h-5 md:h-6 w-5 md:w-6 text-accent" />
                </div>
                <div className="mr-3 md:mr-4">
                  <p className="text-xs md:text-sm font-medium text-foreground">التشخيصات</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    {new Set(data.inputCases.map(c => c.diagnosis)).size}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 md:p-6 rounded-xl shadow-md border border-border dark:border-border/50">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-accent" />
                </div>
                <div className="mr-3 md:mr-4">
                  <p className="text-xs md:text-sm font-medium text-foreground">متوسط العمر</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    {Math.round(data.inputCases.reduce((sum, c) => sum + c.age, 0) / data.inputCases.length)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 md:p-6 rounded-xl shadow-md border border-border dark:border-border/50">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Calendar className="h-5 md:h-6 w-5 md:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="mr-3 md:mr-4">
                  <p className="text-xs md:text-sm font-medium text-foreground">معرف التقرير</p>
                  <p className="text-xs md:text-sm font-bold text-foreground">{data._id.slice(-8)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Patient Cases Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-lg border border-border dark:border-border/50 p-4 md:p-6 lg:sticky lg:top-8">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center">
                  <Users className="h-4 md:h-5 w-4 md:w-5 mr-2 text-primary" />
                  ملخص الحالات
                </h3>
                <div className="space-y-3 md:space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {data.inputCases.map((patient, index) => (
                    <div key={index} className="p-3 md:p-4 bg-muted/50 dark:bg-muted rounded-lg">
                      <div className="flex items-start justify-between mb-1 md:mb-2">
                        <h4 className="font-semibold text-foreground text-sm md:text-base">{patient.patientName}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {patient.age} سنة
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{patient.diagnosis}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <span>{patient.gender}</span>
                        <span>•</span>
                        <span>{patient.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Report */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-lg border border-border dark:border-border/50 p-5 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  <FileText className="h-5 md:h-6 w-5 md:w-6 text-primary mr-2 md:mr-3" />
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">التقرير التفصيلي</h3>
                </div>
                
                <div className="prose prose-sm md:prose-lg max-w-none">
                  {reportSections.map((section, index) => {
                    const isTitle = section.includes('Title:') || section.includes('Introduction:');
                    const isHeading = section.includes(':') && section.split(':')[0].length < 50;
                    
                    if (isTitle) {
                      return (
                        <div key={index} className="mb-6 md:mb-8 p-4 md:p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border-r-4 border-primary">
                          <h2 className="text-lg md:text-xl font-bold text-foreground mb-2">
                            {section.replace('Title:', '').replace('Introduction:', 'مقدمة:').trim()}
                          </h2>
                        </div>
                      );
                    }
                    
                    if (isHeading) {
                      const [heading, ...content] = section.split(':');
                      return (
                        <div key={index} className="mb-4 md:mb-6">
                          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3 flex items-center">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-2 md:mr-3"></div>
                            {heading.trim()}
                          </h3>
                          <div className="pr-3 md:pr-5 text-foreground leading-relaxed text-sm md:text-base ">
                            {content.join(':').trim()}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={index} className="mb-3 md:mb-4 text-foreground leading-relaxed text-sm md:text-base">
                        {section.trim()}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Report Metadata */}
          <div className="mt-6 md:mt-8 bg-card rounded-xl shadow-lg border border-border dark:border-border/50 p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">معلومات التقرير</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="break-all">
                <span className="font-medium text-muted-foreground">معرف التقرير:</span>
                <span className="mr-2 font-mono text-foreground">{data._id}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">تاريخ الإنشاء:</span>
                <span className="mr-2 text-foreground">{createdDate}</span>
              </div>
              <div className="break-all">
                <span className="font-medium text-muted-foreground">معرف الطبيب:</span>
                <span className="mr-2 font-mono text-foreground">{data.doctor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;