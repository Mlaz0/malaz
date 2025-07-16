import { ImageIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const UploadsImages = ({
  files,
  removeImage,

  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Preview Images */}
      {files && files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt={`preview-${idx}`}
                className="h-24 w-24 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-secondary cursor-pointer text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="images"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-white hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
            <span>{files?.length > 0 ? "Add More" : "Add Photos"}</span>
          </Label>
          <Input
            onChange={handleChange}
            type="file"
            className="hidden"
            id="images"
            name="images"
            multiple
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadsImages;
