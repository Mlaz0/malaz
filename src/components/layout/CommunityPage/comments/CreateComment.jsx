import { useFormik } from "formik";
import { Loader2, Send } from "lucide-react";
import { useMemo } from "react";
import * as Yup from "yup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorMsg from "../../auth/ErrorMsg";
import { useAddComments } from "@/hooks/Actions/comments/useCommentsCurds";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";
import endPoints from "@/config/endPoints";
const CreateComment = ({ postId }) => {
  const { data: doctorProfile } = useGetUserProfile();
  const { mutate, isPending } = useAddComments(
    postId ? `${endPoints.addComment}/${postId}` : endPoints.addComment
  );

  /* =========== Handle Add Comment =========== */

  const handleSubmit = (values) => {
    if (!postId) return;

    mutate(
      { data: values },
      {
        onSuccess: () => {
          formik.resetForm();
        },
      }
    );
  };

  /* =========== validationSchema =========== */

  let validationSchema = useMemo(() => {
    return Yup.object({
      text: Yup.string()
        .min(1)
        .max(2000)
        .trim()
        .required("Content is required"),
    });
  }, []);

  /* =========== Formik =========== */

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const handleBlur = (field) => (e) => {
    formik.handleBlur(e);
    if (formik.values[field].trim() === "") {
      formik.setFieldTouched(field, false);
    } else {
      formik.validateField(field);
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex gap-3 items-start w-full"
    >
      <Avatar className="w-9 h-9 mt-1 flex-shrink-0">
        <AvatarImage src={""} alt={""} className="object-cover" />
        <AvatarFallback className="bg-gray-200 dark:bg-gray-600">
          {""}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Input
              id="text"
              name="text"
              placeholder="Write a comment..."
              className="w-full  dark:bg-background "
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.value === "") {
                  formik.setFieldTouched("text", false);
                }
              }}
              value={formik.values.text}
              onBlur={handleBlur("text")}
            />
          </div>

          <Button
            disabled={!(formik.isValid && formik.dirty) || isPending}
            type="submit"
            size="sm"
            className="rounded-full h-9 px-4 cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Posting...</span>
              </div>
            ) : (
              <Send />
            )}
          </Button>
        </div>

        <ErrorMsg formik={formik} type="text" className="mt-1 ml-2" />
      </div>
    </form>
  );
};

export default CreateComment;
