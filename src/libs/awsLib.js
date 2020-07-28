import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  if (!file) {
    return null;
  }
  var dateObj = new Date(Date.now());
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const filename = `${year}/${month}/${day}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });
  console.log(stored);
  console.log(stored.key);
  return "https://econmag-bucket.s3.amazonaws.com/public/" + stored.key;
}
