import * as Yup from "yup";

const postSchema = Yup.object({
  title: Yup.string()
    .min(4, "العنوان يجب أن يكون أكثر من 3 أحرف")
    .required("العنوان مطلوب"),
  content: Yup.string()
    .min(4, "الوصف يجب أن يكون أكثر من 3 أحرف")
    .required("الوصف مطلوب"),
  category: Yup.object()
    .shape({
      category_id: Yup.string().required("الفئة مطلوبة"),
      category_name: Yup.string().required(),
    })
    .required("الفئة مطلوبة"),
  isAnonymous: Yup.boolean(),
});

export default postSchema;
