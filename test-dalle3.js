const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Use env variable instead
(async () => {
  try {
    const result = await openai.images.generate({
      model: "dall-e-2",
      prompt: "Create a poster of a futuristic city skyline at sunset, vibrant colors, high detail, digital art",
      n: 1,
      size: "1024x1024"
    });
    console.log(result.data[0].url);
  } catch (e) {
    console.error("OpenAI error:", e);
  }
})();