/* Ecole Group — shared site script */

/* Bu satir dosyanin EN BASINDA kalmali. Icerik yalnizca bu dosya gercekten
   calistiginda gizlenir: script yuklenemez ya da parse hatasi olursa
   'js' sinifi hic eklenmez ve site oldugu gibi gorunur kalir (fail-safe). */
document.documentElement.classList.add('js');

(function(){

  /* ---- Scroll reveal — hicbir menu elemanina bagimli degil; bu yuzden ILK blok.
     Sonraki bloklarda beklenmedik bir hata olsa bile icerik gorunur olur. ---- */
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

  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var menuPanel = document.getElementById('menuPanel');

  /* ---- Header hairline on scroll — yalniz header'a ihtiyac duyar ---- */
  if (header) {
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---- Menu + odak tuzagi — uc elemandan biri eksikse blok atlanir,
     sayfanin geri kalani calismaya devam eder ---- */
  if (header && menuBtn && menuPanel) {
    var pageMain = document.querySelector('main');
    var pageFooter = document.querySelector('.site-footer');
    var lastFocus = null;
    var openLabel = menuBtn.getAttribute('data-open-label') || 'Open menu';
    var closeLabel = menuBtn.getAttribute('data-close-label') || 'Close menu';

    var setInert = function(on){
      if (pageMain) pageMain.inert = on;
      if (pageFooter) pageFooter.inert = on;
    };

    var openMenu = function(){
      lastFocus = document.activeElement;
      header.classList.add('menu-open');
      menuPanel.classList.add('open');
      menuBtn.setAttribute('aria-expanded','true');
      menuBtn.setAttribute('aria-label', closeLabel);
      document.body.style.overflow = 'hidden';
      setInert(true);
      var first = menuPanel.querySelector('a');
      if (first) setTimeout(function(){ first.focus(); }, 60);
    };

    var closeMenu = function(restoreFocus){
      header.classList.remove('menu-open');
      menuPanel.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.setAttribute('aria-label', openLabel);
      document.body.style.overflow = '';
      setInert(false);
      if (restoreFocus !== false && lastFocus) lastFocus.focus();
    };

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
  }

  /* ---- Language switcher (header dropdown) — kendi korumasi var ---- */
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu){
    langMenu.removeAttribute('hidden'); // görünürlüğü CSS geçişleri yönetir
    var openLang = function(){ langMenu.classList.add('open'); langBtn.setAttribute('aria-expanded','true'); };
    var closeLang = function(){ langMenu.classList.remove('open'); langBtn.setAttribute('aria-expanded','false'); };
    langBtn.addEventListener('click', function(e){
      e.stopPropagation();
      langMenu.classList.contains('open') ? closeLang() : openLang();
    });
    document.addEventListener('click', function(e){
      var t = e.target;
      if (langMenu.classList.contains('open') && !(t && t.closest && t.closest('.lang'))) closeLang();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && langMenu.classList.contains('open')){ closeLang(); langBtn.focus(); }
    });
  }
})();
