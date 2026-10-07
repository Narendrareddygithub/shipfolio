'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, FolderPlus, Tag, Link2, FileText, CheckCircle2 } from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    context: '',
    repoUrl: '',
    websiteUrl: '',
    techStack: '',
    targetAudience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const techArray = formData.techStack
        ? formData.techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          techStack: techArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create project campaign');
      }

      router.push(`/projects/${data.project.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Back & Header */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 apple-button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>
        <h1 className="text-3xl font-bold apple-heading text-zinc-900 dark:text-white">
          Create Project Campaign
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          Dump your raw project context. The platform retains this memory for all future updates.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="apple-card p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. ShipFolio — Build-in-Public Visibility Platform"
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Short Tagline / High-Level Purpose
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. Turn raw developer work into credible social proof"
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Raw Project Context Dump
          </label>
          <textarea
            rows={5}
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            placeholder="Paste your README, notes, product description, or problem statement here. Dump everything you have — the AI will synthesize it."
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              GitHub / Repository URL
            </label>
            <input
              type="url"
              value={formData.repoUrl}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Live Website / Demo Link
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://mycoolapp.com"
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Tech Stack Tags (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            placeholder="Next.js 15, React, Neon PostgreSQL, Tailwind CSS, Gemini API"
            className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Target Audience
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="e.g. Developers, AI engineers, indie hackers, recruiters"
            className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors apple-button"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="apple-button px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Saving Campaign...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Campaign</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
