import React, { useState } from 'react';
import { X, Clock, Upload, Sparkles, CheckCircle2, MessageCircle, Mail } from 'lucide-react';
import { submissionService } from '../services/submissionService.ts';

interface FastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FastTrackModal: React.FC<FastTrackModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'form' | 'success'>('form');
  const [createdRef, setCreatedRef] = useState<string>('');
  const [formData, setFormData] = useState({
    artistName: '',
    trackTitle: '',
    genre: 'Gospel / Christian Worship',
    targetTiming: 'Emergency (Within 6 Hours)',
    fileLink: '',
    whatsappNumber: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to our submissions desk
    const newRecord = submissionService.add({
      type: 'fast-track',
      artistName: formData.artistName,
      email: formData.whatsappNumber.includes('@') ? formData.whatsappNumber : 'Not provided',
      phone: formData.whatsappNumber,
      releaseTitle: formData.trackTitle,
      genre: formData.genre,
      urgency: formData.targetTiming,
      fileLink: formData.fileLink,
      message: formData.notes || 'Fast-Track 6-Hour Upload Request'
    });

    setCreatedRef(newRecord.id);
    setStage('success');
  };

  const getWhatsAppSubmitUrl = () => {
    const text = `*FAST-TRACK 6-HOUR RELEASE REQUEST*%0A*Ref:* ${createdRef}%0A%0A*Artist:* ${encodeURIComponent(formData.artistName)}%0A*Track Title:* ${encodeURIComponent(formData.trackTitle)}%0A*Genre:* ${encodeURIComponent(formData.genre)}%0A*Timing:* ${encodeURIComponent(formData.targetTiming)}%0A*Audio/Drive Link:* ${encodeURIComponent(formData.fileLink)}%0A*WhatsApp:* ${encodeURIComponent(formData.whatsappNumber)}%0A*Notes:* ${encodeURIComponent(formData.notes || 'Please expedite under 6 hours.')}`;
    return `https://wa.me/919840288119?text=${text}`;
  };

  const getEmailSubmitUrl = () => {
    const subject = encodeURIComponent(`[6-Hour Fast-Track] ${formData.trackTitle} - ${formData.artistName} (${createdRef})`);
    const body = encodeURIComponent(`Artist: ${formData.artistName}\nTrack Title: ${formData.trackTitle}\nGenre: ${formData.genre}\nTiming: ${formData.targetTiming}\nDrive Link: ${formData.fileLink}\nWhatsApp: ${formData.whatsappNumber}\nNotes: ${formData.notes}\n\nSubmitted via Gospel Vision Media Web Portal`);
    return `mailto:gospelvisionmediaofficial@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-card border border-violet-500/40 rounded-3xl p-6 sm:p-8 bg-[#09090b]/95 shadow-[0_0_80px_rgba(124,58,237,0.3)] max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white glass-card"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'success' ? (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-violet-950/80 text-violet-300 font-mono text-xs border border-violet-500/30">
                Ticket Ref: <strong className="text-white">{createdRef}</strong>
              </span>
              <h3 className="text-2xl font-bold text-white pt-2">Fast-Track Intake Received!</h3>
              <p className="text-sm text-gray-300">
                Your release for <span className="font-semibold text-violet-300">"{formData.trackTitle}"</span> by <span className="font-semibold text-violet-300">{formData.artistName}</span> has been logged directly into our system desk.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-950/40 border border-violet-500/30 space-y-3 text-left">
              <p className="text-xs text-gray-300 font-medium">
                For the fastest 6-hour turnaround, you can also alert our distribution desk directly on WhatsApp or Email right now:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={getWhatsAppSubmitUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp (+91 9840288119)</span>
                </a>

                <a
                  href={getEmailSubmitUrl()}
                  className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>Notify via Email</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setStage('form');
                onClose();
              }}
              className="text-xs text-gray-400 hover:text-white underline pt-2"
            >
              Close this window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4" />
              <span>Express 6-Hour Onboarding</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Fast-Track Release Intake
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Skip the backlog. Submit your track details and audio link for expedited DSP ingestion to Spotify, Apple Music, and 26+ stores.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Artist / Band Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Santhosh"
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Track / Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grace Abounds"
                    value={formData.trackTitle}
                    onChange={(e) => setFormData({ ...formData, trackTitle: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Genre
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Gospel / Christian Worship">Gospel / Christian Worship</option>
                    <option value="Christian Contemporary (CCM)">Christian Contemporary (CCM)</option>
                    <option value="Devotional / Regional Worship">Devotional / Regional Worship</option>
                    <option value="Instrumental / Acoustic">Instrumental / Acoustic</option>
                    <option value="Hip-Hop / Urban Gospel">Hip-Hop / Urban Gospel</option>
                    <option value="Other Genre">Other Genre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Target Live Time
                  </label>
                  <select
                    value={formData.targetTiming}
                    onChange={(e) => setFormData({ ...formData, targetTiming: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Emergency (Within 6 Hours)">Rush: Within 6 Hours</option>
                    <option value="Within 24 Hours">Priority: Within 24 Hours</option>
                    <option value="Specific Future Date">Scheduled Pre-order Date</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Audio & Artwork Drive Link (Google Drive / WeTransfer / Dropbox) *
                </label>
                <div className="relative">
                  <Upload className="w-4 h-4 text-violet-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={formData.fileLink}
                    onChange={(e) => setFormData({ ...formData, fileLink: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Please ensure link sharing permissions are set to "Anyone with the link can view".</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Your WhatsApp Number (For 6-Hour Live Alert) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98402..."
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Special Notes or Producer Credits
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific instructions (e.g. lyrics sync, ISRC if re-releasing)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit for 6-Hour Express Distribution</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
