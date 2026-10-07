'use client';

import { useState } from 'react';
import { Bot, Check, ArrowRight, SkipForward } from 'lucide-react';
import { ClarifyingQuestion } from '@/lib/llm/clarify';

interface Props {
  questions: ClarifyingQuestion[];
  onComplete: (answers: Record<string, string>) => void;
  onSkip: () => void;
}

export function ClarifyingQuestionsUI({ questions, onComplete, onSkip }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [freeText, setFreeText] = useState('');

  const handleSelectOption = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleFinish = () => {
    const finalAnswers = { ...answers };
    if (freeText.trim()) {
      finalAnswers['custom_notes'] = freeText.trim();
    }
    onComplete(finalAnswers);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* AI Bot Message Header (Claude/ChatGPT Style) */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <Bot className="w-5 h-5" />
        </div>
        <div className="apple-card p-4 rounded-2xl rounded-tl-sm space-y-1">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white apple-heading">
            ShipFolio AI Assistant
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I reviewed your project context. Answer these 2–3 quick questions to help me tailor your post tone and target audience:
          </p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6 pl-4 md:pl-12">
        {questions.map((q, idx) => (
          <div key={q.id || idx} className="space-y-3 apple-card p-5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Question {idx + 1}: {q.question}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(q.id, opt)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all apple-button flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-black/10'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {q.allowFreeText && (
              <div className="pt-2">
                <input
                  type="text"
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  placeholder="Anything specific to highlight? (Optional)"
                  className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            )}
          </div>
        ))}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onSkip}
            className="apple-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip Questions</span>
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="apple-button inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            <span>Generate Content</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
