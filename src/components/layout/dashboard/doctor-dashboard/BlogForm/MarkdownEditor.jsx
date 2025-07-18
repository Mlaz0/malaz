import { Label } from "@/components/ui/label";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

const MarkdownEditor = ({ formik }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-foreground">المحتوى</Label>
        {formik.touched.content && formik.errors.content && (
          <span className="text-xs text-destructive">
            {formik.errors.content}
          </span>
        )}
      </div>
      <div
        className={`border rounded-lg overflow-hidden ${
          formik.touched.content && formik.errors.content
            ? "border-destructive"
            : "border-input"
        }`}
        data-color-mode="light"
      >
        <MDEditor
          value={formik.values.content}
          onChange={(val) => formik.setFieldValue("content", val)}
          onBlur={() => formik.setFieldTouched("content", true)}
          preview="edit"
          height={150}
          dir="rtl"
          textareaProps={{
            placeholder: "اكتب محتوى التدوينة ...",
            style: {
              fontSize: 14,
              lineHeight: 1.6,
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
