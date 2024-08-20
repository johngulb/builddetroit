const fs = require('fs');
const path = require('path');
const aws = require("aws-sdk");

const s3Bucket = "dpop"; // replace with your bucket name

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: '', // replace with your access key
  secretAccessKey: '', // replace with your secret   key
});

const getExtension = str => str.slice(str.lastIndexOf("."));

// Function to upload file
const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Base file name (without directory path)
  const baseName = path.basename(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: s3Bucket,
    Key: `uploads/${baseName}`, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'video/mp4', // Adjust based on your file type
    ACL: 'public-read', // or 'private', depending on your needs
    // ACL: "public-read",
    // Bucket: s3Bucket,
    // Key: objectName,
    // Body: objectData,
    // ContentType: objectType,
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

(async () => {
    // await uploadFile('../../public/videos/TF9U6JD6o1HhtzjrLo3Yo0QSCawh0J526FbKWP7p.mp4');
    // await uploadFile('../../public/videos/NvV30TKGBmiLjq4bY0oWaFka9N8UdMYtOEsqJsNi.mp4');
    // await uploadFile('../../public/videos/ErjXR0EkslxyYY92Y7HOiFXtZ8MeAwYwha852pF9.mp4');
    // await uploadFile('../../public/videos/jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mp4');
    await uploadFile('../../public/videos/GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mp4');
    // console.log('result: ', result)
})();
// cvTs7BJfRkhrFiyMXuRatqfFfQZlbFwzzYelVsv6.mp4

// curl https://dpop.nyc3.digitaloceanspaces.com/uploads/TF9U6JD6o1HhtzjrLo3Yo0QSCawh0J526FbKWP7p.mov > TF9U6JD6o1HhtzjrLo3Yo0QSCawh0J526FbKWP7p.mov
// curl https://dpop.nyc3.digitaloceanspaces.com/uploads/NvV30TKGBmiLjq4bY0oWaFka9N8UdMYtOEsqJsNi.mov > NvV30TKGBmiLjq4bY0oWaFka9N8UdMYtOEsqJsNi.mov
// curl https://dpop.nyc3.digitaloceanspaces.com/uploads/ErjXR0EkslxyYY92Y7HOiFXtZ8MeAwYwha852pF9.mov > ErjXR0EkslxyYY92Y7HOiFXtZ8MeAwYwha852pF9.mov
// curl https://dpop.nyc3.digitaloceanspaces.com/uploads/jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mov > jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mov

// ffmpeg -i TF9U6JD6o1HhtzjrLo3Yo0QSCawh0J526FbKWP7p.mov -qscale 0 TF9U6JD6o1HhtzjrLo3Yo0QSCawh0J526FbKWP7p.mp4
// ffmpeg -i NvV30TKGBmiLjq4bY0oWaFka9N8UdMYtOEsqJsNi.mov -qscale 0 NvV30TKGBmiLjq4bY0oWaFka9N8UdMYtOEsqJsNi.mp4
// ffmpeg -i ErjXR0EkslxyYY92Y7HOiFXtZ8MeAwYwha852pF9.mov -qscale 0 ErjXR0EkslxyYY92Y7HOiFXtZ8MeAwYwha852pF9.mp4
// ffmpeg -i jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mov -qscale 0 jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mp4


// curl https://dpop.nyc3.digitaloceanspaces.com/uploads/GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mov > uploads/GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mov
// ffmpeg -i GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mov -qscale 0 GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mp4
