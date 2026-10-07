'use client';

import { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, Edit3, Check, Copy, Globe, MoreHorizontal } from 'lucide-react';

interface Props {
  content: string;
  userName?: string;
  userHeadline?: string;
  mediaUrls?: string[];
  onSaveEdit?: (newContent: string) => void;
}

export function LinkedInPreview({
  content,
  userName = 'Builder',
  userHeadline = 'Building in Public | Full Stack Developer',
  mediaUrls = [],
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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm space-y-3 p-4 md:p-5">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                {userName}
              </h4>
              <span className="text-[11px] text-zinc-400">• 1st</span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
              {userHeadline}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-0.5">
              <span>Just now</span>
              <span>•</span>
              <Globe className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Edit Post"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="apple-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors shadow-sm"
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

      {/* Post Content */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-xl border border-blue-500/50 bg-transparent text-xs text-zinc-900 dark:text-white focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 rounded-lg text-xs font-medium text-zinc-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
          {text}
        </div>
      )}

      {/* Attached Media */}
      {mediaUrls.length > 0 && (
        <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <img src={mediaUrls[0]} alt="LinkedIn attachment" className="w-full max-h-72 object-cover" />
        </div>
      )}

      {/* LinkedIn Interaction Bar */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-zinc-500 text-xs font-medium">
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <ThumbsUp className="w-4 h-4 text-blue-600" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Repeat2 className="w-4 h-4" />
          <span>Repost</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}
