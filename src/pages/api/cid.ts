import { CID } from "multiformats/cid";
import * as json from "multiformats/codecs/json";
import { sha256 } from "multiformats/hashes/sha2";

import aws from "aws-sdk";
const s3Bucket = "dpop"; // replace with your bucket name

const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_ACCESS_KEY_ID, // replace with your access key
  secretAccessKey: process.env.DO_SECRET_ACCESS_KEY, // replace with your secret   key
});

export const generate_cid = async (json_data) => {
  const data = typeof json_data === 'object' ? JSON.stringify(json_data) : json_data;
  const bytes = json.encode(data);
  const hash = await sha256.digest(bytes);
  const cid = CID.create(1, json.code, hash);
  return cid.toString();
};

export const upload = async (json_data) => {
  const data = JSON.stringify(json_data);

  const cid = await generate_cid(data);

  const objectName = cid; // File name which you want to put in s3 bucket
  const objectData = data;
  const objectType = "application/json"; // type of file

  // setup params for putObject
  const params = {
    ACL: "public-read",
    Bucket: s3Bucket,
    Key: objectName,
    Body: objectData,
    ContentType: objectType,
  };
  const result = await s3.putObject(params).promise();
  console.log(
    `File uploaded successfully at https:/` +
      s3Bucket +
      `.s3.do.com/` +
      objectName
  );
  return cid;
};

export default async function handler(req, res) {
  try {
    const cid = await upload(req.body);
    res.status(200).json({ cid });
  } catch (error) {
    console.log("error", error);
    res.status(422).json("error");
  }
}
