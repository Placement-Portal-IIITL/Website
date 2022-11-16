// Generates a Google Drive Viewable link from given Google
// drive URL.
// NOTE : File Must be accessible to anyone
// Parameter : driveSharedURL => Google Drive File Link
const generateViewURL = (driveSharedURL) => {
  const GeneralFileURL = "https://drive.google.com/file/d/";
  const documentId = driveSharedURL.replace(GeneralFileURL, "").split("/")[0];
  const GeneralFileViewURL = "https://drive.google.com/uc?export=view&id=";
  const driveViewURL = GeneralFileViewURL + documentId;
  return driveViewURL;
};

export default generateViewURL;
