import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateContact }) => {
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
      const saved = localStorage.getItem('gvm_custom_logo');
      if (saved) setCustomLogo(saved);
    };

    fetchLogo();

    const handleUpdate = () => {
      fetchLogo();
    };
    window.addEventListener('gvm-logo-updated', handleUpdate);
    return () => window.removeEventListener('gvm-logo-updated', handleUpdate);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#09090b] text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Gospel Vision Media Logo"
                  className="w-9 h-9 rounded-lg object-contain bg-white/5 border border-violet-500/30 p-1"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-800 border border-violet-400/30 flex items-center justify-center font-brand font-bold text-white text-xs">
                  GV
                </div>
              )}
              <div className="text-2xl font-bold font-brand tracking-[0.14em] text-violet-300">
                GOSPEL VISION MEDIA
              </div>
            </div>
            <p className="text-xs text-gray-400 max-w-md">
              Music release agency connecting artists to 26+ global platforms under our official label imprint ("Provided to YouTube by Gospel Vision Media").
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <button onClick={onNavigateHome} className="hover:text-violet-400 transition">
              Home
            </button>
            <button onClick={onNavigateContact} className="hover:text-violet-400 transition">
              Contact Us
            </button>
            <a href="mailto:gospelvisionmediaofficial@gmail.com" className="hover:text-violet-400 transition flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Official Email</span>
            </a>
            <a href="tel:9384756618" className="hover:text-violet-400 transition flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+91 9384756618</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="text-gray-500 font-normal">
            &copy; 2024 Gospel Vision Media. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span>Official: gospelvisionmediaofficial@gmail.com</span>
            <span>•</span>
            <span>Support: help@gospelvisionmedia.in</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-600 text-center leading-relaxed">
          *Terms and conditions apply. Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, JioSaavn, Wynk, TikTok, and Instagram are registered trademarks of their respective owners. Gospel Vision Media is an independent music release agency and label imprint.
        </p>
      </div>
    </footer>
  );
};
