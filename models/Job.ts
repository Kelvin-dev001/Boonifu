import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "background" or "poster"
  promptKey: String,
  prompt: String,
  status: { type: String, default: "pending" }, // pending, running, done, error
  timings: Object,
  resultUrl: String, // S3 or local path, etc
  error: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const JobModel = mongoose.models.Job || mongoose.model("Job", JobSchema);