export interface SubmissionRecord {
  id: string;
  type: 'fast-track' | 'contact-inquiry';
  createdAt: string;
  artistName: string;
  email: string;
  phone: string;
  releaseTitle?: string;
  genre?: string;
  urgency?: string;
  fileLink?: string;
  message?: string;
  status: 'New' | 'In Review' | 'Live in Stores' | 'Archived';
}

const STORAGE_KEY = 'gvm_submissions_data_v1';
const WEBHOOK_KEY = 'gvm_webhook_url';

export const submissionService = {
  // Synchronous local read
  getAll(): SubmissionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Asynchronous server fetch across devices
  async fetchAllFromServer(): Promise<SubmissionRecord[]> {
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const serverData = await res.json();
        if (Array.isArray(serverData)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          return serverData;
        }
      }
    } catch (e) {
      console.warn('Server fetch fallback to local:', e);
    }
    return this.getAll();
  },

  // Save new submission (Cross-Device: sends to server + local)
  add(record: Omit<SubmissionRecord, 'id' | 'createdAt' | 'status'>): SubmissionRecord {
    const list = this.getAll();
    const newRecord: SubmissionRecord = {
      ...record,
      id: 'GVM-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    list.unshift(newRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Storage error', e);
    }

    // Broadcast to backend server so other devices can see it
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(err => console.warn('Server post warning:', err));

    // Optional webhook dispatch
    this.dispatchWebhook(newRecord);

    // Dispatch global custom event
    window.dispatchEvent(new CustomEvent('gvm-new-submission', { detail: newRecord }));

    return newRecord;
  },

  // Update status
  async updateStatus(id: string, status: SubmissionRecord['status']) {
    const list = this.getAll().map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('gvm-new-submission'));

    try {
      await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.warn('Status patch warning:', e);
    }
  },

  // Delete submission
  async deleteRecord(id: string) {
    const list = this.getAll().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('gvm-new-submission'));

    try {
      await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Delete warning:', e);
    }
  },

  // Webhook settings
  getWebhookUrl(): string {
    return localStorage.getItem(WEBHOOK_KEY) || '';
  },

  setWebhookUrl(url: string) {
    localStorage.setItem(WEBHOOK_KEY, url);
  },

  async dispatchWebhook(record: SubmissionRecord) {
    const webhookUrl = this.getWebhookUrl();
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app: 'Gospel Vision Media Distribution',
          alert: 'New Music Submission Received!',
          ...record
        })
      });
    } catch (e) {
      console.warn('Webhook dispatch failed:', e);
    }
  }
};
