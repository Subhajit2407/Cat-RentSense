import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'equipment');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const origin = new URL(url).origin;
          redirectUrl = origin + redirectUrl;
        }
        return download(redirectUrl, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved: ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(dest);
        });
      });
    }).on('error', reject);
  });
}

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const categories = ['excavator', 'bulldozer', 'crane'];
  for (const cat of categories) {
    try {
      const html = await fetchPage(`https://pngimg.com/uploads/${cat}/`);
      const regex = /href="([^"]+\.png)"/g;
      let match;
      const links = [];
      while ((match = regex.exec(html)) !== null) {
        links.push(match[1]);
      }
      console.log(cat, 'found', links.length, 'links');
      if (links.length > 0) {
        // pick first high quality one
        let fullUrl = links[0];
        if (!fullUrl.startsWith('http')) {
          fullUrl = 'https://pngimg.com' + fullUrl;
        }
        console.log('Downloading:', fullUrl);
        await download(fullUrl, path.join(outDir, `${cat}.png`));
      }
    } catch (err) {
      console.error(cat, err.message);
    }
  }
}

main();
