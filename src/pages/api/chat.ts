import { ChatGPTAPI } from "chatgpt";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize ChatGPT API with environment variables
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, parentMessageId, projectContext } = req.body;

    // Build system message with project context if provided
    let systemMessage = "You are a helpful AI assistant.";
    if (projectContext) {
      systemMessage = `You are a helpful AI assistant discussing the project "${projectContext.title}". 
        Project description: ${projectContext.description}
        Project URL: ${projectContext.url}`;
    }

    // Send message to ChatGPT API with context
    const chatResponse = await api.sendMessage(text, {
      parentMessageId,
      systemMessage,
    });

    // Return response with message ID for maintaining conversation history
    return res.status(200).json({
      detail: chatResponse.detail,
      parentMessageId: chatResponse.id,
      text: chatResponse.text
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