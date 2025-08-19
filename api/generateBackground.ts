import { sdxlPrompts } from "../lib/sdxlPrompts";
import { generateSDXLBackground } from "../lib/replicateClient";
import { createJob, updateJobStatus } from "../lib/jobStatus";
import { uploadImageToCloudinary } from "../lib/cloudinaryUpload";

export async function generateBackground(req, res) {
  const { style } = req.body;
  const prompt = sdxlPrompts[style];
  if (!prompt) return res.status(400).json({ error: "Invalid style" });

  const job = await createJob({ type: "background", promptKey: style, prompt, status: "running" });

  try {
    const imageBuffer = await generateSDXLBackground(prompt);
    const imageUrl = await uploadImageToCloudinary(imageBuffer, `backgrounds/${job._id}`);

    await updateJobStatus(job._id, "done", imageUrl);

    res.json({ jobId: job._id, status: "done", imageUrl });
  } catch (err) {
    await updateJobStatus(job._id, "error");
    res.status(500).json({ jobId: job._id, status: "error", error: err.message });
  }
}