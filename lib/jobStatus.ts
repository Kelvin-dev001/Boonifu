import { JobModel } from "../models/Job";

// Create a new job
export async function createJob(data) {
  const job = await JobModel.create(data);
  return job;
}

// Update job status
export async function updateJobStatus(jobId, status, resultUrl = null) {
  await JobModel.findByIdAndUpdate(jobId, { status, resultUrl });
}

// Poll job status
export async function getJobStatus(jobId) {
  return await JobModel.findById(jobId);
}