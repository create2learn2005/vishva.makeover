// ══════════════════════════════════════════════════
//  VIISHHVA PATEL BEAUTY STUDIO — Main JS
// ══════════════════════════════════════════════════

// ── TRANSLATIONS ────────────────────────────────
const translations = {
  en: {
    nav_services:"Services", nav_gallery:"Gallery", nav_about:"About", nav_reviews:"Reviews", nav_contact:"Contact", nav_book:"Book Now",
    hero_tag:"✦ Beauty Studio · Juni Vasni", hero_em:"Patel",
    hero_p:"We combine medical expertise and modern aesthetics to deliver safe, effective, and trusted beauty solutions for every need.",
    hero_btn_book:"Book Appointment", hero_btn_gallery:"View Gallery", hero_scroll:"Scroll",
    stat_clients:"Happy Clients", stat_experience:"Years Experience", stat_satisfaction:"Satisfaction",
    section_services_tag:"✦ What We Offer", section_services_title:"Our <em>Services</em>",
    section_services_sub:"Expert beauty treatments tailored to bring out your natural radiance",
    service_1_title:"Eyebrow Shaping", service_1_p:"Perfect arch and definition for your brows with threading, waxing, or tinting techniques.",
    service_2_title:"Wax & Smooth", service_2_p:"Full body or area-specific waxing for silky smooth skin that lasts for weeks.",
    service_3_title:"Clean-Up & Facial", service_3_p:"Deep cleansing, exfoliation, and nourishing facial treatments for glowing skin.",
    service_4_title:"Hair Spa & Cut", service_4_p:"Revitalize your hair with deep conditioning spa treatments, precision cuts, and colour.",
    service_5_title:"Hair Style & Makeup", service_5_p:"Professional makeup and hairstyling for every occasion – from bridal to everyday glam.",
    service_6_title:"Custom Package", service_6_p:"Looking for a combo deal? Contact us and we'll create the perfect package for you.", service_6_btn:"Call Us",
    about_tag:"✦ About Us", about_title:"The Art of <em>Beauty</em>",
    about_p:"Viishhva Patel is a dedicated beauty expert combining medical-grade knowledge with modern aesthetics. Every treatment is personalised to enhance your natural beauty safely and effectively.",
    about_feat_1:"Medical Expertise", about_feat_1_p:"Safe, certified treatments",
    about_feat_2:"Premium Products", about_feat_2_p:"Only trusted brands used",
    about_feat_3:"Personalised Care", about_feat_3_p:"Tailored to your skin type",
    about_feat_4:"Hygienic Studio", about_feat_4_p:"Fully sanitized equipment", about_badge:"Years of Expertise",
    reviews_tag:"✦ Client Love", reviews_title:"What They <em>Say</em>",
    reviews_sub:"Trusted by hundreds of clients across the region", reviews_btn:"Share Your Experience ✦",
    book_tag:"✦ Appointments", book_title:"Book Your <em>Session</em>",
    book_sub:"Reserve your spot in just a few clicks. We'll confirm via phone.",
    book_form_title:"Appointment Request", book_form_name:"Full Name *", book_form_phone:"Phone *",
    book_form_email:"Email", book_form_service:"Service *", book_form_date:"Date *",
    book_form_time:"Time *", book_form_msg:"Message", book_form_btn:"Book Appointment",
    contact_tag:"✦ Get In Touch", contact_title:"Contact <em>Us</em>",
    contact_sub:"Have a question? Drop us a message or reach out directly.",
    contact_form_title:"Send a Message", contact_form_btn:"Send Message"
  },
  gu: {
    nav_services:"સેવાઓ", nav_gallery:"ગેલેરી", nav_about:"વિશે", nav_reviews:"રિવ્યુ", nav_contact:"સંપર્ક", nav_book:"બુક કરો",
    hero_tag:"✦ બ્યુટી સ્ટુડિયો · જુની વસણી", hero_em:"પટેલ",
    hero_p:"અમે દરેક જરૂરિયાત માટે સુરક્ષિત, અસરકારક અને વિશ્વસનીય સૌંદર્ય ઉકેલો પ્રદાન કરવા માટે તબીબી કુશળતા અને આધુનિક સૌંદર્ય શાસ્ત્રને જોડીએ છીએ.",
    hero_btn_book:"અપોઈન્ટમેન્ટ બુક કરો", hero_btn_gallery:"ગેલેરી જુઓ", hero_scroll:"સ્ક્રોલ",
    stat_clients:"ખુશ ગ્રાહકો", stat_experience:"વર્ષોનો અનુભવ", stat_satisfaction:"સંતોષ",
    section_services_tag:"✦ અમે શું ઓફર કરીએ", section_services_title:"અમારી <em>સેવાઓ</em>",
    section_services_sub:"તમારી કુદરતી ચમક લાવવા માટે નિષ્ણાત સૌંદર્ય સારવાર",
    service_1_title:"આઈબ્રો શેપિંગ", service_1_p:"થ્રેડીંગ, વેક્સિંગ અથવા ટિન્ટિંગ સાથે સંપૂર્ણ ભ્રમર આકાર.",
    service_2_title:"વેક્સ અને સ્મૂધ", service_2_p:"મુલાયમ ત્વચા માટે આખા શરીરની વેક્સિંગ.",
    service_3_title:"ક્લીન-અપ અને ફેશિયલ", service_3_p:"ચમકતી ત્વચા માટે ડીપ ક્લીન્ઝિંગ ટ્રીટમેન્ટ.",
    service_4_title:"હેર સ્પા અને કટ", service_4_p:"ડીપ કન્ડિશનિંગ અને પ્રિસિઝન કટ સાથે નવો લુક.",
    service_5_title:"હેર સ્ટાઇલ અને મેકઅપ", service_5_p:"દરેક પ્રસંગ માટે પ્રોફેશનલ મેકઅપ.",
    service_6_title:"કસ્ટમ પેકેજ", service_6_p:"કોમ્બો ડીલ ઇચ્છો? અમારો સંપર્ક કરો.", service_6_btn:"ફોન કરો",
    about_tag:"✦ અમારા વિશે", about_title:"સૌંદર્યની <em>કળા</em>",
    about_p:"વિશ્વા પટેલ આધુનિક સૌંદર્ય સાથે તબીબી-ગ્રેડ જ્ઞાન જોડતા સૌંદર્ય નિષ્ણાત છે. દરેક સારવાર વ્યક્તિગત છે.",
    about_feat_1:"તબીબી કુશળતા", about_feat_1_p:"સુરક્ષિત, પ્રમાણિત સારવાર",
    about_feat_2:"પ્રીમિયમ ઉત્પાદનો", about_feat_2_p:"ફક્ત વિશ્વસનીય બ્રાન્ડ્સ",
    about_feat_3:"વ્યક્તિગત સંભાળ", about_feat_3_p:"તમારી ત્વચા પ્રકાર મુજબ",
    about_feat_4:"હાઇજેનિક સ્ટુડિયો", about_feat_4_p:"સંપૂર્ણ સ્વચ્છ સાધનો", about_badge:"વર્ષોની કુશળતા",
    reviews_tag:"✦ ગ્રાહક પ્રેમ", reviews_title:"તેઓ શું <em>કહે</em>",
    reviews_sub:"સેંકડો ગ્રાહકો દ્વારા વિશ્વાસુ", reviews_btn:"અનુભવ શેર કરો ✦",
    book_tag:"✦ અપોઈન્ટમેન્ટ", book_title:"તમારું <em>સેશન</em> બુક",
    book_sub:"થોડી ક્લિક્સમાં જ બુક કરો. અમે ફોન દ્વારા કન્ફર્મ કરીશું.",
    book_form_title:"અપોઈન્ટમેન્ટ", book_form_name:"પૂરું નામ *", book_form_phone:"ફોન *",
    book_form_email:"ઇમેઇલ", book_form_service:"સેવા *", book_form_date:"તારીખ *",
    book_form_time:"સમય *", book_form_msg:"સંદેશ", book_form_btn:"અપોઈન્ટમેન્ટ બુક",
    contact_tag:"✦ સંપર્ક", contact_title:"અમારો <em>સંપર્ક</em>",
    contact_sub:"પ્રશ્ન છે? અમને સંદેશ મોકલો.",
    contact_form_title:"સંદેશ મોકલો", contact_form_btn:"સંદેશ મોકલો"
  }
};

