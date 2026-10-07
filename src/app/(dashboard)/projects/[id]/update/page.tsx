'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ImagePlus, UploadCloud, X, CheckCircle2 } from 'lucide-react';

const UPDATE_TYPES = [
  { id: 'feature', label: '🚀 Feature Release', desc: 'New capability or functionality added' },
  { id: 'launch', label: '🎉 Product Launch', desc: 'Major public launch or v1 release' },
  { id: 'milestone', label: '🏆 Milestone', desc: 'User count, revenue, or star count reached' },
  { id: 'improvement', label: '⚡ UI / Performance', desc: 'Design polish, speed boost, bug fix' },
  { id: 'progress', label: '📈 Progress Log', desc: 'General build-in-public update' },
];

export default function AddUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const router = useRouter();

  const [content, setContent] = useState('');
  const [updateType, setUpdateType] = useState('feature');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('updateType', updateType);
      files.forEach((file) => formData.append('media', file));

      const res = await fetch(`/api/projects/${projectId}/updates`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post update');

      router.push(`/projects/${projectId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 apple-button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaign Details</span>
        </Link>
        <h1 className="text-3xl font-bold apple-heading text-zinc-900 dark:text-white">
          Post Project Update
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          Log what you built or improved. The AI will turn this into platform-native content.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="apple-card p-6 md:p-8 space-y-6">
        {/* Update Type Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Select Update Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {UPDATE_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setUpdateType(type.id)}
                className={`p-3.5 rounded-xl border text-left transition-all apple-button flex flex-col justify-between ${
                  updateType === type.id
                    ? 'border-blue-600 bg-blue-500/10 text-zinc-900 dark:text-white font-semibold'
                    : 'border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:bg-black/5'
                }`}
              >
                <span className="text-sm font-semibold">{type.label}</span>
                <span className="text-xs text-zinc-500 mt-1">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Dump Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            What did you build or change? <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g. Added Google OAuth authentication, redesigned the dashboard layout with Apple glassmorphism, fixed a mobile navigation bug."
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Media / Screenshot Upload Area */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Attach Screenshots or Media (Optional)
          </label>

          <label className="border-2 border-dashed border-black/10 dark:border-white/10 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/5 dark:bg-white/5">
            <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Click to upload or drag & drop screenshots
            </span>
            <span className="text-xs text-zinc-500 mt-1">PNG, JPG, WebP up to 10MB</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Uploaded File Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              {previews.map((src, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-video bg-black">
                  <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="pt-4 flex items-center justify-end gap-4">
          <Link
            href={`/projects/${projectId}`}
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
              <span>Uploading Update...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Save Update</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
