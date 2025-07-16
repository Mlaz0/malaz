import { Check, Edit, Loader2, Subscript, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorMsg from "../../auth/ErrorMsg";

const EditComment = ({ formik, handleCancel, isPending }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      <div>
        <Input
          id="text"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full  dark:bg-background "
          autoFocus
        />
        <ErrorMsg formik={formik} type={"text"} />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          variant="default"
          size="sm"
          className="h-8 gap-1 cursor-pointer "
          disabled={!(formik.isValid && formik.dirty) || isPending}
        >
          <Edit className="w-3 h-3 " />
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>حفظ التعليق ....</span>
            </div>
          ) : (
            "حفظ التعليق"
          )}
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          className="h-8 gap-1 cursor-pointer bg-destructive hover:bg-destructive/70"
        >
          <X className="w-3 h-3" />
          إلغاء
        </Button>
      </div>
    </form>
  );
};

export default EditComment;
