import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  ArrowLeft, Save, User, Brain, Clock, History, Users,
  Store as Stress, Moon, Pill, MessageSquare
} from 'lucide-react';
import { Input } from "@/components/ui/input";

const PatientForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: 0,
    gender: 'Male',
    diagnosis: '',
    symptoms: '',
    duration: '', 
    psychiatricHistory: '',
    familyHistory: '',
    socialContext: '',
    stressors: '',
    personality: '',
    sleep: '',
    medications: '',
    treatmentExperience: '',
    selfNarrative: ''
  });

  const [isSubmitting, setIsSubmitting] =useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      onSubmit(formData);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="bg-card p-8 rounded-xl shadow-lg text-center max-w-md border border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">تم تسجيل بيانات المريض</h3>
          <p className="text-muted-foreground">
            تم إضافة بيانات المريض {formData.patientName} بنجاح إلى قائمة التحليل.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={onCancel} 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              العودة للوحة التحكم
            </button>
            <h1 className="text-3xl font-bold text-foreground m-auto">نموذج إدخال بيانات المريض</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow border border-border">
            {[
              { name: 'patientName', label: 'اسم المريض', icon: <User className="w-4 h-4" />, required: true },
              { name: 'age', label: 'العمر', icon: <Clock className="w-4 h-4" />, type: 'number', required: true },
              { 
                name: 'gender', 
                label: 'الجنس', 
                type: 'select', 
                options: ['Male', 'Female',],
                icon: <User className="w-4 h-4" />,
                required: true 
              },
              { name: 'diagnosis', label: 'التشخيص', icon: <Brain className="w-4 h-4" />, required: true },
              { name: 'symptoms', label: 'الأعراض', icon: <MessageSquare className="w-4 h-4" />, textarea: true, required: true },
              { name: 'duration', label: 'المدة', icon: <Clock className="w-4 h-4" />, placeholder: 'مثال: 6 أشهر، سنتين' },
              { name: 'psychiatricHistory', label: 'التاريخ النفسي', icon: <History className="w-4 h-4" />, textarea: true },
              { name: 'familyHistory', label: 'التاريخ العائلي', icon: <Users className="w-4 h-4" />, textarea: true },
              { name: 'socialContext', label: 'السياق الاجتماعي', icon: <Users className="w-4 h-4" />, textarea: true },
              { name: 'stressors', label: 'الضغوطات', icon: <Stress className="w-4 h-4" />, textarea: true },
              { name: 'personality', label: 'سمات الشخصية', icon: <User className="w-4 h-4" />, textarea: true },
              { name: 'sleep', label: 'النوم', icon: <Moon className="w-4 h-4" />, textarea: true },
              { name: 'medications', label: 'الأدوية', icon: <Pill className="w-4 h-4" />, textarea: true },
              { name: 'treatmentExperience', label: 'العلاجات السابقة', icon: <History className="w-4 h-4" />, textarea: true },
              { name: 'selfNarrative', label: 'السرد الذاتي', icon: <MessageSquare className="w-4 h-4" />, textarea: true, placeholder: 'وصف المريض لحالته بكلماته الخاصة...' }
            ].map(field => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  {field.label}
                  {field.required && <span className="text-destructive mr-1">*</span>}
                </label>
                <div className="flex items-center gap-2">
                  {field.icon && (
                    <div className="text-muted-foreground">
                      {field.icon}
                    </div>
                  )}
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={cn(
                        "border-input flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-xs",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                      )}
                      required={field.required}
                    >
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.textarea ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={cn(
                        "border-input flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                      )}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={3}
                    />
                  ) : (
                    <Input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-input bg-background hover:bg-accent text-foreground rounded-md transition-colors text-sm font-medium"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    حفظ البيانات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;