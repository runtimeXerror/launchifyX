'use client';

import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '@/context/ThemeContext';
import { SeedlingIcon, ZapIcon, RocketIcon, BriefcaseIcon, TrophyIcon, ToolsIcon } from './Icons';

interface Plan {
  name: string;
  Icon: React.FC<{size?:number;color?:string}>;
  price: string;
  note: string;
  tag: string;
  feat: boolean;
  yes: string[];
  no: string[];
}

const PLANS: Plan[] = [
  {
    name:'Micro', Icon:SeedlingIcon, price:'1,999', note:'One-time · Any platform ad design',
    tag:'', feat:false,
    yes:['Google Ad Page Design','Facebook Ad Design','Instagram Ad Design','Any Platform Ad Page','Mobile Optimised','1 Revision Round'],
    no:['E-Commerce','Branding Kit','Mobile App','Support'],
  },
  {
    name:'Starter', Icon:ZapIcon, price:'4,999', note:'One-time · For freelancers & small biz',
    tag:'', feat:false,
    yes:['3-Page Custom Website','Mobile Responsive','Basic Branding Kit','SEO Foundation','WhatsApp Integration','2 Revision Rounds'],
    no:['E-Commerce','Mobile App','Priority Support'],
  },
  {
    name:'Growth', Icon:RocketIcon, price:'9,999', note:'One-time · For serious startups',
    tag:'Most Popular', feat:true,
    yes:['8-Page Custom Website','E-Commerce Ready','Full Branding Identity','Advanced SEO','Social Media Integration','3-Month Support','5 Revision Rounds'],
    no:['Mobile App','Dedicated Manager'],
  },
  {
    name:'Pro', Icon:BriefcaseIcon, price:'14,999', note:'One-time · For scaling businesses',
    tag:'Best Value', feat:false,
    yes:['15-Page Custom Website','Full E-Commerce Store','Complete Brand System','Advanced SEO + Blog','Performance Dashboard','6-Month Support','Unlimited Revisions'],
    no:['Mobile App'],
  },
  {
    name:'Enterprise', Icon:TrophyIcon, price:'24,999', note:'One-time · Full digital empire',
    tag:'', feat:false,
    yes:['Website + Mobile App','E-Commerce + CMS','Complete Brand System','Performance Marketing','Analytics Setup','12-Month Support','Dedicated Manager','Priority SLA','Unlimited Revisions'],
    no:[],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const { dark } = useTheme();
  const [hov, setHov] = useState(false);

  const borderColor = plan.feat
    ? 'rgba(255,77,0,.5)'
    : hov
      ? '#4f8cff'
      : dark ? '#232545' : '#c8ccec';

  return (
    <div className="scroll-card" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border:`1.5px solid ${borderColor}`,padding:'36px 24px',position:'relative',borderRadius:12,background:plan.feat?(dark?'linear-gradient(135deg,rgba(255,77,0,.08),rgba(79,140,255,.04) 60%)':'linear-gradient(135deg,rgba(255,77,0,.05),rgba(79,140,255,.03) 60%)'):(dark?'rgba(26,24,80,.9)':'rgba(255,255,255,.8)'),backdropFilter:'blur(10px)',transition:'border-color .3s,transform .3s,box-shadow .3s,opacity .6s',transform:hov?'translateY(-8px)':'none',boxShadow:hov?`0 24px 60px ${dark?'rgba(79,140,255,.15)':'rgba(0,0,80,.12)'}`:plan.feat?`0 8px 40px ${dark?'rgba(255,77,0,.12)':'rgba(255,77,0,.1)'}`:'' ,display:'flex',flexDirection:'column' }}>

      {plan.tag && (
        <div style={{ position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:plan.feat?'linear-gradient(135deg,#ff4d00,#ff8c00)':'linear-gradient(135deg,#4f8cff,#a0c4ff)',color:'#fff',fontFamily:"'Montserrat',sans-serif",fontSize:'.56rem',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',padding:'5px 16px',whiteSpace:'nowrap',borderRadius:20,boxShadow:'0 4px 14px rgba(0,0,0,.25)' }}>
          {plan.tag}
        </div>
      )}

      <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:16 }}>
        <plan.Icon size={22} color="#ff4d00"/>
        <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.66rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#ff4d00' }}>{plan.name}</span>
      </div>

      <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:800,lineHeight:1,marginBottom:4,letterSpacing:'-.02em',color:plan.feat?'#ff4d00':(dark?'#ffffff':'#0d0f20'),whiteSpace:'nowrap' }}>
        <sup style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'1.2rem',verticalAlign:'super',fontWeight:600 }}>₹</sup>
        {plan.price}
      </div>
      <div style={{ fontFamily:"'Montserrat',sans-serif",color:'#6c7591',fontSize:'.73rem',marginBottom:22 }}>{plan.note}</div>
      <hr style={{ border:'none',borderTop:`1px solid ${dark?'#232545':'#dde0f5'}`,marginBottom:20 }}/>

      <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:10,marginBottom:32,flex:1 }}>
        {plan.yes.map(f => (
          <li key={f} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.8rem',color:dark?'rgba(240,242,255,.72)':'rgba(0,0,40,.72)',display:'flex',alignItems:'flex-start',gap:9 }}>
            <span style={{ color:'#ff4d00',fontWeight:800,flexShrink:0,marginTop:1 }}>✓</span>{f}
          </li>
        ))}
        {plan.no.map(f => (
          <li key={f} style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.8rem',color:dark?'rgba(255,255,255,.2)':'rgba(0,0,40,.25)',display:'flex',alignItems:'flex-start',gap:9 }}>
            <span style={{ color:dark?'#252535':'#ccc',fontWeight:800,flexShrink:0,marginTop:1 }}>✕</span>{f}
          </li>
        ))}
      </ul>

      {plan.feat
        ? <a href="#contact" className="btn-primary" style={{ fontSize:'.7rem',letterSpacing:'.09em',padding:'12px 24px',width:'100%',justifyContent:'center' }}>Get Started →</a>
        : <a href="#contact" className="btn-outline"  style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',padding:'12px 24px',width:'100%',justifyContent:'center',color:dark?'#ffffff':'#0d0f20' }}>Get Started →</a>}
    </div>
  );
}

