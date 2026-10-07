'use client';

import { useState } from 'react';
import { ShieldAlert, Sparkles, X, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function GuestConversionBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl apple-glass bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in fade-in duration-200">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white apple-heading">
            You are building in Guest Mode
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
            Your project campaigns are stored on this device. Create a free permanent account to sync across all devices without losing any data!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => signIn('google')}
          className="apple-button px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5"
        >
          <span>Save Account Permanently</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
