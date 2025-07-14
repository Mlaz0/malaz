import BtnSubmit from "@/components/shared/BtnSubmit";
import MainRegisterFelid from "./MainRegisterFelid";
import RegisterDoctorFelids from "./RegisterDoctorFelids";

const RegisterForm = ({
  formik,
  isDoctor,
  selectedSpecializations,
  categories,
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
            categories={categories}
            formik={formik}
            selectedCertifications={selectedCertifications}
            setSelectedCertifications={setSelectedCertifications}
          />
        </div>
      )}

      <BtnSubmit formik={formik} isPending={isPending} text={"انشاء حساب"} />
    </form>
  );
};

export default RegisterForm;
