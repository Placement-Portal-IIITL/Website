// Generates a Google Drive Downloadable link from given Google
// drive URL.
// NOTE : File Must be accessible to anyone
// Parameter : driveSharedURL => Google Drive File Link
const generateDownloadURL = (driveSharedURL) => {
  const GeneralFileURL = "https://drive.google.com/file/d/";
  const documentId = driveSharedURL.replace(GeneralFileURL, "").split("/")[0];
  const suffix = "&export=download";
  return "https://drive.google.com/uc?id=" + documentId + suffix;
};

export default generateDownloadURL;
