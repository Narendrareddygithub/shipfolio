'use client';

import { useState } from 'react';
import { BookOpen, Clock, Tag, Edit3, Check, Copy } from 'lucide-react';

interface Props {
  content: string;
  author?: string;
  readTime?: string;
  onSaveEdit?: (newContent: string) => void;
}

export function MediumPreview({
  content,
  author = 'Narendra Reddy',
  readTime = '3 min read',
  onSaveEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSaveEdit) onSaveEdit(text);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm font-serif">
      {/* Article Header */}
      <div className="flex items-center justify-between font-sans border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold flex items-center justify-center text-xs font-sans">
            {author.charAt(0)}
          </div>
          <div>
            <h5 className="text-xs font-bold text-zinc-900 dark:text-white leading-none">
              {author}
            </h5>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1">
              <span>Published on Medium</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="apple-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Body */}
      {isEditing ? (
        <div className="space-y-2 font-sans">
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 rounded-lg text-xs text-zinc-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-semibold"
            >
              Save Article
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
          {text}
        </div>
      )}
    </div>
  );
}
