'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const LINKS = [
  { label: 'Home',      href: '#hero'         },
  { label: 'Services',  href: '#services'     },
  { label: 'Pricing',   href: '#pricing'      },
  { label: 'Our Work',  href: '#portfolio'    },
  { label: 'Clients',   href: '#testimonials' },
  { label: 'Contact',   href: '#contact'      },
];

const SERVICE_ITEMS = [
  { label: 'Custom Website Development', slug: 'custom-website-development', color: '#4f8cff',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { label: 'Mobile App Development',     slug: 'mobile-app-development',     color: '#a855f7',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/></svg> },
  { label: 'E-Commerce Development',     slug: 'e-commerce-development',     color: '#ff4d00',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
  { label: 'Website & App Maintenance',  slug: 'website-app-maintenance',    color: '#ffb800',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
  { label: 'Startup Launch Package',     slug: 'startup-launch-package',     color: '#22c55e',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg> },
  { label: 'Business Consulting',        slug: 'business-consulting-strategy', color: '#ec4899',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
];

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const [navSocials, setNavSocials] = useState({ linkedin:'https://www.linkedin.com/company/launchifyx', instagram:'https://www.instagram.com/launchifyx' });

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then((d: Record<string,string>) => {
      setNavSocials({ linkedin: d.social_linkedin || navSocials.linkedin, instagram: d.social_instagram || navSocials.instagram });
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      let cur = '';
      document.querySelectorAll('section[id]').forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 160) cur = s.id;
      });
      setActiveId(cur);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = dark
    ? scrolled ? 'rgba(45,20,80,.97)' : 'rgba(45,20,80,.75)'
    : scrolled ? 'rgba(250,248,243,.95)' : 'rgba(250,248,243,.7)';

  const navBorder = dark ? 'rgba(160,100,255,.4)' : 'rgba(0,0,0,.07)';
  const linkColor = dark ? 'rgba(200,215,245,.5)' : 'rgba(26,21,16,.45)';
  const linkActive = dark ? '#e8eef8' : '#1a1510';
  const iconColor = dark ? 'rgba(200,215,245,.45)' : 'rgba(26,21,16,.4)';

  return (
    <>
      <div className="nav-wrapper" style={{ position:'fixed',top:scrolled?10:16,left:'50%',transform:'translateX(-50%)',zIndex:300,width:'calc(100% - 40px)',maxWidth:1200,transition:'top .4s cubic-bezier(.23,1,.32,1)' }}>
        <div>
        <nav style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',height:56,background:navBg,backdropFilter:'blur(24px) saturate(160%)',WebkitBackdropFilter:'blur(24px) saturate(160%)',border:`1px solid ${navBorder}`,borderRadius:'16px 16px 16px 16px',boxShadow:scrolled?(dark?'0 8px 32px rgba(0,0,0,.4)':'0 8px 32px rgba(0,0,0,.08)'):'0 4px 20px rgba(0,0,0,.06)',transition:'all .4s cubic-bezier(.23,1,.32,1)',overflow:'visible' }}>

          {/* BRAND */}
          <a href="#hero" style={{ display:'flex',alignItems:'center',gap:0,textDecoration:'none',flexShrink:0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="LaunchifyX Logo" style={{ width:60,height:60,objectFit:'contain',flexShrink:0,margin:'-4px 0' }}/>
            <div style={{ display:'flex',flexDirection:'column',lineHeight:1 }}>
              <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1rem',fontWeight:800,color:dark?'#faf5e8':'#1a1510' }}>
                Launchify<span style={{ background:'linear-gradient(135deg,#ff4d00,#ffb800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>X</span>
              </span>
              <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.44rem',fontWeight:500,color:dark?'rgba(250,245,232,.3)':'rgba(26,21,16,.35)',letterSpacing:'.12em',marginTop:4,textTransform:'uppercase' }}>
                Build Fast. Launch Faster
              </span>
            </div>
          </a>

          {/* NAV LINKS — desktop only */}
          <ul className="nav-links-desktop" style={{ display:'flex',gap:0,listStyle:'none',alignItems:'center' }}>
            {LINKS.map(({ label, href }) => {
              const isActive = activeId === href.slice(1);
              if (label === 'Services') return (
                <li key={label} ref={svcRef} style={{ position:'relative' }}
                  onMouseEnter={() => setSvcOpen(true)}
                  onMouseLeave={() => setSvcOpen(false)}>
                  <a href={href} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:isActive?'.72rem':'.68rem',fontWeight:isActive?800:600,textTransform:'uppercase',letterSpacing:'.1em',color:isActive?linkActive:linkColor,textDecoration:'none',padding:'8px 14px',borderRadius:8,background:'transparent',transition:'color .2s',display:'inline-flex',alignItems:'center',gap:4 }}>
                    {label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'transform .2s', transform: svcOpen ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </a>
                  {/* Dropdown */}
                  <div style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', paddingTop:8, opacity: svcOpen ? 1 : 0, visibility: svcOpen ? 'visible' : 'hidden', transition:'opacity .2s, visibility .2s', pointerEvents: svcOpen ? 'auto' : 'none', zIndex:400 }}>
                    <div style={{ background: dark ? 'rgba(10,8,40,.97)' : 'rgba(255,255,255,.97)', border:`1px solid ${dark?'rgba(100,140,255,.15)':'rgba(0,0,0,.08)'}`, borderRadius:14, padding:'8px', backdropFilter:'blur(24px)', boxShadow:'0 16px 48px rgba(0,0,0,.2)', minWidth:260 }}>
                      {SERVICE_ITEMS.map(svc => (
                        <a key={svc.slug} href={`/services/${svc.slug}`}
                          style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:9, textDecoration:'none', color: dark ? 'rgba(200,215,245,.8)' : '#3a3530', fontFamily:"'Montserrat',sans-serif", fontSize:'.75rem', fontWeight:600, transition:'background .15s, color .15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${svc.color}14`; e.currentTarget.style.color = svc.color; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = dark ? 'rgba(200,215,245,.8)' : '#3a3530'; }}>
                          <span style={{ display:'flex', color:svc.color }}>{svc.icon}</span>
                          {svc.label}
                        </a>
                      ))}
                      <div style={{ borderTop:`1px solid ${dark?'rgba(100,140,255,.1)':'rgba(0,0,0,.06)'}`, margin:'6px 0' }}/>
                      <a href="#services"
                        style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px 12px', borderRadius:9, textDecoration:'none', color:'#ff4d00', fontFamily:"'Montserrat',sans-serif", fontSize:'.7rem', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', transition:'background .15s' }}
                        onMouseEnter={e => e.currentTarget.style.background='rgba(255,77,0,.08)'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        View All Services →
                      </a>
                    </div>
                  </div>
                </li>
              );
              return (
                <li key={label}>
                  <a href={href} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:isActive?'.72rem':'.68rem',fontWeight:isActive?800:600,textTransform:'uppercase',letterSpacing:'.1em',color:isActive?linkActive:linkColor,textDecoration:'none',padding:'8px 14px',borderRadius:8,background:'transparent',transition:'color .2s,font-weight .2s,font-size .2s',display:'inline-flex',alignItems:'center' }}>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* RIGHT */}
          <div style={{ display:'flex',alignItems:'center',gap:6 }}>


            {/* Theme toggle */}
            <button onClick={toggle}
              title={dark ? 'Light mode' : 'Dark mode'}
              style={{ width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${navBorder}`,background:'transparent',color:dark?'#ffb800':'#4f8cff',cursor:'pointer',transition:'all .2s',flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=dark?'rgba(255,184,0,.1)':'rgba(79,140,255,.1)'; e.currentTarget.style.transform='rotate(15deg)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.transform=''; }}>
              {dark ? <SunIcon/> : <MoonIcon/>}
            </button>

            {/* CTA — desktop only */}
            <a href="/consultation" className="nav-cta-desktop"
              style={{ background:'linear-gradient(135deg,#ff4d00,#c73b00)',color:'#fff',textDecoration:'none',fontFamily:"'Montserrat',sans-serif",fontSize:'.66rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',padding:'9px 18px',borderRadius:8,display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap',transition:'opacity .2s,transform .2s',marginLeft:4 }}
              onMouseEnter={e=>{ e.currentTarget.style.opacity='.88'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform=''; }}>
              Get Started →
            </a>

            {/* Hamburger — mobile/tablet only */}
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"
              style={{ flexDirection:'column',gap:4,cursor:'pointer',padding:6,background:'transparent',border:'none',flexShrink:0,marginLeft:2 }}>
              <span style={{ display:'block',width:20,height:2,background:dark?'#faf5e8':'#1a1510',borderRadius:2,transition:'transform .3s,opacity .3s',transform:menuOpen?'translateY(6px) rotate(45deg)':'none' }}/>
              <span style={{ display:'block',width:20,height:2,background:dark?'#faf5e8':'#1a1510',borderRadius:2,transition:'opacity .3s',opacity:menuOpen?0:1 }}/>
              <span style={{ display:'block',width:20,height:2,background:dark?'#faf5e8':'#1a1510',borderRadius:2,transition:'transform .3s,opacity .3s',transform:menuOpen?'translateY(-6px) rotate(-45deg)':'none' }}/>
            </button>
          </div>
        </nav>
        </div>
      </div>

      {/* ── MOBILE / TABLET MENU OVERLAY ── */}
      <div style={{
        position:'fixed',
        inset:0,
        background:dark?'rgba(18,16,61,.98)':'rgba(250,248,243,.98)',
        backdropFilter:'blur(20px)',
        zIndex:299,
        opacity:menuOpen?1:0,
        visibility:menuOpen?'visible':'hidden',
        transition:'opacity .35s ease, visibility .35s ease',
        overflowY:'auto',
      }}>
        {/* bg orb */}
        <div style={{ position:'absolute',top:'40%',left:'50%',width:'500px',height:'500px',background:'radial-gradient(circle, rgba(79,140,255,.08) 0%, transparent 70%)',borderRadius:'50%',transform:'translate(-50%,-50%)',filter:'blur(80px)',pointerEvents:'none' }}/>

        {/* Close button */}
        <button onClick={() => setMenuOpen(false)}
          style={{ position:'absolute',top:20,right:20,width:44,height:44,borderRadius:'50%',background:dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.08)',border:`1px solid ${dark?'rgba(255,255,255,.12)':'rgba(0,0,80,.12)'}`,color:dark?'#f0f2ff':'#0d0f20',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .3s' }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='rotate(90deg) scale(1.1)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform=''; }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Menu content */}
        <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100%',padding:'80px 24px 40px',gap:4 }}>

          {/* Nav links */}
          {LINKS.map(({ label, href }, i) => {
            const isActive = activeId === href.slice(1);
            return (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'clamp(1.6rem,5vw,2.4rem)',fontWeight:800,color:dark?'#f0f2ff':'#0d0f20',textDecoration:'none',padding:'10px 28px',borderRadius:16,width:'100%',maxWidth:360,textAlign:'center',background:'transparent',transition:'all .3s ease',opacity:menuOpen?1:0,transform:menuOpen?'translateY(0)':'translateY(20px)',transitionDelay:`${i*0.07}s` }}>
                {label}
              </a>
            );
          })}

          {/* Divider */}
          <div style={{ width:60,height:1,background:dark?'rgba(255,255,255,.1)':'rgba(0,0,80,.1)',margin:'16px 0',opacity:menuOpen?1:0,transition:'opacity .3s .28s' }}/>

          {/* Socials row */}
          <div style={{ display:'flex',gap:14,opacity:menuOpen?1:0,transform:menuOpen?'translateY(0)':'translateY(20px)',transition:'all .3s ease .3s' }}>
            {navSocials.linkedin && <a href={navSocials.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ width:44,height:44,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0a66c2',border:'1px solid rgba(10,102,194,.3)',background:'rgba(10,102,194,.08)',textDecoration:'none',transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(10,102,194,.2)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(10,102,194,.08)'; }}>
              <LiIcon/>
            </a>}
            {navSocials.instagram && <a href={navSocials.instagram} target="_blank" rel="noopener noreferrer"
              style={{ width:44,height:44,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#e1306c',border:'1px solid rgba(225,48,108,.3)',background:'rgba(225,48,108,.08)',textDecoration:'none',transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(225,48,108,.2)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(225,48,108,.08)'; }}>
              <IgIcon/>
            </a>}
          </div>

          {/* CTA */}
          <a href="/consultation" onClick={() => setMenuOpen(false)}
            style={{ marginTop:24,padding:'15px 44px',background:'linear-gradient(135deg,#4f8cff,#ff4d00)',color:'#fff',textDecoration:'none',fontFamily:"'Montserrat',sans-serif",fontSize:'.85rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',borderRadius:50,boxShadow:'0 8px 30px rgba(79,140,255,.35)',opacity:menuOpen?1:0,transform:menuOpen?'translateY(0)':'translateY(20px)',transition:'all .3s ease .36s' }}>
            Get Started →
          </a>
        </div>
      </div>

      <style>{`
        /* Desktop: show links + socials + CTA, hide hamburger */
        @media (min-width: 961px) {
          .nav-links-desktop  { display: flex !important; }
          .nav-socials-desktop { display: flex !important; }
          .nav-cta-desktop    { display: flex !important; }
          .nav-hamburger      { display: none !important; }
        }
        /* Tablet + Mobile: hide desktop items, show hamburger */
        @media (max-width: 960px) {
          .nav-links-desktop  { display: none !important; }
          .nav-socials-desktop { display: none !important; }
          .nav-cta-desktop    { display: none !important; }
          .nav-hamburger      { display: flex !important; }
        }
        /* Tighter nav pill on small screens */
        @media (max-width: 500px) {
          .nav-wrapper { width: calc(100% - 24px) !important; }
        }
      `}</style>
    </>
  );
}
