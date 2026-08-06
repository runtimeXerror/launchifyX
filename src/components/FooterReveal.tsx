'use client';

import { useEffect, useRef } from 'react';

// Watches scroll position — shows footer when user reaches bottom, hides when scrolls back up
export default function FooterReveal() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const onScroll = () => {
      // Show footer when within 200px of page bottom
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight   = document.documentElement.scrollHeight;
      const nearBottom   = scrollBottom >= pageHeight - 200;

      footer.style.transform = nearBottom ? 'translateY(0)' : 'translateY(100%)';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={footerRef}
      id="footer-reveal"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: 'translateY(100%)',
        transition: 'transform .7s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    />
  );
}
