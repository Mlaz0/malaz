import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import ErrorMsg from "../ErrorMsg";

const RegisterDoctorFelids = ({
  addSpecialization,
  removeSpecialization,
  selectedSpecializations,
  specializations,
  formik,
  selectedCertifications,
  setSelectedCertifications,
}) => {
  return (
    <>
      {/* Specializations */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block">
          التخصصات
        </label>
        <Select onValueChange={addSpecialization}>
          <SelectTrigger className="text-right">
            <SelectValue placeholder="أضف تخصص" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec._id} value={spec.name}>
                {spec.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 justify-end">
          {selectedSpecializations.map((spec) => (
            <Badge
              key={spec}
              variant="secondary"
              className="flex items-center gap-1 cursors-pointer"
              onClick={() => removeSpecialization(spec)}
            >
              <X className="h-3 w-3 cursor-pointer" />
              {spec}
            </Badge>
          ))}
        </div>
        <ErrorMsg formik={formik} type="specializations" />
      </div>

      {/* Certifications - File Upload */}
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right block">
          الشهادات (رفع الصور)
        </label>

        {/*  File Upload Area */}
        <div
          className="relative border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("border-blue-500", "bg-blue-100");
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("border-blue-500", "bg-blue-100");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("border-blue-500", "bg-blue-100");
            const files = Array.from(e.dataTransfer.files).filter((file) =>
              file.type.startsWith("image/")
            );
            if (files.length > 0) {
              const newCertifications = [...selectedCertifications, ...files];
              setSelectedCertifications(newCertifications);
              formik.setFieldValue("certifications", newCertifications);
            }
          }}
          onClick={() =>
            document.getElementById("certification-upload").click()
          }
        >
          <input
            id="certification-upload"
            type="file"
            accept="image/*,.pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const newCertifications = [...selectedCertifications, ...files];
              setSelectedCertifications(newCertifications);
              formik.setFieldValue("certifications", newCertifications);
            }}
          />

          {/* Upload Icon */}
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              اسحب ملفات الشهادات هنا
            </h3>
            <p className="text-sm text-gray-600">
              أو <span className="text-blue-600 font-medium">انقر للتصفح</span>
            </p>
            <p className="text-xs text-gray-500">
              يدعم: JPG, PNG, GIF حتى 5 ميجابايت لكل ملف
            </p>
          </div>

          {/* Upload Stats */}
          {selectedCertifications.length > 0 && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              تم رفع {selectedCertifications.length} ملف
            </div>
          )}
        </div>

        {/* Display uploaded files with modern cards */}
        {selectedCertifications.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCertifications([]);
                  formik.setFieldValue("certifications", []);
                }}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                مسح الكل
              </Button>
              <h4 className="text-sm font-semibold text-gray-900">
                الشهادات المرفوعة
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCertifications.map((file, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* File Info Header */}
                  <div className="flex items-start justify-between mb-3">
                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = selectedCertifications.filter(
                          (_, i) => i !== index
                        );
                        setSelectedCertifications(updated);
                        formik.setFieldValue("certifications", updated);
                      }}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="flex-1 min-w-0 text-right">
                      <h5 className="text-sm font-medium text-gray-900 truncate pl-2">
                        {file.name}
                      </h5>
                      <div className="flex items-center justify-end space-x-2 space-x-reverse mt-1">
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} ميجابايت
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          {file.type.split("/")[1].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ErrorMsg formik={formik} type="certifications" />

                  {/* files Preview */}
                  {file.type.startsWith("image/") ? (
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`شهادة ${index + 1}`}
                        className="w-full h-32 object-cover transition-transform duration-200 group-hover:scale-105"
                        onLoad={(e) => {
                          setTimeout(
                            () => URL.revokeObjectURL(e.target.src),
                            1000
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-lg bg-gray-100 p-4 text-center">
                      <p className="text-sm text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">PDF File</p>
                    </div>
                  )}

                  {/* Upload Success Indicator */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-green-500 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterDoctorFelids;

//   {formik.touched.certifications && formik.errors.certifications && (
//     <p className="text-sm font-medium text-destructive flex items-center justify-end space-x-1 space-x-reverse">
//       <span>{formik.errors.certifications}</span>
//       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//         <path
//           fillRule="evenodd"
//           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </p>
//   )}
