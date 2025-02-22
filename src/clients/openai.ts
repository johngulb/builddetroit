export const completion = async (text: string) => {
  const result = await (
    await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: text,
          },
        ],
        // 'prompt': $prompt,
        temperature: 0.3,
        max_tokens: 2300,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
  ).json();
  return result;
};
