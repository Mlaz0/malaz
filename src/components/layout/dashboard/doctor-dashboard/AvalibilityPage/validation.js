import * as Yup from "yup";

export const validationSchema = Yup.object({
  date: Yup.date()
    .required("التاريخ مطلوب")
    .min(new Date(), "لا يمكن أن يكون التاريخ في الماضي"),
  startTime: Yup.string()
    .required("وقت البداية مطلوب")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "الرجاء إدخال وقت صحيح (HH:MM)"
    ),
  endTime: Yup.string()
    .required("وقت النهاية مطلوب")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "الرجاء إدخال وقت صحيح (HH:MM)"
    ),
  price: Yup.number()
    .required("السعر مطلوب")
    .min(0, "يجب أن يكون السعر رقمًا موجبًا")
    .max(10000, "لا يمكن أن يتجاوز السعر 10,000 دولار"),
});
