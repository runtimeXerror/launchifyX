'use client';

import { useState, useEffect, useRef } from 'react';
import useReveal from './useReveal';
import { useTheme } from '@/context/ThemeContext';

const DATA = [
  { init:'AR', name:'Aryan Rathore',  role:'Founder, UrbanMart',       color:'#4f8cff', text:'LaunchifyX turned our rough idea into a full-stack product in under 3 weeks. The quality blew us away. We launched on time and got our first 100 customers within days.' },
  { init:'PS', name:'Priya Sharma',   role:'CEO, NestPro Homes',        color:'#ff4d00', text:'The branding was so sharp that investors commented on it at our pitch. Conversion rate doubled after launch. These guys are absolute pros.' },
  { init:'KM', name:'Kunal Mehta',    role:'Co-Founder, FitRoute App',  color:'#ffb800', text:"Affordable, fast, and genuinely talented. LaunchifyX is the only partner I'd trust with our mobile app. They delivered way beyond expectations." },
  { init:'SR', name:'Sneha Reddy',    role:'Founder, StyleNest',        color:'#22c55e', text:'From logo to launch in 2 weeks flat. The attention to detail was incredible — every pixel was intentional. Bounce rate dropped by 40% after redesign.' },
  { init:'VK', name:'Vikram Khanna',  role:'CTO, FinEdge',              color:'#a855f7', text:"Best investment we made for our startup. The team understood our vision immediately and delivered a product that exceeded every expectation." },
];

