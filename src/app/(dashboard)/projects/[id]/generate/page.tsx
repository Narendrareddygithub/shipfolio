'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RefreshCw, AlertCircle, Key } from 'lucide-react';
import { ClarifyingQuestionsUI } from '@/components/generate/clarifying-questions';
import { LinkedInPreview } from '@/components/previews/linkedin-preview';
import { TwitterPreview } from '@/components/previews/twitter-preview';
import { RedditPreview } from '@/components/previews/reddit-preview';
import { MediumPreview } from '@/components/previews/medium-preview';
import { VisibilityTipsCard } from '@/components/generate/visibility-tips';
import { ByokModal } from '@/components/byok-modal';
import { ClarifyingQuestion } from '@/lib/llm/clarify';
import { GeneratedContent } from '@/lib/db/schema';

export default function GenerateFlowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [step, setStep] = useState<'evaluating' | 'questions' | 'generating' | 'results'>('evaluating');
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedItems, setGeneratedItems] = useState<GeneratedContent[]>([]);
  const [error, setError] = useState('');
  const [rateLimitError, setRateLimitError] = useState(false);
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);

  // 1. Initial Context Evaluation
  useEffect(() => {
    async function evaluate() {
      try {
        const res = await fetch('/api/generate/clarify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        });
        const data = await res.json();

        if (!data.sufficient && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setStep('questions');
        } else {
          startGeneration({});
        }
      } catch (err) {
        console.error('Clarify evaluation error:', err);
        startGeneration({});
      }
    }
    evaluate();
  }, [projectId]);

  // 2. Start Generation Call
  const startGeneration = async (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    setStep('generating');
    setError('');
    setRateLimitError(false);

    try {
      const userKey = localStorage.getItem('shipfolio_gemini_key') || localStorage.getItem('shipfolio_groq_key') || '';
      const userProvider = localStorage.getItem('shipfolio_gemini_key') ? 'gemini' : 'groq';

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (userKey) {
        headers['X-User-LLM-Key'] = userKey;
        headers['X-User-LLM-Provider'] = userProvider;
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          projectId,
          answers: userAnswers,
          platforms: ['linkedin', 'twitter', 'reddit', 'medium'],
        }),
      });

      const data = await res.json();

      if (res.status === 429 || data.code === 'RATE_LIMIT_EXHAUSTED') {
        setRateLimitError(true);
        setIsByokModalOpen(true);
        setStep('results');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedItems(data.contents || []);
      setStep('results');
    } catch (err: any) {
      setError(err.message);
      setStep('results');
    }
  };

  const handleSaveByokKey = (provider: 'gemini' | 'groq', key: string) => {
    localStorage.setItem(`shipfolio_${provider}_key`, key);
    // Instantly retry generation with user key
    startGeneration(answers);
  };

  const renderPreviewForPlatform = (item: GeneratedContent) => {
    switch (item.platform) {
      case 'linkedin':
        return <LinkedInPreview content={item.content} mediaUrls={item.mediaUrls || []} />;
      case 'twitter':
        return <TwitterPreview content={item.content} mediaUrls={item.mediaUrls || []} />;
      case 'reddit':
        return <RedditPreview content={item.content} />;
      case 'medium':
        return <MediumPreview content={item.content} />;
      default:
        return <div className="p-4 bg-zinc-900 text-white rounded-xl text-xs">{item.content}</div>;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Interactive BYOK Modal */}
      <ByokModal
        isOpen={isByokModalOpen}
        onClose={() => setIsByokModalOpen(false)}
        onSaveKey={handleSaveByokKey}
      />

      {/* Header */}
      <div>
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 apple-button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaign Details</span>
        </Link>
        <h1 className="text-3xl font-extrabold apple-heading text-zinc-900 dark:text-white">
          Generate Multi-Platform Content
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          ASD-STE100 active voice generation for LinkedIn, X, Reddit, and Medium.
        </p>
      </div>

      {/* Loading Steps */}
      {step === 'evaluating' && (
        <div className="apple-card p-12 text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Evaluating campaign context...
          </p>
        </div>
      )}

      {step === 'questions' && (
        <ClarifyingQuestionsUI
          questions={questions}
          onComplete={(ans) => startGeneration(ans)}
          onSkip={() => startGeneration({})}
        />
      )}

      {step === 'generating' && (
        <div className="apple-card p-12 text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white apple-heading">
              Generating tailored content for 4 platforms...
            </h3>
            <p className="text-xs text-zinc-500">
              Applying ASD-STE100 rules (active voice, concise sentences, zero corporate fluff)
            </p>
          </div>
        </div>
      )}

      {/* Rate Limit Alert */}
      {rateLimitError && (
        <div className="apple-card p-6 border-orange-500/30 bg-orange-500/5 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white apple-heading">
                Shared Free Credits Exhausted
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Admin LLM API keys hit their daily rate limit. Bring your own free API key (Gemini or Groq) to continue generating unlimited content.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsByokModalOpen(true)}
              className="apple-button inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold shadow-sm hover:bg-orange-500"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Bring Your Own API Key</span>
            </button>
          </div>
        </div>
      )}

      {/* Results View */}
      {step === 'results' && generatedItems.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold apple-heading text-zinc-900 dark:text-white">
              Platform Outputs ({generatedItems.length})
            </h3>
            <button
              onClick={() => startGeneration(answers)}
              className="apple-button inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-black/5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate All</span>
            </button>
          </div>

          <div className="space-y-8">
            {generatedItems.map((item) => (
              <div key={item.id} className="space-y-3">
                {renderPreviewForPlatform(item)}
                <VisibilityTipsCard
                  platform={item.platform as 'linkedin' | 'twitter' | 'reddit' | 'medium'}
                  hasMedia={(item.mediaUrls || []).length > 0}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
