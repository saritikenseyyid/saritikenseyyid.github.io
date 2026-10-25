'use strict';
(() => {
 const archive = document.querySelector('[data-post-archive]');
 if (!archive) return;
 const form = archive.querySelector('[data-archive-form]');
 const list = archive.querySelector('#archive-entries');
 const entries = [...list.querySelectorAll('[data-archive-entry]')];
 const search = form.elements.q;
 const topic = form.elements.topic;
 const year = form.elements.year;
 const sort = form.elements.sort;
 const count = archive.querySelector('#archive-count');
 const empty = archive.querySelector('#archive-empty');
 const normalize = value => value.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
 const collator = new Intl.Collator('de', {sensitivity:'base',numeric:true});
 const indexed = entries.map((element,index) => ({element,index,text:normalize(element.dataset.search || '')}));
 let delay;
 function restoreURL() {
  const params = new URL(location.href).searchParams;
  search.value = params.get('q') || '';
  for (const [field,key] of [[topic,'topic'],[year,'year'],[sort,'sort']]) {
   const value = params.get(key);
   if (value !== null && [...field.options].some(option => option.value === value)) field.value = value;
   else field.value = key === 'sort' ? 'newest' : '';
  }
 }
 function update(writeURL = true) {
  const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  const ordered = [...indexed].sort((a,b) => {
   if (sort.value === 'title') return collator.compare(a.element.dataset.title,b.element.dataset.title) || a.index-b.index;
   const order = a.element.dataset.date.localeCompare(b.element.dataset.date) || a.index-b.index;
   return sort.value === 'oldest' ? order : -order;
  });
  let visible = 0;
  for (const item of ordered) {
   const matches = terms.every(term => item.text.includes(term)) && (!topic.value || item.element.dataset.topic === topic.value) && (!year.value || item.element.dataset.year === year.value);
   item.element.hidden = !matches;
   if (matches) visible++;
   list.append(item.element);
  }
  count.textContent = `${visible} von ${entries.length} ${entries.length === 1 ? 'Beitrag' : 'Beiträgen'}`;
  empty.hidden = visible !== 0;
  list.hidden = visible === 0;
  if (writeURL) {
   const url = new URL(location.href);
   for (const [key,value] of [['q',search.value.trim()],['topic',topic.value],['year',year.value],['sort',sort.value === 'newest' ? '' : sort.value]]) {
    if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
   }
   try {history.replaceState(null,'',url);} catch {}
  }
 }
 form.addEventListener('submit', event => {event.preventDefault(); clearTimeout(delay); update();});
 search.addEventListener('input', () => {clearTimeout(delay); delay = setTimeout(update,120);});
 for (const field of [topic,year,sort]) field.addEventListener('change', () => {clearTimeout(delay); update();});
 archive.querySelectorAll('[data-archive-reset]').forEach(button => button.addEventListener('click', () => {clearTimeout(delay); form.reset(); update(); search.focus();}));
 window.addEventListener('popstate', () => {restoreURL(); update(false);});
 restoreURL(); update(false);
})();
