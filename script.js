'use strict';
const $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('js-ready');
const backgroundElements=Array.from(document.querySelectorAll('header,nav,main,footer'));
backgroundElements.forEach(el=>el.inert=true);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
$('#openEdition').addEventListener('click',()=>{startMusic();document.body.classList.remove('sealed');$('#invitation').classList.add('closed');$('#invitation').inert=true;backgroundElements.forEach(el=>el.inert=false);window.scrollTo(0,0);setTimeout(()=>$('#cover .text-link').focus({preventScroll:true}),reduced?0:850)});
const menu=$('#menuToggle'),contents=$('#contents');
function closeMenu(){contents.hidden=true;menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';contents.hidden=open;menu.setAttribute('aria-expanded',String(!open))});
contents.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!contents.contains(e.target)&&!menu.contains(e.target))closeMenu()});
const ambience=$('#ambience'),music=$('#musicToggle');ambience.volume=.8;
function setMusicState(playing){music.setAttribute('aria-pressed',String(playing));music.setAttribute('aria-label',playing?'Pause instrumental music':'Play instrumental music');$('#musicLabel').textContent=playing?'Sound on':'Sound off'}
function startMusic(){const playing=ambience.play();if(playing)playing.then(()=>setMusicState(true)).catch(()=>setMusicState(false))}
music.addEventListener('click',()=>{if(ambience.paused)startMusic();else{ambience.pause();setMusicState(false)}});
ambience.addEventListener('pause',()=>setMusicState(false));
ambience.addEventListener('playing',()=>setMusicState(true));
const gallery=[{src:'that-look.webp',alt:'Caitlyn giving Edwin a playful look on their date',caption:'The look. I’m still keeping it.'},{src:'together.webp',alt:'Caitlyn and Edwin sitting side by side on their first date',caption:'Our first date. Us, just being us.'},{src:'our-favourite.webp',alt:'Caitlyn and Edwin looking at each other',caption:'My favourite. You already know.'}];
let current=0;
function showPhoto(delta){current=(current+delta+gallery.length)%gallery.length;const p=gallery[current];$('#galleryImage').src=p.src;$('#galleryImage').alt=p.alt;$('#galleryCaption').textContent=p.caption;$('#galleryCount').textContent=`0${current+1} / 03`}
$('#galleryPrev').addEventListener('click',()=>showPhoto(-1));$('#galleryNext').addEventListener('click',()=>showPhoto(1));
let touchStart=null;$('#galleryOpen').addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX},{passive:true});$('#galleryOpen').addEventListener('touchend',e=>{if(touchStart!==null){const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45){showPhoto(delta<0?1:-1);suppressClick=true;setTimeout(()=>suppressClick=false,350)}touchStart=null}},{passive:true});
let suppressClick=false;const dialog=$('#photoDialog');let lastPhotoTrigger=null;
function openPhoto(src,caption,alt,trigger){lastPhotoTrigger=trigger;$('#dialogImage').src=src;$('#dialogImage').alt=alt;$('#dialogCaption').textContent=caption;dialog.showModal();document.body.classList.add('modal-open')}
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>openPhoto(b.dataset.photo,b.dataset.caption,b.querySelector('img').alt,b)));
$('#galleryOpen').addEventListener('click',()=>{if(!suppressClick){const p=gallery[current];openPhoto(p.src,p.caption,p.alt,$('#galleryOpen'))}});
$('#closePhoto').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastPhotoTrigger?.focus({preventScroll:true})});
const answers=['Me. Still me. × infinity. ♡','You can keep tapping. I’m not changing my answer. ♡','Fine. Copy and paste. We both win. ♡'];let taps=0;
$('#birthdayButton').addEventListener('click',()=>{$('#birthdayAnswer').textContent=answers[Math.min(taps++,2)];if(!reduced){for(let i=0;i<55;i++){const s=document.createElement('i');s.className='spark';s.style.left=Math.random()*100+'vw';s.style.width=2+Math.random()*5+'px';s.style.height=4+Math.random()*9+'px';s.style.setProperty('--duration',2+Math.random()*2+'s');s.style.setProperty('--drift',-100+Math.random()*200+'px');s.style.animationDelay=Math.random()*.4+'s';s.style.background=['#d8bd7b','#eee6d5','#917138'][i%3];document.body.append(s);setTimeout(()=>s.remove(),5000)}}});


