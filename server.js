const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

// Basic middleware for a pitch-ready demo API.
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'aallie-vision-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/demo', (req, res) => {
  res.json({
    glasses: 'Mentra',
    demo: [
      {
        id: 'scene-01',
        ts: 0,
        label: 'Recognize objects in view',
        insight: 'Color-coded heatmap highlights zones of interest.',
      },
      {
        id: 'scene-02',
        ts: 12,
        label: 'Scan signage',
        insight: 'Text extraction + multilingual translation.',
      },
      {
        id: 'scene-03',
        ts: 24,
        label: 'Context-aware agent',
        insight: 'Suggests next best action / provides a quick summary.',
      },
    ],
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'name, email, and message are required',
    });
  }

  // In a production system, this would fan out to CRM/email.
  // For the pitch site, log for now.
  console.log('Lead contact submission:', { name, email, subject, message });

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Aallie-Vision backend running on http://localhost:${PORT}`);
});
