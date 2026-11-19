// Original, language-neutral diagrams. Captions and alt text are localized in the article.
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('sharp');
const output = 'artifacts/automation-guide';
await mkdir(output, { recursive: true });
const ink = '#262831', accent = '#7658bd', pale = '#f0ebfa', muted = '#c6bfd5';
const box = (x, y, w, h, fill = 'white') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${fill}" stroke="#ded8e8" stroke-width="2"/>`;
const line = (d, color = ink, width = 5) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle = (x, y, r, fill = accent) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const check = (x,y) => line(`M${x-20} ${y} l14 15 l29 -32`, '#287c60', 7);
const arrow = (d, color = accent) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)"/>`;
const number = (x,y,n) => circle(x,y,22,ink) + `<text x="${x}" y="${y+7}" text-anchor="middle" fill="white" font-size="20" font-family="Arial,sans-serif" font-weight="bold">${n}</text>`;
const doc = (x,y) => box(x-28,y-38,56,76) + line(`M${x-14} ${y-15} h28 M${x-14} ${y} h28 M${x-14} ${y+15} h17`, accent, 4);
const person = (x,y) => circle(x,y-20,18,accent) + line(`M${x-32} ${y+32} v-8 a32 32 0 0 1 64 0 v8`, accent, 6);
const chip = (x,y) => box(x-34,y-34,68,68,pale) + [0,1,2].map(i=>line(`M${x-20+i*20} ${y-44} v10 M${x-20+i*20} ${y+34} v10 M${x-44} ${y-20+i*20} h10 M${x+34} ${y-20+i*20} h10`,accent,4)).join('') + line(`M${x-12} ${y} l10 12 l17 -25`,accent,5);
const shell = body => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${accent}"/></marker><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ddd7e8"/></pattern></defs><rect width="1200" height="720" fill="#faf8fe"/><rect width="1200" height="720" fill="url(#dots)"/><rect x="36" y="36" width="1128" height="648" rx="36" fill="white" stroke="#e4dfec" stroke-width="2"/>${body}<text x="92" y="636" fill="#797182" font-family="Arial,sans-serif" font-size="18" letter-spacing="3">AzeemLab</text></svg>`;
const centers = [160,380,600,820,1040];
const workflow = centers.map((x,i)=>box(x-73,250,146,180,i===2?pale:'white') + number(x,205,i+1)).join('') + centers.slice(0,-1).map(x=>arrow(`M${x+79} 340 h56`)).join('') + doc(160,340) + line('M350 325 h18 M350 345 h18 M350 365 h18',muted,4) + check(405,343) + chip(600,340) + person(820,340) + box(1009,300,62,80,pale) + check(1040,342) + arrow('M820 447 V520 H380 V451') + circle(600,520,12,pale);
const review = box(95,280,190,165) + doc(190,363) + number(190,240,1) + arrow('M300 363 H456') + box(470,260,190,205,pale) + person(565,355) + circle(565,420,13,'#d6c6f0') + arrow('M675 363 H757 V167 H864') + arrow('M675 363 H864') + arrow('M675 363 H757 V558 H864') + box(880,110,220,115,'#f1f9f5') + check(990,168) + number(850,145,1) + box(880,305,220,115,pale) + line('M970 363 a23 23 0 1 0 16 -24 M986 327 v14 h14',accent,5) + number(850,342,2) + box(880,500,220,115,'#fff8eb') + line('M979 542 v34 M1001 542 v34','#a97823',7) + number(850,537,3);
for (const [name,body] of [['workflow',workflow],['review-gate',review]]) {
  const svg = shell(body);
  await writeFile(`${output}/${name}-20261030.svg`,svg);
  await sharp(Buffer.from(svg)).webp({quality:88}).toFile(`${output}/${name}-20261030.webp`);
  console.log(`${name}: 1200 × 720 WebP`);
}
