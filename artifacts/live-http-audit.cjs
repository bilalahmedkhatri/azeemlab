const fs = require('fs');
(async()=>{
 const urls=['https://azeemlab.com/','https://www.azeemlab.com/','https://www.azeemlab.com/about-us','https://www.azeemlab.com/services/seo-marketing','https://www.azeemlab.com/robots.txt','https://www.azeemlab.com/sitemap.xml'];
 const results=await Promise.all(urls.map(async url=>{
  try{const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(20000)}); const body=await r.text(); return {url,status:r.status,location:r.headers.get('location'),canonical:body.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0],body: /robots.txt|sitemap.xml/.test(url)?body.slice(0,8000):undefined};}catch(e){return {url,error:e.message}}
 }));
 fs.writeFileSync('artifacts/live-http-audit.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})();