const Stars = () => (
  <div style={{ display:'flex', gap:3, marginBottom:14 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#ffb800">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const { dark } = useTheme();
  const { ref: headRef } = useReveal();
  const [active, setActive] = useState(0);
  const [prev, setPrev]     = useState<number|null>(null);
  const [dir, setDir]       = useState<'next'|'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const go = (idx: number, direction: 'next'|'prev') => {
    if (animating) return;
    setDir(direction);
    setPrev(active);
    setActive(idx);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 550);
  };

  const next = () => go((active + 1) % DATA.length, 'next');
  const goTo = (i: number) => go(i, i > active ? 'next' : 'prev');

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, paused]);

  const bg     = dark ? '#12103d' : '#faf8f3';
  const text   = dark ? '#ffffff' : '#0d0f20';
  const muted  = dark ? '#6c7591' : '#5a6080';
  const cardBg = dark ? 'rgba(22,20,72,.92)' : 'rgba(255,255,255,.95)';
  const border = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,80,.08)';

  return (
    <section id="testimonials" style={{ padding:'40px 20px 48px', background:bg, transition:'background .35s', overflow:'hidden', position:'relative' }}>

      {/* bg glow */}
      <div style={{ position:'absolute',top:'10%',left:'0%',width:'40%',height:'60%',background:`radial-gradient(ellipse,${DATA[active].color}09,transparent 70%)`,transition:'background .8s',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'10%',right:'0%',width:'40%',height:'60%',background:`radial-gradient(ellipse,${DATA[active].color}06,transparent 70%)`,transition:'background .8s',pointerEvents:'none' }}/>

      <div className="section-inner">

        {/* ── HEADER ── */}
        <div ref={headRef} className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
          <div className="sec-label" style={{ justifyContent:'center' }}>Client Stories</div>
          <h2 className="sec-title testi-title">Real Results. Real Founders.</h2>
          <p className="sec-sub" style={{ margin:'12px auto 0' }}>Don&apos;t just take our word for it.</p>
        </div>

        {/* ══ MARQUEE ══ */}
        <div className="testi-marquee" style={{ overflow:'hidden', marginBottom:48, maskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)', WebkitMaskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }}>
          <div style={{ display:'flex', gap:16, width:'max-content', animation:'marquee-left 28s linear infinite' }}>
            {[...DATA,...DATA].map((d, i) => (
              <div key={i} style={{ width:290, flexShrink:0, padding:'20px 22px', background:cardBg, border:`1px solid ${border}`, borderRadius:18, backdropFilter:'blur(16px)', borderLeft:`3px solid ${d.color}` }}>
                <Stars/>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'.76rem', lineHeight:1.72, color:muted, fontStyle:'italic', marginBottom:14 }}>&ldquo;{d.text.slice(0,90)}…&rdquo;</p>
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${d.color},${d.color}66)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontSize:'.72rem', fontWeight:800, color:'#fff', flexShrink:0 }}>{d.init}</div>
                  <div>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.78rem', fontWeight:700, color:text }}>{d.name}</div>
                    <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'.6rem', color:muted }}>{d.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 3D CAROUSEL ══ */}
        <div className="testi-carousel-wrap" style={{ position:'relative', maxWidth:860, margin:'0 auto' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>

          {/* side cards */}
          {[-1, 1].map(offset => {
            const idx = (active + offset + DATA.length) % DATA.length;
            const d   = DATA[idx];
            return (
              <div key={offset} className="testi-side" onClick={() => offset === -1 ? go((active-1+DATA.length)%DATA.length,'prev') : next()}
                style={{ position:'absolute', top:'50%', [offset === -1 ? 'left' : 'right']: -10, width:220, transform:`translateY(-50%) perspective(800px) rotateY(${offset * -18}deg) scale(.82)`, transformOrigin: offset === -1 ? 'right center' : 'left center', opacity:.45, filter:'blur(1px)', cursor:'pointer', transition:'all .5s cubic-bezier(.23,1,.32,1)', zIndex:1, padding:'24px 22px', background:cardBg, border:`1px solid ${border}`, borderRadius:22, backdropFilter:'blur(10px)' }}>
                <Stars/>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'.7rem', lineHeight:1.6, color:muted, fontStyle:'italic', marginBottom:14 }}>&ldquo;{d.text.slice(0,60)}…&rdquo;</p>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${d.color},${d.color}66)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontSize:'.65rem', fontWeight:800, color:'#fff', flexShrink:0 }}>{d.init}</div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.72rem', fontWeight:700, color:text }}>{d.name}</div>
                </div>
              </div>
            );
          })}

          {/* active card */}
          <div className="testi-active" style={{ position:'relative', zIndex:2, padding:'44px 48px', background:cardBg, border:`1.5px solid ${DATA[active].color}55`, borderRadius:28, backdropFilter:'blur(24px)', boxShadow:`0 32px 80px ${DATA[active].color}20, 0 0 0 1px ${DATA[active].color}11`, transition:'border-color .5s, box-shadow .5s', animation:`card-${dir}-in .5s cubic-bezier(.23,1,.32,1) both`, overflow:'hidden' }}>

            {/* top accent */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${DATA[active].color},${DATA[active].color}44,transparent)` }}/>

            {/* quote watermark */}
            <div style={{ position:'absolute', top:-10, right:28, fontFamily:'Georgia,serif', fontSize:'9rem', lineHeight:1, color:DATA[active].color, opacity:.07, pointerEvents:'none', userSelect:'none' }}>&rdquo;</div>

            <Stars/>

            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'1.05rem', lineHeight:1.85, color:dark?'rgba(240,242,255,.85)':'rgba(0,0,40,.75)', fontStyle:'italic', marginBottom:30 }}>
              &ldquo;{DATA[active].text}&rdquo;
            </p>

            {/* author + dots */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:50, height:50, borderRadius:'50%', background:`linear-gradient(135deg,${DATA[active].color},${DATA[active].color}77)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontSize:'1.05rem', fontWeight:800, color:'#fff', flexShrink:0, boxShadow:`0 6px 20px ${DATA[active].color}44` }}>{DATA[active].init}</div>
                <div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.92rem', fontWeight:700, color:text }}>{DATA[active].name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'.7rem', color:muted, marginTop:3 }}>{DATA[active].role}</div>
                </div>
              </div>
              {/* progress dots */}
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                {DATA.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    style={{ width: i===active ? 32 : 8, height:8, borderRadius:4, background: i===active ? DATA[active].color : (dark?'rgba(255,255,255,.15)':'rgba(0,0,80,.12)'), border:'none', cursor:'pointer', padding:0, transition:'all .4s cubic-bezier(.23,1,.32,1)' }}/>
                ))}
              </div>
            </div>

            {/* Mobile-only arrow row — inside card */}
            <div className="testi-mobile-arrows" style={{ display:'none', justifyContent:'center', gap:12, marginTop:20, paddingTop:16, borderTop:`1px solid ${border}` }}>
              <button onClick={() => go((active-1+DATA.length)%DATA.length,'prev')}
                style={{ width:44, height:44, borderRadius:'50%', background:'transparent', border:`1px solid ${border}`, color:text, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .25s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={next}
                style={{ width:44, height:44, borderRadius:'50%', background:DATA[active].color, border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .25s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Desktop-only nav arrows — absolute sides */}
          <button className="testi-arrow-prev" onClick={() => go((active-1+DATA.length)%DATA.length,'prev')}
            style={{ position:'absolute', top:'50%', left:-56, transform:'translateY(-50%)', width:44, height:44, borderRadius:'50%', background:cardBg, border:`1px solid ${border}`, color:text, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .25s', zIndex:3 }}
            onMouseEnter={e=>{ e.currentTarget.style.background=DATA[active].color; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-50%) scale(1.1)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background=cardBg; e.currentTarget.style.color=text; e.currentTarget.style.transform='translateY(-50%)'; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="testi-arrow-next" onClick={next}
            style={{ position:'absolute', top:'50%', right:-56, transform:'translateY(-50%)', width:44, height:44, borderRadius:'50%', background:cardBg, border:`1px solid ${border}`, color:text, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .25s', zIndex:3 }}
            onMouseEnter={e=>{ e.currentTarget.style.background=DATA[active].color; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-50%) scale(1.1)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background=cardBg; e.currentTarget.style.color=text; e.currentTarget.style.transform='translateY(-50%)'; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes card-next-in { from{opacity:0;transform:translateX(60px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes card-prev-in { from{opacity:0;transform:translateX(-60px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
        @media (max-width: 960px) {
          .testi-arrow-prev, .testi-arrow-next { display: none !important; }
          .testi-mobile-arrows { display: flex !important; }
          .testi-active { padding: 28px 24px !important; }
        }
      `}</style>
    </section>
  );
}
