'use client';

import { Lightbulb } from 'lucide-react';
import { getVisibilityTips, VisibilityTip } from '@/lib/llm/tips';

interface Props {
  platform: 'linkedin' | 'twitter' | 'reddit' | 'medium';
  hasMedia?: boolean;
}

export function VisibilityTipsCard({ platform, hasMedia = false }: Props) {
  const tips = getVisibilityTips(platform, hasMedia);

  if (tips.length === 0) return null;

  return (
    <div className="apple-card p-4 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/20 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <span>Tips to Boost Visibility on {platform}</span>
      </div>

      <div className="space-y-2">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs">
            <span className="text-base shrink-0">{tip.emoji}</span>
            <div>
              <span className="font-bold text-zinc-900 dark:text-white">{tip.title}: </span>
              <span className="text-zinc-600 dark:text-zinc-400">{tip.advice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
