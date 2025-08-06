export type PosterFormData = {
  business: string;
  message: string;
  vibe: string;
  logo?: File | null;    // For upload
  logoUrl?: string | null; // For referencing the uploaded URL
};

export function buildImagePrompt({ business, message, vibe, logoUrl }: PosterFormData): string {
  // Optionally include logoUrl in your prompt for debugging or if your AI model can use it.
  // You may also want to just pass it as a payload parameter to your backend.
  return `Create a ${vibe} poster for "${business}" with the message: "${message}".`;
}

export async function generatePosterImage(
  form: PosterFormData,
  recaptchaToken?: string
): Promise<{ imageUrl: string }> {
  const prompt = buildImagePrompt(form);

  // If you want to send only URL (logo has been uploaded), use JSON payload.
  const payload: Record<string, any> = {
    prompt,
    logoUrl: form.logoUrl || undefined, // Send logoUrl if available
    recaptcha: recaptchaToken || undefined,
  };

  // If you still want to support direct file uploads, use FormData as before.
  // Here, we favor sending logoUrl if present, otherwise send logo file.
  let body: FormData | string;
  let headers: Record<string, string> = {};

  if (form.logo && !form.logoUrl) {
    // If direct file upload
    const fd = new FormData();
    fd.append("prompt", prompt);
    fd.append("logo", form.logo);
    if (recaptchaToken) fd.append("recaptcha", recaptchaToken);
    body = fd;
    // Don't set Content-Type on fetch, browser will do it for FormData
  } else {
    // Use JSON if using logoUrl
    body = JSON.stringify(payload);
    headers["Content-Type"] = "application/json";
  }

  // Replace with your backend API endpoint:
  const res = await fetch("/api/generate-poster", {
    method: "POST",
    body,
    headers,
  });

  if (!res.ok) throw new Error("Failed to generate poster.");
  return await res.json(); // { imageUrl: ... }
}