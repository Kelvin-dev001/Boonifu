"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { generatePosterImage, PosterFormData } from "../utils/promptEngine";
import { savePosterToFirestore } from "../utils/savePosterToFirestore";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { uploadLogoToStorage } from "../utils/uploadLogoToStorage"; // <-- Import this utility!

// --- TYPES ---
type PosterGeneratorFormProps = {
  onClose: () => void;
};

const vibes = [
  "Fun & Colorful",
  "Minimalist",
  "Professional",
  "Trendy",
  "Elegant",
  "Bold",
  "Classic",
];

const MAX_LOGO_SIZE_MB = 2;
const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

// --- Google reCAPTCHA Site Key (replace with your own) ---
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export default function PosterGeneratorForm({ onClose }: PosterGeneratorFormProps) {
  // --- STATE ---
  const [form, setForm] = useState<PosterFormData>({
    business: "",
    message: "",
    vibe: vibes[0],
    logo: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { user } = useFirebaseAuth();

  // --- ESCAPE/OVERLAY CLOSE ---
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // --- VALIDATION ---
  function validate() {
    const errs: Record<string, string> = {};
    if (!form.business.trim()) errs.business = "Business type/location is required.";
    if (!form.message.trim()) errs.message = "Special message is required.";
    if (!form.vibe?.trim()) errs.vibe = "Please select a vibe/style.";
    if (form.message.length > 120) errs.message = "Message is too long (max 120 characters).";
    if (form.logo) {
      if (!ACCEPTED_LOGO_TYPES.includes(form.logo.type)) {
        errs.logo = "Logo must be PNG, JPEG, or SVG.";
      }
      if (form.logo.size > MAX_LOGO_SIZE_MB * 1024 * 1024) {
        errs.logo = `Logo must be smaller than ${MAX_LOGO_SIZE_MB} MB.`;
      }
    }
    if (!recaptchaToken) {
      errs.recaptcha = "Please verify that you are not a robot.";
    }
    return errs;
  }

  // --- SUBMIT ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setPosterUrl(null);

    // Validate
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.logo) toast.error(errs.logo);
      if (errs.recaptcha) toast.error(errs.recaptcha);
      if (errs.business || errs.message || errs.vibe) toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    // Analytics hook: Conversion start
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "poster_generation_started", {
        event_category: "Poster",
        event_label: form.business,
      });
    }

    try {
      // --- UPLOAD LOGO TO STORAGE (if present) ---
      let logoUrl: string | null = null;
      if (form.logo && user) {
        logoUrl = await uploadLogoToStorage(form.logo, user.uid);
      }

      // Use promptEngine logic, add logoUrl to form if needed by API
      const { imageUrl } = await generatePosterImage(
        { ...form, logoUrl }, // Pass logo URL if you want to use it in image generation
        recaptchaToken || undefined
      );
      setPosterUrl(imageUrl);
      setImgLoading(true);

      // --- SAVE TO FIRESTORE ---
      try {
        if (user) {
          await savePosterToFirestore({ user, form: { ...form, logoUrl }, imageUrl });
        }
      } catch (saveError) {
        // Save error is not fatal for the user experience
        console.error("Error saving poster to Firestore:", saveError);
      }

      // Analytics hook: Conversion success
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "poster_generation_success", {
          event_category: "Poster",
          event_label: form.business,
        });
      }

      toast.success("Your poster was generated successfully!");
    } catch (err: any) {
      setApiError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
      // Analytics hook: Conversion error
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "poster_generation_error", {
          event_category: "Poster",
          event_label: form.business,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  // --- FIELD HANDLERS ---
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value, files } = e.target as any;
    if (name === "logo") {
      const file = files?.[0];
      if (file) {
        if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
          setErrors((errs) => ({ ...errs, logo: "Logo must be PNG, JPEG, or SVG." }));
          toast.error("Logo must be PNG, JPEG, or SVG.");
          return;
        }
        if (file.size > MAX_LOGO_SIZE_MB * 1024 * 1024) {
          setErrors((errs) => ({ ...errs, logo: `Logo must be smaller than ${MAX_LOGO_SIZE_MB} MB.` }));
          toast.error(`Logo must be smaller than ${MAX_LOGO_SIZE_MB} MB.`);
          return;
        }
      }
      setForm((f) => ({ ...f, logo: file || null }));
      setErrors((errs) => ({ ...errs, logo: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function resetForm() {
    setForm({ business: "", message: "", vibe: vibes[0], logo: null });
    setErrors({});
    setPosterUrl(null);
    setApiError(null);
    setRecaptchaToken(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (recaptchaRef.current) recaptchaRef.current.reset();
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 110);
  }

  // --- FOCUS ON OPEN ---
  useEffect(() => {
    if (formRef.current) {
      const firstInput = formRef.current.querySelector("input,select,textarea") as HTMLElement;
      firstInput?.focus();
    }
  }, []);

  // --- IMAGE SKELETON LOADER ---
  function handleImgLoad() {
    setImgLoading(false);
  }

  // --- SCROLL TO FORM ON RESULT ---
  useEffect(() => {
    if (posterUrl && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posterUrl]);

  // --- UI ---
  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 px-2 overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          data-testid="poster-modal-overlay"
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto my-8 px-0 ring-1 ring-boonifu-gold"
            initial={{ y: 100, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-30 bg-gray-100 hover:bg-boonifu-gold hover:text-white rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-boonifu-gold"
              onClick={onClose}
              aria-label="Close poster generator"
              type="button"
              tabIndex={0}
              data-testid="close-modal-btn"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="px-6 py-8 max-h-[80vh] overflow-y-auto">
              {/* --- FORM --- */}
              {!posterUrl ? (
                <>
                  <h2 className="text-2xl font-bold text-boonifu-orange mb-2 text-center font-quicksand">
                    Create Your Poster
                  </h2>
                  <p className="text-center text-boonifu-accent mb-6 text-base">
                    Fill in a few details, and our AI will design a vibrant, ready-to-share poster for you!
                  </p>
                  <form
                    ref={formRef}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    {/* Business */}
                    <div>
                      <label htmlFor="business-input" className="font-medium text-boonifu-accent">
                        Business Type & Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="business-input"
                        name="business"
                        type="text"
                        required
                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-boonifu-gold focus:border-boonifu-gold ${
                          errors.business ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="e.g. Bakery in Nyali"
                        value={form.business}
                        onChange={handleChange}
                        aria-invalid={!!errors.business}
                        aria-describedby={errors.business ? "business-error" : undefined}
                        autoFocus
                      />
                      {errors.business && (
                        <div className="text-red-600 text-sm mt-1" id="business-error">
                          {errors.business}
                        </div>
                      )}
                    </div>
                    {/* Message */}
                    <div>
                      <label htmlFor="message-input" className="font-medium text-boonifu-accent">
                        Special Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        name="message"
                        required
                        className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-boonifu-gold focus:border-boonifu-gold resize-none min-h-[56px] shadow-sm ${
                          errors.message ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="e.g. Fresh Cakes Daily – Order Now!"
                        value={form.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        maxLength={120}
                      />
                      <div className="flex justify-between text-xs mt-1">
                        {errors.message && (
                          <div className="text-red-600" id="message-error">
                            {errors.message}
                          </div>
                        )}
                        <div className="ml-auto text-gray-400">
                          {form.message.length}/120
                        </div>
                      </div>
                    </div>
                    {/* Vibe */}
                    <div>
                      <label htmlFor="vibe-input" className="font-medium text-boonifu-accent">
                        Vibe/Style <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="vibe-input"
                        name="vibe"
                        required
                        className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-boonifu-gold focus:border-boonifu-gold shadow-sm ${
                          errors.vibe ? "border-red-400" : "border-gray-300"
                        }`}
                        value={form.vibe}
                        onChange={handleChange}
                        aria-invalid={!!errors.vibe}
                        aria-describedby={errors.vibe ? "vibe-error" : undefined}
                      >
                        {vibes.map((vibe) => (
                          <option key={vibe} value={vibe}>
                            {vibe}
                          </option>
                        ))}
                        <option value="">Other...</option>
                      </select>
                      {errors.vibe && (
                        <div className="text-red-600 text-sm mt-1" id="vibe-error">
                          {errors.vibe}
                        </div>
                      )}
                    </div>
                    {/* Logo */}
                    <div>
                      <label htmlFor="logo-input" className="font-medium text-boonifu-accent">
                        Upload Your Logo{" "}
                        <span className="text-sm text-gray-400">(optional, PNG/JPEG/SVG, &lt;2MB)</span>
                      </label>
                      <input
                        id="logo-input"
                        name="logo"
                        type="file"
                        accept={ACCEPTED_LOGO_TYPES.join(",")}
                        ref={fileInputRef}
                        className="mt-1 block w-full border rounded-md px-3 py-2 bg-white shadow-sm"
                        onChange={handleChange}
                      />
                      {form.logo && (
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="text-boonifu-accent">Selected:</span>
                          <span className="font-mono truncate max-w-[140px]">
                            {form.logo.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, logo: null }));
                              if (fileInputRef.current)
                                fileInputRef.current.value = "";
                            }}
                            className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded hover:bg-red-200 text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {errors.logo && (
                        <div className="text-red-600 text-sm mt-1">{errors.logo}</div>
                      )}
                    </div>
                    {/* reCAPTCHA */}
                    <div>
                      {RECAPTCHA_SITE_KEY ? (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={token => setRecaptchaToken(token)}
                          theme="light"
                          className="mt-2"
                        />
                      ) : (
                        <div className="text-yellow-700 bg-yellow-50 p-2 rounded text-sm">
                          reCAPTCHA not configured. Set <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> in your environment.
                        </div>
                      )}
                      {errors.recaptcha && (
                        <div className="text-red-600 text-sm mt-1">{errors.recaptcha}</div>
                      )}
                    </div>
                    {/* API Error */}
                    {apiError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 bg-red-50 border border-red-200 rounded p-2"
                      >
                        {apiError}
                      </motion.div>
                    )}
                    {/* Actions */}
                    <div className="flex gap-4 items-center justify-center pt-4">
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.04 }}
                        disabled={loading}
                        className={`bg-boonifu-gold text-white font-bold px-7 py-2 rounded-lg shadow-lg hover:bg-boonifu-orange transition ${
                          loading ? "opacity-60 cursor-wait" : ""
                        }`}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                            Generating...
                          </span>
                        ) : (
                          "Generate"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                // --- POSTER OUTPUT ---
                <motion.div
                  key="poster-image"
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.97 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-xl shadow-lg bg-boonifu-light p-4 text-center"
                  aria-live="polite"
                >
                  <h3 className="text-lg font-semibold text-boonifu-gold mb-2">
                    Your Poster
                  </h3>
                  {/* Skeleton Loader for Poster */}
                  <div className="relative w-full flex justify-center items-center min-h-[400px]">
                    {imgLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse bg-gray-200 rounded-lg w-[240px] h-[360px]" />
                        <span className="absolute text-gray-400 font-semibold">Loading...</span>
                      </div>
                    )}
                    <img
                      src={posterUrl || ""}
                      alt="Generated poster"
                      className={`max-w-full max-h-[400px] mx-auto rounded-lg shadow transition-opacity duration-300 ${imgLoading ? "opacity-0" : "opacity-100"}`}
                      style={{ objectFit: "contain" }}
                      onLoad={handleImgLoad}
                    />
                  </div>
                  <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <a
                      href={posterUrl || ""}
                      download="boonifu-poster.jpg"
                      className="px-4 py-1.5 bg-boonifu-gold text-white rounded-lg font-bold hover:bg-boonifu-orange transition"
                    >
                      Download
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-boonifu-accent hover:underline font-medium"
                    >
                      Create Another
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}