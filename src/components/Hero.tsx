'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { RocketIcon, ChatIcon, WrenchIcon, ZapIcon, ClockIcon, GlobeIcon, TrendingUpIcon, SmileIcon } from './Icons';

const TECH = {
  frontend: [
    { label:'React',        color:'#61dafb' },
    { label:'Next.js',      color:'#a8b8ff' },
    { label:'Flutter',      color:'#a855f7' },
    { label:'Tailwind CSS', color:'#38bdf8' },
    { label:'React Native', color:'#ff4d00' },
  ],
  backend: [
    { label:'Node.js',      color:'#3ecf8e' },
    { label:'Express',      color:'#22c55e' },
    { label:'Firebase',     color:'#4285f4' },
    { label:'REST API',     color:'#ff7a00' },
  ],
  database: [
    { label:'PostgreSQL',   color:'#336791' },
    { label:'MongoDB',      color:'#47a248' },
    { label:'Prisma',       color:'#5a67d8' },
    { label:'Redis',        color:'#dc382d' },
  ],
};

const STEPS = [
  { n:'01', c:'#ff4d00', bg:'rgba(255,77,0,.12)',    title:'Requirement Analysis', sub:'Goals → Scope' },
  { n:'02', c:'#a855f7', bg:'rgba(168,85,247,.12)',  title:'UI/UX Design',         sub:'Wireframe → Prototype' },
  { n:'03', c:'#4f8cff', bg:'rgba(79,140,255,.12)',  title:'Development',          sub:'Frontend + Backend' },
  { n:'04', c:'#ffb800', bg:'rgba(255,184,0,.12)',   title:'Testing & QA',         sub:'All Devices' },
  { n:'05', c:'#22c55e', bg:'rgba(34,197,94,.12)',   title:'Deployment',           sub:'Live & Fast' },
  { n:'06', c:'#3ecf8e', bg:'rgba(62,207,142,.12)',  title:'Maintenance',          sub:'Support & Updates' },
];

const CARDS = [
  { Icon:GlobeIcon,      title:'Projects Delivered', num:'10+',     bar:'linear-gradient(90deg,#4f8cff,#a0c4ff)', w:'85%', bg:'rgba(79,140,255,.12)',  anim:'hov1 5s ease-in-out infinite',         pos:{ top:0,    right:0  } },
  { Icon:TrendingUpIcon, title:'Client ROI',          num:'5x',      bar:'linear-gradient(90deg,#ff4d00,#ff8c00)', w:'78%', bg:'rgba(255,77,0,.1)',     anim:'hov2 6s ease-in-out infinite',         pos:{ top:130,  right:40 } },
  { Icon:SmileIcon,      title:'Satisfaction',         num:'98%',     bar:'linear-gradient(90deg,#22c55e,#86efac)', w:'98%', bg:'rgba(34,197,94,.1)',    anim:'hov1 7s ease-in-out infinite reverse', pos:{ bottom:0, right:10 } },
] as const;

const widths = [210, 220, 205];

