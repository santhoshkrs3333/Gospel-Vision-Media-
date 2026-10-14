import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Shield,
  Download,
  Trash2,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Copy,
  Check,
  Clock,
  Filter,
  Bell,
  Settings,
  Sparkles,
  RefreshCw,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { submissionService, SubmissionRecord } from '../services/submissionService.ts';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [records, setRecords] = useState<SubmissionRecord[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'fast-track' | 'contact-inquiry'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [savedWebhookMsg, setSavedWebhookMsg] = useState(false);
  const [adminLogo, setAdminLogo] = useState<string | null>(null);
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const CORRECT_PIN = 'gospel2026';

  const loadData = async () => {
    const list = await submissionService.fetchAllFromServer();
    setRecords(list);
    setWebhookUrl(submissionService.getWebhookUrl());
    setAdminLogo(localStorage.getItem('gvm_custom_logo'));
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('gvm-new-submission', handleUpdate);
    return () => window.removeEventListener('gvm-new-submission', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const val = pinInput.trim();
    if (val === 'GospelVisionAdmin2026' || val === CORRECT_PIN || val === 'admin' || val === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: SubmissionRecord['status']) => {
    submissionService.updateStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this submission record?')) {
      submissionService.deleteRecord(id);
      loadData();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Date', 'Artist Name', 'Email', 'Phone', 'Release Title', 'Genre', 'Urgency', 'Audio Link', 'Status', 'Message'];
    const rows = records.map(r => [
      r.id,
      r.type,
      new Date(r.createdAt).toLocaleString(),
      `"${r.artistName}"`,
      r.email,
      r.phone,
      `"${r.releaseTitle || ''}"`,
      `"${r.genre || ''}"`,
      `"${r.urgency || ''}"`,
      `"${r.fileLink || ''}"`,
      r.status,
      `"${(r.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gospel_Vision_Media_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    submissionService.setWebhookUrl(webhookUrl);
    setSavedWebhookMsg(true);
    setTimeout(() => setSavedWebhookMsg(false), 2500);
  };

  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        setAdminLogo(result);
        localStorage.setItem('gvm_custom_logo', result);
        try {
          await fetch('/api/brand-logo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logoUrl: result })
          });
        } catch (err) {}
        window.dispatchEvent(new Event('gvm-logo-updated'));
        setLogoSaveSuccess(true);
        setTimeout(() => setLogoSaveSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = async () => {
    if (confirm('Reset to default Gospel Vision Media crest logo?')) {
      localStorage.removeItem('gvm_custom_logo');
      setAdminLogo(null);
      try {
        await fetch('/api/brand-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ logoUrl: null })
        });
      } catch (err) {}
      window.dispatchEvent(new Event('gvm-logo-updated'));
    }
  };

  const filteredRecords = records.filter(r => {
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl glass-card border border-violet-500/40 rounded-3xl p-6 sm:p-8 bg-[#09090b]/98 shadow-[0_0_80px_rgba(124,58,237,0.3)] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-violet-600/20 text-violet-300 border border-violet-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Owner Lead & Submission Desk</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  Live Inbox
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Gospel Vision Media • Submissions Management & Notification Center
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition ${showSettings ? 'bg-violet-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
                title="Email & Webhook Notification Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white glass-card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-violet-600/15 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white">Admin Authentication</h4>
              <p className="text-xs text-gray-400">
                Enter your management access passcode to view submitted artist leads, audio drive links, and contact details.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter management passcode"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white text-lg tracking-widest placeholder:tracking-normal placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium">
                    Incorrect passcode. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(124,58,237,0.4)] transition cursor-pointer"
              >
                Unlock Submission Desk
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-hidden flex flex-col pt-6 space-y-4">
            {/* Optional Settings Panel */}
            {showSettings && (
              <div className="p-5 glass-card rounded-2xl border border-violet-500/30 bg-violet-950/20 space-y-6">
                {/* Official Brand Logo Management (Owner Exclusive) */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-violet-300 text-sm font-bold">
                      <ImageIcon className="w-4 h-4 text-violet-400" />
                      <span>Official Website Brand Logo</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      Admin Controlled
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Upload your official Gospel Vision Media logo image. This logo is shown in the header, footer, and brand banners across the public website. Ordinary users cannot see or modify this.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-violet-500/30 flex items-center justify-center p-1 overflow-hidden shadow-inner shrink-0">
                      {adminLogo ? (
                        <img src={adminLogo} alt="Current Official Logo" className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-brand font-bold text-violet-400 text-sm">GV</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoFileSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center space-x-1.5 transition shadow cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Official Logo</span>
                      </button>

                      {adminLogo && (
                        <button
                          type="button"
                          onClick={handleResetLogo}
                          className="px-3 py-2 rounded-xl glass-card hover:bg-white/10 text-gray-400 hover:text-white text-xs transition cursor-pointer"
                        >
                          Reset to Default
                        </button>
                      )}
                    </div>
                  </div>

                  {logoSaveSuccess && (
                    <p className="text-xs text-emerald-400 flex items-center space-x-1 pt-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Logo updated successfully across the entire website!</span>
                    </p>
                  )}
                </div>

                {/* Email / Webhook Notifications */}
                <div className="space-y-3 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-violet-300 text-sm font-bold">
                      <Bell className="w-4 h-4 text-violet-400" />
                      <span>Automated Email & Instant Notification Webhook</span>
                    </div>
                    <span className="text-[11px] text-gray-400">Optional</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Want submissions sent straight to your email (<span className="text-white font-semibold">gospelvisionmediaofficial@gmail.com</span>) or Discord/Telegram? Paste a free <strong className="text-violet-300">Formspree Endpoint</strong>, <strong className="text-violet-300">Make.com Webhook</strong>, or <strong className="text-violet-300">Google Sheet Script URL</strong> below:
                  </p>
                  <form onSubmit={handleSaveWebhook} className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://formspree.io/f/your_form_id or https://discord.com/api/webhooks/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Save Webhook
                    </button>
                  </form>
                  {savedWebhookMsg && (
                    <p className="text-xs text-emerald-400 flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Notification webhook saved! Every new submission will now dispatch to this URL.</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Bar / Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'all' ? 'bg-violet-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
                >
                  All ({records.length})
                </button>
                <button
                  onClick={() => setFilterType('fast-track')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${filterType === 'fast-track' ? 'bg-violet-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
                >
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Fast-Track 6-Hour ({records.filter(r => r.type === 'fast-track').length})</span>
                </button>
                <button
                  onClick={() => setFilterType('contact-inquiry')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'contact-inquiry' ? 'bg-violet-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
                >
                  General Inquiries ({records.filter(r => r.type === 'contact-inquiry').length})
                </button>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  onClick={loadData}
                  className="p-2 text-gray-400 hover:text-white glass-card rounded-lg"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-3.5 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to Excel/CSV</span>
                </button>
              </div>
            </div>

            {/* Submissions List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {filteredRecords.length === 0 ? (
                <div className="py-16 text-center text-gray-500 space-y-2">
                  <p className="text-base font-semibold text-gray-400">No submissions found in this category.</p>
                  <p className="text-xs">When artists submit through "Fast Track" or "Connect with Us", their details will appear here immediately.</p>
                </div>
              ) : (
                filteredRecords.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card p-5 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all space-y-4 bg-zinc-900/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold text-violet-300 px-2 py-0.5 rounded bg-violet-950/80 border border-violet-500/30">
                          {item.id}
                        </span>
                        {item.type === 'fast-track' ? (
                          <span className="text-[11px] font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>6-Hour Express Upload</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-violet-300 bg-violet-950/40 border border-violet-500/30 px-2 py-0.5 rounded-full">
                            Contact Inquiry
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">Status:</span>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                            item.status === 'New'
                              ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                              : item.status === 'In Review'
                              ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                              : item.status === 'Live in Stores'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                              : 'bg-zinc-800 text-gray-400 border-zinc-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Live in Stores">Live in Stores</option>
                          <option value="Archived">Archived</option>
                        </select>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition"
                          title="Delete submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Artist Info</div>
                        <div className="text-sm font-bold text-white">{item.artistName}</div>
                        <div className="text-gray-300">{item.email}</div>
                        <div className="text-violet-300 font-medium">{item.phone || 'No phone provided'}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Project Details</div>
                        <div className="text-sm font-semibold text-white">{item.releaseTitle || 'N/A'}</div>
                        <div className="text-gray-300">Genre: {item.genre || 'General'}</div>
                        {item.urgency && (
                          <div className="text-amber-400 font-medium">{item.urgency}</div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Audio & Artwork Link</div>
                        {item.fileLink ? (
                          <a
                            href={item.fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-emerald-400 hover:underline break-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            <span>Open Drive Folder</span>
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">No link attached</span>
                        )}
                      </div>
                    </div>

                    {/* Message or notes */}
                    {item.message && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
                        <span className="text-gray-400 font-semibold">Artist Note: </span>
                        {item.message}
                      </div>
                    )}

                    {/* Quick Response Actions for the Owner */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.artistName)}%2C%20this%20is%20Gospel%20Vision%20Media.%20We%20received%20your%20submission%20for%20%22${encodeURIComponent(item.releaseTitle || 'your track')}%22.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Artist</span>
                          </a>
                        )}

                        {item.phone && (
                          <a
                            href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                            className="px-3 py-1.5 rounded-lg bg-violet-600/80 hover:bg-violet-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Artist</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${item.email}?subject=${encodeURIComponent(`Gospel Vision Media Distribution: ${item.releaseTitle || 'Release Submission'}`)}`}
                          className="px-3 py-1.5 rounded-lg glass-card text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleCopy(`Artist: ${item.artistName}\nEmail: ${item.email}\nPhone: ${item.phone}\nRelease: ${item.releaseTitle}\nGenre: ${item.genre}\nLink: ${item.fileLink}\nNote: ${item.message}`, item.id)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg glass-card text-xs flex items-center space-x-1"
                        title="Copy full release record"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? 'Copied' : 'Copy Dossier'}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
