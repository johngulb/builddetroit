// import { getEvent } from './index'
import { getEvent } from '../../../../dpop';
import { generate_cid } from '../../cid';
import aws from "aws-sdk";

const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "DO00FG8V288XQEWLNH68", // replace with your access key
  secretAccessKey: "3T0xh8FmbZt6n1m5n3RItrBMNq9Gea8KIpLVTP3NjhI", // replace with your secret   key
});

const handler = async (req, res) => {
    
  const event = await getEvent(req.query.event);

  delete event['rsvps'];
  delete event['check_ins'];
  delete event['comments'];
  console.log(event);

  const data = JSON.stringify(event);

  const cid = await generate_cid(data);

  const s3Bucket = "dpop"; // replace with your bucket name
  const objectName = cid; // File name which you want to put in s3 bucket
  const objectData = data;
  const objectType = "application/json"; // type of file
  try {
    // setup params for putObject
    const params = {
      ACL:'public-read',
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
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log("error", error);
    res.status(422).json("error");
  }
};

export default handler;
