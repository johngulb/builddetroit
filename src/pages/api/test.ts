import { ChatGPTAPI } from "chatgpt";

const handler = async (req, res) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const message = req.query.text;
  const parentMessageId = req.query.parentMessageId;

  const chatRes = await api.sendMessage(message, {
    parentMessageId
  });

  console.log(chatRes.text);

  res.status(200).json(chatRes);
};

export default handler;
