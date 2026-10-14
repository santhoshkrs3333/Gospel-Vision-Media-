import React from 'react';
import { CORE_FEATURES, TIMELINE_STEPS } from '../data/features.ts';
import { Clock, ShieldCheck, Globe, MessageCircle, Zap, Music, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />
};

export const WhyChooseUs: React.FC<{ onNavigateContact: () => void }> = ({ onNavigateContact }) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-24">
      {/* 6-Hour Timeline Section */}
      <div className="glass-card p-8 md:p-12 rounded-3xl border border-violet-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Agency Execution
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            How The <span className="text-violet-400">6-Hour Pipeline</span> Works
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            As your release agency, we ingest your tracks under the Gospel Vision Media label imprint and fast-track submission to Spotify, Apple, and 26+ stores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {TIMELINE_STEPS.map((step, idx) => (
            <div key={idx} className="relative glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-violet-500/40 font-mono">
                  {step.step}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                  {step.time}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm text-gray-300">
              Need a rush release for this Sunday's worship service? Our agency team is available 24/7 on WhatsApp.
            </span>
          </div>
          <button
            onClick={onNavigateContact}
            className="text-xs uppercase font-bold text-violet-300 hover:text-white px-5 py-2.5 rounded-full border border-violet-500/40 hover:bg-violet-600 transition"
          >
            Inquire About Rush Drop &rarr;
          </button>
        </div>
      </div>

      {/* Core Advantages Grid */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Agency Advantages
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Built for Artists Who Value <span className="text-violet-400">Speed & Support</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            We handle ingestion, metadata compliance, ISRC barcodes, YouTube Content ID, and caller tunes so you can focus on making music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-violet-600/15 text-violet-400 border border-violet-500/20">
                    {iconMap[feature.icon] || <Zap className="w-6 h-6" />}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-violet-300 font-mono">{feature.stat}</div>
                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{feature.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center text-xs text-violet-400 font-medium">
                <span>Gospel Vision Media Release Agency</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
