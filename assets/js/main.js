---
layout: null
---
'use strict';
const entries = {
 certainty: { category: 'MINDSET / GEDANKENSKIZZE', title: 'Die produktivste Antwort: „Ich weiß es nicht.“', meta: 'NOTIZ 001 · 3 MIN LESEZEIT', paragraphs: [
 'Es gibt einen Moment in fast jedem interessanten Gespräch: Jemand stellt eine Frage, auf die niemand eine schnelle Antwort hat. Dann entsteht eine kleine Pause. Ich glaube, wir sollten diese Pause öfter aushalten.',
 '„Ich weiß es nicht“ lässt etwas offen. Es erlaubt, eine Idee zu prüfen, statt eine Position zu verteidigen. Es macht Platz für jemanden, der etwas sieht, das mir entgangen ist.',
 'Gewissheit fühlt sich gut an. Sie gibt einer unübersichtlichen Welt eine Form. Aber eine Form kann auch zu eng werden. Besonders dann, wenn ich sie mit meiner Identität verwechsle: Ich bin der Mensch, der das glaubt. Wie ändere ich dann noch meine Meinung?',
 'Vielleicht hilft ein kleiner Sprachwechsel. Statt „So ist es“: „So verstehe ich es gerade.“ Das ist präziser. Und es macht aus einer Behauptung einen Anfang.',
 'Neugier ist für mich die Bereitschaft, eine gute Frage wichtiger zu nehmen als das Gefühl, recht zu haben. Die Antwort kann kommen. Aber erst einmal möchte ich besser hinsehen.',
 'Die offene Frage: Welche Überzeugung habe ich zuletzt wirklich überprüft?'
 ]},
 technology: { category: 'TECHNOLOGY & PEOPLE / GEDANKENSKIZZE', title: 'Die spannendste Frage an KI ist eine menschliche.', meta: 'NOTIZ 002 · 3 MIN LESEZEIT', paragraphs: [
 'Was kann das Modell? Diese Frage lässt sich messen, vergleichen und in einer Tabelle beantworten. Was wollen wir damit anfangen? Diese Frage bleibt erstaunlich oft liegen.',
 'Mich interessiert Technologie dort, wo sie auf Menschen trifft. Auf ihre Gewohnheiten, ihre Ängste, ihren Alltag. Ein Werkzeug kann beeindruckend sein und trotzdem am eigentlichen Problem vorbeigehen.',
 'Wenn die Herstellung einfacher wird, verschiebt sich die Arbeit. Wir müssen genauer entscheiden, was es wert ist, hergestellt zu werden. Was verdient Aufmerksamkeit? Was ist eine gute Erfahrung? Wer profitiert davon?',
 'Dazu braucht es technisches Verständnis. Aber auch Urteil, Vorstellungskraft und die Fähigkeit zuzuhören. Ein Prototyp ist dann besonders wertvoll, wenn er eine Annahme sichtbar macht, über die wir vorher nur gesprochen haben.',
 'Ich möchte mit diesen Werkzeugen spielen, ohne ihren Zweck aus den Augen zu verlieren. Kunst kann dabei helfen: Sie stellt Fragen, die in einer Anforderungsliste selten vorkommen.',
 'Die offene Frage: Welche menschliche Fähigkeit möchte ich mit einem Werkzeug eigentlich stärken?'
 ]},
 community: { category: 'COMMUNITY / GEDANKENSKIZZE', title: 'Ein gutes Gespräch ist ein kleiner Aufbruch.', meta: 'NOTIZ 003 · 2 MIN LESEZEIT', paragraphs: [
 'Manchmal gehe ich aus einem Gespräch und die Straße sieht ein wenig anders aus. Nichts hat sich verändert, außer der Art, wie ich auf etwas schaue.',
 'Ein gemeinsamer Text kann dafür ein guter Anlass sein. Alle haben dieselben Seiten gelesen und trotzdem etwas anderes mitgebracht. Eine Erinnerung, einen Widerspruch, einen Satz am Rand.',
 'Mich interessiert diese Differenz. Ein Raum, in dem man Gedanken ausprobieren darf, bevor sie fertig sind. In dem niemand besonders klug klingen muss, damit etwas Kluges entstehen kann.',
 'Vielleicht beginnt Gemeinschaft mit dieser Erlaubnis: Du darfst anders denken. Du darfst etwas nicht wissen. Du darfst nachfragen.',
 'Die offene Frage: Wie schaffen wir mehr Räume, in denen man gemeinsam neugierig sein kann?'
 ]},
 dps: { category: 'EXPERIMENT / COMMUNITY & CULTURE', title: 'Dead Poets Society', meta: 'EIN OFFENES KONZEPT', paragraphs: [
 'The book gets us into the room. The conversation is why we stay.',
 'Dead Poets Society ist die Erkundung einer einfachen Idee: Menschen kommen über Bücher zusammen und bleiben wegen der Gespräche. Unterschiedliche Perspektiven sind der Ausgangspunkt.',
 'Die visuelle Sprache kommt aus Underground-Zines, alten Bibliothekskarten und kopierten Konzertflyern: Papier, rote Markierungen, große Fragen. Ein Gegenentwurf zur Hochglanz-Gewissheit.',
 'Auf diesem Schreibtisch liegen gerade: ein Manifest, ein Symbolsystem aus Auge und Asterisk und Posterideen wie „Serious ideas. Unserious people.“',
 'Die nächste Frage: Wie wird aus einer gemeinsamen Lektüre ein Raum, in dem man etwas Neues über sich und andere herausfindet?'
 ]},
 lab: { category: 'EXPERIMENT / ART & TECHNOLOGY', title: 'Experimente ohne Schublade', meta: 'EINE WERKSTATT, KEIN ABGESCHLOSSENES PORTFOLIO', paragraphs: [
 'Was passiert, wenn ich ein Werkzeug als Material behandle? Wenn eine Website eine kleine Zeitschrift wird? Wenn aus einer Frage eine interaktive Skizze entsteht?',
 'Diese Werkstatt versammelt Ansätze zwischen digitaler Kunst, kreativen Werkzeugen und öffentlichem Denken. Die kleinste brauchbare Version einer Idee ist oft der beste Weg, mehr über sie zu erfahren.',
 'Diese Website ist selbst ein solches Experiment: ein digitales Zine, gebaut aus Schrift, Papier, ein wenig Code und einem Auge, das zum zweiten Blick einlädt.',
 'Ein kleines Experiment: Über „Change the ink“ lässt sich die Akzentfarbe der Seite wechseln. Die Struktur bleibt gleich; ihre Stimmung verschiebt sich.',
 'Die nächste Frage: Was kann ich heute so klein bauen, dass ich es morgen mit jemandem teilen kann?'
 ]}
};
const reader = document.querySelector('#reader');
let activeTrigger;
function showDialog(dialog, trigger) { activeTrigger = trigger; dialog.showModal(); document.body.style.overflow = 'hidden'; }
function closeDialog(dialog) { dialog.close(); }
document.querySelectorAll('[data-entry]').forEach(button => button.addEventListener('click', () => {
 const entry = entries[button.dataset.entry];
 document.querySelector('#reader-category').textContent = entry.category;
 document.querySelector('#reader-title').textContent = entry.title;
 document.querySelector('#reader-meta').textContent = entry.meta;
 const content = document.querySelector('#reader-content'); content.replaceChildren();
 entry.paragraphs.forEach(text => { const paragraph = document.createElement('p'); paragraph.textContent = text; content.append(paragraph); });
 showDialog(reader, button); reader.scrollTop = 0;
}));
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.querySelector('.close-dialog').addEventListener('click', () => closeDialog(dialog));
 dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog); } });
 dialog.addEventListener('close', () => { document.body.style.overflow = ''; activeTrigger?.focus(); });
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){ nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('open',open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
const inks = [{name:'Citron',color:'#d9e279'},{name:'Powder blue',color:'#b8cdd8'},{name:'Apricot',color:'#e6b58d'}];
let inkIndex = 0; try { const stored = Number(localStorage.getItem('seyyid-ink')); if(Number.isInteger(stored) && stored >= 0 && stored < inks.length) inkIndex = stored; } catch {}
const inkButton = document.querySelector('#ink-switch');
function applyInk(){ document.documentElement.style.setProperty('--accent',inks[inkIndex].color); inkButton?.setAttribute('aria-label',`Akzentfarbe wechseln. Aktuell: ${inks[inkIndex].name}`); }
applyInk();
let toastTimeout;
function toast(text) { const el = document.querySelector('#toast'); el.textContent = text; el.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('visible'),2400); }
inkButton?.addEventListener('click', () => { inkIndex = (inkIndex + 1) % inks.length; applyInk(); try { localStorage.setItem('seyyid-ink',String(inkIndex)); } catch {} toast(`FRESH INK: ${inks[inkIndex].name.toUpperCase()}`); });
document.querySelector('#contact-open')?.addEventListener('click', event => showDialog(document.querySelector('#contact-dialog'),event.currentTarget));
document.querySelector('#contact-form').addEventListener('submit', event => {
 event.preventDefault(); const form = event.currentTarget; if(!form.reportValidity()) return;
 const sender = form.elements.sender.value.trim(); const message = form.elements.message.value.trim();
 if(!sender || !message) { document.querySelector('#contact-status').textContent = 'Bitte Name und Nachricht ausfüllen.'; return; }
 const body = `Hallo Seyyid,\r\n\r\n${message}\r\n\r\n${sender}`;
 const draft = `X-Unsent: 1\r\nSubject: Hello, Seyyid!\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${body}`;
 const url = URL.createObjectURL(new Blob([draft],{type:'message/rfc822'})); const a = document.createElement('a'); a.href=url; a.download='hello-seyyid.eml'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
 document.querySelector('#contact-status').textContent = 'ENTWURF HERUNTERGELADEN. NICHT VERSENDET. Empfänger später ergänzen.';
});
document.querySelector('#year').textContent = new Date().getFullYear();

const posterAssets = {
 curiosity: {src:{{ '/assets/images/poster-curiosity.jpg' | relative_url | jsonify }},title:'CURIOSITY > CERTAINTY / POSTER 01',alt:'Curiosity over certainty. Antike Büste mit ausgeschnittener Augenpartie, rote Korrekturstriche und der Aufruf Question more.'},
 community: {src:{{ '/assets/images/poster-community.jpg' | relative_url | jsonify }},title:'SERIOUS IDEAS. UNSERIOUS PEOPLE. / POSTER 02',alt:'Eine Gesprächsrunde mit Büchern als Xerox-Collage. Serious ideas. Unserious people. The conversation is why we stay.'}
};
document.querySelectorAll('[data-poster]').forEach(button => button.addEventListener('click', () => {
 const poster=posterAssets[button.dataset.poster];
 const image=document.querySelector('#poster-full'); image.src=poster.src; image.alt=poster.alt;
 document.querySelector('#poster-viewer-title').textContent=poster.title;
 const dialog=document.querySelector('#poster-viewer'); showDialog(dialog,button); dialog.scrollTop=0;
}));

Object.assign(posterAssets,{
 "quote-rory":{src:{{ '/assets/images/quote-rory.jpg' | relative_url | jsonify }},title:"RORY SUTHERLAND / QUOTES",alt:"The opposite of a good idea, can be another good idea. — Rory Sutherland"},
 "quote-feynman":{src:{{ '/assets/images/quote-feynman.jpg' | relative_url | jsonify }},title:"RICHARD FEYNMAN / QUOTES",alt:"What I cannot create, I do not understand. — Richard Feynman"},
 "quote-jobs":{src:{{ '/assets/images/quote-jobs.jpg' | relative_url | jsonify }},title:"STEVE JOBS / QUOTES",alt:"You can’t connect the dots looking forward; you can only connect them looking backwards. — Steve Jobs"}
});
