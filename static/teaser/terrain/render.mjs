// PREVIEW=1 node static/teaser/terrain/render.mjs; omit PREVIEW for full delivery and sheet.
// STILLS=0,1.5,2.5,3.3,5.7,9.9 captures deterministic stills without encoding.
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const here=path.dirname(fileURLToPath(import.meta.url)),preview=!!process.env.PREVIEW;
const fps=preview?12:30,size=preview?540:1080,frames=path.join(here,preview?'.preview-frames':'.frames');
const ffmpeg=process.env.FFMPEG??'/opt/homebrew/bin/ffmpeg';
const browser=await puppeteer.connect({browserURL:process.env.CDP_URL??'http://127.0.0.1:64017'});
const page=await browser.newPage(),errors=[];
try {
  page.on('pageerror',e=>errors.push(e.message));
  await page.setViewport({width:1080,height:1080,deviceScaleFactor:1});
  await page.goto(`${process.env.SITE??'http://localhost:5179'}/teaser/terrain/index.html?capture`,{waitUntil:'networkidle0'});
  await page.waitForFunction(()=>window.ready,{timeout:60000});
  const info=await page.evaluate(()=>window.ready);assert.ok(info.loopHeightError<1e-9,'Unwrapped terrain must converge to the opening field');console.log(JSON.stringify(info));
  assert.ok(info.ballDrops.every(drop=>drop>2),'The ball must fall after every fast wave');
  async function capture(t){return page.evaluate(t=>{window.render(t);const {ballX,ballY,ignition}=window.frameInfo;if(Math.max(Math.abs(ballX),Math.abs(ballY))>.6)throw new Error(`Ball escaped central 60% at ${t}`);if(ignition!==window.ready.landings.some(land=>t>=land&&t<land+.1-1e-9))throw new Error(`Ignition timing failed at ${t}`);return document.querySelector('canvas').toDataURL('image/png');},t);}
  const first=await capture(0),last=await capture(10);assert.equal(last,first,'Frame 300 must equal frame zero');
  await capture(3.3);assert.equal(await capture(0),first,'Random-access render must be deterministic');
  console.log('PASS: frame 300 = frame 0; random-access repeat is identical');
  mkdirSync(frames,{recursive:true});
  const stills=process.env.STILLS?.split(',').map(Number),times=stills??Array.from({length:fps*10},(_,i)=>i/fps);
  const start=Date.now();
  for(let i=0;i<times.length;i++){
    const url=await capture(times[i]);writeFileSync(path.join(frames,stills?`still_${times[i]}.png`:`frame_${String(i).padStart(5,'0')}.png`),Buffer.from(url.split(',')[1],'base64'));
    if(i%fps===0)console.log(`${i}/${times.length} ${((Date.now()-start)/1000).toFixed(1)}s`);
  }
  assert.deepEqual(errors,[],'Browser errors');
  if(!stills){
    const file=path.join(here,preview?'terrain-preview.mp4':'terrain.mp4');
    execFileSync(ffmpeg,['-y','-loglevel','error','-framerate',String(fps),'-i',path.join(frames,'frame_%05d.png'),'-vf',`scale=${size}:${size}:flags=lanczos`,'-c:v','libx264','-pix_fmt','yuv420p','-crf',preview?'23':'18','-preset',preview?'veryfast':'slow','-movflags','+faststart',file],{stdio:'inherit'});
    if(!preview)execFileSync(ffmpeg,['-y','-loglevel','error','-i',file,'-vf','fps=4,scale=270:270,tile=10x4','-frames:v','1',path.join(here,'sheet.png')],{stdio:'inherit'});
    console.log(execFileSync(path.join(path.dirname(ffmpeg),'ffprobe'),['-v','error','-show_entries','stream=width,height,r_frame_rate,codec_name,pix_fmt,nb_frames:format=duration,size','-of','json',file],{encoding:'utf8'}));
    rmSync(frames,{recursive:true,force:true});console.log(file);
  }
} finally {await page.close();browser.disconnect();}
