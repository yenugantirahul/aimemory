"use client";

import api from "@/lib/axios";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function fetchMessages() {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        credentials: "include",
        method: "GET",
      });

      const data = await res.json();

      setMessages(data.messages ?? data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/get-session");

        if (res.status === 200 && res.data) {
          console.log(res.data);
        } else {
        }
      } catch {
        console.log("Error");
      }
    };

    checkAuth();
  }, []);

  async function sendMessage() {
    if (!prompt.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;

    setPrompt("");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentPrompt,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex h-[calc(100vh-64px)] flex-col bg-slate-50">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {messages.length === 0 && !loading && (
            <div className="mt-32 text-center">
              <h1 className="text-3xl font-bold">🧠 AIMemory</h1>

              <p className="mt-3 text-slate-500">
                What would you like me to remember?
              </p>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap leading-7 ${
                    message.role === "user"
                      ? "bg-black text-white"
                      : "bg-white shadow border"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white border px-5 py-3 shadow">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
        <div className="border-t bg-white p-4">
          <div className="mx-auto flex max-w-4xl gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="What would you like me to remember?"
              rows={2}
              className="flex-1 resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !prompt.trim()}
              className="rounded-xl bg-black px-6 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-slate-400">
            Press Enter to send • Shift + Enter for a new line
          </p>
        </div>
      </div>
    </main>
  );
}
