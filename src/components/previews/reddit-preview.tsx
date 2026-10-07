'use client';

import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Edit3, Check, Copy } from 'lucide-react';

interface Props {
  content: string;
  subreddit?: string;
  author?: string;
  onSaveEdit?: (newContent: string) => void;
}

export function RedditPreview({
  content,
  subreddit = 'r/webdev',
  author = 'u/builder_dev',
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
    <div className="bg-[#1a1a1b] text-zinc-100 border border-zinc-800 rounded-2xl p-4 md:p-5 flex gap-3 shadow-sm">
      {/* Vote Bar */}
      <div className="flex flex-col items-center gap-1 text-zinc-400 shrink-0">
        <ArrowBigUp className="w-6 h-6 hover:text-orange-500 cursor-pointer transition-colors" />
        <span className="text-xs font-bold text-orange-500">142</span>
        <ArrowBigDown className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
      </div>

      {/* Main Reddit Content Area */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white hover:underline cursor-pointer">{subreddit}</span>
            <span className="text-zinc-500">• Posted by {author} 2h ago</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="apple-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
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

        {/* Content */}
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-xl border border-zinc-700 bg-zinc-900 text-xs text-zinc-100 font-mono focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded-lg text-xs text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded-lg bg-orange-600 text-white text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
            {text}
          </div>
        )}

        {/* Reddit Action Bar */}
        <div className="pt-2 border-t border-zinc-800 flex items-center gap-4 text-xs font-semibold text-zinc-400">
          <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>34 Comments</span>
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
