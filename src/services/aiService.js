const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

exports.askQuestion = async (payload) => {
  const { prompt, question } = payload;

  const answer = await openai.chat.completions.create({
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: question },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 256,
  });

  return answer;
};
