import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION!,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true'
});

const handler = async (req, res) => {
  try {
    const form = formidable();
    
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Get the first file from files object since formidable changed its API
    const fileArray = Object.values(files);
    if (!fileArray.length) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const file = Array.isArray(fileArray[0]) ? fileArray[0][0] : fileArray[0];

    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'Invalid file upload' });
    }

    // Validate environment variables
    if (!process.env.AWS_S3_BUCKET || !process.env.AWS_ENDPOINT) {
      console.error('Missing required environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const fileData = fs.readFileSync(file.filepath);

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `profile-pictures/${uniqueSuffix}.jpg`;

    // Upload to S3 with public-read ACL
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Body: fileData,
      ContentType: 'image/jpeg',
      ACL: 'public-read', // Make object publicly readable
    });

    await s3Client.send(command);

    // Return the DigitalOcean Spaces URL
    const url = `${process.env.AWS_ENDPOINT}/${process.env.AWS_S3_BUCKET}/${filename}`;

    return res.status(200).json({ url });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

export default handler;
