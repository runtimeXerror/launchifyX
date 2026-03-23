import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const TECH = [
  { label:'React',        color:'#61dafb' },{ label:'Node.js',      color:'#3ecf8e' },
  { label:'Shopify',      color:'#ff6600' },{ label:'Flutter',      color:'#a855f7' },
  { label:'Firebase',     color:'#4285f4' },{ label:'Next.js',      color:'#f7df1e' },
  { label:'React Native', color:'#ff4d00' },{ label:'Tailwind CSS', color:'#38bdf8' },
  { label:'MongoDB',      color:'#47a248' },{ label:'PostgreSQL',   color:'#336791' },
];
const STEPS = [
  { n:'01', c:'#ff4d00', bg:'rgba(255,77,0,.12)',   title:'Discovery & Strategy',       sub:'We understand your vision, goals & budget — then craft a clear roadmap.' },
  { n:'02', c:'#4f8cff', bg:'rgba(79,140,255,.12)', title:'Design & Dev Sprint',         sub:'Pixel-perfect UI, clean code, weekly updates — full transparency.' },
  { n:'03', c:'#ffb800', bg:'rgba(255,184,0,.12)',  title:'Testing & Refinement',        sub:"Rigorous QA across all devices — we don't ship until it's perfect." },
  { n:'04', c:'#22c55e', bg:'rgba(34,197,94,.12)',  title:'Launch & Ongoing Support',   sub:'Go live fast. We stay on call so your product keeps growing.' },
];
const CARDS = [
  { icon:'🌐', title:'Projects Delivered', sub:'On time, every time',     num:'50+',     bar:'linear-gradient(90deg,#4f8cff,#a0c4ff)', w:'85%', bg:'rgba(79,140,255,.15)',  anim:'hov1 5s ease-in-out infinite',          pos:{ top:0,    right:0  } },
  { icon:'📈', title:'Client Growth Rate', sub:'Avg. across all clients',  num:'5x ROI',  bar:'linear-gradient(90deg,#ff4d00,#ff8c00)', w:'78%', bg:'rgba(255,77,0,.12)',    anim:'hov2 6s ease-in-out infinite',          pos:{ top:110,  right:50 } },
  { icon:'⚡', title:'Launch Speed',        sub:'Avg. time to go live',     num:'3 Weeks', bar:'linear-gradient(90deg,#ffb800,#ffe066)', w:'92%', bg:'rgba(255,184,0,.1)',    anim:'hov1 7s ease-in-out infinite reverse',  pos:{ bottom:10,right:5  } },
];
const widths = [210,230,195];

