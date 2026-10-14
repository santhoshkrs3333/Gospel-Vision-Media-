import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {showTooltip && (
        <div className="glass-card border border-emerald-500/30 bg-[#09090b]/95 p-3 rounded-2xl shadow-2xl max-w-xs text-xs text-white relative animate-bounce-subtle">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-zinc-800 text-gray-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Need 6-Hour Express Upload?</span>
          </div>
          <p className="text-gray-300">
            Chat directly with our distribution team on WhatsApp at <span className="font-semibold text-emerald-300">+91 9840288119</span>.
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Direct Call Quick Bubble */}
        <a
          href="tel:9384756618"
          className="w-11 h-11 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white flex items-center justify-center shadow-lg border border-violet-400/40 transition-transform hover:scale-110"
          title="Direct Call: +91 9384756618"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Main Button */}
        <a
          href="https://wa.me/919840288119?text=Hello%20Gospel%20Vision%20Media%2C%20I%20would%20like%20to%20distribute%20my%20music%20within%206%20hours."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-110 group relative"
          title="WhatsApp Only: +91 9840288119"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
          </span>
        </a>
      </div>
    </div>
  );
};