export default function Hero() {
  const { dark } = useTheme();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pc = particlesRef.current;
    if (!pc) return;
    pc.innerHTML = '';
    const colors = ['rgba(79,140,255,.25)','rgba(255,77,0,.25)','rgba(34,197,94,.2)','rgba(255,255,255,.08)'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const sz = Math.random() * 3 + 1.5;
      p.style.cssText = `position:absolute;border-radius:50%;width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:-5%;background:${colors[Math.floor(Math.random()*colors.length)]};animation:float-p ${10+Math.random()*12}s ${Math.random()*10}s linear infinite;`;
      pc.appendChild(p);
    }
  }, []);

  const textColor  = dark ? '#faf5e8' : '#1a1510';
  const subColor   = dark ? 'rgba(250,245,232,.5)' : 'rgba(26,21,16,.5)';
  const mutedColor = dark ? '#7a7060' : '#6a6050';
  const pillBg     = dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)';
  const pillBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.09)';
  const cardBorder = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.07)';

  return (
    <section id="hero" style={{ height:'100vh', padding:'72px 20px 20px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', background:dark?'#12103d':'#faf8f3', transition:'background .35s' }}>

      {/* BG */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 60% at 70% 35%,rgba(79,140,255,.07),transparent 65%),radial-gradient(ellipse 50% 50% at 15% 70%,rgba(255,77,0,.07),transparent 60%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(34,197,94,.04),transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',backgroundSize:'60px 60px',maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',pointerEvents:'none',opacity:dark?1:0.5 }}/>
      <div style={{ position:'absolute',top:'50%',left:'50%',width:800,height:800,borderRadius:'50%',border:`1px dashed ${dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.05)'}`,animation:'spin-slow 50s linear infinite',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',top:'50%',left:'50%',width:550,height:550,borderRadius:'50%',border:`1px dashed ${dark?'rgba(255,77,0,.06)':'rgba(255,77,0,.08)'}`,animation:'spin-rev 35s linear infinite',pointerEvents:'none' }}/>
      <div ref={particlesRef} style={{ position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none' }}/>

      {/* ── GREEN PILLS ROW ── */}
      <div className="hero-pills section-inner" style={{ position:'relative',zIndex:2,display:'flex',alignItems:'stretch',gap:8,marginBottom:12,flexWrap:'wrap' }}>
        {/* equal-height pill style */}
        {([
          { dot:'avail-ping', text:'Accepting Projects' },
          { dot:'blink',      text:'10+ Founders Trust Us' },
        ]).map(({ dot, text }) => (
          <div key={text} style={{ display:'flex',alignItems:'center',gap:7,padding:'8px 16px',background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.22)',borderRadius:8,height:34 }}>
            <span style={{ width:6,height:6,background:'#22c55e',borderRadius:'50%',flexShrink:0,animation:`${dot} 2s ease infinite`,display:'inline-block' }}/>
            <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',fontWeight:600,color:'#22c55e',whiteSpace:'nowrap' }}>{text}</span>
          </div>
        ))}
        <div className="hero-pills-stats" style={{ display:'flex',alignItems:'center',gap:10,padding:'8px 16px',background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.22)',borderRadius:8,height:34 }}>
          {([['10+','Projects'],['98%','Satisfaction'],['5x','Growth']] as const).map(([n,l],i) => (
            <span key={l} style={{ display:'inline-flex',alignItems:'baseline',gap:3,whiteSpace:'nowrap' }}>
              {i>0 && <span style={{ color:'rgba(34,197,94,.3)',margin:'0 4px' }}>·</span>}
              <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.82rem',fontWeight:800,color:'#22c55e' }}>{n}</span>
              <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.56rem',color:'rgba(34,197,94,.65)',textTransform:'uppercase',letterSpacing:'.07em' }}>{l}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="hero-layout section-inner" style={{ position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr 360px',gap:36,alignItems:'center',width:'100%' }}>

        {/* ── LEFT ── */}
        <div style={{ opacity:0, animation:'fadeUp .8s .1s forwards' }}>
          <h1 style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:900,fontSize:'clamp(2.6rem,5vw,4.8rem)',lineHeight:1.04,letterSpacing:'-.02em',marginBottom:10,color:textColor }}>
            We Build<br/>
            <span style={{ color:'transparent',WebkitTextStroke:`2px #ff4d00` }}>Digital</span><br/>
            <span style={{ background:'linear-gradient(90deg,#4f8cff,#a8d1ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Empires.</span>
          </h1>
          <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.86rem',fontWeight:400,lineHeight:1.7,color:subColor,maxWidth:420,marginBottom:22 }}>
            From a <strong style={{ color:textColor }}>simple idea</strong> to a <strong style={{ color:textColor }}>full digital product</strong> — websites, apps, stores & brands built to make you look <strong style={{ color:textColor }}>a million dollars.</strong>
          </p>
          <div className="hero-btns" style={{ display:'flex',gap:10,flexWrap:'wrap',marginBottom:22 }}>
            <a href="#services" className="btn-primary" style={{ background:'linear-gradient(135deg,#ff4d00,#c73b00)',padding:'11px 24px' }}>
              <RocketIcon size={14} color="#fff"/> Explore Services
            </a>
            <a href="#contact" className="btn-outline" style={{ color:textColor,padding:'11px 24px' }}>
              <ChatIcon size={14}/> Let&apos;s Talk
            </a>
          </div>

          {/* Social proof row */}
          <div style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderTop:`1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'}` }}>
            <div style={{ display:'flex' }}>
              {['AR','PS','KM','SR'].map((init,i)=>(
                <div key={init} style={{ width:30,height:30,borderRadius:'50%',background:`linear-gradient(135deg,${['#4f8cff','#ff4d00','#ffb800','#22c55e'][i]},${['#4f8cff88','#ff4d0088','#ffb80088','#22c55e88'][i]})`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.62rem',fontWeight:800,color:'#fff',marginLeft:i>0?-8:0,border:`2px solid ${dark?'#12103d':'#faf8f3'}` }}>{init}</div>
              ))}
            </div>
            <div>
              <div style={{ display:'flex',gap:1,marginBottom:2 }}>{[...Array(5)].map((_,i)=><svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#ffb800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
              <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.62rem',color:mutedColor }}>Trusted by 10+ founders</span>
            </div>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div className="hero-center" style={{ opacity:0, animation:'fadeUp .85s .25s forwards' }}>

          {/* Tech Stack — 3 columns */}
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.54rem',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',color:mutedColor,marginBottom:7,display:'flex',alignItems:'center',gap:6 }}>
            Tech Stack
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:7,marginBottom:14 }}>
            {([
              { key:'frontend', label:'Frontend', accent:'#61dafb' },
              { key:'backend',  label:'Backend',  accent:'#3ecf8e' },
              { key:'database', label:'Database', accent:'#a78bfa' },
            ] as const).map(({ key, label, accent }) => (
              <div key={key} style={{ background:pillBg,border:`1px solid ${pillBorder}`,borderRadius:10,padding:'10px 10px 12px' }}>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.52rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:accent,marginBottom:8,display:'flex',alignItems:'center',gap:4 }}>
                  <span style={{ width:10,height:2,background:accent,display:'inline-block',borderRadius:2 }}/>
                  {label}
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
                  {TECH[key].map(({ label: tl, color }) => (
                    <span key={tl} style={{ display:'inline-flex',alignItems:'center',gap:5,borderRadius:5,padding:'3px 7px',fontFamily:"'Montserrat',sans-serif",fontSize:'.64rem',fontWeight:500,color:dark?'rgba(255,255,255,.6)':'rgba(26,21,16,.6)',transition:'all .2s',cursor:'default',background:'transparent' }}
                      onMouseEnter={e=>{ e.currentTarget.style.color=color; e.currentTarget.style.background=`${color}14`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.color=dark?'rgba(255,255,255,.6)':'rgba(26,21,16,.6)'; e.currentTarget.style.background='transparent'; }}>
                      <span style={{ width:5,height:5,borderRadius:'50%',background:color,flexShrink:0 }}/>{tl}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.54rem',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',color:mutedColor,marginBottom:8,display:'flex',alignItems:'center',gap:6 }}>
            How We Work
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,gridAutoRows:'1fr' }}>
            {STEPS.map(step => (
              <div key={step.n} style={{ padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)',border:`1px solid ${step.c}18`,transition:'all .2s',cursor:'default',display:'flex',flexDirection:'column' }}
                onMouseEnter={e=>{ e.currentTarget.style.background=`${step.c}0a`; e.currentTarget.style.borderColor=`${step.c}44`; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)'; e.currentTarget.style.borderColor=`${step.c}18`; }}>
                <div style={{ width:22,height:22,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.55rem',fontWeight:800,background:step.bg,color:step.c,marginBottom:5,flexShrink:0 }}>{step.n}</div>
                <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.7rem',fontWeight:700,color:textColor,marginBottom:2,lineHeight:1.2 }}>{step.title}</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.55rem',color:mutedColor,marginTop:'auto' }}>{step.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CARDS ── */}
        <div className="hero-right" style={{ position:'relative',height:420,flexShrink:0,opacity:0,animation:'fadeRight .9s .4s forwards' }}>
          {CARDS.map((card, i) => (
            <div key={card.title} style={{ position:'absolute',width:widths[i],...card.pos,borderRadius:16,border:`1px solid ${cardBorder}`,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',padding:'20px',background:dark?card.bg:card.bg.replace(/\.1[0-9]?\)/,'.07)'),animation:card.anim,transition:'box-shadow .3s' }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 16px 48px ${card.bg.replace(/rgba?\([^)]+\)/,'rgba(79,140,255,.2)')}`; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow=''; }}>
              <div style={{ marginBottom:10 }}><card.Icon size={26} color={textColor}/></div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.8rem',fontWeight:700,marginBottom:3,color:textColor }}>{card.title}</div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.6rem',fontWeight:800,color:textColor,lineHeight:1 }}>{card.num}</div>
              <div style={{ height:3,background:dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.07)',borderRadius:4,marginTop:10,overflow:'hidden' }}>
                <div style={{ height:'100%',borderRadius:4,background:card.bar,'--bar-w':card.w,animation:'grow 2s ease forwards' } as React.CSSProperties}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE EXTRA ── */}
      <div className="hero-mobile-extra" style={{ position:'relative',zIndex:2,marginTop:20 }}>
        <div className="hero-mobile-extra-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
          {([{Icon:GlobeIcon,num:'10+',label:'Projects',color:'#4f8cff'},{Icon:TrendingUpIcon,num:'5x',label:'Growth',color:'#ff4d00'},{Icon:SmileIcon,num:'98%',label:'Happy Clients',color:'#22c55e'},{Icon:ClockIcon,num:'3 Wks',label:'Avg Launch',color:'#ffb800'}] as const).map((s,i)=>(
            <div key={s.label} style={{ borderRadius:14,border:`1px solid ${cardBorder}`,backdropFilter:'blur(12px)',padding:'14px 16px',background:dark?'rgba(255,255,255,.03)':'rgba(255,255,255,.8)',opacity:0,animation:`fadeUp .6s ${0.1+i*0.1}s forwards` }}>
              <div style={{ marginBottom:6 }}><s.Icon size={22} color={s.color}/></div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.3rem',fontWeight:800,color:s.color,lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.62rem',fontWeight:500,color:mutedColor,marginTop:4,textTransform:'uppercase',letterSpacing:'.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 961px) { .hero-mobile-extra { display: none !important; } }
        @media (max-width: 960px) {
          .hero-mobile-extra { display: block !important; }
          .hero-mobile-extra-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }
        @media (max-width: 600px) {
          .hero-pills-stats { display: none !important; }
        }
      `}</style>
    </section>
  );
}
