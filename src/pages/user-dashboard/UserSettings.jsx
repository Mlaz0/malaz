import DocSettingsHead from "@/components/layout/dashboard/doctor-dashboard/settings/DocSettingsHead";
import FormUpdateDocData from "@/components/layout/dashboard/doctor-dashboard/settings/FormUpdateDocData";
import FormUpdateUserData from "@/components/layout/dashboard/user-dashboard/UserProfile/settings/FormUpdateUserData";
import UserSettingsHead from "@/components/layout/dashboard/user-dashboard/UserProfile/settings/UserSettingsHead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useGetUserProfile,
  useUpdateUser,
} from "@/hooks/Actions/users/useCurdsUsers";
import handleUploadFiles from "@/services/uploadImage";
import { useFormik } from "formik";
import { Badge, Save, Trash2, Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function UserSettings() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data } = useGetUserProfile();
  const { mutate, isPending } = useUpdateUser();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "الاسم يجب أن يتكون من حرفين على الأقل")
      .max(50, "الاسم لا يمكن أن يتجاوز 50 حرفًا"),
    phone: Yup.string().matches(/^[+]?[0-9\s\-()]{7,20}$/, "رقم هاتف غير صالح"),
  });

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      phone: data?.phone || "",
      userImg: {
        url: data?.userImg?.url || "",
        public_id: data?.userImg?.public_id || "",
        type: data?.userImg?.type || "",
      },
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!data?._id) {
        throw new Error("لم يتم العثور على معرف المستخدم");
      }

      let result = null;
      if (imageFile) {
        result = await handleUploadFiles(imageFile);
        setImageFile(null);
      }

      const valuesData = {
        name: values.name,
        phone: values.phone,
        userImg: result?.result,
      };

      mutate(
        { data: valuesData, id: `/${data._id}` },
        {
          onSuccess: () => {
            formik.resetForm();
            if (result) {
              setImagePreview(result.result.url);
            }
          },
        }
      );
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "خطأ",
        description: "حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ",
        description: "نوع الملف غير مدعوم. يرجى اختيار صورة فقط",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(formik.values.userImg || "/placeholder.svg");
    setImageFile(null);
  };

  useEffect(() => {
    if (data?.userImg?.url) {
      setImagePreview(data.userImg.url);
    }
  }, [data]);

  return (
    <section className="container mx-auto p-6 md:p-8 lg:p-10 space-y-8 bg-background ">
      {/* Header */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader className="pb-4 ">
          <div className="flex justify-end pt-4">
            <Button
              form="myForm"
              type="submit"
              disabled={
                formik.isSubmitting ||
                (!formik.dirty && !imageFile) ||
                isPending
              }
              className="flex items-center gap-2 px-6 py-3 text-lg flex-row-reverse"
            >
              <Save className="h-5 w-5" />
              {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CardContent>
            <div className="flex flex-col sm:flex-row-reverse items-center gap-6">
              <div className="flex-1 w-full space-y-4 sm:space-y-3">
                <div className="">
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto flex items-center gap-2 bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors flex-row-reverse"
                    >
                      <Upload className="h-4 w-4" />
                      تحميل صورة
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center sm:text-right">
                  قم بتحميل صورة ملف شخصي احترافية. الحجم الموصى به: 400x400
                  بكسل. أقصى حجم للملف: 5 ميجابايت.
                </p>

                {imageFile && (
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center sm:text-right animate-in fade-in duration-300">
                    <p className="text-sm text-primary">
                      <strong>الملف المحدد:</strong> {imageFile.name}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      انقر على "إرسال الصورة" لحفظ هذه الصورة في ملفك الشخصي.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative flex-shrink-0">
                <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-md">
                  <AvatarImage
                    src={imagePreview || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback className="text-4xl bg-primary/10 text-primary-foreground">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>

                {imageFile && (
                  <div className="absolute -top-2 -left-2">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      جديد
                    </Badge>
                  </div>
                )}

                {imageFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeImage}
                    className="absolute -bottom-2 -left-2 h-9 w-9 p-0 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary hover:text-primary-foreground shadow-md transition-all duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <FormUpdateUserData formik={formik} />
        </div>
      </Card>
    </section>
  );
}
