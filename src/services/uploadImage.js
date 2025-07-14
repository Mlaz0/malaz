import axios from "axios";

const handleUploadFiles = async (inputFiles) => {
  const formData = new FormData();

  const files = Array.isArray(inputFiles) ? inputFiles : [inputFiles];
  const isSingle = files.length === 1;

  files.forEach((file) => {
    formData.append(isSingle ? "file" : "files", file);
  });

  try {
    const response = await axios.post(
      "https://mlaz-backend.vercel.app/api/upload/proxy",
      formData,
      {
        headers: {
          "x-upload-type": isSingle ? "single" : "multi",
        },
      }
    );

    if (response.data.status === "success") {
      return response?.data;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
};

export default handleUploadFiles;
