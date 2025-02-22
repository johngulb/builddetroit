import { ChatGPTAPI } from "chatgpt";

const handler = async (req, res) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const message = req.body.text;
  const parentMessageId = req.body.parentMessageId;

  const chatRes = await api.sendMessage(message, {
    parentMessageId,
  });

  console.log(chatRes.text);

  res.status(200).json(chatRes);
};

export default handler;


// I was here last year, on my way to ETH Denver. This year I feel much better about going into the conference. We have the opportunity to change how we fund community initiatives through creators coming together.