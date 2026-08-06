'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { InstagramIcon, HeartIcon, MailIcon, RocketIcon } from './Icons';

const LiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const NAV = ['Services','Our Work','Pricing','Clients','Contact'];
const LINKS: Record<string, string> = {
  'Services':'#services','Our Work':'#portfolio','Pricing':'#pricing',
  'Clients':'#testimonials','Contact':'#contact',
};
const STATS = [
  { num:'10+', label:'Projects' },
  { num:'98%', label:'Satisfaction' },
  { num:'3 Wks', label:'Avg Launch' },
  { num:'5x', label:'ROI' },
];
const SOCIAL_META: Record<string, { Icon: React.ComponentType<{size?:number;color?:string}>; color:string; bg:string }> = {
  social_linkedin:  { Icon: LiIcon,        color:'#0a66c2', bg:'rgba(10,102,194,.12)' },
  social_instagram: { Icon: InstagramIcon, color:'#e1306c', bg:'rgba(225,48,108,.12)' },
  social_twitter:   { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, color:'#1d9bf0', bg:'rgba(29,155,240,.12)' },
  social_facebook:  { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, color:'#1877f2', bg:'rgba(24,119,242,.12)' },
  social_youtube:   { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>, color:'#ff0000', bg:'rgba(255,0,0,.1)' },
  social_whatsapp:  { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, color:'#25d366', bg:'rgba(37,211,102,.12)' },
};

