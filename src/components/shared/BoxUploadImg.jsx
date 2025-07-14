import { Upload } from "lucide-react";

const BoxUploadImg = ({ handleImageChange }) => {
  return (
    <div className="relative">
      <input
        type="file"
        id="featured-image"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <label
        htmlFor="featured-image"
        className="block border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary transition-colors bg-muted/50 cursor-pointer"
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              انقر لتحميل صورة
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF حتى 10 ميجابايت
            </p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default BoxUploadImg;
