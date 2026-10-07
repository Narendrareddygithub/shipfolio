'use client';

import Link from 'next/link';
import { Plus, FolderKanban, Sparkles, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold apple-heading text-zinc-900 dark:text-white">
            Project Campaigns
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
            Manage your persistent project campaigns and generate content updates.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="apple-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </Link>
      </div>

      {/* Empty State Card */}
      <div className="apple-card p-12 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <FolderKanban className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white apple-heading">
            No project campaigns yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Start by dumping context about a project you are building. The system will retain your project context for future updates.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="apple-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium transition-all"
        >
          <span>Create First Campaign</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