export default function Footer() {
  const { dark } = useTheme();
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [socials, setSocials]       = useState<{label:string;href:string;Icon:React.ComponentType<{size?:number;color?:string}>;color:string;bg:string}[]>([
    { label:'LinkedIn',  href:'https://www.linkedin.com/company/launchifyx', Icon:LiIcon,        color:'#0a66c2', bg:'rgba(10,102,194,.12)' },
    { label:'Instagram', href:'https://www.instagram.com/launchifyx',        Icon:InstagramIcon, color:'#e1306c', bg:'rgba(225,48,108,.12)' },
  ]);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then((data: Record<string,string>) => {
      const LABELS: Record<string,string> = { social_linkedin:'LinkedIn', social_instagram:'Instagram', social_twitter:'X / Twitter', social_facebook:'Facebook', social_youtube:'YouTube', social_whatsapp:'WhatsApp' };
      const built = Object.entries(SOCIAL_META)
        .filter(([key]) => data[key])
        .map(([key, meta]) => ({ label: LABELS[key], href: data[key], ...meta }));
      if (built.length) setSocials(built);
    }).catch(() => {});
  }, []);

  const text   = dark ? '#faf5e8' : '#1a1510';
  const muted  = dark ? '#7a7060' : '#6a6050';
  const border = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)';
  const bg     = dark ? '#12103d' : '#f2ede2';

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const pageHeight = document.documentElement.scrollHeight;
      const nearBottom = window.scrollY >= pageHeight - window.innerHeight * 1.4;
      el.style.transform = nearBottom ? 'translateY(0)' : 'translateY(105%)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSub = () => {
    if (!email.trim()) return;
    setSubscribed(true); setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer ref={ref} style={{ position:'fixed', bottom:0, left:0, right:0, height:'100vh', background:bg, overflowY:'auto', display:'flex', flexDirection:'column', justifyContent:'flex-start', borderRadius:'24px 24px 0 0', transform:'translateY(105%)', transition:'transform 0.8s cubic-bezier(0.16,1,0.3,1), background .35s', zIndex:50, willChange:'transform' }}>

      <div style={{ position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(255,77,0,.5) 30%,rgba(79,140,255,.5) 70%,transparent)' }}/>
      <div style={{ position:'absolute',top:'10%',left:'-5%',width:400,height:400,background:'radial-gradient(circle,rgba(255,77,0,.06),transparent 70%)',borderRadius:'50%',filter:'blur(60px)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'10%',right:'-5%',width:350,height:350,background:'radial-gradient(circle,rgba(79,140,255,.06),transparent 70%)',borderRadius:'50%',filter:'blur(60px)',pointerEvents:'none' }}/>

      <div style={{ position:'relative',zIndex:1,width:'100%',maxWidth:1200,margin:'auto',padding:'48px 20px 32px' }}>

        {/* ── BIG CTA ── */}
        <div style={{ textAlign:'center',marginBottom:28 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'5px 14px',background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.22)',borderRadius:30,marginBottom:16 }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',animation:'avail-ping 2s ease infinite',display:'inline-block',flexShrink:0 }}/>
            <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:600,color:'#22c55e' }}>Currently Accepting Projects</span>
          </div>
          <h2 style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:900,fontSize:'clamp(1.8rem,5vw,4rem)',lineHeight:1.05,letterSpacing:'-.02em',color:text,marginBottom:10 }}>
            Ready to Build<br/>
            <span style={{ background:'linear-gradient(135deg,#ff4d00,#ffb800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Something Great?</span>
          </h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.85rem',color:muted,maxWidth:420,margin:'0 auto 20px' }}>
            Tell us your idea — we reply within 24 hours with a clear plan and fair price.
          </p>
          <div className="footer-cta-row" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:10,flexWrap:'wrap' }}>
            <a href="#contact"
              style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'12px 24px',background:'linear-gradient(135deg,#ff4d00,#c73b00)',color:'#fff',textDecoration:'none',borderRadius:10,fontFamily:"'Montserrat',sans-serif",fontSize:'.76rem',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',boxShadow:'0 6px 24px rgba(255,77,0,.3)',transition:'all .3s',whiteSpace:'nowrap' }}>
              <RocketIcon size={14} color="#fff"/> Start a Project
            </a>
            <a href="mailto:contact.launchifyx@gmail.com"
              style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'12px 16px',background:'transparent',color:text,textDecoration:'none',borderRadius:10,fontFamily:"'Montserrat',sans-serif",fontSize:'.72rem',fontWeight:600,border:`1px solid ${border}`,transition:'all .3s',overflow:'hidden',maxWidth:'100%' }}>
              <MailIcon size={13}/> contact.launchifyx@gmail.com
            </a>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="footer-stats" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:22 }}>
          {STATS.map((s,i) => (
            <div key={i}
              style={{ textAlign:'center',padding:'14px 8px',background:dark?'rgba(255,255,255,.03)':'rgba(255,255,255,.6)',border:`1px solid ${border}`,borderRadius:12,cursor:'default',transition:'transform .25s cubic-bezier(.23,1,.32,1), box-shadow .25s, background .25s, border-color .25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px) scale(1.04)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(255,77,0,.18)'; e.currentTarget.style.borderColor='rgba(255,77,0,.4)'; e.currentTarget.style.background=dark?'rgba(255,77,0,.08)':'rgba(255,77,0,.05)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor=border; e.currentTarget.style.background=dark?'rgba(255,255,255,.03)':'rgba(255,255,255,.6)'; }}
              onTouchStart={e=>{ e.currentTarget.style.transform='translateY(-4px) scale(1.04)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(255,77,0,.18)'; e.currentTarget.style.borderColor='rgba(255,77,0,.4)'; e.currentTarget.style.background=dark?'rgba(255,77,0,.08)':'rgba(255,77,0,.05)'; }}
              onTouchEnd={e=>{ setTimeout(()=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor=border; e.currentTarget.style.background=dark?'rgba(255,255,255,.03)':'rgba(255,255,255,.6)'; },300); }}>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.5rem',fontWeight:900,color:'#ff4d00',lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.55rem',fontWeight:500,color:muted,textTransform:'uppercase',letterSpacing:'.1em',marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ height:1,background:border,marginBottom:20 }}/>

        {/* ── BOTTOM ROW ── */}
        <div className="footer-bottom" style={{ display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:20,alignItems:'center' }}>

          {/* Logo + nav */}
          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            <a href="#hero" style={{ display:'inline-flex',alignItems:'center',gap:8,textDecoration:'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="LaunchifyX" style={{ width:48,height:48,objectFit:'contain' }}/>
              <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.95rem',fontWeight:800,color:text }}>
                Launchify<span style={{ background:'linear-gradient(135deg,#ff4d00,#ffb800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>X</span>
              </span>
            </a>
            <div style={{ display:'flex',gap:2,flexWrap:'wrap' }}>
              {NAV.map(label => (
                <a key={label} href={LINKS[label]}
                  style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.65rem',color:muted,textDecoration:'none',padding:'3px 7px',borderRadius:6,transition:'color .2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color=text; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color=muted; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter" style={{ display:'flex',flexDirection:'column',gap:7,minWidth:260,maxWidth:320 }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.65rem',fontWeight:600,color:muted,textAlign:'center' }}>Stay in the loop — no spam</div>
            <div style={{ display:'flex',gap:6 }}>
              <div style={{ flex:1,display:'flex',alignItems:'center',gap:6,background:dark?'rgba(255,255,255,.04)':'rgba(255,255,255,.9)',border:`1px solid ${border}`,borderRadius:8,padding:'0 10px',height:36 }}>
                <MailIcon size={12} color={muted}/>
                <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSub()}
                  style={{ flex:1,background:'transparent',border:'none',outline:'none',fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',color:text,minWidth:0 }}/>
              </div>
              <button onClick={handleSub}
                style={{ height:36,padding:'0 12px',background:subscribed?'#22c55e':'#4f8cff',border:'none',borderRadius:8,color:'#fff',fontFamily:"'Montserrat',sans-serif",fontSize:'.66rem',fontWeight:700,cursor:'pointer',transition:'background .3s',flexShrink:0 }}>
                {subscribed ? '✓' : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* Socials + copyright */}
          <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-end',gap:10 }}>
            <div style={{ display:'flex',gap:8 }}>
              {socials.map(({ label, href, Icon, color, bg:sbg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  style={{ width:36,height:36,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',color,background:sbg,border:`1px solid ${color}33`,textDecoration:'none',transition:'all .25s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px) scale(1.12)'; e.currentTarget.style.boxShadow=`0 8px 20px ${color}44`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
                  onTouchStart={e=>{ e.currentTarget.style.transform='scale(1.12)'; e.currentTarget.style.boxShadow=`0 8px 20px ${color}44`; }}
                  onTouchEnd={e=>{ setTimeout(()=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; },300); }}>
                  <Icon/>
                </a>
              ))}
            </div>
            <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',color:muted,display:'flex',alignItems:'center',gap:4,textAlign:'right' }}>
              © 2025 <span style={{ color:'#ff4d00',fontWeight:600 }}>LaunchifyX</span> · Built with <HeartIcon size={10} color="#ef4444"/> for Founders
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-bottom { grid-template-columns: 1fr !important; gap: 24px !important; }
          .footer-bottom > div:first-child { align-items: center !important; }
          .footer-bottom > div:last-child  { align-items: center !important; }
          .footer-newsletter { min-width: unset !important; max-width: 100% !important; width: 100% !important; }
        }
        @media (max-width: 600px) {
          .footer-stats   { grid-template-columns: repeat(2,1fr) !important; }
          .footer-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .footer-cta-row a { justify-content: center !important; }
        }
      `}</style>
    </footer>
  );
}
