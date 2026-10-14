import React, { useState } from 'react';
import { FAQS_LIST } from '../data/faqs.ts';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-violet-400 uppercase tracking-widest border border-violet-500/20">
          <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
          <span>Answers & Clarity</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Everything you need to know about our 6-hour release window, store ingestion, and royalty accounting.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS_LIST.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl border transition-all ${
                isOpen ? 'border-violet-500/50 bg-white/5' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-6 flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">
                    {faq.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-white/5 text-violet-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
