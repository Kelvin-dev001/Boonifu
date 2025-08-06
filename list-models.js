const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

(async () => {
  try {
    const models = await openai.models.list();
    console.log(models.data.map(m => m.id));
  } catch (error) {
    console.error(error);
  }
})();