import ErrorMsg from "@/components/layout/auth/ErrorMsg";
import RegisterImg from "@/components/layout/auth/register/RegisterImg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useForgotPassword from "@/hooks/Actions/auth/UseForgotPassword";
import { useFormik } from "formik";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("عنوان بريد إلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
});
const ForgotPassword = () => {
  const { mutate, isPending } = useForgotPassword();
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      mutate({ data: values });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 gap-8 items-center h-screen">
        {/* Right side - Form (now on right for RTL) */}
        <div className=" flex items-center justify-center  px-4">
          <div className="w-full  max-w-2xl mx-auto">
            <div className="mb-8">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowRight className="ml-2 h-4 w-4" />
                الرجوع لتسجيل الدخول
              </Link>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-semibold">
                    هل نسيت كلمة المرور؟
                  </CardTitle>
                  <CardDescription className="text-base">
                    لا تقلق، سنرسل لك تعليمات إعادة التعيين.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="h-11"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMsg formik={formik} type="email" />
                  </div>

                  <Button
                    disabled={!(formik.isValid && formik.dirty) || isPending}
                    type="submit"
                    className="w-full h-11 font-medium cursor-pointer"
                  >
                    {isPending ? "جار التحقق" : "استعادة كلمة المرور"}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    تذكرت كلمة المرور؟{" "}
                    <Link
                      to="/auth/login"
                      className="font-medium text-primary hover:underline"
                    >
                      تسجيل الدخول
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Left side - Image */}
        <RegisterImg />
      </div>
    </div>
  );
};

export default ForgotPassword;
