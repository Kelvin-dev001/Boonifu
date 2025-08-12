"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

type AuthFormProps = {
  mode: "login" | "signup";
  onSwitchMode?: () => void;
};

export default function AuthForm({ mode, onSwitchMode }: AuthFormProps) {
  const router = useRouter();
  const { login, signup, error, loading, loginWithGoogle, resetPassword } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.push("/"); // <-- Redirect to homepage
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setFormError(null);
    setSubmitting(true);
    try {
      await loginWithGoogle();
      router.push("/"); // <-- Redirect to homepage
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (err: any) {
      setFormError(err.message);
    }
  }

  if (showReset) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
        {resetSent ? (
          <div className="text-green-600 mb-4">Password reset email sent! Check your inbox.</div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              autoComplete="email"
              placeholder="Your email"
              required
              className="border rounded px-3 py-2"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            {formError && <div className="text-red-600 text-sm">{formError}</div>}
            <button
              type="submit"
              className="bg-boonifu-gold text-white font-semibold rounded px-4 py-2 hover:bg-boonifu-orange"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
        )}
        <div className="mt-4 text-center text-sm">
          <button
            className="text-boonifu-gold underline"
            type="button"
            onClick={() => setShowReset(false)}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-center text-2xl font-bold mb-6">
        {mode === "login" ? "Sign In" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          autoComplete="email"
          placeholder="Email"
          required
          className="border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          placeholder="Password"
          required
          className="border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {(formError || error) && (
          <div className="text-red-600 text-sm">{formError || error}</div>
        )}
        <button
          type="submit"
          className="bg-boonifu-gold text-white font-semibold rounded px-4 py-2 hover:bg-boonifu-orange"
          disabled={submitting || loading}
        >
          {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      {mode === "login" && (
        <div className="mt-2 text-right">
          <button
            className="text-xs text-boonifu-gold underline"
            onClick={() => setShowReset(true)}
            type="button"
          >
            Forgot password?
          </button>
        </div>
      )}
      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={handleGoogle}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          disabled={submitting}
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.32 1.53 7.78 2.8l5.7-5.55C33.7 3.61 29.22 1.5 24 1.5 14.98 1.5 7.19 7.83 4.4 16.1l6.91 5.37C12.98 15.31 17.08 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.89-.17-3.71-.48-5.45H24v10.3h12.5c-.53 2.82-2.13 5.22-4.53 6.89l7.03 5.46c4.11-3.8 6.1-9.39 6.1-17.2z"/><path fill="#FBBC05" d="M10.35 28.65c-1.16-3.48-1.16-7.21 0-10.69l-6.91-5.37C.68 17.61 0 20.67 0 24c0 3.33.68 6.39 1.44 9.41l6.91-5.37z"/><path fill="#EA4335" d="M24 46.5c5.22 0 9.62-1.73 12.82-4.7l-7.03-5.46c-1.99 1.34-4.54 2.14-7.79 2.14-6.93 0-12.84-5.81-14.68-13.53l-6.91 5.37C7.19 40.17 14.98 46.5 24 46.5z"/></g></svg>
          Sign in with Google
        </button>
      </div>
      <div className="mt-4 text-center text-sm">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              className="text-boonifu-gold underline"
              type="button"
              onClick={onSwitchMode}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-boonifu-gold underline"
              type="button"
              onClick={onSwitchMode}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}