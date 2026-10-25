#!/usr/bin/env node
/* Servidor local que imita a Vercel (cleanUrls + trailingSlash:false) para probar el sitio.
   Uso:  node serve.js   →  http://localhost:3000
   Con XAMPP no funciona bien porque las subpáginas usan rutas absolutas (/css, /proyectos/…). */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, PORT = process.env.PORT || 3000;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.length > 1 && p.endsWith('/')) { res.writeHead(308, { Location: p.slice(0, -1) }); return res.end(); }
  const tries = [p, p + '.html', path.join(p, 'index.html')].map(x => path.join(ROOT, x));
  const f = tries.find(x => fs.existsSync(x) && fs.statSync(x).isFile());
  if (!f) { res.writeHead(404, { 'Content-Type': MIME['.html'] }); return res.end(fs.readFileSync(path.join(ROOT, '404.html'))); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
