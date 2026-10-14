import React, { useState, useEffect } from 'react';
import { PhoneCall, Sparkles, MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: 'home' | 'contact';
  setActivePage: (page: 'home' | 'contact') => void;
  onOpenFastTrack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, onOpenFastTrack }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/brand-logo');
        if (res.ok) {
          const data = await res.json();
          if (data.logoUrl) {
            setCustomLogo(data.logoUrl);
            return;
          }
        }
      } catch (e) {
        // Fallback
      }
      const savedLogo = localStorage.getItem('gvm_custom_logo');
      if (savedLogo) {
        setCustomLogo(savedLogo);
      }
    };

    fetchLogo();

    const handleLogoUpdate = () => {
      fetchLogo();
    };

    window.addEventListener('gvm-logo-updated', handleLogoUpdate);
    return () => window.removeEventListener('gvm-logo-updated', handleLogoUpdate);
  }, []);

  const handleNav = (page: 'home' | 'contact') => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed w-full z-50 top-0 glass-card border-b border-white/10 backdrop-blur-xl bg-[#09090b]/92">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Elegant Typography (No public upload button) */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => handleNav('home')}
            className="text-left group flex items-center space-x-3.5 transition-transform hover:scale-[1.01]"
          >
            {customLogo ? (
              <img
                src={customLogo}
                alt="Gospel Vision Media Logo"
                className="w-11 h-11 rounded-xl object-contain bg-white/5 border border-violet-500/30 p-1 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-purple-700 to-zinc-900 border border-violet-400/30 flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.45)]">
                <span className="font-brand font-bold text-white text-base tracking-wider">GV</span>
              </div>
            )}
            <div>
              <div className="text-xl sm:text-2xl font-bold font-brand tracking-[0.14em] text-violet-300 drop-shadow-[0_2px_10px_rgba(167,139,250,0.25)]">
                GOSPEL VISION MEDIA
              </div>
              <div className="text-[9px] text-violet-400/90 uppercase font-semibold tracking-[0.24em] hidden sm:block">
                Music Release Agency • Label Imprint
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <button
            onClick={() => handleNav('home')}
            id="nav-home"
            className={`transition-all py-1.5 px-3.5 rounded-lg text-sm font-semibold ${
              activePage === 'home'
                ? 'text-violet-300 border-b-2 border-violet-500 bg-violet-500/10'
                : 'text-gray-300 hover:text-violet-300'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNav('contact')}
            id="nav-contact"
            className={`transition-all py-1.5 px-3.5 rounded-lg text-sm font-semibold ${
              activePage === 'contact'
                ? 'text-violet-300 border-b-2 border-violet-500 bg-violet-500/10'
                : 'text-gray-300 hover:text-violet-300'
            }`}
          >
            Contact Us
          </button>

          {/* Direct WhatsApp Pill */}
          <a
            href="https://wa.me/919840288119?text=Hello%20Gospel%20Vision%20Media%2C%20I%20would%20like%20to%20inquire%20about%20music%20distribution%20through%20your%20agency."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full transition"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">+91 9840288119</span>
          </a>

          {/* Action CTA */}
          <button
            onClick={onOpenFastTrack}
            className="flex items-center space-x-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-200" />
            <span>Fast-Track Drop</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white rounded-lg glass-card"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (No public upload button) */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10 px-6 py-5 space-y-4 bg-[#09090b]/98">
          <div className="flex flex-col space-y-3 font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 px-3 rounded-lg text-base font-semibold ${
                activePage === 'home'
                  ? 'text-violet-400 bg-violet-500/15'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left py-2 px-3 rounded-lg text-base font-semibold ${
                activePage === 'contact'
                  ? 'text-violet-400 bg-violet-500/15'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col space-y-3">
            <a
              href="tel:9384756618"
              className="flex items-center space-x-3 text-sm text-violet-300 bg-violet-950/40 p-2.5 rounded-xl border border-violet-500/30"
            >
              <PhoneCall className="w-4 h-4 text-violet-400" />
              <span>Direct Call: +91 9384756618</span>
            </a>
            <a
              href="https://wa.me/919840288119"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-sm text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +91 9840288119</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFastTrack();
              }}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl text-center shadow-lg transition"
            >
              Start Fast-Track Upload
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
