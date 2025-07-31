import express from 'express';
import axios from 'axios';
const router = express.Router();

// RemoteOK helper
async function fetchRemoteOK(keyword, country, remoteOnly) {
  const url = `https://remoteok.com/remote-${keyword}-internships`;
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = (await import('cheerio')).load(data);
  const jobs = [];
  $('tr.job').each((_, el) => {
    const title = $(el).find('h2').text().trim();
    const company = $(el).find('h3').text().trim();
    const location = $(el).find('.location').text().trim() || 'Remote';
    const url = 'https://remoteok.com' + $(el).find('a[href^="/l/"]').attr('href');
    if (!title || !company) return;
    // simple country / remote filter
    const isRemote = location.toLowerCase().includes('remote');
    if (remoteOnly && !isRemote) return;
    if (country && !location.toLowerCase().includes(country.toLowerCase())) return;
    jobs.push({ title, company, location, url });
  });
  return jobs.slice(0, 15);
}

router.get('/', async (req, res) => {
  const { keyword = 'react', country = '', remote = 'false' } = req.query;
  const results = await fetchRemoteOK(keyword, country, remote === 'true');
  res.json(results);
});

export default router;