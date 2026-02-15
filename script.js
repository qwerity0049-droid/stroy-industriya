(function () {
  'use strict';

  // Before/After Compare Slider
  const compareSlider = document.getElementById('compareSlider');
  const compareDivider = document.getElementById('compareDivider');
  if (compareSlider && compareDivider) {
    let split = 50;
    function setSplit(pct) {
      split = Math.max(5, Math.min(95, pct));
      compareSlider.style.setProperty('--split', split + '%');
    }
    function getX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    }
    function move(e) {
      const rect = compareSlider.getBoundingClientRect();
      const x = getX(e);
      const pct = ((x - rect.left) / rect.width) * 100;
      setSplit(pct);
    }
    function stop() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchend', stop);
    }
    compareDivider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stop);
      move(e);
    });
    compareDivider.addEventListener('touchstart', function (e) {
      document.addEventListener('touchmove', move, { passive: true });
      document.addEventListener('touchend', stop);
      move(e);
    });
    // Картинки не кликабельны — сдвиг только перетаскиванием ползунка
  }

  // Mobile menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('hidden');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Phone mask
  function maskPhone(input) {
    if (!input) return;
    input.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 0 && (v[0] === '7' || v[0] === '8')) v = v.substring(1);
      let formatted = v.length > 0 ? '+7' : '';
      if (v.length > 1) formatted += ' (' + v.substring(0, 3);
      if (v.length >= 4) formatted += ') ' + v.substring(3, 6);
      if (v.length >= 7) formatted += '-' + v.substring(6, 8);
      if (v.length >= 9) formatted += '-' + v.substring(8, 10);
      e.target.value = formatted;
    });
  }

  maskPhone(document.getElementById('quizPhone'));
  maskPhone(document.getElementById('ctaPhone'));

  // Quiz: 5 steps (legacy — replaced by React Quiz if present)
  const quizForm = document.getElementById('quizForm');
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizPrev = document.getElementById('quizPrev');
  const quizNext = document.getElementById('quizNext');
  const quizSubmit = document.getElementById('quizSubmit');
  const quizProgress = document.getElementById('quizProgress');
  const quizStepIndicator = document.getElementById('quizStepIndicator');

  if (!quizForm) {
    // React Quiz is used instead
  } else {
  let currentStep = 1;
  const totalSteps = 5;

  function updateQuizUI() {
    quizSteps.forEach(function (step) {
      const n = parseInt(step.dataset.step, 10);
      step.classList.toggle('hidden', n !== currentStep);
      step.classList.toggle('active', n === currentStep);
    });

    quizPrev.disabled = currentStep === 1;
    quizNext.classList.toggle('hidden', currentStep === totalSteps);
    quizSubmit.classList.toggle('hidden', currentStep !== totalSteps);

    const pct = (currentStep / totalSteps) * 100;
    if (quizProgress) quizProgress.style.width = pct + '%';
    if (quizStepIndicator) quizStepIndicator.textContent = 'Шаг ' + currentStep + ' из ' + totalSteps;
  }

  function validateStep(stepNum) {
    const step = document.querySelector('.quiz-step[data-step="' + stepNum + '"]');
    if (!step) return true;
    const radios = step.querySelectorAll('input[type="radio"]');
    const checked = step.querySelectorAll('input[type="radio"]:checked');
    if (radios.length && !checked.length && stepNum !== 4) return false;
    const required = step.querySelectorAll('input[required]');
    for (let i = 0; i < required.length; i++) {
      if (!required[i].value.trim()) return false;
    }
    return true;
  }

  if (quizPrev) {
    quizPrev.addEventListener('click', function () {
      if (currentStep > 1) {
        currentStep--;
        updateQuizUI();
      }
    });
  }

  if (quizNext) {
    quizNext.addEventListener('click', function () {
      if (currentStep < totalSteps && validateStep(currentStep)) {
        currentStep++;
        updateQuizUI();
      }
    });
  }

  if (quizForm) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const objType = document.querySelector('input[name="object_type"]:checked');
      const soilType = document.querySelector('input[name="soil_type"]:checked');
      const area = document.querySelector('input[name="area"]');
      const extraServices = document.querySelector('input[name="extra_services"]:checked');
      const name = document.querySelector('input[name="name"]');
      const phone = document.querySelector('#quizPhone');

      let msg = 'Здравствуйте! Хочу получить расчёт.\n\n';
      msg += 'Тип объекта: ' + (objType ? objType.value : '-') + '\n';
      msg += 'Тип грунта: ' + (soilType ? soilType.value : '-') + '\n';
      msg += 'Площадь: ' + (area && area.value ? area.value + ' м²' : '-') + '\n';
      msg += 'Доп. услуги: ' + (extraServices ? extraServices.value : '-') + '\n';
      msg += 'Имя: ' + (name && name.value ? name.value : '-') + '\n';
      msg += 'Телефон: ' + (phone ? phone.value : '-') + '\n';

      window.open('https://web.telegram.org/a/#8345273002', '_blank');
    });
  }

  updateQuizUI();
  }

  document.querySelectorAll('[data-quiz-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // CTA form
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = ctaForm.querySelector('input[name="name"]').value;
      const phone = ctaForm.querySelector('input[name="phone"]').value;
      const msg = 'Здравствуйте! ' + name + '. Хочу заказать консультацию инженера. Мой телефон: ' + phone;
      window.open('https://web.telegram.org/a/#8345273002', '_blank');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    const id = a.getAttribute('href');
    if (id && id !== '#' && document.querySelector(id)) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Founder section: fade-in-up on scroll (staggered)
  const founderSection = document.getElementById('founder');
  const founderAnimate = document.querySelectorAll('.founder-animate');
  if (founderSection && founderAnimate.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          founderAnimate.forEach(function (el) {
            el.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    observer.observe(founderSection);
  } else if (founderAnimate.length) {
    founderAnimate.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
