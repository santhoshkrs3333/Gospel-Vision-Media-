import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigateContact: () => void;
  onOpenFastTrack: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateContact, onOpenFastTrack }) => {
  return (
    <section id="home-hero" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl space-y-8 z-10">
        {/* Agency Imprint Badge */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full glass-card text-xs md:text-sm font-semibold text-violet-300 uppercase tracking-widest border border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>Music Release Agency & Official Label Imprint</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-[11px] text-emerald-400 normal-case font-medium">Connecting Artists to 26+ Stores</span>
        </div>

        {/* Main Title - Pure direct text colors (NO rectangle box bug) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white max-w-4xl mx-auto">
          Upload Your Music to Spotify, Apple Music, and{' '}
          <span className="text-violet-400">
            26+ Platforms
          </span>
        </h1>

        {/* Highlight Subhead */}
        <p className="text-2xl sm:text-3xl md:text-4xl text-violet-200 font-medium">
          Live Within{' '}
          <span className="text-white underline decoration-violet-500 decoration-4 underline-offset-8 font-bold">
            6 Hours!
          </span>
        </p>

        {/* Description - Clarifying Agency Model */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
          We are a dedicated music release agency connecting our clients with global distribution networks under our official label imprint—<strong className="text-violet-300 font-semibold">"Provided to YouTube by Gospel Vision Media"</strong>. Keep between 50% to 100% royalties based on your chosen plan.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onNavigateContact}
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 sm:py-5 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105 flex items-center justify-center space-x-3 cursor-pointer group"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenFastTrack}
            className="w-full sm:w-auto glass-card hover:bg-white/10 text-violet-200 hover:text-white px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold border border-violet-500/40 hover:border-violet-400 transition-all flex items-center justify-center space-x-2"
          >
            <Clock className="w-5 h-5 text-violet-400" />
            <span>Fast-Track 6-Hour Drop</span>
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">6-Hour Delivery</div>
              <div className="text-xs text-gray-400">Rapid ingest to Spotify & DSPs</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Label Imprint</div>
              <div className="text-xs text-gray-400">YouTube Official Content ID</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Tiered Royalties</div>
              <div className="text-xs text-gray-400">50%, 80%, up to 100% Plan</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">WhatsApp Agency</div>
              <div className="text-xs text-gray-400">Direct phone & chat support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
