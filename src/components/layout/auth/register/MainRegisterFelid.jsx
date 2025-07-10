import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMsg from "../ErrorMsg";

const MainRegisterFelid = ({ formik }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
          >
            الاسم الكامل
          </label>
          <Input
            id="name"
            name="name"
            placeholder="الاسم الكامل"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-right h-11"
          />
          <ErrorMsg formik={formik} type="name" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
          >
            الجنس
          </label>

          <Select
            onValueChange={(value) => formik.setFieldValue("gender", value)}
          >
            <SelectTrigger className="text-right w-full" dir="rtl">
              <SelectValue placeholder="اختر الجنس" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">ذكر</SelectItem>
              <SelectItem value="female">أنثى</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMsg formik={formik} type="gender" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
          >
            تاريخ الميلاد
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-right h-11"
          />
          <ErrorMsg formik={formik} type="dateOfBirth" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block"
          >
            رقم الهاتف
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="رقم الهاتف"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-right h-11"
          />
          <ErrorMsg formik={formik} type="phone" />
        </div>
      </div>

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
          placeholder="البريد الالكتورني"
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
    </>
  );
};

export default MainRegisterFelid;
