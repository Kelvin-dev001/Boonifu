const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Use env variable instead
(async () => {
  try {
    const result = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "Say hello world",
      max_tokens: 5,
    });
    console.log("API key is valid! Response:", result.choices[0].text);
  } catch (error) {
    console.error("API key test failed:", error.message || error);
  }
})();