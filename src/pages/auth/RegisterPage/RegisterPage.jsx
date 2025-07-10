import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { Card, CardContent } from "@/components/ui/card";

import FormFooter from "@/components/layout/auth/FormFooter";
import HeaderRegisterForm from "@/components/layout/auth/register/HeaderRegisterForm";
import RegisterForm from "@/components/layout/auth/register/RegisterForm";
import RegisterImg from "@/components/layout/auth/register/RegisterImg";
import useRegister from "@/hooks/Actions/auth/useRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "الاسم يجب أن يكون على الأقل حرفين")
    .required("الاسم مطلوب"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "يرجى اختيار جنس صحيح")
    .required("الجنس مطلوب"),
  dateOfBirth: Yup.string().required("تاريخ الميلاد مطلوب"),
  email: Yup.string()
    .email("عنوان بريد إلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
    .required("كلمة المرور مطلوبة"),
  phone: Yup.string()
    .min(10, "رقم الهاتف يجب أن يكون على الأقل 10 أرقام")
    .required("رقم الهاتف مطلوب"),
});

// eslint-disable-next-line no-unused-vars
const doctorValidationSchema = baseValidationSchema.shape({
  specializations: Yup.array()
    .min(1, "يجب اختيار تخصص واحد على الأقل")
    .max(3, "يجب اختيار 5 تخصصات على الأقل")
    .required("التخصصات مطلوبة"),

  certifications: Yup.array()
    .min(1, "يجب رفع ملف شهادة واحد على الأقل")

    .required("ملفات الشهادات مطلوبة"),
});

const specializations = [
  "أمراض القلب",
  "الأمراض الجلدية",
  "الغدد الصماء",
  "أمراض الجهاز الهضمي",
  "الأمراض العصبية",
  "الأورام",
  "العظام",
  "طب الأطفال",
  "الطب النفسي",
  "الأشعة",
];

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();
  const [isDoctor, setIsDoctor] = useState(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    password: "",
    phone: "",
    ...(isDoctor && {
      specializations: [],
      yearsOfExperience: 0,
      bio: "",
      certifications: [],
      sessionFee: 0,
      sessionDuration: 30,
      availability: [],
      clinicLocation: "",
    }),
  };

  const handleUploadFiles = async (selectedCertifications) => {
    const formData = new FormData();

    selectedCertifications.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/proxy",
        formData,
        {
          headers: {
            "x-upload-type": "multi",
          },
        }
      );

      console.log("Upload Success:", response.data);

      if (response.data.status === "success") {
        return response.data.results;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: isDoctor ? doctorValidationSchema : baseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let uploadedCertifications = [];

      if (values.role === "doctor") {
        uploadedCertifications = await handleUploadFiles(
          selectedCertifications
        );

        if (!uploadedCertifications || uploadedCertifications.length === 0) {
          console.error("Unable to upload files ❌");
          return;
        }
      }

      const userData = {
        ...values,
        role: isDoctor ? "doctor" : "patient",
        specializations: selectedSpecializations,
        certifications: uploadedCertifications,
        ...(isDoctor && {
          doctorData: {
            specializations: selectedSpecializations,
            certifications: uploadedCertifications,
          },
        }),
      };

      if (userData.role === "patient") {
        userData.patientData = {};
      }

      console.log("✅ بيانات التسجيل:", userData);

      mutate(
        { data: userData },
        {
          onSuccess: () => {
            navigate("/auth/login");
          },
        }
      );
    },
  });

  const addSpecialization = (specialization) => {
    if (!selectedSpecializations.includes(specialization)) {
      const updated = [...selectedSpecializations, specialization];
      setSelectedSpecializations(updated);
      formik.setFieldValue("specializations", updated);
    }
  };

  const removeSpecialization = (specialization) => {
    console.log("Removing specialization:", specialization);
    const updated = selectedSpecializations.filter((s) => s !== specialization);
    setSelectedSpecializations(updated);
    formik.setFieldValue("specializations", updated);
  };

  const handleDoctorToggle = (checked) => {
    setIsDoctor(checked);
    // Reset doctor-specific fields when toggling
    if (!checked) {
      setSelectedSpecializations([]);
      setSelectedCertifications([]);
    }
  };

  return (
    <div className="min-h-screen bg-background " dir="rtl">
      <div className=" grid lg:grid-cols-2 gap-8 ">
        <div className="w-full max-w-2xl mx-auto order-2 lg:order-1">
          <Card className="  my-20">
            <HeaderRegisterForm
              isDoctor={isDoctor}
              handleDoctorToggle={handleDoctorToggle}
            />
            <CardContent className="space-y-6">
              <RegisterForm
                formik={formik}
                isDoctor={isDoctor}
                addSpecialization={addSpecialization}
                removeSpecialization={removeSpecialization}
                selectedCertifications={selectedCertifications}
                setSelectedCertifications={setSelectedCertifications}
                selectedSpecializations={selectedSpecializations}
                specializations={specializations}
                isPending={isPending}
              />

              <FormFooter
                title="لديك حساب؟ "
                subtitle="تسجيل الدخول"
                link="/auth/login"
              />
            </CardContent>
          </Card>
        </div>

        {/* Left side - Image */}
        <RegisterImg />
      </div>
    </div>
  );
}
