import React from 'react';
import { PRICING_PLANS } from '../data/features.ts';
import { Check, Sparkles, ArrowRight, ShieldCheck, Percent } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planTitle: string) => void;
}

export const PricingCalculator: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <span className="text-xs font-bold text-violet-400 tracking-widest uppercase px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
          Agency Release Plans
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Transparent Rates & <span className="text-violet-400">Plan-Based Royalties</span>
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          Gospel Vision Media is your music release agency. We connect you to global distribution platforms under our official label imprint. Select your preferred royalty split and rollout package below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isPopular = plan.popular;
          const isVIP = plan.id === 'vip-artist';

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isPopular
                  ? 'glass-card border-2 border-violet-500 bg-violet-950/25 shadow-[0_0_50px_rgba(124,58,237,0.25)] -translate-y-2'
                  : 'glass-card border border-white/10 hover:border-violet-500/40'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-violet-600 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-lg flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Popular Album Plan</span>
                </div>
              )}

              {isVIP && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-600 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-lg flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>100% Royalties Kept</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                  <p className="text-xs text-gray-400 min-h-[32px]">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl md:text-5xl font-black text-white font-mono">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-gray-400 font-medium">/{plan.period}</span>
                    )}
                  </div>

                  {/* Royalty Share Badge */}
                  <div className="mt-3 flex items-center space-x-2">
                    {plan.id === 'express-single' && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
                        <Percent className="w-3.5 h-3.5 text-violet-400" />
                        <span>50% Artist Royalty Share</span>
                      </span>
                    )}
                    {plan.id === 'express-album' && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        <Percent className="w-3.5 h-3.5 text-emerald-400" />
                        <span>80% Artist Royalty Share</span>
                      </span>
                    )}
                    {plan.id === 'vip-artist' && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                        <Percent className="w-3.5 h-3.5 text-amber-400" />
                        <span>100% Artist Royalty Share</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-emerald-400 font-medium flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{plan.deliveryTime}</span>
                  </div>
                </div>

                {/* Included Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <p className="text-xs font-bold text-violet-300 uppercase tracking-wider">Plan Details:</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6">
                <button
                  onClick={() => onSelectPlan(plan.title)}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                    isPopular
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)]'
                      : isVIP
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                      : 'bg-white/10 hover:bg-violet-600 text-white'
                  }`}
                >
                  <span>Select {plan.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 glass-card p-6 rounded-2xl border border-violet-500/20 text-center text-xs text-gray-300 max-w-3xl mx-auto space-y-2">
        <p className="font-semibold text-white">Label Imprint & Royalty Accounting Notice</p>
        <p>
          All releases are provided to platforms under the registered label imprint <strong>Gospel Vision Media</strong>. YouTube music uploads will state <em>"Provided to YouTube by Gospel Vision Media"</em>. Royalties are calculated per stream based on your chosen tier (50% for Express Single, 80% for Express Album, and 100% for VIP Artists) and paid directly via Bank Wire / UPI.
        </p>
      </div>
    </section>
  );
};
