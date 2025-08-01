// script.js

document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkToggle');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.skill-bar');
    const form = document.getElementById('contactForm');
    const formMessage = form.querySelector('.form-message');
  
    // ===== DARK MODE TOGGLE =====
    function setDarkMode(isDark) {
      if (isDark) {
        body.classList.add('dark');
        darkToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        body.classList.remove('dark');
        darkToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
      }
    }
  
    // Initialize from localStorage
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting === 'enabled') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  
    darkToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark');
      setDarkMode(!isDark);
    });
  
    // ===== HAMBURGER MENU TOGGLE =====
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('active');
    });
  
    // Close menu when clicking a nav link (mobile)
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', false);
        }
      });
    });
  
    // ===== SMOOTH SCROLL & NAV LINK ACTIVE HIGHLIGHT =====
    const sections = document.querySelectorAll('main section[id]');
    function activateNavLinkOnScroll() {
      const scrollY = window.pageYOffset;
  
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', activateNavLinkOnScroll);
  
    // ===== SKILL BAR ANIMATION =====
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const barPos = bar.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
  
        if (barPos < screenPos) {
          const percent = bar.dataset.percent;
          bar.querySelector('.fill').style.width = percent + '%';
        }
      });
    }
  
    window.addEventListener('scroll', animateSkillBars);
    // Trigger once on load in case already visible
    animateSkillBars();
  
    // ===== FORM VALIDATION & FEEDBACK =====
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
  
      // Simple validation
      if (name.length < 3) {
        showMessage('Please enter a valid name (min 3 characters).', false);
        return;
      }
      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', false);
        return;
      }
      if (message.length < 10) {
        showMessage('Message should be at least 10 characters.', false);
        return;
      }
  
      // Normally, here you'd submit to backend or service
      showMessage('Thank you for your message! I will get back to you soon.', true);
      form.reset();
    });
  
    function showMessage(msg, success) {
      formMessage.textContent = msg;
      formMessage.style.color = success ? 'var(--clr-secondary)' : '#e74c3c';
      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    }
  
    function validateEmail(email) {
      // Basic email regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  });
  