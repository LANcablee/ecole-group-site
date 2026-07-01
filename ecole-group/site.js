/* Ecole Group — shared site script */
(function(){
  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var menuPanel = document.getElementById('menuPanel');
  var pageMain = document.querySelector('main');
  var pageFooter = document.querySelector('.site-footer');
  var lastFocus = null;

  function setInert(on){
    if (pageMain) pageMain.inert = on;
    if (pageFooter) pageFooter.inert = on;
  }

  function openMenu(){
    lastFocus = document.activeElement;
    header.classList.add('menu-open');
    menuPanel.classList.add('open');
    menuBtn.setAttribute('aria-expanded','true');
    menuBtn.setAttribute('aria-label','Close menu');
    document.body.style.overflow = 'hidden';
    setInert(true);
    var first = menuPanel.querySelector('a');
    if (first) setTimeout(function(){ first.focus(); }, 60);
  }

  function closeMenu(restoreFocus){
    header.classList.remove('menu-open');
    menuPanel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Open menu');
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
})();
