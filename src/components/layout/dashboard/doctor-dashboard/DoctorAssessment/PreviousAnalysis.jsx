import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Calendar, Users, FileText, Eye, Download, Filter, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import AnalysisReport from './AnalysisReport';
import Cookies from "js-cookie";

const PreviousAnalysis = ({ onBack }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6);

  useEffect(() => {
    fetchReports();
  }, [currentPage, sortBy]);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
     const token = Cookies.get("MALAZ_TOKEN");
        
      const response = await fetch(`https://mlaz-backend.vercel.app/api/ai/analysis/my-analyses?page=${currentPage}&limit=${limit}`, {
        headers: {
            "Authorization": `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
       
      const data = await response.json();
      
      if (response.ok) {
        setReports(data.data.reports);
        setTotalPages(data.data.totalPages);
      } else {
        throw new Error(data.message || 'Failed to fetch reports');
      }
    } catch (err) {
      setError(err.message || 'فشل في تحميل التقارير السابقة');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const searchLower = searchTerm.toLowerCase();
    return (
      report.inputCases.some(patient => 
        patient.patientName.toLowerCase().includes(searchLower) ||
        patient.diagnosis.toLowerCase().includes(searchLower)
    ) || report._id.toLowerCase().includes(searchLower));
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'patients': return b.inputCases.length - a.inputCases.length;
      default: return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportPreview = (report) => {
    const lines = report.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join(' ').substring(0, 200) + '...';
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = (report) => {
    const element = document.createElement('a');
    const file = new Blob([report.report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `تقرير_${report._id.slice(-8)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (selectedReport) {
    return (
      <AnalysisReport
        reportData={{ status: 'success', data: selectedReport }}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 dark:bg-gradient-to-br dark:from-primary/10 dark:to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                العودة للوحة التحكم
              </button>
              <div className="flex flex-col items-center justify-center text-center mr-50">
  <h1 className="text-3xl font-bold text-primary">التقارير السابقة</h1>
  <p className="text-foreground dark:text-muted-foreground mt-1">عرض وإدارة جميع تقارير التحليل النفسي</p>
</div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-card dark:bg-card rounded-xl shadow-lg border border-border dark:border-border p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="البحث في التقارير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-card dark:bg-card text-foreground dark:text-foreground"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-4 py-2 border border-border dark:border-border rounded-lg hover:bg-muted dark:hover:bg-muted transition-colors bg-card dark:bg-card text-foreground dark:text-foreground"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  ترتيب حسب
                  <ChevronDown className="h-4 w-4 mr-2" />
                </button>
                
                {filterOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-card dark:bg-card border border-border dark:border-border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => { setSortBy('newest'); setFilterOpen(false); }}
                      className={`w-full text-right px-4 py-2 hover:bg-muted dark:hover:bg-muted transition-colors ${sortBy === 'newest' ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary' : 'text-foreground dark:text-foreground'}`}
                    >
                      الأحدث أولاً
                    </button>
                    <button
                      onClick={() => { setSortBy('oldest'); setFilterOpen(false); }}
                      className={`w-full text-right px-4 py-2 hover:bg-muted dark:hover:bg-muted transition-colors ${sortBy === 'oldest' ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary' : 'text-foreground dark:text-foreground'}`}
                    >
                      الأقدم أولاً
                    </button>
                    <button
                      onClick={() => { setSortBy('patients'); setFilterOpen(false); }}
                      className={`w-full text-right px-4 py-2 hover:bg-muted dark:hover:bg-muted transition-colors ${sortBy === 'patients' ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary' : 'text-foreground dark:text-foreground'}`}
                    >
                      عدد المرضى
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-primary" />
              <span className="mr-3 text-muted-foreground dark:text-muted-foreground">جاري تحميل التقارير...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Reports Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {sortedReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-card dark:bg-card rounded-xl shadow-lg border border-border dark:border-border p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Report Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                          <FileText className="h-5 w-5 text-primary dark:text-primary" />
                        </div>
                        <div className="mr-3">
                          <h3 className="text-sm font-semibold text-foreground dark:text-foreground">
                            تقرير #{report._id.slice(-8)}
                          </h3>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                            {formatDate(report.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Report Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 ">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-secondary dark:text-secondary mr-2" />
                        <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                          {report.inputCases.length} مريض
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-accent dark:text-accent mr-2" />
                        <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                          {new Date(report.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                    </div>

                    {/* Patient Summary */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-foreground dark:text-foreground mb-2">المرضى:</h4>
                      <div className="space-y-1">
                        {report.inputCases.slice(0, 3).map((patient, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="text-foreground dark:text-foreground">{patient.patientName}</span>
                            <span className="text-foreground dark:text-foreground">{patient.diagnosis}</span>
                          </div>
                        ))}
                        {report.inputCases.length > 3 && (
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                            و {report.inputCases.length - 3} مرضى آخرين...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Report Preview */}
                    <div className="mb-4 flex-grow">
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed">
                        {getReportPreview(report.report)}
                      </p>
                    </div>

                    {/* Action Buttons - Fixed to bottom */}
                    <div className="mt-auto">
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleViewReport(report)}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground rounded-lg hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors text-xs"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          عرض التقرير
                        </button>
                        <button
                          onClick={() => handleDownloadReport(report)}
                          className="flex items-center justify-center px-3 py-2 border border-border dark:border-border rounded-lg hover:bg-muted dark:hover:bg-muted transition-colors text-xs"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border dark:border-border rounded-lg hover:bg-muted dark:hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground dark:text-foreground"
                  >
                    السابق
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground'
                            : 'border border-border dark:border-border hover:bg-muted dark:hover:bg-muted text-foreground dark:text-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-border dark:border-border rounded-lg hover:bg-muted dark:hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground dark:text-foreground"
                  >
                    التالي
                  </button>
                </div>
              )}

              {/* Empty State */}
              {sortedReports.length === 0 && !loading && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
                    لا توجد تقارير
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    {searchTerm ? 'لم يتم العثور على تقارير تطابق البحث' : 'لم يتم إنشاء أي تقارير بعد'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousAnalysis;