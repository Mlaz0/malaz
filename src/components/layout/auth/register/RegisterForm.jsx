import { Button } from "@/components/ui/button";
import MainRegisterFelid from "./MainRegisterFelid";
import RegisterDoctorFelids from "./RegisterDoctorFelids";

const RegisterForm = ({
  formik,
  isDoctor,
  selectedSpecializations,
  specializations,
  addSpecialization,
  removeSpecialization,
  selectedCertifications,
  setSelectedCertifications,

  isPending,
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Basic Fields */}
      <MainRegisterFelid formik={formik} />

      {/* Doctor-specific fields */}
      {isDoctor && (
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 text-right">
            معلومات الطبيب
          </h3>
          <RegisterDoctorFelids
            addSpecialization={addSpecialization}
            removeSpecialization={removeSpecialization}
            selectedSpecializations={selectedSpecializations}
            specializations={specializations}
            formik={formik}
            selectedCertifications={selectedCertifications}
            setSelectedCertifications={setSelectedCertifications}
          />
        </div>
      )}

      <Button
        disabled={!(formik.isValid && formik.dirty) || isPending}
        type="submit"
        className="w-full cursor-pointer h-11 font-medium"
      >
        إنشاء الحساب
      </Button>
    </form>
  );
};

export default RegisterForm;
