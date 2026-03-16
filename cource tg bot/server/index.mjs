import express from 'express';
import cors from 'cors';
import { db, initDb, seedDb } from './db.mjs';

const app = express();
const PORT = process.env.PORT || 5175;

app.use(cors());
app.use(express.json());

initDb();
seedDb();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'running' });
});

app.get('/', (_req, res) => {
  res.send('NeuroPro TG API is running.');
});

app.get('/api/user', (req, res) => {
  const name = String(req.query.name ?? 'Студент NeuroPro');
  res.json({
    name,
    cohort: 'Весна 2026',
    plan: 'Премиум',
    hoursPerWeek: '5 ч/нед'
  });
});

app.get('/api/courses', (_req, res) => {
  const rows = db.prepare('SELECT id, title, category, progress, next_lesson as nextLesson, mentor FROM courses').all();
  res.json(rows);
});

app.get('/api/payments', (_req, res) => {
  const rows = db.prepare('SELECT id, title, price, status, due FROM payments').all();
  res.json(rows);
});

app.get('/api/activity', (_req, res) => {
  const rows = db.prepare('SELECT id, title, time, meta FROM activity').all();
  res.json(rows);
});

app.post('/api/payments/:id/pay', (req, res) => {
  const { id } = req.params;
  const update = db.prepare('UPDATE payments SET status = ? WHERE id = ?').run('Оплачено', id);
  if (update.changes === 0) {
    res.status(404).json({ ok: false, message: 'Invoice not found' });
    return;
  }
  res.json({ ok: true, id });
});

app.listen(PORT, () => {
  console.log(`TG API running on http://localhost:${PORT}`);
});
