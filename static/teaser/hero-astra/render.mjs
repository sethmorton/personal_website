import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const preview=!!process.env.PREVIEW, fps=preview?12:30, size=preview?540:1080;
const frames=path.resolve(here,'../../../.render-cache/hero-astra',preview?'preview-frames':'frames');
const ffmpeg='/opt/homebrew/bin/ffmpeg', ffprobe='/opt/homebrew/bin/ffprobe';
const stills=process.env.STILLS?.split(',').map(Number);
const browser=await puppeteer.connect({browserURL:process.env.CDP_URL??'http://127.0.0.1:64017',protocolTimeout:180000});
const page=await browser.newPage();
page.on('pageerror',e=>console.error(e));
await page.setViewport({width:size,height:size,deviceScaleFactor:1});
const url=`${process.env.SITE??'http://localhost:5179'}/teaser/hero-astra/index.html?t=0&size=${size}`;
await page.goto(url,{waitUntil:'networkidle0',timeout:60000});
await page.waitForFunction(()=>window.ready,{timeout:120000});
await page.bringToFront();
console.log(await page.evaluate(()=>window.ready));
const capture=async(t,file)=>{
 const data=await page.evaluate(t=>{window.render(t);return window.renderer.domElement.toDataURL('image/png');},t);
 writeFileSync(file,Buffer.from(data.slice(data.indexOf(',')+1),'base64'));
};
const ff=args=>execFileSync(ffmpeg,['-y','-loglevel','error',...args],{stdio:'inherit'});
const probe=file=>execFileSync(ffprobe,['-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration','-of','default=nw=1',file]).toString();
try{
 if(stills){
  for(const t of stills)await capture(t,path.join(here,`still-${t}.png`));
 }else{
  mkdirSync(frames,{recursive:true});
  const total=10*fps,start=Date.now();
  for(let i=0;i<total;i++){
   await capture(i/fps,path.join(frames,`frame_${String(i).padStart(5,'0')}.png`));
   if(i%(fps*2)===0)console.log(`${i}/${total}: ${((Date.now()-start)/1000).toFixed(1)}s`);
  }
  const mp4=path.join(here,preview?'hero-preview.mp4':'hero.mp4');
  ff(['-framerate',String(fps),'-i',path.join(frames,'frame_%05d.png'),'-vf',`scale=${size}:${size}:flags=lanczos`,'-c:v','libx264','-crf',preview?'24':'16','-preset',preview?'veryfast':'slow','-pix_fmt','yuv420p','-movflags','+faststart',mp4]);
  console.log(mp4,statSync(mp4).size,probe(mp4));
  if(!preview){
   ff(['-i',mp4,'-vf','fps=2,scale=270:-1,tile=5x4','-frames:v','1',path.join(here,'sheet.png')]);
   for(const t of [2.5,6,8])await capture(t,path.join(here,`still-${t}.png`));
   const zero=await page.evaluate(()=>{window.render(0);return window.renderer.domElement.toDataURL();});
   const end=await page.evaluate(()=>{window.render(10);return window.renderer.domElement.toDataURL();});
   if(zero!==end)throw new Error('Loop seam differs at 0 and 10 seconds');
   console.log('Loop seam: render(0) and render(10) pixel-identical');
   const gifFrames=path.join(frames,'gif');mkdirSync(gifFrames,{recursive:true});
   await page.goto(`${url}&gif=1`,{waitUntil:'networkidle0',timeout:60000});
   await page.waitForFunction(()=>window.ready,{timeout:120000});
   for(let i=0;i<150;i++){
    await capture(i/15,path.join(gifFrames,`frame_${String(i).padStart(5,'0')}.png`));
    if(i%30===0)console.log(`GIF ${i}/150`);
   }
   const gif=path.join(here,'hero.gif'),palette=path.join(frames,'palette.png');
   for(const width of [720,640]){
    const input=['-framerate','15','-i',path.join(gifFrames,'frame_%05d.png')],scale=`scale=${width}:-1:flags=lanczos`;
    ff([...input,'-vf',`${scale},palettegen=max_colors=128:stats_mode=diff`,'-frames:v','1',palette]);
    ff([...input,'-i',palette,'-lavfi',`${scale}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle`,'-loop','0',gif]);
    console.log(gif,statSync(gif).size,probe(gif));
    if(statSync(gif).size<15e6)break;
   }
   if(statSync(gif).size>=15e6)throw new Error('GIF exceeds 15 MB');
  }
  rmSync(frames,{recursive:true,force:true});
 }
}finally{await page.close();browser.disconnect();}
