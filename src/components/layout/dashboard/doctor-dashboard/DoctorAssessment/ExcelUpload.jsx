import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const ExcelUpload = ({ onDataParsed, onCancel }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const expectedColumns = [
    'patientName',
    'age',
    'gender',
    'diagnosis',
    'symptoms',
    'duration',
    'psychiatricHistory',
    'familyHistory',
    'socialContext',
    'stressors',
    'personality',
    'sleep',
    'medications',
    'treatmentExperience',
    'selfNarrative'
  ];

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]);
  };

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setError('');
    setIsProcessing(true);
    
    try {
      const data = await readExcelFile(uploadedFile);
      setParsedData(data);
      setIsProcessing(false);
    } catch (err) {
      console.error('Error parsing file:', err);
      setError(err.message || 'Failed to parse file. Please check the format and try again.');
      setIsProcessing(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          const headers = [];
          const range = XLSX.utils.decode_range(worksheet['!ref']);
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
            headers.push(cell ? cell.v : undefined);
          }
          
          const missingColumns = expectedColumns.filter(col => !headers.includes(col));
          if (missingColumns.length > 0) {
            throw new Error(`Missing columns: ${missingColumns.join(', ')}. Please use the provided template.`);
          }
          
          const extraColumns = headers.filter(header => !expectedColumns.includes(header));
          if (extraColumns.length > 0) {
            throw new Error(`Extra columns found: ${extraColumns.join(', ')}. Please use the provided template.`);
          }
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          if (jsonData.length === 0) {
            throw new Error('File contains no data.');
          }
          
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handleConfirmUpload = async () => {
    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 1500));
    setIsProcessing(false);
    setUploaded(true);
    setTimeout(() => onDataParsed(parsedData), 2000);
  };

  const downloadTemplate = () => {
    const template = [
      {
        patientName: "John Doe",
        age: 30,
        gender: "Male",
        diagnosis: "Example Diagnosis",
        symptoms: "Example symptoms",
        duration: "6 months",
        psychiatricHistory: "No history",
        familyHistory: "No family history",
        socialContext: "Single, lives alone",
        stressors: "Work stress",
        personality: "Introverted",
        sleep: "6-7 hours",
        medications: "None",
        treatmentExperience: "None",
        selfNarrative: "Patient's own words about their condition"
      }
    ];
    
    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_template.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (uploaded) return (
    <div className="min-h-screen flex items-center justify-center bg-success/10">
      <div className="bg-card p-8 rounded-xl shadow text-center">
        <div className="w-16 h-16 bg-success/20 mx-auto rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-success w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">تم التحميل بنجاح</h3>
        <p className="text-foreground">تم معالجة {parsedData.length} سجل.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <button 
            onClick={onCancel} 
            className="flex items-center text-foreground hover:text-primary self-start mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> رجوع
          </button>
          <h1 className="text-3xl font-bold text-primary text-center">تحميل بيانات إكسل</h1>
        </div>

        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-primary">ملف نموذجي</h3>
            <p className="text-sm text-foreground">قم بتنزيل النموذج لمعرفة التنسيق المطلوب</p>
          </div>
          <button 
            onClick={downloadTemplate} 
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" /> تنزيل النموذج
          </button>
        </div>

        <div 
          onDragEnter={handleDrag} 
          onDragLeave={handleDrag} 
          onDragOver={handleDrag} 
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center ${
            dragActive ? 'border-primary bg-primary/10' : 'border-border'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">اسحب وأسقط الملف هنا</h3>
            <p className="text-foreground mb-4">أو انقر لاختيار الملف</p>
            <input 
              id="file-upload" 
              type="file" 
              accept=".xlsx,.xls,.csv" 
              onChange={handleFileInput} 
              className="hidden" 
            />
            <label 
              htmlFor="file-upload" 
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90"
            >
              اختر ملف
            </label>
          </div>
        </div>

        {file && (
          <div className="bg-card rounded-xl shadow p-6 mt-6">
            <div className="flex items-center mb-4">
              <FileSpreadsheet className="w-5 h-5 text-success mr-2" />
              <h3 className="text-lg font-semibold text-foreground">معالجة الملف</h3>
            </div>
            <div className="flex justify-between items-center p-4 bg-background rounded-lg">
              <div>
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-foreground">{(file.size / 1024 / 1024).toFixed(2)} ميجابايت</p>
              </div>
              {isProcessing ? (
                <span className="text-primary flex items-center">
                  <span className="animate-spin border-b-2 border-primary rounded-full h-4 w-4 mr-2"></span>
                  جاري المعالجة...
                </span>
              ) : error ? (
                <span className="text-destructive flex items-center">
                  <AlertCircle className="w-5 h-5 mr-1" /> خطأ
                </span>
              ) : (
                <span className="text-success flex items-center">
                  <CheckCircle className="w-5 h-5 mr-1" /> تمت المعالجة
                </span>
              )}
            </div>
            
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 p-4 rounded mt-4 text-destructive">
                <div className="font-bold mb-2">{error}</div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">الأعمدة المطلوبة:</p>
                  <ul className="list-disc list-inside text-foreground">
                    {expectedColumns.map((col, i) => (
                      <li key={i}>{col}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {parsedData.length > 0 && !error && (
              <div className="mt-6">
                <h4 className="font-medium mb-3 text-foreground">معاينة البيانات ({parsedData.length})</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {parsedData.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex justify-between bg-background p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{p.patientName}</p>
                        <p className="text-sm text-foreground">{p.diagnosis}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-foreground">العمر: {p.age}</p>
                        <p className="text-sm text-foreground">{p.gender}</p>
                      </div>
                    </div>
                  ))}
                  {parsedData.length > 5 && (
                    <div className="text-center text-sm text-foreground">
                      + {parsedData.length - 5} سجلات إضافية
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleConfirmUpload}
                    disabled={isProcessing}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="animate-spin border-b-2 border-white rounded-full h-4 w-4 mr-2"></span>
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {isProcessing ? 'جاري التحميل...' : 'تأكيد التحميل'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUpload;