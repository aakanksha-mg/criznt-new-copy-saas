/** Minimal static server for checking the built output exactly as deployed. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleApiRequest } from '../server/api.mjs';

const dir = path.join(fileURLToPath(new URL('..', import.meta.url)), 'dist/client');
const port = Number(process.env.PORT ?? 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer(async (req, res) => {
    if (req.url && req.url.startsWith('/api/')) {
      const handled = await handleApiRequest(req, res);
      if (handled) return;
    }

    const clean = decodeURIComponent((req.url ?? '/').split('?')[0]);
    const candidates = [
      path.join(dir, clean),
      path.join(dir, clean, 'index.html'),
      path.join(dir, `${clean}.html`),
    ];
    const hit = candidates.find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
    if (!hit) {
      const nf = path.join(dir, '404.html');
      res.writeHead(404, { 'Content-Type': types['.html'] });
      res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(hit)] ?? 'application/octet-stream' });
    res.end(fs.readFileSync(hit));
  })
  .listen(port, () => console.log(`http://localhost:${port}`));
