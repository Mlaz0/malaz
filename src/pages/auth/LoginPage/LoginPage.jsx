import { Card, CardContent } from "@/components/ui/card";

import FormFooter from "@/components/layout/auth/FormFooter";
import HeaderLoginForm from "@/components/layout/auth/login/HeaderLoginForm";
import LoginForm from "@/components/layout/auth/login/LoginForm";
import RegisterImg from "@/components/layout/auth/register/RegisterImg";
import useLogin from "@/hooks/Actions/auth/useLogin";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: isDoctor ? doctorValidationSchema : baseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const userData = {
        ...values,
      };

      mutate({ data: userData });

      console.log("بيانات التسجيل:", userData);
    },
  });
  return (
    <div className="min-h-screen bg-background " dir="rtl">
      <div className="grid lg:grid-cols-2 gap-8 items-center  h-screen  ">
        {/* Right side - Form (now on right for RTL) */}
        <div className="w-full  max-w-2xl mx-auto order-2 lg:order-1">
          <Card className=" my-20">
            <HeaderLoginForm />
            <CardContent className="space-y-6">
              <LoginForm formik={formik} isPending={isPending} />

              <Link
                className="text-center block text-sm text-muted-foreground hover:text-primary transition-colors"
                to="/auth/forgot-password"
              >
                نسيت كلمة المرور؟
              </Link>
              <FormFooter
                title={"ليس لديك حساب؟"}
                subtitle={"انشاء حساب"}
                link={"/auth/register"}
              />
            </CardContent>
          </Card>
        </div>

        {/* Left side - Image */}
        <RegisterImg />
      </div>
    </div>
  );
};

export default LoginPage;
