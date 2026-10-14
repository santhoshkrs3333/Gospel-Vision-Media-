import React, { useState } from 'react';
import { PLATFORMS_LIST } from '../data/platforms.ts';
import { PlatformLogo } from './PlatformLogo.tsx';
import { Radio, Search, Check, Sparkles } from 'lucide-react';

export const PlatformsGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Global Giants', 'Streaming & Social', 'Regional & Audiophile'];

  const filteredPlatforms = PLATFORMS_LIST.filter(platform => {
    const matchesCategory = selectedCategory === 'All' || platform.category === selectedCategory;
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          platform.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="platforms" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-violet-400 uppercase tracking-widest border border-violet-500/20">
          <Radio className="w-3.5 h-3.5 text-violet-400" />
          <span>Worldwide Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Delivered to <span className="text-violet-400">26+ Major Stores*</span> & DSPs
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          As an agency, we ingest your single or album to every major streaming service, download store, social audio library, and ringtone provider under the Gospel Vision Media label imprint.
        </p>

        {/* Filter & Search Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-xl transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                    : 'glass-card text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter stores..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 text-white placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Platforms with Official Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPlatforms.map((platform, index) => (
          <div
            key={index}
            className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform">
                    <PlatformLogo name={platform.name} className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-violet-300 transition-colors flex items-center space-x-0.5">
                      <span>{platform.name}</span>
                    </h3>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{platform.category}</div>
                  </div>
                </div>

                {platform.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {platform.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed pt-1">
                {platform.description}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center space-x-1 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>6-Hour Direct Feed*</span>
              </span>
              <span className="text-gray-400 font-mono text-[10px]">Label Imprint</span>
            </div>
          </div>
        ))}
      </div>

      {/* Terms and Conditions Apply Disclaimer */}
      <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
        <p className="italic">
          *Terms and conditions apply. Platform delivery and store ingestion timelines depend on audio/artwork quality compliance, artist metadata clearance, and digital service provider editorial queues.
        </p>
      </div>

      {/* Platform Summary Card */}
      <div className="mt-10 glass-card p-6 rounded-3xl border border-violet-500/30 bg-violet-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-violet-600/20 text-violet-300 rounded-2xl border border-violet-500/30 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Need a platform not listed here?</h4>
            <p className="text-sm text-gray-400">Our agency connects with major DDEX aggregators worldwide to deliver your releases everywhere.</p>
          </div>
        </div>
        <a
          href="https://wa.me/919840288119?text=Hello%20Gospel%20Vision%20Media%2C%20can%20you%20distribute%20to%20custom%20platforms%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition shadow-lg shrink-0"
        >
          Ask on WhatsApp
        </a>
      </div>
    </section>
  );
};
