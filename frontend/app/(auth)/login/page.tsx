"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, AtSign, Lock, Eye, EyeOff } from "lucide-react";
import api from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(email: string, password: string) {
    try {
      const response = await api.post("/auth/sign-in/email", {
        email,
        password,
      });
      console.log("Login Succesful");
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" fill="white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            AI Assistant
          </h1>
          <p className="text-slate-500 mt-1">
            Login in to your professional workspace
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(email, password);
            }}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-2"
              >
                Email Address
              </label>
              <div className="flex items-center border border-slate-200 rounded-lg px-3.5 py-3 focus-within:border-slate-400 transition-colors">
                <AtSign className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium tracking-wide text-slate-600 uppercase"
                >
                  Password
                </label>
              </div>
              <div className="flex items-center border border-slate-200 rounded-lg px-3.5 py-3 focus-within:border-slate-400 transition-colors">
                <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-3 text-sm font-medium transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-slate-900">
            Sign In
          </Link>
        </p>

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <Link
            href="/privacy"
            className="text-xs tracking-wide text-slate-400 hover:text-slate-600 uppercase"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs tracking-wide text-slate-400 hover:text-slate-600 uppercase"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
}
