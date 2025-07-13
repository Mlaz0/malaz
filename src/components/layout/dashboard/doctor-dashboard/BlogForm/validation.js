import * as yup from "yup";

const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required("العنوان مطلوب")
    .min(10, `يجب أن يكون العنوان على الأقل 10 أحرف`)
    .max(120, `يجب ألا يتجاوز العنوان 120 حرفًا`),
  category: yup.object().shape({
    category_id: yup.string().required("الفئة مطلوبة"),
    category_name: yup.string().required(),
  }),
  content: yup
    .string()
    .required("المحتوى مطلوب")
    .min(20, `يجب أن يكون المحتوى على الأقل 20 حرفًا`),
  // image: yup.mixed().optional(),
  // // .test(
  // //   "fileSize",
  // //   `يجب أن يكون حجم الصورة أقل من 10 ميجابايت`,
  // //   (value) => !value || (value && value.size <= 10 * 1024 * 1024)
  // // )
  // // .test(
  // //   "fileType",
  // //   "يجب أن يكون الملف من نوع صورة (PNG, JPG, JPEG, GIF)",
  // //   (value) =>
  // //     !value ||
  // //     (value &&
  // //       ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
  // //         value.type
  // //       ))
  // // ),
});

export default blogSchema;
