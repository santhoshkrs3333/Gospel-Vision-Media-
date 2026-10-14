/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PlatformsGrid } from './components/PlatformsGrid.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { PricingCalculator } from './components/PricingCalculator.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { FastTrackModal } from './components/FastTrackModal.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { Footer } from './components/Footer.tsx';
import { ArrowRight, Clock, ShieldCheck, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'contact'>('home');
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string>('');
  const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);

  const navigateTo = (page: 'home' | 'contact') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planTitle: string) => {
    setSelectedPlanForContact(planTitle);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Sticky Header / Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenFastTrack={() => setIsFastTrackOpen(true)}
      />

      <main className="flex-1 pt-20">
        {/* PAGE 1: HOME */}
        {activePage === 'home' && (
          <div id="home-page" className="animate-fade-in transition-opacity duration-300">
            {/* Hero Section */}
            <HeroSection
              onNavigateContact={() => navigateTo('contact')}
              onOpenFastTrack={() => setIsFastTrackOpen(true)}
            />

            {/* Platforms Showcase (26+ Stores with Authentic SVG Logos) */}
            <PlatformsGrid />

            {/* Why Choose Us & 6-Hour Timeline */}
            <WhyChooseUs onNavigateContact={() => navigateTo('contact')} />

            {/* Pricing Packages */}
            <PricingCalculator onSelectPlan={handleSelectPlan} />

            {/* Pre-Contact Banner CTA */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
              <div className="glass-card p-10 md:p-14 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-purple-950/20 to-zinc-950 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-4 max-w-2xl">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ready for Launch?</span>
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    Drop Your Next Single or Album in Under 6 Hours*.
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    Contact our agency release team directly on WhatsApp or phone. We review your audio, register your ISRC/UPC barcodes under the Gospel Vision Media label imprint, and trigger store delivery immediately.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-violet-300">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>6-Hour Ingestion*</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Plan-Based Royalties (50%–100%)</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp: +91 9840288119</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-full font-bold text-base shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Connect with Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:9384756618"
                    className="w-full sm:w-auto glass-card hover:bg-white/10 text-violet-200 px-6 py-4 rounded-full font-semibold text-sm border border-violet-500/30 flex items-center justify-center space-x-2"
                  >
                    <PhoneCall className="w-4 h-4 text-violet-400" />
                    <span>Call +91 9384756618</span>
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FaqSection />
          </div>
        )}

        {/* PAGE 2: CONTACT INFORMATION */}
        {activePage === 'contact' && (
          <div id="contact-page" className="animate-fade-in transition-opacity duration-300">
            <ContactSection initialPlan={selectedPlanForContact} />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

      {/* Fast-Track Release Intake Modal */}
      <FastTrackModal
        isOpen={isFastTrackOpen}
        onClose={() => setIsFastTrackOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigateHome={() => navigateTo('home')}
        onNavigateContact={() => navigateTo('contact')}
      />
    </div>
  );
}