export default function Hero() {
  const { dark } = useTheme();
  const particlesRef = useRef(null);

  useEffect(() => {
    const pc = particlesRef.current; if (!pc) return; pc.innerHTML = '';
    const colors = ['rgba(79,140,255,.35)','rgba(255,77,0,.35)','rgba(255,184,0,.3)','rgba(255,255,255,.12)'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div'); const sz = Math.random()*4+2;
      p.style.cssText = `position:absolute;border-radius:50%;width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:-5%;background:${colors[Math.floor(Math.random()*colors.length)]};animation:float-p ${8+Math.random()*10}s ${Math.random()*8}s linear infinite;`;
      pc.appendChild(p);
    }
  }, []);

  const textColor  = dark ? '#f0f2ff' : '#0d0f20';
  const subColor   = dark ? 'rgba(240,242,255,.52)' : 'rgba(0,0,40,.55)';
  const mutedColor = dark ? '#6c7591' : '#5a6080';
  const pillBg     = dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,80,.04)';
  const pillBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,80,.1)';
  const statBorder = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,80,.08)';

  return (
    <section id="hero" style={{ minHeight:'100vh',padding:'130px 60px 60px',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',background:dark?'#05070f':'#f4f6ff',transition:'background .35s' }}>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 55% at 65% 40%,rgba(79,140,255,.09),transparent 60%),radial-gradient(ellipse 45% 45% at 10% 65%,rgba(255,77,0,.09),transparent 55%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(79,140,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(79,140,255,.035) 1px,transparent 1px)',backgroundSize:'56px 56px',maskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black,transparent)',WebkitMaskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black,transparent)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',width:560,height:560,top:'50%',left:'50%',borderRadius:'50%',background:'radial-gradient(circle,rgba(79,140,255,.07),rgba(255,77,0,.04) 40%,transparent 70%)',animation:'orb-pulse 6s ease-in-out infinite',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',top:'50%',left:'50%',width:700,height:700,borderRadius:'50%',border:`1px dashed ${dark?'rgba(79,140,255,.1)':'rgba(79,140,255,.15)'}`,animation:'spin-slow 40s linear infinite',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',top:'50%',left:'50%',width:500,height:500,borderRadius:'50%',border:`1px dashed ${dark?'rgba(255,77,0,.08)':'rgba(255,77,0,.12)'}`,animation:'spin-rev 28s linear infinite',pointerEvents:'none' }}/>
      <div ref={particlesRef} style={{ position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none' }}/>

      <div className="hero-layout" style={{ position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr 380px',gap:40,alignItems:'center',width:'100%' }}>

        {/* LEFT */}
        <div style={{ opacity:0,animation:'fadeUp .8s .15s forwards' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,184,0,.08)',border:'1px solid rgba(255,184,0,.2)',borderRadius:30,padding:'7px 16px',marginBottom:24 }}>
            <span style={{ width:7,height:7,background:'#ffb800',borderRadius:'50%',display:'inline-block',animation:'blink 1.5s ease infinite' }}/>
            <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.64rem',fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:'#ffb800' }}>✨ Trusted by 50+ Founders & Startups</span>
          </div>
          <h1 style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:900,fontSize:'clamp(3rem,5.5vw,5.2rem)',lineHeight:1.04,letterSpacing:'-.02em',marginBottom:8,color:textColor }}>
            We Build<br/>
            <span style={{ color:'transparent',WebkitTextStroke:`2px #ff4d00`,display:'block' }}>Digital</span>
            <span style={{ background:'linear-gradient(90deg,#4f8cff,#a8d1ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',display:'block' }}>Empires.</span>
          </h1>
          <p style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:300,fontSize:'1rem',color:subColor,marginBottom:26,fontStyle:'italic' }}>Fast, Modern & Budget-Friendly Web & App Solutions</p>
          <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.88rem',fontWeight:400,lineHeight:1.8,color:subColor,maxWidth:440,marginBottom:30 }}>
            From a <strong style={{ color:textColor,fontWeight:700 }}>simple idea</strong> to a <strong style={{ color:textColor,fontWeight:700 }}>full digital product</strong> — we craft websites, apps, e-commerce stores & brands that make you look <strong style={{ color:textColor,fontWeight:700 }}>a million dollars</strong> without spending it.
          </p>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:36 }}>
            <a href="#services" className="btn-primary">🚀 Explore Services</a>
            <a href="#contact"  className="btn-outline" style={{ color:textColor }}>💬 Let's Talk</a>
          </div>
          <div style={{ display:'flex',gap:0,borderTop:`1px solid ${statBorder}`,paddingTop:20 }}>
            {[['50','+','Projects Launched'],['98','%','Client Satisfaction'],['5','x','Average Growth']].map(([n,s,l],i) => (
              <div key={l} style={{ flex:1,paddingLeft:i>0?24:0,borderLeft:i>0?`1px solid ${statBorder}`:'' }}>
                <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.9rem',fontWeight:800,lineHeight:1,color:textColor }}>{n}<em style={{ fontStyle:'normal',color:'#ff4d00' }}>{s}</em></div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.58rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.13em',color:mutedColor,marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="hero-center" style={{ opacity:0,animation:'fadeUp .85s .3s forwards' }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',color:mutedColor,marginBottom:12 }}>🔧 Technologies We Master</div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:8,marginBottom:28 }}>
            {TECH.map(({ label, color }) => (
              <span key={label} style={{ display:'inline-flex',alignItems:'center',gap:6,background:pillBg,border:`1px solid ${pillBorder}`,borderRadius:30,padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'.65rem',fontWeight:500,color:dark?'rgba(240,242,255,.6)':'rgba(0,0,50,.6)',cursor:'default',transition:'all .2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(255,77,0,.35)'; e.currentTarget.style.color=textColor; e.currentTarget.style.background='rgba(255,77,0,.07)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=pillBorder; e.currentTarget.style.color=dark?'rgba(240,242,255,.6)':'rgba(0,0,50,.6)'; e.currentTarget.style.background=pillBg; }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:color,display:'inline-block',flexShrink:0 }}/>{label}
              </span>
            ))}
          </div>
          <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',color:mutedColor,marginBottom:14 }}>⚡ How We Work</div>
          <div>
            {STEPS.map((step, i) => (
              <div key={step.n} style={{ display:'flex',gap:14,alignItems:'flex-start',paddingBottom:i<STEPS.length-1?18:0 }}>
                <div style={{ display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0 }}>
                  <div style={{ width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.68rem',fontWeight:800,background:step.bg,border:`1.5px solid ${step.c}`,color:step.c }}>{step.n}</div>
                  {i < STEPS.length-1 && <div style={{ width:1,flex:1,minHeight:18,marginTop:4,background:`linear-gradient(to bottom,${step.c}44,${STEPS[i+1].c}44)` }}/>}
                </div>
                <div style={{ paddingTop:4 }}>
                  <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.84rem',fontWeight:700,marginBottom:2,color:textColor }}>{step.title}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.69rem',fontWeight:400,color:mutedColor,lineHeight:1.55 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:dark?'rgba(255,255,255,.03)':'rgba(0,0,80,.04)',border:`1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,80,.1)'}`,borderRadius:14,padding:'14px 18px',display:'flex',alignItems:'center',gap:14,marginTop:22 }}>
            <div style={{ width:10,height:10,borderRadius:'50%',background:'#22c55e',flexShrink:0,animation:'avail-ping 2s ease infinite' }}/>
            <div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.82rem',fontWeight:700,color:textColor }}>🕐 Currently Accepting Projects</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.63rem',color:mutedColor }}>Limited slots available · Response within 24 hrs</div>
            </div>
          </div>
        </div>

        {/* RIGHT cards */}
        <div className="hero-right" style={{ position:'relative',height:440,flexShrink:0,opacity:0,animation:'fadeRight .9s .45s forwards' }}>
          {CARDS.map((card, i) => (
            <div key={card.title} style={{ position:'absolute',width:widths[i],...card.pos,borderRadius:18,border:`1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.08)'}`,backdropFilter:'blur(16px)',padding:22,background:dark?card.bg:card.bg.replace(/\.1[25]?\)/,'.07)').replace(/\.15\)/,'.08)'),animation:card.anim }}>
              <div style={{ fontSize:'1.7rem',marginBottom:9 }}>{card.icon}</div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.82rem',fontWeight:700,marginBottom:4,color:textColor }}>{card.title}</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.65rem',color:mutedColor,lineHeight:1.5 }}>{card.sub}</div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.55rem',fontWeight:800,marginTop:8,color:textColor }}>{card.num}</div>
              <div style={{ height:3,background:dark?'rgba(255,255,255,.08)':'rgba(0,0,80,.08)',borderRadius:4,marginTop:9,overflow:'hidden' }}>
                <div style={{ height:'100%',borderRadius:4,background:card.bar,'--bar-w':card.w,animation:'grow 2s ease forwards' }}/>
              </div>
            </div>
          ))}
          <div style={{ position:'absolute',left:-20,top:'48%',transform:'translateY(-50%)',background:dark?'rgba(10,12,30,.9)':'rgba(255,255,255,.95)',border:`1px solid ${dark?'rgba(255,255,255,.1)':'rgba(0,0,80,.1)'}`,borderRadius:14,padding:'13px 16px',backdropFilter:'blur(20px)',animation:'hov2 5s ease-in-out infinite',whiteSpace:'nowrap' }}>
            <div style={{ display:'flex',alignItems:'center',gap:9 }}>
              <div style={{ width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#4f8cff,#a0c4ff)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.75rem',fontWeight:800,color:'#fff',flexShrink:0 }}>AR</div>
              <div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.68rem',fontWeight:700,color:textColor }}>Aryan Rathore</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.58rem',color:mutedColor }}>Founder, UrbanMart</div>
                <div style={{ color:'#ffb800',fontSize:'.65rem',marginTop:2 }}>★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
