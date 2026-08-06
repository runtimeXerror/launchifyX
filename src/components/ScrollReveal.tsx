'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));

    const style = document.createElement('style');
    style.textContent = `
      .page-hidden {
        opacity: 0;
        transform: translateY(60px) scale(0.97);
        transition:
          opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .page-visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }

      /* Individual card animation */
      .scroll-card {
        opacity: 0;
        transform: translateY(48px) scale(0.96);
        transition:
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .scroll-card.card-visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }
    `;
    document.head.appendChild(style);

    // Section-level reveal (skip hero)
    sections.forEach((el, i) => {
      if (i === 0) return;
      el.classList.add('page-hidden');
    });

    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('page-visible');
              // After section reveals, trigger card animations inside it
              const cards = entry.target.querySelectorAll('.scroll-card');
              cards.forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add('card-visible');
                }, i * 80);
              });
            }, 60);
            sectionObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    sections.forEach((el, i) => {
      if (i === 0) return;
      sectionObs.observe(el);
    });

    // Card-level reveal for cards already visible (hero cards)
    const cardObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('card-visible');
            }, 80);
            cardObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all scroll-cards
    document.querySelectorAll('.scroll-card').forEach(card => {
      cardObs.observe(card);
    });

    return () => {
      sectionObs.disconnect();
      cardObs.disconnect();
      style.remove();
    };
  }, []);

  return null;
}
