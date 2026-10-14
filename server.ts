import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SUBMISSIONS_FILE = path.resolve(process.cwd(), 'submissions.json');
const BRAND_LOGO_FILE = path.resolve(process.cwd(), 'brand-logo.json');

app.use(express.json({ limit: '10mb' }));

// Helper to read brand logo
function getBrandLogo(): string | null {
  try {
    if (fs.existsSync(BRAND_LOGO_FILE)) {
      const data = JSON.parse(fs.readFileSync(BRAND_LOGO_FILE, 'utf-8'));
      return data.logoUrl || null;
    }
  } catch (err) {
    console.error('Error reading brand logo:', err);
  }
  return null;
}

// Helper to save brand logo
function saveBrandLogo(logoUrl: string | null) {
  try {
    fs.writeFileSync(BRAND_LOGO_FILE, JSON.stringify({ logoUrl }, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving brand logo:', err);
  }
}

// Helper to read submissions
function getSubmissions(): any[] {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading submissions:', err);
    return [];
  }
}

// Helper to save submissions
function saveSubmissions(list: any[]) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
}

// ================= API ROUTES =================

// GET all submissions (Cross-device sync for Owner)
app.get('/api/submissions', (_req, res) => {
  const data = getSubmissions();
  res.json(data);
});

// POST new submission (From any customer device)
app.post('/api/submissions', (req, res) => {
  try {
    const list = getSubmissions();
    const newRecord = {
      id: req.body.id || ('GVM-' + Math.floor(100000 + Math.random() * 900000)),
      type: req.body.type || 'contact-inquiry',
      artistName: req.body.artistName || req.body.name || 'Anonymous',
      email: req.body.email || 'N/A',
      phone: req.body.phone || '',
      releaseTitle: req.body.releaseTitle || req.body.track_title || '',
      genre: req.body.genre || 'Gospel',
      urgency: req.body.urgency || req.body.package || 'Standard',
      fileLink: req.body.fileLink || req.body.audio_link || '',
      message: req.body.message || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };

    list.unshift(newRecord);
    saveSubmissions(list);

    console.log(`[Lead Received] New submission from ${newRecord.artistName} (${newRecord.phone})`);
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record submission' });
  }
});

// PATCH update status
app.patch('/api/submissions/:id', (req, res) => {
  try {
    const { status } = req.body;
    let list = getSubmissions();
    list = list.map(item => item.id === req.params.id ? { ...item, status } : item);
    saveSubmissions(list);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// DELETE a submission
app.delete('/api/submissions/:id', (req, res) => {
  try {
    let list = getSubmissions();
    list = list.filter(item => item.id !== req.params.id);
    saveSubmissions(list);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

// GET brand logo
app.get('/api/brand-logo', (_req, res) => {
  const logoUrl = getBrandLogo();
  res.json({ logoUrl });
});

// POST brand logo (Owner/Admin)
app.post('/api/brand-logo', (req, res) => {
  try {
    const { logoUrl } = req.body;
    saveBrandLogo(logoUrl || null);
    res.json({ success: true, logoUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save brand logo' });
  }
});

// Serve admin.html directly at /admin
app.get('/admin', (_req, res) => {
  const adminPath = path.resolve(process.cwd(), 'admin.html');
  if (fs.existsSync(adminPath)) {
    res.sendFile(adminPath);
  } else {
    res.redirect('/');
  }
});

// Start server with Vite middleware in dev or static files in prod
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gospel Vision Media server running on http://0.0.0.0:${PORT}`);
  });
}

start();
