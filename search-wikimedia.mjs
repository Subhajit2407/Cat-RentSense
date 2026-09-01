import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'equipment');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function queryCommons(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url|mime|size&format=json`;
    https.get(url, { headers: { 'User-Agent': 'EquipmentBot/1.0 (subhajit@example.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages ? Object.values(json.query.pages) : [];
          resolve(pages);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'EquipmentBot/1.0 (subhajit@example.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(dest);
        });
      });
    }).on('error', reject);
  });
}

async function main() {
  const queries = {
    excavator: 'File:Excavator white OR isolated OR cutout filetype:bitmap',
    bulldozer: 'File:Bulldozer white OR isolated OR cutout filetype:bitmap',
    crane: 'File:Crane white OR isolated OR cutout mobile filetype:bitmap',
    grader: 'File:Grader OR "motor grader" white OR isolated OR cutout filetype:bitmap',
  };

  for (const [key, q] of Object.entries(queries)) {
    console.log(`Searching for ${key}...`);
    const results = await queryCommons(q);
    console.log(key, 'found', results.length, 'results:');
    for (const r of results) {
      const info = r.imageinfo?.[0];
      console.log(` - ${r.title}: ${info?.url}`);
    }
  }
}

main().catch(console.error);
