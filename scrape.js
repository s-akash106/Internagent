import axios from 'axios';
import * as cheerio from 'cheerio';


export async function scrapeRemoteOK(keyword) {
  const url = `https://remoteok.com/remote-${keyword}-internships`;
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(data);
  const jobs = [];
  $('tr.job').each((_, el) => {
    const title = $(el).find('h2').text().trim();
    const company = $(el).find('h3').text().trim();
    const location = $(el).find('.location').text().trim() || 'Remote';
    const url = 'https://remoteok.com' + $(el).find('a[href^="/l/"]').attr('href');
    if (title && company) jobs.push({ title, company, location, url });
  });
  return jobs.slice(0, 15);
}