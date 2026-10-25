'use strict';
(() => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const sections = [...document.querySelectorAll('.story-screen')];
 const links = [...document.querySelectorAll('.story-navigation a')];
 if (!('IntersectionObserver' in window)) return;
 const revealElements = [...document.querySelectorAll('.reveal')];
 if (!reduced.matches) {
  document.body.classList.add('motion-ready');
  const reveals = new IntersectionObserver(entries => {
   for (const entry of entries) if (entry.isIntersecting) {entry.target.classList.add('is-visible');reveals.unobserve(entry.target);}
  }, {threshold:.08});
  revealElements.forEach(element => reveals.observe(element));
 }
 const visible = new Map();
 const chapters = new IntersectionObserver(entries => {
  entries.forEach(entry => visible.set(entry.target.id,entry.intersectionRatio));
  const current = [...visible].sort((a,b) => b[1]-a[1])[0];
  if (!current || current[1] === 0) return;
  for (const link of links) {
   if (link.hash === '#'+current[0]) link.setAttribute('aria-current','step');
   else link.removeAttribute('aria-current');
  }
 }, {threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});
 sections.forEach(section => chapters.observe(section));
 reduced.addEventListener('change', event => {if(event.matches) document.body.classList.remove('motion-ready');});
})();
