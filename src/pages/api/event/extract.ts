import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const regex = /[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/gis;

const jsonFromString = (str: string) => {
  const matches = str.match(regex);
  return Object.assign({}, ...matches.map((m) => JSON.parse(m)));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // Download image from URL
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract event details from this image in JSON format with the following fields: title, description, start_datetime, end_datetime, venue, organizer, price (if shown), tags. If any field is not visible in the image, omit it from the JSON."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    console.log(response.choices[0]);

    const eventDetails = jsonFromString(response.choices[0].message.content || '{}');

    return res.status(200).json(eventDetails);

  } catch (error) {
    console.error('Error extracting event details:', error);
    return res.status(500).json({ 
      message: 'Error extracting event details',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
