// Mobile hamburger menu
const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

// Nav shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 1px 8px rgba(0,0,0,0.08)'
    : 'none';
});

// Project category tabs
const projectTabs = document.querySelectorAll('.project-tab');
const projectPanels = document.querySelectorAll('.project-panel');
projectTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    projectTabs.forEach(t => t.classList.remove('active'));
    projectPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// Project detail modal
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
if (projectModal) {
  const modalBody = projectModal.querySelector('.modal-body');
  const modalCloseBtn = projectModal.querySelector('.modal-close');
  let lastFocused = null;

  const openProjectModal = (card) => {
    const name = card.querySelector('.project-name')?.textContent || '';
    const meta = card.querySelector('.project-meta')?.innerHTML || '';
    const detail = card.querySelector('.pd-detail')?.innerHTML || '';
    const store = card.dataset.store || '';
    const storeLabel = card.dataset.storeLabel || 'Store';
    const img = card.querySelector('.project-icon-img');
    const emoji = card.querySelector('.project-icon');
    const iconHtml = img
      ? '<img class="modal-icon" src="' + img.getAttribute('src') + '" alt="">'
      : '<div class="modal-icon modal-icon-emoji">' + (emoji ? emoji.textContent : '') + '</div>';
    const storeHtml = store
      ? '<a class="modal-store" href="' + store + '" target="_blank" rel="noopener">View on ' + storeLabel + ' ↗</a>'
      : '';
    modalBody.innerHTML =
      '<div class="modal-head">' + iconHtml +
        '<div class="modal-head-text"><h3 class="modal-title">' + name + '</h3>' +
        '<div class="modal-meta">' + meta + '</div>' + storeHtml + '</div></div>' +
      detail;
    lastFocused = document.activeElement;
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(card); }
    });
  });
  modalCloseBtn.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) closeProjectModal();
  });
}

// Copy email to clipboard on click
document.querySelectorAll('a[href^="mailto"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const email = this.href.replace('mailto:', '');
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      const textEl = this.querySelector('.cl-text');
      if (textEl) {
        const orig = textEl.textContent;
        textEl.textContent = 'Copied!';
        setTimeout(() => textEl.textContent = orig, 2000);
      } else {
        const orig = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => this.textContent = orig, 2000);
      }
    });
  });
});
