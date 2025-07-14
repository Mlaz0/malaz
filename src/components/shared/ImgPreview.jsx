import { ImageIcon, X } from "lucide-react";
import { Button } from "../ui/button";

const ImgPreview = ({ imagePreview, removeImage, selectedImage }) => {
  return (
    <div className="relative group">
      <div className="relative w-48 overflow-hidden rounded-lg border border-muted">
        <img
          src={imagePreview}
          alt="معاينة الصورة المميزة"
          className="w-48 h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="shadow-sm"
          >
            <X className="w-4 h-4 mr-1" />
            إزالة
          </Button>
        </div>
      </div>
      <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
        <ImageIcon className="w-4 h-4" />
        <span>{selectedImage?.name}</span>
      </div>
    </div>
  );
};

export default ImgPreview;
