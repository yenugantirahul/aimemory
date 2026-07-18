import Link from "next/link";
import { ArrowLeft, Key, Database, UserCheck, Eye, ShieldAlert } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "collection",
      icon: <Database className="h-5 w-5 text-indigo-500" />,
      title: "1. Information We Collect",
      content:
        "We collect information to provide a personalized, persistent memory experience. This includes account registration info (name, email), conversation logs with the assistant, and memory snippets extracted from your chats. Rest assured, we do not inspect or read your private chats except to extract memory entities via automated AI processing."
    },
    {
      id: "usage",
      icon: <Key className="h-5 w-5 text-indigo-500" />,
      title: "2. How We Use Information",
      content:
        "The collected data is used exclusively to enrich your interactions. Memory snippets are converted into vector embeddings, allowing the AI to query context from previous conversations. We do not sell your personal data or chat histories to third parties for advertising or any other monetization purpose."
    },
    {
      id: "sharing",
      icon: <Eye className="h-5 w-5 text-indigo-500" />,
      title: "3. Data Sharing & Third Parties",
      content:
        "To run the AI chatbot, we transmit conversation data to reputable AI API providers (such as OpenAI, Anthropic, or Google DeepMind). These providers are contractually bound to use your data solely for processing your requests and not for training their foundation models, in compliance with standard enterprise privacy guidelines."
    },
    {
      id: "control",
      icon: <UserCheck className="h-5 w-5 text-indigo-500" />,
      title: "4. Your Controls & Data Deletion",
      content:
        "We believe you should have complete control over what the AI remembers about you. You can review, edit, or delete any extracted memories directly within the AIMemory dashboard. Furthermore, you can request full account deletion, which permanently erases your profile, conversations, and all memory embeddings from our databases."
    },
    {
      id: "security",
      icon: <ShieldAlert className="h-5 w-5 text-indigo-500" />,
      title: "5. Security of Your Data",
      content:
        "We implement industry-standard security measures to protect your data, including encryption at rest and in transit (via SSL/TLS). However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 pb-20">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[40rem] w-[40rem] translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5" />
        <div className="absolute top-1/3 left-1/4 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-12 lg:px-8">
        {/* Navigation / Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-slate-200 dark:border-zinc-800 pb-8 mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-slate-500 dark:text-zinc-400">
            Last updated: July 18, 2026. Your privacy and trust are of paramount importance to us.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Table of Contents */}
          <aside className="md:col-span-1 md:sticky md:top-24 h-fit">
            <nav className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
                On This Page
              </span>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-sm text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors py-1.5"
                >
                  {sec.title.split(". ")[1]}
                </a>
              ))}
              <div className="h-px bg-slate-200 dark:bg-zinc-800 my-4" />
              <Link
                href="/terms"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Terms of Service
              </Link>
            </nav>
          </aside>

          {/* Main Privacy Sections */}
          <div className="md:col-span-3 space-y-10">
            <div className="bg-white/80 dark:bg-zinc-900/85 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-zinc-800/60 p-6 md:p-8 shadow-sm">
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                At AIMemory, we are committed to being transparent about how we collect, use, and handle your information. This Privacy Policy details the data we process, why we process it, and the controls you have over your personal information.
              </p>

              <div className="space-y-8 divide-y divide-slate-100 dark:divide-zinc-800/50">
                {sections.map((sec, index) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className={`scroll-mt-24 ${index > 0 ? "pt-8" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15">
                        {sec.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
                        {sec.title}
                      </h2>
                    </div>
                    <p className="text-slate-600 dark:text-zinc-300 leading-relaxed pl-12">
                      {sec.content}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            {/* Privacy Questions Contact Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 p-8 text-white shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-xl" />
              <h3 className="text-lg font-semibold mb-2">Concerned About Your Privacy?</h3>
              <p className="text-indigo-100 text-sm mb-4 max-w-xl">
                We are dedicated to safeguarding your personal space. If you want a full copy of your data or have any questions about memory retention, drop us an email.
              </p>
              <a
                href="mailto:privacy@aimemory.app"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Contact Privacy Officer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
