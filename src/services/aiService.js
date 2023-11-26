const OpenAI = require("openai");
const { BadRequestError } = require("../errors");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

exports.askQuestion = async (payload) => {
  try {
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
  } catch (err) {
    throw new BadRequestError("An error related to openai occurred");
  }
};
