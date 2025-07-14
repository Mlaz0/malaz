import * as Yup from "yup";

export const baseValidationSchema = Yup.object({
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

export const doctorValidationSchema = baseValidationSchema.shape({
  specializations: Yup.array()
    .min(1, "يجب اختيار تخصص واحد على الأقل")
    .max(3, "يجب اختيار 3 تخصصات كحد أقصى")
    .required("التخصصات مطلوبة"),
  certifications: Yup.array()
    .min(1, "يجب رفع ملف شهادة واحد على الأقل")
    .required("ملفات الشهادات مطلوبة"),
});
