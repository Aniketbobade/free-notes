const cloudinary = require("cloudinary").v2;

const uploadDocument = async (file, folder) => {
    // console.log("file details",file);
    let fileName=file.originalFilename.split(".");
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        public_id: `${fileName[0]}_${Date.now()}`,
        resource_type: "raw",
      });
      // console.log("Upload successful:", result);
      return result;
    } catch (error) {
      // console.error("Upload error:", error);
      throw error;
    }
};

module.exports = { uploadDocument };
