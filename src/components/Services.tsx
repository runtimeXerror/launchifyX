'use client';

import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '@/context/ThemeContext';
import { GlobeIcon, MobileIcon, CartIcon, ShieldCheckIcon, RocketIcon, BriefcaseIcon, ArrowRightIcon } from './Icons';

const SVCS = [
  { Icon:GlobeIcon,  n:'01', title:'Custom Website Development', desc:'Blazing-fast, pixel-perfect websites built to convert visitors into customers — fully responsive, SEO-ready, and tailored to your brand.', tag:'Most Popular', color:'#4f8cff',
    features:['Landing Pages & Business Sites','Portfolio & Blog Websites','SEO Optimized & Fast Loading','Mobile Responsive Design','CMS Integration (if needed)'] },
  { Icon:MobileIcon, n:'02', title:'Mobile App Development', desc:'Cross-platform iOS & Android apps with smooth UX, real-time features, and scalable backend — built to grow with your business.', tag:'', color:'#a855f7',
    features:['iOS & Android (React Native)','Real-time Features & Notifications','API & Backend Integration','App Store Deployment','Ongoing App Updates'] },
  { Icon:CartIcon,   n:'03', title:'E-Commerce Development', desc:'High-converting online stores with secure checkout, inventory management, and payment gateway integration — ready to sell from Day 1.', tag:'', color:'#ff4d00',
    features:['Product & Inventory Management','Razorpay / Stripe Integration','Cart, Wishlist & Orders','Admin Dashboard','Mobile-First Shopping Experience'] },
  { Icon:ShieldCheckIcon, n:'04', title:'Website & App Maintenance', desc:'Ongoing support, performance monitoring, bug fixes, security updates, and feature upgrades — so your product always runs at 100%.', tag:'Ongoing', color:'#ffb800',
    features:['Bug Fixes & Issue Resolution','Performance Monitoring','Security & SSL Updates','Feature Enhancements','Monthly Health Reports'] },
  { Icon:RocketIcon, n:'05', title:'Startup Launch Package', desc:'End-to-end solution for new ventures — strategy, design, development, and launch support all in one package, fast and affordable.', tag:'New', color:'#22c55e',
    features:['Strategy & Planning Session','Website or App Development','Brand Identity Basics','Launch Support & Go-Live','1 Month Free Maintenance'] },
  { Icon:BriefcaseIcon, n:'06', title:'Business Consulting & Strategy', desc:'Starting from zero? We guide you step-by-step — from idea validation and business planning to digital identity, online presence, and long-term growth strategy.', tag:'', color:'#ec4899',
    features:['Business Idea Validation','Brand Identity & Naming Guidance','Digital Presence Roadmap','Tech Stack & Product Strategy','1-on-1 Consulting Sessions'] },
];

interface CardProps {
  Icon: React.FC<{size?:number;color?:string}>;
  n: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
  features: string[];
  index: number;
}

function Card({ Icon, n, title, desc, tag, color, features, index }: CardProps) {
  const { dark } = useTheme();
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onTouchStart={() => setHov(true)}
      onTouchEnd={() => setTimeout(() => setHov(false), 300)}
      style={{
        position: 'relative',
        padding: '28px 24px',
        borderRadius: 16,
        border: `1px solid ${hov ? color+'55' : (dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)')}`,
        background: hov
          ? dark ? `${color}0e` : `${color}07`
          : dark ? 'rgba(26,24,80,.9)' : 'rgba(255,255,255,.9)',
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border .35s, background .35s, transform .35s, box-shadow .35s',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? `0 16px 48px ${color}20` : `0 2px 12px ${dark?'rgba(0,0,0,.2)':'rgba(0,0,0,.06)'}`,
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar — always visible with color */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},${color}44,transparent)`,borderRadius:'16px 16px 0 0' }}/>

      {/* Tag */}
      {tag && (
        <div style={{ position:'absolute',top:14,right:14,padding:'3px 10px',background:`${color}18`,border:`1px solid ${color}44`,borderRadius:20,fontFamily:"'Montserrat',sans-serif",fontSize:'.52rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color }}>
          {tag}
        </div>
      )}

      {/* Icon + number row */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
        <div style={{ width:46,height:46,borderRadius:12,background:`${color}14`,border:`1px solid ${color}28`,display:'flex',alignItems:'center',justifyContent:'center',transition:'transform .35s',transform:hov?'scale(1.1)':'none',flexShrink:0 }}>
          <Icon size={22} color={color}/>
        </div>
        <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'2.8rem',fontWeight:900,color:`${color}14`,lineHeight:1,userSelect:'none' }}>{n}</span>
      </div>

      <h3 style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.18rem',fontWeight:700,marginBottom:8,color:dark?'#ffffff':'#1a1510',lineHeight:1.3 }}>{title}</h3>
      <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.8rem',fontWeight:400,lineHeight:1.7,color:dark?'rgba(200,215,245,.6)':'#6a6050',marginBottom:14 }}>{desc}</p>

      {/* Features list */}
      <ul style={{ listStyle:'none',padding:0,margin:'0 0 18px',display:'flex',flexDirection:'column',gap:6 }}>
        {features.map(f => (
          <li key={f} style={{ display:'flex',alignItems:'center',gap:8,fontFamily:"'Montserrat',sans-serif",fontSize:'.74rem',color:dark?'rgba(200,215,245,.75)':'#5a5040' }}>
            <span style={{ width:16,height:16,borderRadius:'50%',background:`${color}18`,border:`1px solid ${color}44`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a href={`/services/${title.toLowerCase().replace(/[&]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')}`}
        style={{ display:'inline-flex',alignItems:'center',gap:5,fontFamily:"'Montserrat',sans-serif",fontSize:'.72rem',fontWeight:700,color:hov?color:`${color}88`,transition:'color .3s',marginTop:'auto',textDecoration:'none' }}>
        Learn More <ArrowRightIcon size={13} color={hov?color:`${color}88`}/>
      </a>
    </div>
  );
}

export default function Services() {
  const { dark } = useTheme();
  const { ref: headRef } = useReveal();

  return (
    <section id="services" style={{ padding:'40px 20px 48px', background:dark?'#12103d':'#faf8f3', transition:'background .35s' }}>
      <div className="section-inner">

        {/* ── HEADER ── */}
        <div ref={headRef} className="reveal" style={{ marginBottom:48 }}>
          <div style={{ textAlign:'center' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>What We Offer</div>
            <h2 className="sec-title">We Build What Your <span style={{ background:'linear-gradient(135deg,#ff4d00,#ffb800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Business Needs</span></h2>
          </div>
        </div>

        {/* ── GRID — all 5 cards, responsive ── */}
        <div className="svc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, alignItems:'stretch' }}>
          {SVCS.map((s,i) => <Card key={s.n} {...s} index={i}/>)}
        </div>
        <style>{`
          .svc-grid { grid-template-columns: repeat(3,1fr) !important; }
          @media (max-width: 960px) {
            .svc-grid { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
          }
          @media (max-width: 600px) {
            .svc-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          }
        `}</style>

      </div>
    </section>
  );
}
