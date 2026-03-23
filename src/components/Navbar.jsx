import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';

const LINKS = [
  { label: 'Services',  href: '#services'     },
  { label: 'Pricing',   href: '#pricing'      },
  { label: 'Clients',   href: '#testimonials' },
  { label: 'Contact',   href: '#contact'      },
];

/* ── Sun icon ── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>  <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>  <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

/* ── Moon icon ── */
const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── LinkedIn icon ── */
const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ── Instagram icon ── */
const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled]   = useState(false);
  const [activeId, setActiveId]   = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      let cur = '';
      document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 160) cur = s.id;
      });
      setActiveId(cur);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const pillBg = dark
    ? (scrolled ? 'rgba(5,7,15,.96)' : 'rgba(10,12,28,.74)')
    : (scrolled ? 'rgba(220,224,255,.97)' : 'rgba(240,242,255,.84)');

  const pillShadow = scrolled
    ? `0 16px 56px ${dark?'rgba(0,0,0,.7)':'rgba(0,0,80,.15)'}`
    : `0 8px 40px ${dark?'rgba(0,0,0,.5)':'rgba(0,0,80,.1)'}`;

  return (
    <>
      <div style={{ position:'fixed',top:scrolled?10:18,left:'50%',transform:'translateX(-50%)',zIndex:300,width:'calc(100% - 40px)',maxWidth:1200,transition:'top .4s cubic-bezier(.23,1,.32,1)' }}>
        <nav style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px 7px 14px',background:pillBg,backdropFilter:'blur(30px) saturate(180%)',WebkitBackdropFilter:'blur(30px) saturate(180%)',border:`1px solid ${dark?'rgba(255,255,255,.08)':'rgba(100,100,200,.15)'}`,borderRadius:60,boxShadow:pillShadow,transition:'background .4s,box-shadow .4s',position:'relative',overflow:'hidden' }}>

          {/* shimmer top line */}
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(79,140,255,.4) 30%,rgba(255,77,0,.5) 65%,transparent)',pointerEvents:'none' }}/>

          {/* ── BRAND with real logo ── */}
          <a href="#hero" style={{ display:'flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0 }}>
            <div style={{ width:42,height:42,borderRadius:'50%',overflow:'hidden',border:'2px solid rgba(79,140,255,.35)',flexShrink:0,boxShadow:'0 0 16px rgba(79,140,255,.25)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',background:'#0d1633' }}>
              <img src="/logo.png" alt="LaunchifyX Logo" style={{ width:60,height:60,objectFit:'contain' }}/>
              <span style={{ position:'absolute',inset:-4,borderRadius:'50%',border:'1px solid rgba(255,184,0,.12)',animation:'pulse-ring 3s ease infinite',pointerEvents:'none' }}/>
            </div>
            <div style={{ display:'flex',flexDirection:'column',lineHeight:1 }}>
              <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.05rem',fontWeight:800,color:dark?'#f0f2ff':'#0d0f20' }}>
                Launchify<span style={{ background:'linear-gradient(135deg,#4f8cff,#ff8c00)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>X</span>
              </span>
              <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.5rem',fontWeight:500,color:dark?'rgba(255,255,255,.35)':'rgba(0,0,50,.4)',letterSpacing:'.1em',marginTop:6,textTransform:'uppercase' }}>
                Build Fast. Launch Faster
              </span>
            </div>
          </a>

          {/* ── NAV LINKS ── */}
          <ul style={{ display:'flex',gap:2,listStyle:'none',alignItems:'center' }}>
            {LINKS.map(({ label, href }) => {
              const isActive = activeId === href.slice(1);
              return (
                <li key={label}>
                  <a href={href} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'.1em',color:isActive?(dark?'#f0f2ff':'#0d0f20'):(dark?'rgba(255,255,255,.42)':'rgba(0,0,50,.45)'),textDecoration:'none',padding:'9px 14px',borderRadius:40,background:isActive?(dark?'rgba(255,255,255,.06)':'rgba(0,0,80,.06)'):'transparent',transition:'color .2s,background .2s',position:'relative',display:'inline-block' }}>
                    {label}
                    {isActive && <span style={{ position:'absolute',bottom:4,left:'50%',transform:'translateX(-50%)',width:4,height:4,background:'#ff4d00',borderRadius:'50%',display:'block' }}/>}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── RIGHT: socials + theme + CTA ── */}
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            {/* divider */}
            <div style={{ width:1,height:20,background:dark?'rgba(255,255,255,.09)':'rgba(0,0,80,.12)',margin:'0 4px' }}/>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/launchifyx" target="_blank" rel="noopener noreferrer"
              title="LaunchifyX on LinkedIn"
              style={{ width:34,height:34,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:dark?'rgba(255,255,255,.5)':'rgba(0,0,80,.5)',border:`1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.12)'}`,transition:'all .2s',textDecoration:'none',background:'transparent' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(10,102,194,.15)'; e.currentTarget.style.color='#0a66c2'; e.currentTarget.style.borderColor='#0a66c2'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=dark?'rgba(255,255,255,.5)':'rgba(0,0,80,.5)'; e.currentTarget.style.borderColor=dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.12)'; }}>
              <LiIcon/>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/launchifyx" target="_blank" rel="noopener noreferrer"
              title="@launchifyx on Instagram"
              style={{ width:34,height:34,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:dark?'rgba(255,255,255,.5)':'rgba(0,0,80,.5)',border:`1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.12)'}`,transition:'all .2s',textDecoration:'none',background:'transparent' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(225,48,108,.12)'; e.currentTarget.style.color='#e1306c'; e.currentTarget.style.borderColor='#e1306c'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=dark?'rgba(255,255,255,.5)':'rgba(0,0,80,.5)'; e.currentTarget.style.borderColor=dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.12)'; }}>
              <IgIcon/>
            </a>

            {/* divider */}
            <div style={{ width:1,height:20,background:dark?'rgba(255,255,255,.09)':'rgba(0,0,80,.12)',margin:'0 4px' }}/>

            {/* Dark/Light toggle */}
            <button onClick={toggle}
              title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{ width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${dark?'rgba(255,255,255,.12)':'rgba(0,0,80,.15)'}`,background:dark?'rgba(255,184,0,.08)':'rgba(79,140,255,.08)',color:dark?'#ffb800':'#4f8cff',cursor:'pointer',transition:'all .2s',flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='rotate(20deg) scale(1.1)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; }}>
              {dark ? <SunIcon/> : <MoonIcon/>}
            </button>

            {/* CTA */}
            <a href="#contact" style={{ background:'linear-gradient(135deg,#4f8cff,#ff4d00)',color:'#fff',textDecoration:'none',fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',padding:'11px 18px',borderRadius:40,display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap',boxShadow:'0 4px 20px rgba(255,77,0,.4)',transition:'transform .2s,box-shadow .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(255,77,0,.55)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(255,77,0,.4)'; }}>
              Get Started →
            </a>

            {/* Hamburger (mobile) */}
            <button onClick={()=>setMenuOpen(!menuOpen)}
              style={{ display:'none',flexDirection:'column',gap:5,cursor:'pointer',padding:8,background:'transparent',border:'none' }}>
              <span style={{ display:'block',width:20,height:2,background:dark?'#f0f2ff':'#0d0f20',borderRadius:2 }}/>
              <span style={{ display:'block',width:20,height:2,background:dark?'#f0f2ff':'#0d0f20',borderRadius:2 }}/>
              <span style={{ display:'block',width:20,height:2,background:dark?'#f0f2ff':'#0d0f20',borderRadius:2 }}/>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
