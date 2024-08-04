const cloudinary = require("cloudinary").v2;
const path = require("path");
const uploadDocument = async (filePath, folder) => {
    // console.log("file details",file);
    console.log(filePath)
    let fileName=path.basename(filePath).split(".")[0];
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        public_id: `${fileName}_${Date.now()}`,
        resource_type: "auto",
      });
       console.log("Upload successful:", result);
      return result;
    } catch (error) {
       console.error("Upload error:", error);
      throw error;
    }
};

module.exports = { uploadDocument };
