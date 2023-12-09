const OpenAI = require("openai");
const { BadRequestError } = require("../errors");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

exports.askQuestion = async (payload) => {
  try {
    const { prompt, question, ...otherPayload } = payload;

    const answer = await openai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: question },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 256,
      ...otherPayload,
    });

    return answer;
  } catch (err) {
    if (err?.error?.code === "context_length_exceeded") {
      throw new BadRequestError(
        "Context length exceeded, the message length is too long"
      );
    }
    throw new BadRequestError("An error related to openai occurred");
  }
};
