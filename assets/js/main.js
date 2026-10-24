'use strict';
// Ein gemeinsamer Ort für Menü, Suche, Inhaltsverzeichnis und Leseeinstellungen.
const $=selector=>document.querySelector(selector);
const prefs={theme:'light',size:'normal',width:'normal'};
try{const saved=JSON.parse(localStorage.getItem('personal-wiki-settings')||'{}');for(const key of Object.keys(prefs))if(typeof saved[key]==='string')prefs[key]=saved[key];}catch{}
const settings='<fieldset><legend>Textgröße</legend><div class="segmented"><button type="button" data-pref="size" data-value="normal" aria-label="Normale Textgröße">A</button><button type="button" data-pref="size" data-value="large" aria-label="Große Textgröße" style="font-size:15px">A</button></div></fieldset><fieldset><legend>Seitenbreite</legend><div class="segmented"><button type="button" data-pref="width" data-value="normal">Normal</button><button type="button" data-pref="width" data-value="wide">Breit</button></div></fieldset><fieldset><legend>Farbe</legend><div class="segmented"><button type="button" data-pref="theme" data-value="light">Hell</button><button type="button" data-pref="theme" data-value="dark">Dunkel</button></div></fieldset>';
document.querySelectorAll('[data-settings]').forEach(el=>el.innerHTML=settings);
function applyPrefs(){document.documentElement.dataset.theme=prefs.theme==='dark'?'dark':'light';document.documentElement.style.setProperty('--measure',prefs.width==='wide'?'1000px':'820px');document.body.classList.toggle('large-type',prefs.size==='large');document.querySelectorAll('[data-pref]').forEach(el=>el.setAttribute('aria-pressed',String(prefs[el.dataset.pref]===el.dataset.value)));}
applyPrefs();document.querySelectorAll('[data-pref]').forEach(el=>el.addEventListener('click',()=>{prefs[el.dataset.pref]=el.dataset.value;applyPrefs();try{localStorage.setItem('personal-wiki-settings',JSON.stringify(prefs));}catch{}}));

// Überschriften aus dem gerenderten Markdown bilden automatisch alle Verzeichnisse.
const markdownHeadings=Array.from(document.querySelectorAll('.article-content h2'));
markdownHeadings.forEach((heading,index)=>{
 if(!heading.id){const base=heading.textContent.toLocaleLowerCase('de').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'abschnitt';let id=base,n=2;while(document.getElementById(id))id=base+'-'+n++;heading.id=id;}
 const row=document.createElement('div');row.className='section-heading';heading.before(row);
 const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');
 const link=document.createElement('a');link.className='section-link';link.href='#'+heading.id;link.textContent='#';link.setAttribute('aria-label','Link zu '+heading.textContent);
 row.append(number,heading,link);
});
const headings=markdownHeadings.length?markdownHeadings:Array.from(document.querySelectorAll('article section h2'));
const tocItems=headings.map(h=>({title:h.textContent,id:h.id||h.closest('section').id}));
document.querySelectorAll('[data-toc-list]').forEach(list=>{
 for(const item of tocItems){const a=document.createElement('a');a.href='#'+encodeURIComponent(item.id);a.textContent=item.title;if(list.tagName==='OL'){const li=document.createElement('li');li.append(a);list.append(li);}else list.append(a);}
 if(!tocItems.length){list.closest('details')?.setAttribute('hidden','');}
});
// Tiefe Direktlinks werden nach dem Aufbau des Verzeichnisses nachgeführt.
if(location.hash){try{document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();}catch{}}

const menu=$('#menu-toggle'),navigationDialog=$('#navigation-dialog');
function syncNavigation(){menu.setAttribute('aria-expanded',String(navigationDialog.open));document.body.classList.toggle('menu-open',navigationDialog.open);}
menu.addEventListener('click',()=>{navigationDialog.showModal();syncNavigation();});
$('#close-navigation').addEventListener('click',()=>navigationDialog.close());
navigationDialog.addEventListener('close',()=>{syncNavigation();menu.focus({preventScroll:true});});
navigationDialog.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>navigationDialog.close()));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));

const searchDialog=$('#search-dialog'),searchInput=$('#search-input'),results=$('#search-results');
let indexPromise;
function loadIndex(){if(!indexPromise)indexPromise=fetch(document.body.dataset.searchUrl).then(response=>{if(!response.ok)throw Error('Suchindex nicht geladen');return response.json();}).catch(error=>{indexPromise=null;throw error;});return indexPromise;}
let searchSequence=0;
async function search(){const sequence=++searchSequence;const query=searchInput.value.trim().toLocaleLowerCase('de');results.textContent='Suche wird geladen …';try{const entries=await loadIndex();if(sequence!==searchSequence)return;results.replaceChildren();const matches=entries.filter(entry=>(entry.title+' '+entry.description+' '+entry.text).toLocaleLowerCase('de').includes(query));if(!matches.length){results.textContent='Kein Eintrag gefunden. Probiere einen anderen Begriff.';return;}for(const entry of matches){const a=document.createElement('a');a.href=entry.url;a.textContent=entry.title;const description=document.createElement('small');description.textContent=entry.description||entry.kind;a.append(description);a.addEventListener('click',()=>searchDialog.close());results.append(a);}}catch{if(sequence!==searchSequence)return;results.textContent=location.protocol==='file:'?'Die Suche benötigt die gebaute Website über einen Webserver. Nutze die lokale Jekyll-Vorschau oder GitHub Pages.':'Die Suche konnte nicht geladen werden. Bitte versuche es erneut.';}}
function openSearch(){if(navigationDialog.open)navigationDialog.close();searchDialog.showModal();searchInput.focus();search();}
$('#open-search').addEventListener('click',openSearch);searchInput.addEventListener('input',search);
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(!searchDialog.open)openSearch();}});

const reading=$('#reading-toggle');reading.addEventListener('click',()=>{const active=document.body.classList.toggle('reading');reading.setAttribute('aria-pressed',String(active));reading.textContent=active?'Lesemodus beenden ↙':'Lesemodus ↗';});
const targets=headings.map(h=>document.getElementById(h.id||h.closest('section').id));let scheduled=false;
function updateNav(){let active='start';for(const target of targets)if(target.getBoundingClientRect().top<=160)active=target.id;document.querySelectorAll('[data-toc-list] a').forEach(a=>{const selected=decodeURIComponent(a.hash.slice(1))===active;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});scheduled=false;}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateNav);}},{passive:true});updateNav();
const copyButton=$('#copy-link');if(copyButton)copyButton.addEventListener('click',async()=>{const url=new URL(location.href);url.hash='';try{await navigator.clipboard.writeText(url.href);$('#copy-status').textContent='Beitragslink kopiert.';}catch{$('#copy-status').textContent='Bitte kopiere die Adresse aus der Adresszeile.';}});
