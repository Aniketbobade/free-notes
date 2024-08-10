const cloudinary = require("cloudinary").v2;
const path = require("path");
const uploadDocument = async (filePath, folder) => {
    // console.log("file details",file);
    let fileName=path.basename(filePath).split(".")[0];
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        public_id: `${fileName}_${Date.now()}`,
        resource_type: "auto",
      });
      return result;
    } catch (error) {
       console.error("Upload error:", error);
      throw error;
    }
};

const deleteDocument = async (publicId,resource_type) => {
  try {
    console.log("rescource_type",resource_type)
    const result = await cloudinary.uploader.destroy(publicId, 
      {resource_type: resource_type });
    console.log('Delete Result:', result);
    return true
} catch (error) {
    console.error('Error deleting file:', error);
    return false
}
}
module.exports = { uploadDocument, deleteDocument };
