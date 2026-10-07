'use client';

import Link from 'next/link';
import { Sparkles, FolderKanban, Settings, ArrowRight } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full apple-glass border-b border-black/5 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105 active:scale-95">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight apple-heading text-zinc-900 dark:text-white">
            ShipFolio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/projects"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors apple-button"
          >
            Projects
          </Link>
          <Link
            href="/settings"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors apple-button"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="apple-button inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
