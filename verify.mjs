const routes=['/','/our-story','/collection','/leadership','/innovation','/investors','/careers','/contact','/press',...['original','signature','reserve','pro-max','infinity'].map(p=>'/collection/'+p),'/robots.txt','/sitemap.xml','/icon.png'];
let failed=false;
for(const route of routes){const r=await fetch('http://localhost:3000'+route);console.log(r.status,route);if(!r.ok)failed=true;}
const fs=await import('node:fs/promises');
async function walk(dir){for(const f of await fs.readdir(dir,{withFileTypes:true})){const p=dir+'/'+f.name;if(f.isDirectory())await walk(p);else if(/webp|jpg/.test(p)){const r=await fetch('http://localhost:3000/'+p.replace(/^public\//,''));if(!r.ok){console.log('MISSING',p);failed=true;}}}}
await walk('public/images');
const missing=await fetch('http://localhost:3000/no-such-page');console.log(missing.status,'404 route');if(missing.status!==404)failed=true;
if(failed)process.exit(1);console.log('All route and image HTTP checks passed.');
