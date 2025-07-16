import * as Yup from "yup";

const postSchema = Yup.object({
  title: Yup.string().min(1).max(60).trim().required("العنوان مطلوب"),
  content: Yup.string().max(2000).trim(),
  category: Yup.object()
    .shape({
      category_id: Yup.string().required("الفئة مطلوبة"),
      category_name: Yup.string().required(),
    })
    .required("الفئة مطلوبة"),
  isAnonymous: Yup.boolean(),
});

export default postSchema;
