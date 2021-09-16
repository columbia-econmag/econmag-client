import { Storage } from "aws-amplify";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export async function s3Upload(file) {
  if (!file) {
    return null;
  }

  const compressedFile = await imageCompression(file, options);
  const filename = `ImageIssue/${file.name}`;

  const stored = await Storage.put(filename, compressedFile, {
    contentType: compressedFile.type,
  });
  return "https://econmag-bucket.s3.amazonaws.com/public/" + stored.key;
}
