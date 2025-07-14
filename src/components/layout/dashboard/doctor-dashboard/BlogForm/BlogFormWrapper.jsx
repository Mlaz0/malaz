import ErrorMsg from "@/components/layout/auth/ErrorMsg";
import BoxUploadImg from "@/components/shared/BoxUploadImg";
import BtnSubmit from "@/components/shared/BtnSubmit";
import ImgPreview from "@/components/shared/ImgPreview";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@uiw/react-md-editor/markdown-editor.css";
import MarkdownEditor from "./MarkdownEditor";

const BlogFormWrapper = ({
  formik,
  isPending,
  editBlog,

  handleCategoryChange,
  categories,
  categoriesLoading,
  imagePreview,
  handleImageChange,
  removeImage,
  selectedImage,
}) => {
  return (
    <>
      <CardHeader className="space-y-1 pb-6 border-b">
        <div className="flex items-center justify-between ">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-primary">
              إنشاء تدوينة جديدة
            </CardTitle>
            <CardDescription className="">
              اكتب محتوى رائع لمشاركته مع جمهورك
            </CardDescription>
          </div>

          <BtnSubmit
            formik={formik}
            isPending={isPending}
            text={editBlog ? "تحديث التدوينة" : "انشاء التدوينة"}
            width="200px"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Title Field */}
          <div className="space-y-2 w-full sm:w-1/2">
            <div className="flex justify-between items-center">
              <Label htmlFor="title">العنوان</Label>
              <span className="text-xs text-muted-foreground">
                {formik.values.title.length}
              </span>
            </div>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="أدخل عنوان التدوينة..."
              className="h-11"
            />
            <ErrorMsg formik={formik} type="title" />
          </div>

          {/* Category Field */}
          <div className="space-y-2 w-full sm:w-1/2">
            <Label htmlFor="category">الفئة</Label>
            <Select
              onValueChange={handleCategoryChange}
              value={formik.values.category.category_id}
              onOpenChange={(open) =>
                !open && formik.setFieldTouched("category.category_id", true)
              }
              disabled={categoriesLoading}
            >
              <SelectTrigger dir="rtl" className=" py-5 w-full ">
                <SelectValue
                  placeholder={
                    categoriesLoading ? "جاري تحميل الفئات..." : "اختر الفئة"
                  }
                />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.category?.category_id &&
              formik.errors.category?.category_id && (
                <span className="text-xs text-destructive">
                  {formik.errors.category?.category_id}
                </span>
              )}
          </div>
        </div>

        {/* Content Field */}
        <MarkdownEditor formik={formik} />

        {/* Featured Image Field */}
        <div className="space-y-2">
          <Label className="text-foreground">الصورة المميزة (اختيارية)</Label>
          <div className="space-y-4">
            {!imagePreview ? (
              <BoxUploadImg handleImageChange={handleImageChange} />
            ) : (
              <ImgPreview
                imagePreview={imagePreview}
                removeImage={removeImage}
                selectedImage={selectedImage}
              />
            )}
            <ErrorMsg formik={formik} type="image" />
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default BlogFormWrapper;
