// Actually calls Hugging Face, not Replicate (rename if preferred)
import fetch from "node-fetch";

const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
const API_TOKEN = process.env.HF_API_TOKEN; // Store securely in .env

export async function generateSDXLBackground(prompt: string): Promise<Buffer> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) throw new Error(`SDXL API failed: ${response.statusText}`);

  return Buffer.from(await response.arrayBuffer());
}