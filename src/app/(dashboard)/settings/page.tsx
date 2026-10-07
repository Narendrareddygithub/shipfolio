'use client';

import { useState } from 'react';
import { Key, Shield, Info, Check } from 'lucide-react';

export default function SettingsPage() {
  const [provider, setProvider] = useState<'gemini' | 'groq'>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem(`shipfolio_${provider}_key`, apiKey);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold apple-heading text-zinc-900 dark:text-white">
          Settings & BYOK
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          Manage your account preferences and custom LLM API keys.
        </p>
      </div>

      {/* BYOK Section Card */}
      <div className="apple-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white apple-heading">
              Bring Your Own Key (BYOK)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Provide your own free API key to bypass daily shared quota limits.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-all apple-button ${
                provider === 'gemini'
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Google Gemini
            </button>
            <button
              type="button"
              onClick={() => setProvider('groq')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-all apple-button ${
                provider === 'groq'
                  ? 'bg-orange-600 text-white border-orange-600 font-semibold shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Groq Cloud
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              {provider === 'gemini' ? 'Gemini API Key' : 'Groq API Key'}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Paste your ${provider === 'gemini' ? 'Gemini' : 'Groq'} key here...`}
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href={provider === 'gemini' ? 'https://aistudio.google.com/apikey' : 'https://console.groq.com/keys'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Get free {provider === 'gemini' ? 'Gemini' : 'Groq'} key</span>
              <Info className="w-3.5 h-3.5" />
            </a>

            <button
              type="submit"
              className="apple-button px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