let currentLang = localStorage.getItem('viishhva_lang') || 'en';

function updateLanguage() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!t[key]) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t[key];
    } else if (el.tagName === 'SELECT') {
      // skip
    } else {
      el.innerHTML = t[key];
    }
  });
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = currentLang === 'en' ? 'GUJ' : 'ENG';
  document.documentElement.lang = currentLang;
}

// ── NAVBAR ──────────────────────────────────────
const nav = document.querySelector('nav');
const hamburger = document.getElementById('hamburger');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
  });
  // Close menu when link clicked
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('menu-open'));
  });
}

// ── FADE-UP OBSERVER ────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

function observeFadeEls() {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));
}
observeFadeEls();

// ── FLOATING PETALS ─────────────────────────────
function initPetals() {
  const container = document.getElementById('heroPetals');
  if (!container) return;
  const petals = ['🌸', '🌺', '✨', '🌹', '💮'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
      font-size: ${0.5 + Math.random() * 1}rem;
    `;
    container.appendChild(p);
  }
}

// ── TOAST ────────────────────────────────────────
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (isError ? ' error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── BOOKING FORM ────────────────────────────────
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  const dateInput = bookingForm.querySelector('[name="date"]') || document.getElementById('bookDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = currentLang === 'en' ? 'Booking...' : 'બુકિંગ...';

    const data = Object.fromEntries(new FormData(bookingForm));
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        showToast(currentLang === 'en' ? '✨ Booking confirmed! We\'ll call you shortly.' : '✨ બુકિંગ કન્ફર્મ! અમે ટૂંક સમયમાં ફોન કરીશું.');
        bookingForm.reset();
        document.getElementById('successModal')?.classList.add('active');
      } else {
        showToast(result.error || (currentLang === 'en' ? 'Booking failed. Try again.' : 'બુકિંગ નિષ્ફળ.'), true);
      }
    } catch {
      showToast(currentLang === 'en' ? 'Network error. Please try again.' : 'નેટવર્ક ભૂલ.', true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });
}

// ── CONTACT FORM ────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = currentLang === 'en' ? 'Sending...' : 'મોકલી...';

    const data = Object.fromEntries(new FormData(contactForm));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        showToast(currentLang === 'en' ? 'Message sent! We\'ll get back to you. 💌' : 'સંદેશ ગયો! 💌');
        contactForm.reset();
      } else {
        showToast(currentLang === 'en' ? 'Failed. Try again.' : 'નિષ્ફળ.', true);
      }
    } catch {
      showToast(currentLang === 'en' ? 'Network error.' : 'ભૂલ.', true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });
}

// ── REVIEW FORM ─────────────────────────────────
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = reviewForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const data = Object.fromEntries(new FormData(reviewForm));
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        showToast(currentLang === 'en' ? 'Thank you for your review! 🌸' : 'આભાર! 🌸');
        reviewForm.reset();
        document.getElementById('reviewModal')?.classList.remove('active');
        loadTestimonials();
      } else {
        showToast('Failed. Try again.', true);
      }
    } catch {
      showToast('Network error.', true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });
}

// ── LOAD TESTIMONIALS ───────────────────────────
async function loadTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  try {
    const res = await fetch('/api/testimonials');
    const data = await res.json();

    if (!data.length) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-mid);padding:2rem;">
        ${currentLang === 'en' ? 'Be the first to leave a review! ✨' : 'રિવ્યુ આપો! ✨'}
      </div>`;
      return;
    }

    container.innerHTML = data.map(t => `
      <div class="testi-card fade-up">
        <div class="testi-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
        <p class="testi-text">"${escHtml(t.review)}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="testi-name">${escHtml(t.name)}</div>
            <div class="testi-service">${escHtml(t.service || 'Viishhva Beauty')}</div>
          </div>
        </div>
      </div>
    `).join('');

    observeFadeEls();
  } catch {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-mid);padding:2rem;">
      ${currentLang === 'en' ? 'Unable to load reviews.' : 'રિવ્યુ લોડ ન થઈ.'}
    </div>`;
  }
}

// ── GALLERY PREVIEW ─────────────────────────────
async function loadGalleryPreview() {
  const container = document.getElementById('galleryPreview');
  if (!container) return;

  try {
    const res = await fetch('/api/gallery');
    const photos = await res.json();

    if (!photos.length) {
      container.innerHTML = `<div class="gallery-placeholder" style="grid-column:1/-1;">
        ${currentLang === 'en' ? '✨ Gallery coming soon' : '✨ ગેલેરી ટૂંક સમયમાં'}
      </div>`;
      return;
    }

    const preview = photos.slice(0, 6);
    container.innerHTML = preview.map((p, i) => `
      <div class="g-item${i === 0 ? ' featured' : ''} fade-up">
        <img src="/api/gallery/${p.id}/image" alt="${escHtml(p.title)}" loading="lazy" />
        <div class="g-overlay"><span>✦</span></div>
      </div>
    `).join('');

    observeFadeEls();
  } catch {
    container.innerHTML = `<div class="gallery-placeholder" style="grid-column:1/-1;">
      ${currentLang === 'en' ? '✨ Gallery coming soon' : '✨ ગેલેરી ટૂંક સમયમાં'}
    </div>`;
  }
}

// ── STAR RATING ──────────────────────────────────
function initStarRating() {
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('ratingInput');
  if (!stars.length) return;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      if (ratingInput) ratingInput.value = val;
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= val));
    });
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach(s => s.style.opacity = parseInt(s.dataset.val) <= val ? '1' : '0.4');
    });
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.style.opacity = '1');
    });
  });
}

// ── MODAL HELPERS ────────────────────────────────
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.modalOpen)?.classList.add('active');
  });
});

document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay')?.classList.remove('active');
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ── UTILS ────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'gu' : 'en';
      localStorage.setItem('viishhva_lang', currentLang);
      updateLanguage();
    });
  }

  loadTestimonials();
  loadGalleryPreview();
  initStarRating();
  initPetals();

  // Set min date
  const d = document.getElementById('bookDate') || document.querySelector('input[name="date"]');
  if (d) d.min = new Date().toISOString().split('T')[0];
});
