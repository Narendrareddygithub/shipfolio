'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FolderKanban, Sparkles, ArrowRight, Clock, Layers } from 'lucide-react';
import { Project } from '@/lib/db/schema';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

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

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-medium text-zinc-500">Loading campaigns...</p>
        </div>
      ) : projects.length === 0 ? (
        /* Empty State Card */
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
      ) : (
        /* Grid of Projects */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="apple-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white apple-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[11px] text-zinc-400">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>

              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[11px] text-zinc-400 self-center">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
