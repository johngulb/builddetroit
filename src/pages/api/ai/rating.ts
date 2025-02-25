import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

const RatingSchema = z.object({
  is_useful: z.boolean(),
  category: z.enum(["question", "comment", "other"]).nullable(),
  explanation_if_not_useful: z.string().nullable(),
  analysis: z.string().nullable(),
  rating: z.number().nullable(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, projectContext } = req.body;

    // Build system message with project context if provided
    let systemMessage = "You are a helpful AI assistant.";
    if (projectContext) {
      systemMessage = `You are a helpful AI assistant discussing the project "${projectContext.title}". 
        Project description: ${projectContext.description}
        Project URL: ${projectContext.url}`;
    }

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: text },
      ],
      response_format: zodResponseFormat(RatingSchema, "rating"),
    });
    
    const rating = completion.choices[0].message.parsed;

    // Return response with message ID for maintaining conversation history
    return res.status(200).json({
      rating,
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ 
      error: "Failed to get response from ChatGPT",
      detail: error.message
    });
  }
};

export default handler;