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
import useResetPassword from "@/hooks/Actions/auth/useResetPassword";
import { useFormik } from "formik";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("كلمة المرور مطلوبة"),

  confirmPassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("newPassword")], "كلمتا المرور غير متطابقتين"),
});
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        { data: { newPassword: values.newPassword, token } },
        {
          onSuccess: () => {
            formik.resetForm();
            navigate("/auth/login");
          },
        }
      );
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 gap-8 items-center ">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className=" w-full  max-w-2xl mx-auto">
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
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-semibold">
                    إعادة تعيين كلمة المرور
                  </CardTitle>
                  <CardDescription className="text-base">
                    من فضلك أدخل كلمة المرور الجديدة
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      كلمة المرور الجديدة
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور الجديدة"
                        className="h-11 pr-10"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <ErrorMsg formik={formik} type="newPassword" />
                  </div>

                  {/* تأكيد كلمة المرور */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        className="h-11 pr-10"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <ErrorMsg formik={formik} type="confirmPassword" />
                  </div>
                  <Button
                    disabled={!(formik.isValid && formik.dirty) || isPending}
                    type="submit"
                    className="w-full cursor-pointer h-11 font-medium"
                  >
                    تأكيد وإعادة التعيين
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

        <RegisterImg />
      </div>
    </div>
  );
};

export default ResetPassword;
