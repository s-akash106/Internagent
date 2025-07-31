import express from 'express';
import Application from '../models/Application.js';
const router = express.Router();

router.get('/', async (_req, res) => {
  const apps = await Application.find().sort({ dateApplied: -1 });
  res.json(apps);
});

router.post('/', async (req, res) => {
  const app = await Application.create(req.body);
  res.json(app);
});

// DELETE /api/applications/:id
router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
export default router;