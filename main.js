diff --git a/assets/js/main.js b/assets/js/main.js
new file mode 100644
index 0000000000000000000000000000000000000000..18a78a29ca5652d24616292d46c04ecc5be94325
--- /dev/null
+++ b/assets/js/main.js
@@ -0,0 +1,166 @@
+document.addEventListener('DOMContentLoaded', () => {
+    const navToggle = document.querySelector('.nav-toggle');
+    const navLinks = document.querySelector('.nav-links');
+
+    if (navToggle && navLinks) {
+        navLinks.dataset.open = 'false';
+        const toggleNav = () => {
+            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
+            navToggle.setAttribute('aria-expanded', String(!isExpanded));
+            navLinks.dataset.open = String(!isExpanded);
+        };
+
+        navToggle.addEventListener('click', toggleNav);
+
+        navLinks.querySelectorAll('a').forEach((link) => {
+            link.addEventListener('click', () => {
+                if (window.innerWidth <= 900 && navLinks.dataset.open === 'true') {
+                    toggleNav();
+                }
+            });
+        });
+
+        window.addEventListener('resize', () => {
+            if (window.innerWidth > 900) {
+                navLinks.dataset.open = 'false';
+                navToggle.setAttribute('aria-expanded', 'false');
+            }
+        });
+    }
+
+    const rotatorEl = document.querySelector('.hero__rotator');
+    if (rotatorEl) {
+        const phrases = [
+            'Specialized in Penetration Testing.',
+            'Building resilient DevSecOps pipelines.',
+            'Investigating malware and mobile threats.'
+        ];
+        let rotatorIndex = 0;
+        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+
+        if (!prefersReducedMotion && phrases.length > 1) {
+            setInterval(() => {
+                rotatorIndex = (rotatorIndex + 1) % phrases.length;
+                rotatorEl.textContent = phrases[rotatorIndex];
+            }, 3200);
+        } else {
+            rotatorEl.textContent = phrases[0];
+        }
+    }
+
+    const slider = document.querySelector('[data-slider]');
+    if (slider) {
+        const track = slider.querySelector('[data-slider-track]');
+        const slides = Array.from(track.children);
+        const prevBtn = slider.querySelector('[data-slider-prev]');
+        const nextBtn = slider.querySelector('[data-slider-next]');
+        const dotsContainer = slider.querySelector('[data-slider-dots]');
+        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+        let activeIndex = 0;
+        let autoplayTimer;
+
+        const setSlidePositions = () => {
+            slides.forEach((slide) => {
+                slide.style.width = '100%';
+            });
+        };
+
+        const buildDots = () => {
+            slides.forEach((_, index) => {
+                const dot = document.createElement('button');
+                dot.type = 'button';
+                dot.className = 'slider__dot';
+                dot.setAttribute('role', 'tab');
+                dot.setAttribute('aria-controls', `testimonial-${index}`);
+                dot.addEventListener('click', () => goToSlide(index));
+                dotsContainer.appendChild(dot);
+            });
+        };
+
+        const updateDots = () => {
+            const dots = dotsContainer.querySelectorAll('.slider__dot');
+            dots.forEach((dot, index) => {
+                dot.setAttribute('aria-selected', String(index === activeIndex));
+            });
+        };
+
+        const goToSlide = (index) => {
+            activeIndex = (index + slides.length) % slides.length;
+            const offset = -(activeIndex * 100);
+            track.style.transform = `translateX(${offset}%)`;
+            updateDots();
+        };
+
+        const nextSlide = () => goToSlide(activeIndex + 1);
+        const prevSlide = () => goToSlide(activeIndex - 1);
+
+        const startAutoplay = () => {
+            if (!prefersReducedMotion) {
+                stopAutoplay();
+                autoplayTimer = setInterval(nextSlide, 6000);
+            }
+        };
+
+        const stopAutoplay = () => {
+            if (autoplayTimer) {
+                clearInterval(autoplayTimer);
+                autoplayTimer = undefined;
+            }
+        };
+
+        setSlidePositions();
+        buildDots();
+        updateDots();
+        startAutoplay();
+
+        slider.addEventListener('mouseenter', stopAutoplay);
+        slider.addEventListener('mouseleave', startAutoplay);
+
+        slider.addEventListener('keydown', (event) => {
+            if (event.key === 'ArrowRight') {
+                event.preventDefault();
+                nextSlide();
+            }
+            if (event.key === 'ArrowLeft') {
+                event.preventDefault();
+                prevSlide();
+            }
+        });
+
+        if (nextBtn) {
+            nextBtn.addEventListener('click', nextSlide);
+        }
+
+        if (prevBtn) {
+            prevBtn.addEventListener('click', prevSlide);
+        }
+
+        window.addEventListener('resize', setSlidePositions);
+    }
+
+    const contactForm = document.querySelector('[data-contact-form]');
+    if (contactForm) {
+        const feedback = contactForm.querySelector('.form-feedback');
+
+        contactForm.addEventListener('submit', (event) => {
+            if (!contactForm.checkValidity()) {
+                event.preventDefault();
+                contactForm.reportValidity();
+                if (feedback) {
+                    feedback.textContent = 'Please complete all required fields before sending.';
+                }
+                return;
+            }
+
+            if (feedback) {
+                feedback.textContent = 'Redirecting to send your message…';
+            }
+        });
+
+        contactForm.addEventListener('input', () => {
+            if (feedback) {
+                feedback.textContent = '';
+            }
+        });
+    }
+});
