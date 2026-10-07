'use client';

import { useState } from 'react';
import { Key, ExternalLink, Check, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (provider: 'gemini' | 'groq', apiKey: string) => void;
}

export function ByokModal({ isOpen, onClose, onSaveKey }: Props) {
  const [provider, setProvider] = useState<'gemini' | 'groq'>('gemini');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError('Please paste a valid API key');
      return;
    }
    onSaveKey(provider, key.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="apple-card w-full max-w-md p-6 space-y-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white apple-heading">
              Shared Credits Exhausted
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Bring your own free API key to continue generating content.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Provider Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-black/5 dark:bg-white/5">
          <button
            type="button"
            onClick={() => { setProvider('gemini'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              provider === 'gemini'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Google Gemini (Free)
          </button>
          <button
            type="button"
            onClick={() => { setProvider('groq'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              provider === 'groq'
                ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Groq Cloud (Free)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              <span>{provider === 'gemini' ? 'Gemini API Key' : 'Groq API Key'}</span>
              <a
                href={provider === 'gemini' ? 'https://aistudio.google.com/apikey' : 'https://console.groq.com/keys'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Get key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={`Paste your ${provider === 'gemini' ? 'Gemini' : 'Groq'} key...`}
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
            <span>Stored locally on your device. Never shared or stored on external servers.</span>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="apple-button px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
