import { Storage } from "aws-amplify";

export async function s3Upload(file) {
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
  return stored.key;
}
