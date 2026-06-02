'use client';

import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '@/context/ThemeContext';

interface Testimonial { init: string; name: string; role: string; text: string; }

const DATA: Testimonial[] = [
  { init:'AR', name:'Aryan Rathore', role:'Founder, UrbanMart',     text:'"LaunchifyX turned our rough idea into a full-stack product in under 3 weeks. The quality blew us away. We launched on time and got our first 100 customers within days."' },
  { init:'PS', name:'Priya Sharma',  role:'CEO, NestPro Homes',     text:'"The branding was so sharp that investors commented on it at our pitch. Conversion rate doubled after launch. These guys are absolute pros and deliver what they promise."' },
  { init:'KM', name:'Kunal Mehta',   role:'Co-Founder, FitRoute App', text:'"Affordable, fast, and genuinely talented. LaunchifyX is the only partner I\'d trust with our mobile app. They listened, iterated fast, and delivered way beyond expectations."' },
];

function Card({ t }: { t: Testimonial }) {
  const { dark } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:dark?'#05070f':'#fff',padding:'40px 34px',borderLeft:'3px solid #ff4d00',borderRadius:'0 10px 10px 0',transition:'transform .3s,box-shadow .3s',transform:hov?'translateY(-6px)':'none',boxShadow:hov?`0 20px 50px ${dark?'rgba(0,0,0,.35)':'rgba(0,0,80,.12)'}`:dark?'none':'0 2px 16px rgba(0,0,80,.06)' }}>
      <div style={{ color:'#ffb800',fontSize:'.82rem',marginBottom:13,letterSpacing:2 }}>★★★★★</div>
      <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.89rem',fontWeight:400,lineHeight:1.82,color:dark?'rgba(240,242,255,.7)':'rgba(0,0,40,.7)',fontStyle:'italic',marginBottom:24 }}>{t.text}</p>
      <div style={{ display:'flex',alignItems:'center',gap:12 }}>
        <div style={{ width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#1c2f6e,#0c1640)',border:'1.5px solid rgba(255,184,0,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.95rem',fontWeight:800,color:'#ffb800',flexShrink:0 }}>{t.init}</div>
        <div>
          <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.86rem',fontWeight:700,color:dark?'#f0f2ff':'#0d0f20' }}>{t.name}</div>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.68rem',color:'#6c7591',marginTop:2 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { dark } = useTheme();
  const { ref: headRef } = useReveal();
  const { ref: gridRef } = useReveal();
  return (
    <section id="testimonials" style={{ padding:'108px 60px',background:dark?'#0b0d18':'#eaecf8',transition:'background .35s' }}>
      <div ref={headRef} className="reveal" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:24 }}>
        <div><div className="sec-label">Client Stories</div><h2 className="sec-title">Real Results.<br/>Real Founders.</h2></div>
        <p className="sec-sub">Don&apos;t just take our word for it — hear from the founders we&apos;ve helped take off.</p>
      </div>
      <div ref={gridRef} className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:22 }}>
        {DATA.map(t => <Card key={t.name} t={t}/>)}
      </div>
    </section>
  );
}
