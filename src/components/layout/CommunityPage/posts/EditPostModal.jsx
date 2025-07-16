import { Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePatchPost } from "@/hooks/Actions/posts/usePostsCurds";
import { useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import ErrorMsg from "../../auth/ErrorMsg";

export function EditPostModal({ post, isOpen, onClose }) {
  const { mutate, isPending } = usePatchPost();

  const handleSubmit = (values) => {
    if (!post?._id) return;
    mutate(
      { data: values, id: `/${post._id}` },
      {
        onSuccess: () => {
          formik.resetForm();
          onClose();
        },
      }
    );
  };

  let validationSchema = useMemo(() => {
    return Yup.object({
      title: Yup.string().min(1).max(60).trim(),
      content: Yup.string().max(2000).trim(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-2xl bg-background rounded-lg shadow-xl"
      >
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              تعديل المنشور
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8 cursor-pointer"
            >
              <X className="h-4 w-4 text-destructive cursor-pointer" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان المنشور</Label>
              <Input
                id="title"
                name="title"
                placeholder=" عنوان المنشور"
                className="w-full  dark:bg-background "
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
            </div>
            <ErrorMsg formik={formik} type={"title"} />
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="content">المحتوى</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="ماذا تفكر؟"
                rows={5}
                className="w-full min-h-[100px] resize-none dark:bg-background "
                onChange={formik.handleChange}
                value={formik.values.content}
                onBlur={formik.handleBlur}
              />
            </div>
            <ErrorMsg formik={formik} type={"content"} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              className="px-6 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
              variant="destructive "
              onClick={onClose}
            >
              إلغاء
            </Button>
            <Button
              disabled={!(formik.isValid && formik.dirty) || isPending}
              type="submit"
              className="bg-primary cursor-pointer hover:bg-primary/90 px-6 py-2 rounded-md"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>تعديل...</span>
                </div>
              ) : (
                "تعديل"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
