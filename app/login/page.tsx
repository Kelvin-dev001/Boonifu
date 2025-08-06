"use client";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-boonifu-light">
      <AuthForm
        mode={mode}
        onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
      />
    </div>
  );
}