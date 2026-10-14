import React, { useState } from 'react';
import {
  Mail,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { submissionService } from '../services/submissionService.ts';

interface ContactSectionProps {
  initialPlan?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: initialPlan || 'Express Single (₹1,500 - 50% Royalties)',
    message: initialPlan ? `Hi Gospel Vision Media team, I would like to release my music using the ${initialPlan} package.` : ''
  });

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');
  const [ticketId, setTicketId] = useState<string>('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return;
    }

    // Record submission into persistent lead desk
    const newRecord = submissionService.add({
      type: 'contact-inquiry',
      artistName: formData.name.trim(),
      email: formData.email,
      phone: formData.phone,
      releaseTitle: formData.inquiryType,
      urgency: 'Standard',
      message: formData.message
    });

    setTicketId(newRecord.id);
    setSubmissionStatus('success');
  };

  const getWhatsAppLink = () => {
    const text = `*NEW MESSAGE TO GOSPEL VISION MEDIA*%0A*Ref:* ${ticketId}%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Inquiry Type:* ${encodeURIComponent(formData.inquiryType)}%0A*Message:* ${encodeURIComponent(formData.message || 'I would like to release music under your label imprint.')}`;
    return `https://wa.me/919840288119?text=${text}`;
  };

  const getEmailLink = () => {
    const subject = encodeURIComponent(`[Gospel Vision Media Agency] ${formData.inquiryType} - ${formData.name}`);
    const body = encodeURIComponent(`Ref: ${ticketId}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n\nSent via Gospel Vision Media Website`);
    return `mailto:gospelvisionmediaofficial@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact-page" className="min-h-screen px-6 py-20 flex items-center justify-center relative">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Details Column */}
        <div className="space-y-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-card text-xs font-semibold text-violet-400 uppercase tracking-widest border border-violet-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Music Release Agency</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Connect with Us
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Reach out to our agency team for music distribution inquiries, label imprint releases, and royalty management. We provide direct, personalized support.
            </p>
          </div>

          <div className="space-y-5">
            {/* Official Email */}
            <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all flex items-start justify-between group">
              <div className="flex items-start space-x-4">
                <div className="p-3 glass-card rounded-xl text-violet-400 bg-violet-500/10 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Official Email</p>
                  <a
                    href="mailto:gospelvisionmediaofficial@gmail.com"
                    className="text-base sm:text-lg text-white hover:text-violet-400 transition font-medium break-all"
                  >
                    gospelvisionmediaofficial@gmail.com
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">Primary business & release submissions</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy('gospelvisionmediaofficial@gmail.com', 'email1')}
                className="p-2 text-gray-500 hover:text-violet-300 rounded-lg hover:bg-white/5 transition shrink-0 ml-2"
                title="Copy email address"
              >
                {copiedItem === 'email1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Support Email */}
            <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all flex items-start justify-between group">
              <div className="flex items-start space-x-4">
                <div className="p-3 glass-card rounded-xl text-violet-400 bg-violet-500/10 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Support Email</p>
                  <a
                    href="mailto:help@gospelvisionmedia.in"
                    className="text-base sm:text-lg text-white hover:text-violet-400 transition font-medium"
                  >
                    help@gospelvisionmedia.in
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">Agency support & catalog updates</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy('help@gospelvisionmedia.in', 'email2')}
                className="p-2 text-gray-500 hover:text-violet-300 rounded-lg hover:bg-white/5 transition shrink-0 ml-2"
                title="Copy support email"
              >
                {copiedItem === 'email2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp */}
            <div className="glass-card p-5 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all flex items-start justify-between group">
              <div className="flex items-start space-x-4">
                <div className="p-3 glass-card rounded-xl text-emerald-400 bg-emerald-500/10 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">WhatsApp Only</p>
                  <p className="text-lg font-bold text-white tracking-wide">+91 9840288119</p>
                  <p className="text-xs text-violet-400 italic font-medium mt-0.5">Text/WhatsApp correspondence only</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <button
                  onClick={() => handleCopy('+91 9840288119', 'wa')}
                  className="p-2 text-gray-500 hover:text-violet-300 rounded-lg hover:bg-white/5 transition"
                  title="Copy WhatsApp number"
                >
                  {copiedItem === 'wa' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href="https://wa.me/919840288119?text=Hello%20Gospel%20Vision%20Media%2C%20I%20am%20messaging%20about%20music%20distribution%20through%20your%20agency."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-emerald-500/10 transition"
                  title="Open WhatsApp chat"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Direct Call */}
            <div className="glass-card p-5 rounded-2xl border border-violet-500/30 bg-violet-950/20 hover:border-violet-400 transition-all flex items-start justify-between group shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 glass-card rounded-xl text-violet-400 bg-violet-500/20 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Direct Call</p>
                  <a
                    href="tel:9384756618"
                    className="text-xl sm:text-2xl font-bold text-violet-400 hover:text-violet-300 transition tracking-wide inline-block"
                  >
                    +91 9384756618
                  </a>
                  <p className="text-[11px] text-gray-400 mt-1">One-click call directly to agency release desk</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <button
                  onClick={() => handleCopy('+91 9384756618', 'phone')}
                  className="p-2 text-gray-400 hover:text-violet-300 rounded-lg hover:bg-white/5 transition"
                  title="Copy direct phone number"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href="tel:9384756618"
                  className="p-2 text-violet-400 hover:text-violet-200 rounded-lg hover:bg-violet-500/20 transition"
                  title="Call now"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Container - Exact Simplified Requirement */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-violet-500/20 shadow-2xl relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Send us a message</h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-6">
            Fill in your details below and our release managers will contact you immediately.
          </p>

          {submissionStatus === 'success' ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Message Dispatched!</h4>
                <p className="text-sm text-gray-300">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your message has been logged into our agency desk.
                </p>
                <div className="inline-block px-4 py-1.5 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-300 font-mono text-xs mt-2">
                  Reference: <span className="text-white font-bold">{ticketId}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-xs text-gray-400">Want an instant response on WhatsApp or Email?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 9840288119)</span>
                  </a>
                  <a
                    href={getEmailLink()}
                    className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmissionStatus('idle')}
                  className="text-xs text-gray-400 hover:text-white underline pt-3"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Name <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name / Artist Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Email Address <span className="text-violet-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="artist@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Inquiry Type
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition"
                >
                  <option value="Express Single (₹1,500 - 50% Royalties)">Express Single (₹1,500 - 50% Royalties)</option>
                  <option value="Express Album 15 Tracks (₹15,000 - 80% Royalties)">Express Album 15 Tracks (₹15,000 - 80% Royalties)</option>
                  <option value="VIP Artist Single (₹4,000 - 100% Royalties)">VIP Artist Single (₹4,000 - 100% Royalties)</option>
                  <option value="VIP Artist Album 15 Tracks (₹25,000 - 100% Royalties)">VIP Artist Album 15 Tracks (₹25,000 - 100% Royalties)</option>
                  <option value="Catalog Transfer from DistroKid/TuneCore">Transfer from Other Distributor</option>
                  <option value="General Agency Inquiry">General Agency Inquiry</option>
                </select>
              </div>

              {/* How can we help? */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  How can we help?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your upcoming song or album release..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(124,58,237,0.35)] flex items-center justify-center space-x-2 cursor-pointer transform hover:scale-[1.01]"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-4 pt-2 text-xs text-gray-400">
                <span>Or direct contact:</span>
                <a
                  href="https://wa.me/919840288119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
                <span>•</span>
                <a
                  href="tel:9384756618"
                  className="text-violet-400 hover:underline flex items-center space-x-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>+91 9384756618</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
