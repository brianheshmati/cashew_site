/* Cashew site: mobile menu, scroll reveal and the email-based project form. No dependencies. */
(function () {
  document.documentElement.classList.add('js');

  // Mobile menu: toggles on the burger, closes on Escape, outside click, link click or a wide viewport.
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  var header = document.querySelector('.header');
  if (btn && menu) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
    };
    btn.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); } });
    document.addEventListener('click', function (e) { if (!menu.hidden && header && !header.contains(e.target)) setOpen(false); });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 900px)');
      var onWide = function () { if (wide.matches) setOpen(false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
    }
  }

  // Reveal sections as they scroll into view. Without IntersectionObserver everything is simply shown.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Project form: the site is static, so the form composes an email in the visitor's mail app.
  var form = document.getElementById('project-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Please fill in the required fields.';
        status.className = 'form-status err';
        return;
      }
      var v = function (name) { var f = form.elements[name]; return f ? f.value.trim() : ''; };
      var lines = [
        'Name: ' + v('name'),
        'Email: ' + v('email'),
        v('company') ? 'Company: ' + v('company') : '',
        v('topic') ? 'Topic: ' + v('topic') : '',
        '',
        v('message')
      ].filter(function (l, i) { return l !== '' || i === 4; });
      var subject = 'Project enquiry' + (v('company') ? ' from ' + v('company') : '');
      window.location.href = 'mailto:' + form.getAttribute('data-to') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      status.textContent = 'Your email app should open with the message ready to send. If it does not, email us directly at ' + form.getAttribute('data-to') + '.';
      status.className = 'form-status';
    });
  }
})();
