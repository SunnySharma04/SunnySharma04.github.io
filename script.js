const qs=(s,ctx=document)=>ctx.querySelector(s);const qsa=(s,ctx=document)=>[...ctx.querySelectorAll(s)];

// Mobile navigation
const menuButton=qs('.menu-toggle');const mobileNav=qs('#mobile-nav');
if(menuButton&&mobileNav){menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;menuButton.setAttribute('aria-label',open?'Open navigation menu':'Close navigation menu')});qsa('a',mobileNav).forEach(a=>a.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false')}));}

// Reveal on scroll
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReduced&&'IntersectionObserver'in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});qsa('.reveal').forEach(el=>revealObserver.observe(el));}else{qsa('.reveal').forEach(el=>el.classList.add('visible'));}

// Counters animate once
const counters=qsa('.counter');
const runCounter=el=>{const target=Number(el.dataset.target||0);const suffix=el.dataset.suffix||'';if(prefersReduced){el.textContent=`${target}${suffix}`;return}const start=performance.now(),duration=900;const tick=now=>{const p=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-p,3);el.textContent=`${Math.round(target*eased)}${suffix}`;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)};
if('IntersectionObserver'in window){const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){runCounter(e.target);countObserver.unobserve(e.target)}}),{threshold:.5});counters.forEach(c=>countObserver.observe(c));}else counters.forEach(runCounter);

// Active navigation
const sections=qsa('main section[id]');const navLinks=qsa('.desktop-nav a,.mobile-nav a[href^="#"]');
if('IntersectionObserver'in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>sectionObserver.observe(s));}

// Project filters
const filterButtons=qsa('.filter-btn');const projectCards=qsa('.project-card');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;projectCards.forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter));}));

// Project details dialog
const projectData={
  chatmind:{title:'ChatMind',category:'Full-Stack Development',body:`<p>A MERN real-time messaging platform built around secure route protection and real-time communication.</p><ul><li>One-to-one and group conversations</li><li>12+ REST API endpoints</li><li>JWT authentication and role-based authorization</li><li>MongoDB schemas and Express services</li><li>Socket.IO message delivery</li><li>Cloudinary media upload and retrieval</li></ul><p><strong>Architecture note:</strong> REST handles persistent application operations while Socket.IO supports low-latency messaging events, with JWT-protected routes enforcing access control.</p>`},
  invoice:{title:'Invoice Processing and Posting Automation',category:'Intelligent Automation',body:`<p>An automation pipeline for invoice intake, OCR extraction, validation, structured data creation, exception handling, and ERP-oriented posting.</p><ul><li>~70% processing-time reduction</li><li>50+ sample invoices processed</li><li>Vendor, PO, amount, tax, invoice number, and due-date extraction</li><li>Validation, retry logic, audit logging, and reporting</li><li>Reusable workflow components and handoff documentation</li></ul><p><strong>Architecture note:</strong> The workflow separates intake, extraction, validation, exception routing, record creation, and posting so failed stages can be retried without restarting the entire process.</p>`},
  product:{title:'Automated Product Search & Recommendation Bot',category:'RPA & Web Automation',body:`<p>A UiPath workflow that extracts and compares e-commerce data before generating structured Excel reports.</p><ul><li>50+ product records automated</li><li>Pricing, ratings, specifications, and availability extraction</li><li>Rule-based ranking logic</li><li>Selector management and exception handling</li><li>Structured Excel output</li></ul><p><strong>Architecture note:</strong> Reusable scraping and normalization steps keep comparison logic separate from site-specific extraction rules.</p>`}
};
const dialog=qs('#project-dialog');if(dialog){qsa('.project-details').forEach(btn=>btn.addEventListener('click',()=>{const data=projectData[btn.dataset.project];qs('#dialog-title').textContent=data.title;qs('#dialog-category').textContent=data.category;qs('#dialog-body').innerHTML=data.body;dialog.showModal()}));qs('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});}

// Scroll to top
const scrollTop=qs('#scroll-top');window.addEventListener('scroll',()=>scrollTop?.classList.toggle('show',window.scrollY>700),{passive:true});scrollTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:prefersReduced?'auto':'smooth'}));

// Toast helper
let toastTimer;const toast=qs('#toast');const showToast=msg=>{if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)};

// Copy email
qs('#copy-email')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('sunnysharma112004@gmail.com');showToast('Email copied to clipboard')}catch{showToast('Copy failed — email: sunnysharma112004@gmail.com')}});

// Contact form: validates and opens mail client; no fake backend
const contactForm=qs('#contact-form');
if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const honeypot=qs('#website').value.trim();if(honeypot)return;let valid=true;qsa('.field',contactForm).forEach(field=>{const input=qs('input,textarea',field);const error=qs('.error',field);let message='';if(!input.value.trim())message='This field is required.';else if(input.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))message='Enter a valid email address.';error.textContent=message;input.setAttribute('aria-invalid',message?'true':'false');if(message)valid=false});if(!valid){qs('#form-status').textContent='Please correct the highlighted fields.';return}const btn=qs('#send-message');btn.disabled=true;btn.textContent='Preparing email…';const name=qs('#name').value.trim(),email=qs('#email').value.trim(),subject=qs('#subject').value.trim(),message=qs('#message').value.trim();const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;const mailto=`mailto:sunnysharma112004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;qs('#form-status').textContent='Opening your email client…';setTimeout(()=>{window.location.href=mailto;btn.disabled=false;btn.textContent='Send Message';},180);});}

// Analytics-ready resume event without third-party dependency
qsa('.resume-download').forEach(link=>link.addEventListener('click',()=>{window.dispatchEvent(new CustomEvent('portfolio:resume-download',{detail:{location:link.closest('section')?.id||'navigation'}}));}));

qs('#year').textContent=new Date().getFullYear();
