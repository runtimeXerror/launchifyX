import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '../ThemeContext';

const SVCS = [
  { icon:'🌐', n:'01', title:'Custom Website Development', desc:'Blazing-fast, pixel-perfect websites built to convert visitors into paying customers — tailored to your brand and goals.' },
  { icon:'📱', n:'02', title:'Mobile App Development',      desc:'Native and cross-platform iOS & Android apps that delight users and drive engagement from Day 1.' },
  { icon:'🛒', n:'03', title:'E-Commerce Store Creation',   desc:'High-converting online stores with smooth checkout, smart inventory, and seamless payment integration built in.' },
  { icon:'✨', n:'04', title:'Branding & Digital Identity',  desc:'Logos, color systems, and brand guidelines that make you instantly recognizable and impossible to forget.' },
  { icon:'🚀', n:'05', title:'Startup Launch Solutions',    desc:'End-to-end launch packages — strategy, design, tech — so you hit the market fast, loud, and ready to win.' },
];

function Card({ icon, n, title, desc }) {
  const { dark } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?'linear-gradient(135deg,#ff4d00,#ff8c00)':(dark?'#05070f':'#fff'),padding:'48px 34px',position:'relative',overflow:'hidden',transition:'transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,background .3s',transform:hov?'translateY(-6px)':'none',boxShadow:hov?'0 20px 60px rgba(255,77,0,.25)':(dark?'none':'0 2px 20px rgba(0,0,80,.06)'),cursor:'default',border:dark?'none':`1px solid rgba(0,0,80,.07)` }}>
      <div style={{ position:'relative',zIndex:1 }}>
        <span style={{ fontSize:'1.9rem',marginBottom:18,display:'block' }}>{icon}</span>
        <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'4rem',color:hov?'rgba(255,255,255,.15)':(dark?'rgba(255,255,255,.04)':'rgba(0,0,80,.05)'),lineHeight:1,position:'absolute',top:-8,right:26,fontWeight:900,transition:'color .3s' }}>{n}</div>
        <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.1rem',fontWeight:700,marginBottom:11,color:hov?'#fff':(dark?'#f0f2ff':'#0d0f20'),transition:'color .2s' }}>{title}</div>
        <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.83rem',fontWeight:400,lineHeight:1.75,color:hov?'rgba(255,255,255,.85)':(dark?'#6c7591':'#5a6080'),marginBottom:26,transition:'color .3s' }}>{desc}</p>
        <span style={{ fontSize:'1.2rem',color:hov?'#fff':'#ff4d00',transition:'color .3s,transform .3s',display:'inline-block',transform:hov?'translateX(7px)':'none' }}>→</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { dark } = useTheme();
  const headRef = useReveal(); const gridRef = useReveal();
  return (
    <section id="services" style={{ padding:'108px 60px',background:dark?'#0b0d18':'#eaecf8',transition:'background .35s' }}>
      <div ref={headRef} className="reveal" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64,flexWrap:'wrap',gap:24 }}>
        <div><div className="sec-label">What We Do</div><h2 className="sec-title">Services Crafted<br/>for Go-Getters</h2></div>
        <p className="sec-sub">From idea to launch, every digital layer your business needs — built beautifully, delivered fast.</p>
      </div>
      <div ref={gridRef} className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:dark?2:16 }}>
        {SVCS.map(s => <Card key={s.n} {...s}/>)}
      </div>
    </section>
  );
}
