import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const ArtworkSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const openai = new OpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const systemPrompt = `You are an art expert who can analyze images and create compelling titles and descriptions for artwork. 
    Look at the provided image and create an engaging title and detailed description that captures the essence of the artwork.`;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: [
            { type: "text", text: "Please create a title and description for this artwork:" },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        },
      ],
      response_format: zodResponseFormat(ArtworkSchema, "artwork"),
    });
    
    const artwork = completion.choices[0].message.parsed;

    return res.status(200).json({
      artwork,
    });

  } catch (error) {
    console.error("Artwork API Error:", error);
    return res.status(500).json({ 
      error: "Failed to generate artwork title and description",
      detail: error.message
    });
  }
};

export default handler;
