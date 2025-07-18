import FormFooter from "@/components/layout/auth/FormFooter";
import { Card, CardContent } from "@/components/ui/card";
import useRegister from "@/hooks/Actions/auth/useRegister";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import handleUploadFiles from "@/services/uploadImage";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderRegisterForm from "./HeaderRegisterForm";
import RegisterForm from "./RegisterForm";
import RegisterImg from "./RegisterImg";
import { baseValidationSchema, doctorValidationSchema } from "./Validation";

export default function RegisterFormWrapper() {
  const { data: categories = [] } = useGetAllCategories();
  const { mutate, isPending } = useRegister();
  const [isDoctor, setIsDoctor] = useState(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      name: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      password: "",
      phone: "",
      ...(isDoctor && {
        specializations: [],
        certifications: [],
      }),
    }),
    [isDoctor]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: isDoctor ? doctorValidationSchema : baseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let uploadedCertifications = [];

        if (isDoctor) {
          uploadedCertifications = await handleUploadFiles(
            selectedCertifications
          );
          if (!uploadedCertifications || uploadedCertifications.length === 0)
            return;
        }

        const userData = {
          ...values,
          role: isDoctor ? "doctor" : "patient",
          ...(isDoctor && {
            doctorData: {
              specializations: selectedSpecializations,
              certifications: Array.isArray(uploadedCertifications.results)
                ? uploadedCertifications.results
                : [uploadedCertifications.result],
            },
          }),
        };

        if (!isDoctor) userData.patientData = {};

        mutate(
          { data: userData },
          {
            onSuccess: () => navigate("/auth/login"),
            onError: (err) => console.error(err),
          }
        );
      } catch (err) {
        console.error("❌ Error during registration:", err);
      }
    },
  });

  const addSpecialization = useCallback(
    (specializationName) => {
      const selectedCategory = categories?.data?.data?.categories?.find(
        (c) => c.name === specializationName
      );
      if (!selectedCategory) return;
      const exists = selectedSpecializations.some(
        (item) => item.id === selectedCategory._id
      );
      if (!exists && selectedSpecializations.length < 3) {
        const updated = [
          ...selectedSpecializations,
          { id: selectedCategory._id, name: specializationName },
        ];
        setSelectedSpecializations(updated);
        formik.setFieldValue("specializations", updated);
      }
    },
    [categories, selectedSpecializations, formik]
  );

  const removeSpecialization = useCallback(
    (specialization) => {
      const updated = selectedSpecializations.filter(
        (s) => s.id !== specialization.id
      );
      setSelectedSpecializations(updated);
      formik.setFieldValue("specializations", updated);
    },
    [selectedSpecializations, formik]
  );

  const handleDoctorToggle = useCallback(
    (checked) => {
      setIsDoctor(checked);
      if (!checked) {
        setSelectedSpecializations([]);
        setSelectedCertifications([]);
        formik.setFieldValue("specializations", []);
        formik.setFieldValue("certifications", []);
      }
    },
    [formik]
  );

  return (
    <>
      <div className="w-full max-w-2xl mx-auto order-2 lg:order-1">
        <Card className="my-20">
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
              categories={categories}
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
      <RegisterImg />
    </>
  );
}
