import express from 'express';
import { scrapeRemoteOK } from '../services/scrape.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { keyword = 'react', location = 'remote' } = req.query;
  const jobs = await scrapeRemoteOK(keyword);
  res.json(jobs);
});

export default router;