import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const BtnSubmit = ({ formik, isPending, text, width = "full" }) => {
  const widthClass =
    {
      full: "w-full",
      fit: "w-fit",
      auto: "w-auto",
    }[width] || `w-[${width}]`;

  return (
    <Button
      disabled={isPending}
      // disabled={!(formik.isValid && formik.dirty) || isPending}
      type="submit"
      className={`${widthClass} rounded-[6px] bg-primary hover:bg-primary/90 cursor-pointer`}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>جاري التحميل ...</span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default BtnSubmit;
