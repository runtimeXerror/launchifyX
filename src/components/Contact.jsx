import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '../ThemeContext';

const INFO = [
  { icon:'📧', label:'Email',         value:'contact.launchifyx@gmail.com'     },
  { icon:'📍', label:'Based In',      value:'India · Serving Globally' },
  { icon:'⚡', label:'Response Time', value:'Within 24 Hours'          },
];
const SVCS = ['Custom Website Development','Mobile App Development','E-Commerce Store Creation','Branding & Digital Identity','Startup Launch Solutions'];

export default function Contact() {
  const { dark } = useTheme();
  const leftRef = useReveal(); const rightRef = useReveal();
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name:'',email:'',service:'',msg:'' });

  const textColor = dark ? '#f0f2ff' : '#0d0f20';
  const inputStyle = { background:dark?'#0b0d1a':'#fff', border:`1.5px solid ${dark?'#232545':'#c8ccec'}`, color:textColor, fontFamily:"'Montserrat',sans-serif", fontSize:'.86rem', padding:'13px 16px', outline:'none', width:'100%', borderRadius:6, resize:'none', WebkitAppearance:'none' };
  const labelStyle = { fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:700,letterSpacing:'.13em',textTransform:'uppercase',color:'#6c7591' };
  const focusOn  = e => { e.target.style.borderColor='#ff4d00'; e.target.style.boxShadow='0 0 0 3px rgba(255,77,0,.1)'; };
  const focusOff = e => { e.target.style.borderColor=dark?'#232545':'#c8ccec'; e.target.style.boxShadow=''; };

  return (
    <section id="contact" style={{ padding:'108px 60px',background:dark?'#05070f':'#f4f6ff',transition:'background .35s' }}>
      <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:80,alignItems:'start' }}>
        <div ref={leftRef} className="reveal">
          <div className="sec-label">Get In Touch</div>
          <h2 style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'clamp(2.4rem,4.5vw,4.6rem)',fontWeight:800,lineHeight:.98,marginBottom:18,letterSpacing:'-.02em',color:textColor }}>
            Let's Build<br/>Something <span style={{ color:'#ff4d00' }}>Incredible.</span>
          </h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif",color:'#6c7591',fontSize:'.91rem',lineHeight:1.78,maxWidth:380,marginBottom:38 }}>
            Have a project in mind? Tell us about it — we'll come back with a tailored plan, a clear timeline, and a fair price within 24 hours.
          </p>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            {INFO.map(({ icon,label,value }) => (
              <div key={label} style={{ display:'flex',gap:14,alignItems:'center' }}>
                <div style={{ width:42,height:42,border:`1.5px solid ${dark?'#232545':'#c8ccec'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.05rem',flexShrink:0,borderRadius:10,background:dark?'#0b0d18':'#eaecf8' }}>{icon}</div>
                <div>
                  <div style={labelStyle}>{label}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.88rem',fontWeight:500,color:textColor,marginTop:2 }}>{value}</div>
                </div>
              </div>
            ))}
            {/* Social links in contact */}
            <div style={{ display:'flex',gap:12,marginTop:8 }}>
              <a href="https://www.linkedin.com/company/launchifyx" target="_blank" rel="noopener noreferrer"
                style={{ display:'flex',alignItems:'center',gap:7,fontFamily:"'Montserrat',sans-serif",fontSize:'.75rem',fontWeight:600,color:'#0a66c2',textDecoration:'none',padding:'8px 16px',border:'1px solid rgba(10,102,194,.3)',borderRadius:30,background:'rgba(10,102,194,.06)',transition:'all .2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(10,102,194,.12)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(10,102,194,.06)'}>
                <span>in</span> LinkedIn
              </a>
              <a href="https://www.instagram.com/launchifyx" target="_blank" rel="noopener noreferrer"
                style={{ display:'flex',alignItems:'center',gap:7,fontFamily:"'Montserrat',sans-serif",fontSize:'.75rem',fontWeight:600,color:'#e1306c',textDecoration:'none',padding:'8px 16px',border:'1px solid rgba(225,48,108,.3)',borderRadius:30,background:'rgba(225,48,108,.06)',transition:'all .2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(225,48,108,.12)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(225,48,108,.06)'}>
                <span>📸</span> @launchifyx
              </a>
            </div>
          </div>
        </div>
        <div ref={rightRef} className="reveal">
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}><label style={labelStyle}>Your Name</label><input style={inputStyle} type="text" placeholder="Vishal Kumar" value={f.name} onChange={e=>setF({...f,name:e.target.value})} onFocus={focusOn} onBlur={focusOff}/></div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" placeholder="you@email.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})} onFocus={focusOn} onBlur={focusOff}/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              <label style={labelStyle}>Service You Need</label>
              <select style={inputStyle} value={f.service} onChange={e=>setF({...f,service:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                <option value="">Choose a service...</option>
                {SVCS.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              <label style={labelStyle}>Tell Us About Your Project</label>
              <textarea style={{ ...inputStyle,height:106 }} placeholder="Describe your idea, goals, and timeline — the more detail the better!" value={f.msg} onChange={e=>setF({...f,msg:e.target.value})} onFocus={focusOn} onBlur={focusOff}/>
            </div>
            <button onClick={()=>{ setSent(true); setTimeout(()=>setSent(false),3000); }}
              style={{ background:sent?'linear-gradient(135deg,#1a7a1a,#2ab82a)':'linear-gradient(135deg,#ff4d00,#ff8c00)',color:'#fff',fontFamily:"'Montserrat',sans-serif",fontSize:'.76rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',border:'none',padding:'16px 36px',cursor:'pointer',borderRadius:6,alignSelf:'flex-start',boxShadow:sent?'0 4px 20px rgba(0,180,0,.3)':'0 4px 20px rgba(255,77,0,.35)',transition:'background .3s,box-shadow .3s,transform .2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform=''}>
              {sent ? 'Message Sent ✓' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
