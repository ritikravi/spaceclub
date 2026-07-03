"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <div className="min-h-screen section-bg flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-blue-500/10 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Lock size={24} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Admin Portal</h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          Space Club LPU — Restricted Access
        </p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all shadow-md disabled:opacity-60 text-sm border border-gray-200"
        >
          {/* Google SVG icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6C12.4 13.1 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z" />
            <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.8-6z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-7.8 6C6.7 42.6 14.7 48 24 48z"/>
          </svg>
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-xs mt-5" style={{ color: "var(--text-faint)" }}>
          Only authorized LPU Space Club admins can access this portal.
        </p>
      </div>
    </div>
  );
}
