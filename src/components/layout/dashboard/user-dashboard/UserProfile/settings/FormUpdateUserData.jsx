import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, MapPin, Info } from "lucide-react";

const FormUpdateUserData = ({ formik }) => {
  return (
    <form id="myForm" onSubmit={formik.handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className=" border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl ">
            <User className="h-5 w-5 text-muted-foreground" />
            المعلومات الأساسية
          </CardTitle>
          <CardDescription className="text-right">
            تحديث تفاصيلك الشخصية.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium "
              >
                <User className="h-4 w-4 text-muted-foreground" />
                الاسم
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 text-right"
                    : "text-right"
                }
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500 text-right">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-medium "
              >
                <Phone className="h-4 w-4 text-muted-foreground" />
                رقم الهاتف
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="أدخل رقم هاتفك"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 text-right"
                    : "text-right"
                }
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-500 text-right">
                  {formik.errors.phone}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default FormUpdateUserData;
