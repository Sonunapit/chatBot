const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:process.env.Gemini_API_KEY
});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  return response.text;
}

module.exports = generateResponse