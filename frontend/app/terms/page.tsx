import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldAlert, UserCheck, Shield, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      id: "acceptance",
      icon: <UserCheck className="h-5 w-5 text-indigo-500" />,
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using AIMemory (the \"Platform\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. These terms apply to all visitors, users, and others who access or use the Platform."
    },
    {
      id: "description",
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      title: "2. Description of Service",
      content:
        "AIMemory provides an AI-powered conversational platform that maintains context and memory across user chat sessions. The Platform utilizes advanced language models and vector database search to store, search, and retrieve relevant user preferences, memories, and facts. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice."
    },
    {
      id: "accounts",
      icon: <ShieldAlert className="h-5 w-5 text-indigo-500" />,
      title: "3. Accounts & Security",
      content:
        "To use certain features, you must register for an account. You are responsible for safeguarding your account credentials and for any activities or actions under your password. You agree to notify us immediately of any unauthorized use of your account or security breach."
    },
    {
      id: "usage",
      icon: <Shield className="h-5 w-5 text-indigo-500" />,
      title: "4. Acceptable Use Policy",
      content:
        "You agree not to use the Platform to: upload or transmit harmful, offensive, or illegal content; attempt to reverse engineer or disrupt the Platform's operations; exploit API endpoints; or use the service for unauthorized commercial purposes. We reserve the right to terminate accounts that violate these rules."
    },
    {
      id: "liability",
      icon: <HelpCircle className="h-5 w-5 text-indigo-500" />,
      title: "5. Limitation of Liability & Disclaimers",
      content:
        "The service is provided on an \"AS IS\" and \"AS AVAILABLE\" basis. AIMemory makes no warranties regarding the accuracy of AI-generated responses or the absolute permanence of stored memories. In no event shall AIMemory be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 pb-20">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
        <div className="absolute top-1/3 right-1/4 h-[35rem] w-[35rem] translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5" />
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
            Terms of Service
          </h1>
          <p className="mt-4 text-base text-slate-500 dark:text-zinc-400">
            Last updated: July 18, 2026. Please read these terms carefully before using the AIMemory platform.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar Table of Contents */}
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
                href="/privacy"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </nav>
          </aside>

          {/* Main Terms Sections */}
          <div className="md:col-span-3 space-y-10">
            <div className="bg-white/80 dark:bg-zinc-900/85 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-zinc-800/60 p-6 md:p-8 shadow-sm">
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed mb-6">
                Welcome to AIMemory. These Terms of Service govern your access to and use of AIMemory&apos;s website, APIs, and applications. Please read them carefully. By using our service, you agree to these Terms.
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

            {/* Help / Contact CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 text-white shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-xl" />
              <h3 className="text-lg font-semibold mb-2">Have Questions About Our Terms?</h3>
              <p className="text-indigo-100 text-sm mb-4 max-w-xl">
                If you have any questions or require clarification regarding these terms, feel free to contact our support team.
              </p>
              <a
                href="mailto:support@aimemory.app"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
