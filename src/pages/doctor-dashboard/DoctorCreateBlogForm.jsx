import BlogFormWrapper from "@/components/layout/dashboard/doctor-dashboard/BlogForm/BlogFormWrapper";
import blogSchema from "@/components/layout/dashboard/doctor-dashboard/BlogForm/validation";
import { Card } from "@/components/ui/card";
import { useAddBlog } from "@/hooks/Actions/blogs/useCurdBlogs";
import { useGetAllCategories } from "@/hooks/Actions/categories/useCurdCategories";
import handleUploadFiles from "@/services/uploadImage";
import "@uiw/react-md-editor/markdown-editor.css";
import { useFormik } from "formik";
import { useCallback, useState } from "react";

export default function DoctorCreateBlogForm({
  handleOpenModal,
  editBlog,
  onUpdateBlog,
  isUpdating,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    editBlog?.post_image?.url || null
  );

  const { mutate, isPending } = useAddBlog();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategories();

  const isEditMode = editBlog;

  const handleSubmit = async (values, formikBag) => {
    try {
      let uploadedImage = null;
      if (selectedImage && selectedImage instanceof File) {
        uploadedImage = await handleUploadFiles(selectedImage);
      }
      // Remove the raw file from payload
      const { ...restValues } = values;
      const blogValues = {
        ...restValues,
        ...(uploadedImage
          ? { post_image: uploadedImage.result }
          : editBlog?.post_image
          ? { post_image: editBlog.post_image }
          : {}),
      };
      if (isEditMode && onUpdateBlog) {
        await onUpdateBlog(blogValues, formikBag);
      } else {
        mutate({
          data: blogValues,
          onSuccess: () => {
            formik.resetForm();
            handleOpenModal();
          },
        });
      }
    } catch (error) {
      console.error("Error Adding/Updating:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: editBlog?.title || "",
      category: editBlog?.category || { category_id: "", category_name: "" },
      content: editBlog?.content || "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema: blogSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
        formik.setFieldValue("image", file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [formik]
  );

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    formik.setFieldValue("image", null);
  }, [formik]);

  const handleCategoryChange = useCallback(
    (value) => {
      const selectedCategory = categories.find((cat) => cat._id === value);
      if (selectedCategory) {
        formik.setFieldValue("category", {
          category_id: selectedCategory._id,
          category_name: selectedCategory.name,
        });
      }
    },
    [categories, formik]
  );

  return (
    <div className="py-5 px-10 flex justify-center items-center bg-background/80 w-full fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-4xl">
        <Card className="w-full shadow-lg border-0 rounded-xl overflow-hidden">
          <BlogFormWrapper
            isUpdating={isUpdating}
            editBlog={editBlog}
            formik={formik}
            isPending={isPending}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            categoriesLoading={categoriesLoading}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
            selectedImage={selectedImage}
          />
        </Card>
      </form>
    </div>
  );
}

// <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//   <h4 className="text-sm font-medium text-gray-700 mb-2">
//     معاينة Markdown
//   </h4>
//   <div className="bg-white rounded border border-gray-200 p-4 max-h-60 overflow-y-auto">
//     <MDEditor.Markdown
//       source={formik.values.content}
//       style={{
//         backgroundColor: "transparent",
//         fontSize: "14px",
//         lineHeight: "1.6",
//       }}
//     />
//   </div>
// </div>
