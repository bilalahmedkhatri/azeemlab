import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('sharp');

const output = 'public/images/insights';
await mkdir(output, { recursive: true });
const ink = '#262831', muted = '#aba8bd', pale = '#eeedf3';
const rect = (x,y,w,h,fill='white',radius=18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="#dbd9e3" stroke-width="2"/>`;
const line = (x,y,w,fill=muted) => rect(x,y,w,10,fill,5);
const path = d => `<path d="${d}" fill="none" stroke="${muted}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = (x,y,r=10,fill=ink) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const browser = (x,y,w,h) => rect(x,y,w,h)+rect(x,y,w,40,ink,14)+dot(x+22,y+20,4,'white')+dot(x+38,y+20,4,muted)+dot(x+54,y+20,4,muted);
const device = (x,y,w,h) => rect(x,y,w,h,ink,25)+rect(x+10,y+20,w-20,h-32,'white',16)+line(x+w/2-20,y+8,40,muted);
const card = (x,y,w=140,h=160) => rect(x,y,w,h)+rect(x+14,y+14,w-28,h-72,pale)+line(x+14,y+h-43,w-42)+line(x+14,y+h-24,w-65);
const check = (x,y) => dot(x,y,18,ink)+`<path d="M ${x-8} ${y} l 6 6 l 11 -13" fill="none" stroke="white" stroke-width="3"/>`;
const frame = content => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#f3f2f6"/><circle cx="1000" cy="130" r="200" fill="#e9e6f0"/><circle cx="130" cy="710" r="180" fill="#e9e7ef"/>${content}</svg>`;
const responsive = browser(180,150,650,460)+line(215,225,270,ink)+line(215,250,200)+rect(215,295,570,140,pale)+card(215,460,170,125)+card(415,460,170,125)+card(615,460,170,125)+device(840,275,160,330)+rect(863,328,114,100,pale)+line(863,455,105)+line(863,485,78)+rect(863,522,114,40,ink);
const layouts = browser(120,185,360,390)+rect(145,255,310,100,pale)+card(145,390,145,150)+card(310,390,145,150)+device(590,185,225,390)+rect(615,245,175,90,pale)+card(615,355,175,165)+path('M 875 340 h 180 M 995 310 l 60 30 l -60 30')+line(865,430,185)+line(865,460,135);
const branding = rect(170,160,410,460)+rect(220,210,310,260,pale)+`<path d="M 290 400 L 375 270 L 460 400 Z" fill="${ink}"/><circle cx="375" cy="355" r="38" fill="${muted}"/>`+line(220,510,240,ink)+line(220,542,190)+rect(625,160,400,180)+[ink,muted,'#dedce9','#fafafd'].map((c,i)=>rect(650+i*85,190,65,120,c,10)).join('')+rect(625,380,400,240)+line(655,430,220,ink)+line(655,475,310)+line(655,505,280)+line(655,535,195);
const seo = browser(150,170,540,440)+rect(185,245,460,60,pale)+dot(605,275,17)+path('M 615 288 l 18 18')+[0,1,2].map(i=>line(185,350+i*72,320,ink)+line(185,375+i*72,420)).join('')+rect(760,170,290,440)+[0,1,2,3].map(i=>check(800,250+i*85)+line(840,245+i*85,170)).join('');
const ecommerce = browser(130,170,620,460)+[0,1,2].map(i=>card(160+i*185,250,165,260)).join('')+rect(805,205,270,425)+rect(835,240,210,100,pale)+line(835,380,155,ink)+line(835,415,200)+line(835,450,135)+rect(835,505,210,65,ink)+check(940,690);
const chat = rect(115,230,240,330)+[0,1,2].map(i=>rect(145,260+i*85,180,65,pale)+line(162,280+i*85,140)+line(162,304+i*85,100)).join('')+path('M 355 400 H 445 M 420 380 l 25 20 l -25 20')+rect(450,270,230,250)+dot(522,350,13)+dot(607,350,13)+path('M 522 415 q 42 35 85 0')+path('M 680 400 H 755 M 730 380 l 25 20 l -25 20')+rect(760,150,330,510)+rect(790,205,215,70,pale)+rect(850,305,210,105,ink)+line(868,330,170,'#efedf5')+line(868,362,135,'#efedf5')+rect(790,445,215,75,pale)+line(790,585,270);
const workflow = path('M 290 400 H 420 M 640 400 H 795 M 900 290 V 185 H 670 M 900 510 V 635 H 670')+rect(100,290,190,220)+line(130,355,130,ink)+line(130,390,105)+line(130,425,125)+rect(420,290,220,220)+dot(530,400,48,ink)+`<path d="M 530 366 v 68 M 496 400 h 68" stroke="white" stroke-width="5"/>`+rect(795,290,220,220)+check(905,400)+rect(500,110,170,150,pale)+rect(500,560,170,150,pale)+line(525,160,120,ink)+line(525,195,90)+line(525,610,120,ink)+line(525,645,90);
const launch = browser(160,160,490,460)+rect(195,240,420,130,pale)+line(195,405,330,ink)+line(195,440,390)+line(195,475,270)+rect(735,160,310,460)+[0,1,2,3].map(i=>check(785,245+i*90)+line(830,240+i*90,175)).join('');
const comparison = browser(100,200,450,380)+[0,1,2].map(i=>rect(130+i*130,290,110,170,pale)).join('')+line(130,505,360)+browser(650,200,450,380)+rect(680,285,245,130,pale)+rect(945,285,125,250,ink)+line(680,445,230)+line(680,480,185)+line(680,515,220)+path('M 600 180 V 620');
const discovery = rect(150,220,340,400)+[0,1,2].map(i=>check(195,305+i*115)+line(235,300+i*115,210)+line(235,332+i*115,170)).join('')+rect(570,150,480,440)+rect(605,200,285,100,pale)+rect(725,335,285,100,ink)+line(750,365,230,'white')+line(750,395,170,'white')+rect(605,470,285,65,pale);
for (const [name,content] of Object.entries({'responsive-website-layout':responsive,'responsive-layout-techniques':layouts,'brand-identity-system':branding,'technical-seo-review':seo,'ecommerce-checkout':ecommerce,'ai-chatbot-knowledge-flow':chat,'business-workflow-automation':workflow,'website-launch-checklist':launch,'website-builder-vs-custom':comparison,'project-discovery-checklist':discovery})) {
  const svg=frame(content);
  await writeFile(`${output}/${name}.svg`,svg);
  await sharp(Buffer.from(svg)).webp({quality:82}).toFile(`${output}/${name}.webp`);
}
// Preserve the original generated asset; publish a resized, compressed derivative.
await mkdir('public/images/agency',{recursive:true});
const original=await readFile('C:/Users/Bilal/.codex/generated_images/01a12bac-f7fa-7d02-9ee6-3913d362d60b/exec-e829321e-210e-450a-848a-40444740b856.png');
await sharp(original).resize({width:1200,withoutEnlargement:true}).webp({quality:82}).toFile('public/images/agency/responsive-web-design-ai-integration.webp');
console.log('Created 10 lightweight diagram assets and optimized agency hero.');
