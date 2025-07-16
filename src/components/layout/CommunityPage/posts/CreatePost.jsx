import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import { useAddPost } from "@/hooks/Actions/posts/usePostsCurds";
import { useFormik } from "formik";
import { Loader2, Pencil } from "lucide-react";
import { useCallback } from "react";
import ErrorMsg from "../../auth/ErrorMsg";
import postSchema from "./PostSchema";

const CreatePost = () => {
  const { data: categories } = useGetAllCategories();
  const { mutate, isPending } = useAddPost();

  const handleCreatePost = (values) => {
    const postValues = {
      title: values.title,
      content: values.content,
      category: {
        category_id: values.category.category_id,
        category_name: values.category.category_name,
      },
      isAnonymous: values.isAnonymous,
    };

    mutate(
      { data: postValues },
      {
        onSuccess: () => {
          formik.resetForm();
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: {
        category_id: "",
        category_name: "",
      },
      isAnonymous: false,
    },
    onSubmit: handleCreatePost,
    validationSchema: postSchema,
  });

  const handleBlur = (field) => (e) => {
    formik.handleBlur(e);
    if (formik.values[field]?.trim() === "") {
      formik.setFieldTouched(field, false);
    } else {
      formik.validateField(field);
    }
  };

  const handleCategoryChange = useCallback(
    (value) => {
      const selectedCategory = categories?.categories?.find(
        (cat) => cat._id === value
      );
      if (selectedCategory) {
        formik.setFieldValue("category", {
          category_id: selectedCategory?._id,
          category_name: selectedCategory?.name,
        });
      }
    },
    [categories, formik]
  );

  return (
    <Card className="mb-6" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Input
            readOnly
            placeholder="ما الذي يدور في ذهنك؟"
            className="flex-1 bg-background border-none rounded-full px-4"
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Input
              name="title"
              id="title"
              placeholder="عنوان المنشور..."
              className="w-full bg-background"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={handleBlur("title")}
            />
            <ErrorMsg formik={formik} type={"title"} />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Textarea
              name="content"
              id="content"
              placeholder="اكتب محتوى المنشور هنا..."
              className="w-full min-h-[100px] resize-none bg-background"
              onChange={formik.handleChange}
              value={formik.values.content}
              onBlur={handleBlur("content")}
            />
            <ErrorMsg formik={formik} type={"content"} />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Select
              value={formik.values.category.category_id}
              onValueChange={handleCategoryChange}
              onOpenChange={(open) =>
                !open && formik.setFieldTouched("category.category_id", true)
              }
            >
              <SelectTrigger dir="rtl" className="w-[200px] ">
                <SelectValue placeholder="اختر تصنيفًا" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {categories?.categories?.map((category) => (
                  <SelectItem key={category?._id} value={category?._id}>
                    {category?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.category?.category_id && formik.errors.category && (
              <div className="text-sm text-red-500">
                {formik.errors.category.category_id}
              </div>
            )}
          </div>

          {/* Anonymous Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="isAnonymous"
              checked={formik.values.isAnonymous}
              onCheckedChange={(checked) =>
                formik.setFieldValue("isAnonymous", checked)
              }
            />
            <Label htmlFor="isAnonymous" className="cursor-pointer">
              نشر بشكل مجهول
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary cursor-pointer hover:bg-primary/90 px-6 py-2 rounded-md"
              disabled={!formik.isValid || formik.isSubmitting || isPending}
            >
              {isPending ? (
                <>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>جاري التحميل ...</span>
                  </div>
                </>
              ) : (
                <>
                  <span>نشر</span>
                  <Pencil className="h-4 w-4 mr-2 " />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
