'use client';

import { useState } from 'react';
import { MessageCircle, Repeat2, Heart, BarChart2, Edit3, Check, Copy, Share } from 'lucide-react';

interface Props {
  content: string;
  userName?: string;
  userHandle?: string;
  mediaUrls?: string[];
  onSaveEdit?: (newContent: string) => void;
}

export function TwitterPreview({
  content,
  userName = 'Builder',
  userHandle = 'builder_dev',
  mediaUrls = [],
  onSaveEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const isOverLimit = charCount > 280;

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
    <div className="bg-black text-white border border-zinc-800 rounded-2xl p-4 md:p-5 space-y-3 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 font-bold flex items-center justify-center text-sm">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold leading-tight">{userName}</h4>
              <span className="text-xs text-zinc-400">@{userHandle} • 1m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Character Counter Gauge */}
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${isOverLimit ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-400'}`}>
            {charCount}/280
          </span>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="apple-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
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

      {/* Tweet Content */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-xl border border-zinc-700 bg-zinc-900 text-xs text-white focus:outline-none"
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
              className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-100 whitespace-pre-line leading-relaxed">
          {text}
        </div>
      )}

      {/* Attached Image */}
      {mediaUrls.length > 0 && (
        <div className="rounded-xl overflow-hidden border border-zinc-800">
          <img src={mediaUrls[0]} alt="Tweet attachment" className="w-full max-h-64 object-cover" />
        </div>
      )}

      {/* X Metrics Bar */}
      <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-zinc-500 text-xs">
        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>12</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
          <Repeat2 className="w-4 h-4" />
          <span>5</span>
        </button>
        <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
          <Heart className="w-4 h-4" />
          <span>48</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
          <BarChart2 className="w-4 h-4" />
          <span>1.2K</span>
        </button>
      </div>
    </div>
  );
}
