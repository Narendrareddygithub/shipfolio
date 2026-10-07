'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Plus, ExternalLink, Github, Calendar, Layers, CheckCircle2 } from 'lucide-react';
import { Project, ProjectUpdate, GeneratedContent } from '@/lib/db/schema';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [contents, setContents] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load project');
        setProject(data.project);
        setUpdates(data.updates || []);
        setContents(data.contents || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs font-medium text-zinc-500">Loading campaign details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-4">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
          {error || 'Project not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Navigation & Header */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 apple-button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold apple-heading text-zinc-900 dark:text-white">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.id}/generate`}
              className="apple-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Content</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Project Meta Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-4 flex items-center justify-between hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Repository</span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
          </a>
        )}

        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-4 flex items-center justify-between hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Demo Website</span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
          </a>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <div className="apple-card p-4 flex items-center gap-2 overflow-x-auto">
            <Layers className="w-5 h-5 text-purple-500 shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Context Summary Section */}
      {project.context && (
        <div className="apple-card p-6 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Persistent Context Memory
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {project.context}
          </p>
        </div>
      )}
    </div>
  );
}
