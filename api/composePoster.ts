import { composePoster } from "../lib/sharpCompose";
import { createJob, updateJobStatus } from "../lib/jobStatus";

export async function composePosterEndpoint(req, res) {
  const { backgroundUrl, headline, subhead, cta, footer, logoUrl, preview } = req.body;
  const job = await createJob({ type: "poster", status: "running" });

  try {
    const { printBuffer, socialBuffer } = await composePoster({
      backgroundUrl,
      headline,
      subhead,
      cta,
      footer,
      logoUrl,
      preview,
    });

    // Save printBuffer and socialBuffer to storage, get URLs
    const printUrl = await saveImageToS3(printBuffer, job._id + "_print.png");
    const socialUrl = await saveImageToS3(socialBuffer, job._id + "_social.png");

    await updateJobStatus(job._id, "done", { printUrl, socialUrl });
    res.json({ jobId: job._id, status: "done", printUrl, socialUrl });
  } catch (err) {
    await updateJobStatus(job._id, "error");
    res.status(500).json({ jobId: job._id, status: "error", error: err.message });
  }
}