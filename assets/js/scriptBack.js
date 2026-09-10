'use strict';

(() => {
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarButton = document.querySelector('[data-sidebar-btn]');
  sidebarButton?.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('active');
    sidebarButton.setAttribute('aria-expanded', String(expanded));
    sidebarButton.setAttribute('aria-label', expanded ? 'Hide contacts' : 'Show contacts');
    sidebarButton.querySelector('span').textContent = expanded ? 'Hide Contacts' : 'Show Contacts';
  });

  const navigation = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');
  const showPage = (name, focus = false) => {
    if (![...pages].some(page => page.dataset.page === name)) return;
    pages.forEach(page => page.classList.toggle('active', page.dataset.page === name));
    navigation.forEach(link => {
      const active = link.dataset.navLink === name;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (focus) {
      document.getElementById(`${name}-title`).focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };
  navigation.forEach(link => link.addEventListener('click', () => {
    const name = link.dataset.navLink;
    if (location.hash !== `#${name}`) history.pushState(null, '', `#${name}`);
    showPage(name, true);
  }));
  window.addEventListener('hashchange', () => showPage(location.hash.slice(1) || 'about', true));
  showPage(location.hash.slice(1) || 'about');

  const select = document.querySelector('[data-select]');
  const selectValue = document.querySelector('[data-select-value]');
  const selectBox = document.querySelector('.filter-select-box');
  const filterButtons = document.querySelectorAll('[data-filter-btn], [data-select-item]');
  const projects = document.querySelectorAll('[data-filter-item]');
  const filterStatus = document.querySelector('[data-filter-status]');
  const setSelectOpen = open => {
    select?.classList.toggle('active', open);
    select?.setAttribute('aria-expanded', String(open));
  };
  select?.addEventListener('click', () => setSelectOpen(select.getAttribute('aria-expanded') !== 'true'));
  selectBox?.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setSelectOpen(false);
      select.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!selectBox?.contains(event.target)) setSelectOpen(false);
  });
  document.addEventListener('focusin', event => {
    if (!selectBox?.contains(event.target)) setSelectOpen(false);
  });
  const filterProjects = (category, label) => {
    let count = 0;
    projects.forEach(project => {
      const visible = category === 'all' || project.dataset.category === category;
      project.classList.toggle('active', visible);
      if (visible) count += 1;
    });
    filterButtons.forEach(button => {
      const active = (button.dataset.filterBtn || button.dataset.selectItem) === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (selectValue) selectValue.textContent = label;
    if (filterStatus) filterStatus.textContent = `${count} projects shown — ${label}`;
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterProjects(button.dataset.filterBtn || button.dataset.selectItem, button.textContent.trim());
    setSelectOpen(false);
    if (button.hasAttribute('data-select-item')) select.focus();
  }));

  const dialog = document.getElementById('project-dialog');
  let dialogTrigger = null;
  document.querySelectorAll('.portfolio-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (!dialog) return;
      dialogTrigger = trigger;
      dialog.querySelector('[data-portfolio-modal-title]').textContent = trigger.dataset.title;
      dialog.querySelector('[data-portfolio-modal-category]').textContent = trigger.dataset.category;
      dialog.querySelector('[data-portfolio-modal-text]').textContent = trigger.dataset.desc;
      dialog.showModal();
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
  dialog?.querySelector('[data-portfolio-modal-close-btn]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('keydown', event => {
    // The close button is the only interactive element in this text-only dialog.
    if (event.key === 'Tab') {
      event.preventDefault();
      dialog.querySelector('[data-portfolio-modal-close-btn]').focus();
    }
  });
  dialog?.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog?.addEventListener('close', () => dialogTrigger?.focus({ preventScroll: true }));

  const sliderButton = document.querySelector('[data-slider-toggle]');
  const sliderTrack = document.querySelector('.slider-track');
  sliderButton?.addEventListener('click', () => {
    const paused = sliderTrack.classList.toggle('is-paused');
    sliderButton.setAttribute('aria-pressed', String(paused));
    sliderButton.textContent = paused ? 'Resume logos' : 'Pause logos';
  });

  const form = document.querySelector('[data-form]');
  const draft = document.querySelector('[data-email-draft]');
  const formStatus = document.querySelector('[data-form-status]');
  form?.addEventListener('input', () => {
    draft.hidden = true;
    draft.href = form.action;
    formStatus.textContent = '';
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('fullname')).trim();
    const email = String(fields.get('email')).trim();
    const message = String(fields.get('message')).trim();
    if (!name || !message) {
      formStatus.textContent = 'Please enter your name and a message, not just spaces.';
      return;
    }
    const subject = `Portfolio contact — ${name}`;
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
    draft.href = `${form.action}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draft.hidden = false;
    formStatus.textContent = 'Your draft is ready. Open your email app to review and send it. No message has been sent yet.';
    draft.focus();
  });
})();