export default function Pricing() {
  const { dark } = useTheme();
  const { ref: headRef } = useReveal();
  const { ref: gridRef } = useReveal();

  return (
    <section id="pricing" style={{ padding:'40px 20px 48px',background:dark?'#12103d':'#faf8f3',transition:'background .35s' }}>
      <div className="section-inner">
      <div ref={headRef} className="reveal" style={{ textAlign:'center',marginBottom:48 }}>
        <div className="sec-label" style={{ justifyContent:'center' }}>Pricing Plans</div>
        <h2 className="sec-title">Plans for Every Stage. Zero Surprises.</h2>
        <p className="sec-sub" style={{ margin:'14px auto 0' }}>From solo founders to full enterprises — pick a plan that fits today and scales tomorrow.</p>
      </div>

      {/* 5-plan responsive grid */}
      <div ref={gridRef} className="reveal pricing-grid" style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:16,maxWidth:1200,margin:'0 auto',alignItems:'stretch' }}>
        {PLANS.map(p => <PlanCard key={p.name} plan={p}/>)}
      </div>

      {/* Custom plan CTA */}
      <div className="pricing-custom" style={{ textAlign:'center',padding:'32px clamp(18px,5vw,40px)',background:dark?'rgba(79,140,255,.06)':'rgba(79,140,255,.05)',border:`1px solid ${dark?'rgba(79,140,255,.15)':'rgba(79,140,255,.2)'}`,borderRadius:16,maxWidth:700,margin:'56px auto 0' }}>
        <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.2rem',fontWeight:800,marginBottom:8,color:dark?'#ffffff':'#0d0f20',display:'flex',alignItems:'center',justifyContent:'center',gap:8 }}><ToolsIcon size={20} color="#ff4d00"/> Need a Custom Package?</div>
        <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.88rem',color:'#6c7591',marginBottom:22,lineHeight:1.7 }}>Have specific requirements or a tight budget? We&apos;ll build a package exactly for you — no bloat, no overpaying.</p>
        <a href="#contact" className="btn-primary" style={{ fontSize:'.76rem' }}>Talk to Us → Get Custom Quote</a>
      </div>
      </div>
    </section>
  );
}
