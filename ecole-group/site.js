/* Ecole Group — shared site script */
(function(){
  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var menuPanel = document.getElementById('menuPanel');
  var pageMain = document.querySelector('main');
  var pageFooter = document.querySelector('.site-footer');
  var lastFocus = null;
  var openLabel = menuBtn.getAttribute('data-open-label') || 'Open menu';
  var closeLabel = menuBtn.getAttribute('data-close-label') || 'Close menu';

  function setInert(on){
    if (pageMain) pageMain.inert = on;
    if (pageFooter) pageFooter.inert = on;
  }

  function openMenu(){
    lastFocus = document.activeElement;
    header.classList.add('menu-open');
    menuPanel.classList.add('open');
    menuBtn.setAttribute('aria-expanded','true');
    menuBtn.setAttribute('aria-label', closeLabel);
    document.body.style.overflow = 'hidden';
    setInert(true);
    var first = menuPanel.querySelector('a');
    if (first) setTimeout(function(){ first.focus(); }, 60);
  }

  function closeMenu(restoreFocus){
    header.classList.remove('menu-open');
    menuPanel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label', openLabel);
    document.body.style.overflow = '';
    setInert(false);
    if (restoreFocus !== false && lastFocus) lastFocus.focus();
  }

  menuBtn.addEventListener('click', function(){
    header.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  // Menü linkine tıklanınca odağı geri çekme (çapa hedefine gitsin)
  menuPanel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ closeMenu(false); });
  });

  // Escape + Tab focus trap (header + panel içinde döngü)
  document.addEventListener('keydown', function(e){
    if (!header.classList.contains('menu-open')) return;
    if (e.key === 'Escape'){ closeMenu(); return; }
    if (e.key !== 'Tab') return;
    var items = document.querySelectorAll('.site-header button, .site-header a, .menu-panel a');
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  });

  // Header hairline on scroll
  var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Scroll reveal
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ io.observe(el); });
  }

  // Language switcher (header dropdown)
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  function closeLang(){ langMenu.setAttribute('hidden',''); langBtn.setAttribute('aria-expanded','false'); }
  if (langBtn && langMenu){
    langBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if (langMenu.hasAttribute('hidden')){ langMenu.removeAttribute('hidden'); langBtn.setAttribute('aria-expanded','true'); }
      else { closeLang(); }
    });
    document.addEventListener('click', function(e){
      var t = e.target;
      if (!langMenu.hasAttribute('hidden') && !(t && t.closest && t.closest('.lang'))) closeLang();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !langMenu.hasAttribute('hidden')){ closeLang(); langBtn.focus(); }
    });
  }
})();
