'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Share2, MessageSquare, Zap, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6 shadow-sm border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visibility-First Platform for Builders</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight apple-heading text-zinc-900 dark:text-white leading-[1.1] mb-6">
          Turn your raw projects into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            credible proof of work.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed mb-10 apple-subheading">
          Maintain persistent project campaigns. Dump raw context & screenshots. AI generates tailored content for LinkedIn, X, Reddit, and Medium with active voice & zero fluff.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="apple-button w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base font-semibold shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center justify-center gap-2.5 transition-all"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="apple-button w-full sm:w-auto px-6 py-3.5 rounded-2xl apple-glass text-zinc-700 dark:text-zinc-300 text-base font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-all"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Feature Highlights Grid (Apple Card Style) */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="apple-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold apple-heading text-zinc-900 dark:text-white mb-2">
                Persistent Context
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Never start from scratch. Add updates week after week — the platform remembers what your project does and who it is for.
              </p>
            </div>
          </div>

          <div className="apple-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold apple-heading text-zinc-900 dark:text-white mb-2">
                Clarifying Q&A
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Thin context? The AI asks 2–3 short multiple-choice questions in a conversational style to sharpen your content before generation.
              </p>
            </div>
          </div>

          <div className="apple-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold apple-heading text-zinc-900 dark:text-white mb-2">
                ASD-STE100 Quality
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                No corporate filler or AI slop. Active voice, concise sentences (≤20 words), and platform-native previews with actionable visibility tips.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
