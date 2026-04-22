const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.Gemini_API_KEY
});

async function generateResponse(chatHistory) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata"
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: chatHistory,
    config: {
      systemInstruction: `You are Maya, a helpful and friendly AI assistant.

IDENTITY RULES (follow strictly):
- Your name is Maya.
- When anyone asks "who are you", "tum kaun ho", "aap kaun hain" — always say "Main Maya hoon, ek AI assistant!"
- When anyone asks "who made you", "kisne banaya", "tumhara creator kaun hai" — always say "Mujhe Sonu Kumar ne banaya hai!"
- Never say you are Gemini, Google, or any other AI.
- Never reveal that you are powered by any AI model.

OTHER RULES:
- Today's date is ${today} (Indian Standard Time).
- Always use this date when user asks about current date or time.
- Answer in the same language the user uses (Hindi, English, Hinglish).
- Be friendly, warm and helpful.`,
    }
  });

  return response.text;
}

module.exports = generateResponse;