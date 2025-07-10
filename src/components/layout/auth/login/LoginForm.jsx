import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorMsg from "../ErrorMsg";

const LoginForm = ({ formik, isPending }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Basic Fields */}

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
        >
          البريد الإلكتروني
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="البريد الاكتروني"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right h-11"
        />
        <ErrorMsg formik={formik} type="email" />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
        >
          كلمة المرور
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right h-11"
        />
        <ErrorMsg formik={formik} type="password" />
      </div>

      <Button
        disabled={!(formik.isValid && formik.dirty) || isPending}
        type="submit"
        className="w-full cursor-pointer h-11 font-medium"
      >
        تسجيل دخول
      </Button>
    </form>
  );
};

export default LoginForm;
