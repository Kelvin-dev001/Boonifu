import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let prompt = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      prompt = formData.get("prompt")?.toString() || "";
    } else {
      const data = await req.json();
      prompt = data.prompt || "";
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const openaiResponse = await openai.images.generate({
      prompt,
      model: "dall-e-2",
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const imageUrl = openaiResponse.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error("Failed to generate poster image from OpenAI.");
    }

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error("OpenAI error:", err); // Add this for debugging!
    return NextResponse.json({ error: err?.message || "Failed to generate poster." }, { status: 500 });
  }
}