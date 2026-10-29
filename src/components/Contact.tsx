'use client';

import { useState } from 'react';
import useReveal from './useReveal';
import { useTheme } from '@/context/ThemeContext';
import { MailIcon, MapPinIcon, ZapIcon } from './Icons';

const INFO = [
  { Icon:MailIcon,   label:'Email',         value:'contact.launchifyx@gmail.com' },
  { Icon:MapPinIcon, label:'Based In',      value:'India · Serving Globally' },
  { Icon:ZapIcon,    label:'Response Time', value:'Within 24 Hours' },
];
const SVCS = ['Custom Website Development','Mobile App Development','E-Commerce Development','Website & App Maintenance','Startup Launch Package','Business Consulting & Strategy'];

type FocusEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const COUNTRY_CODES = [
  { code:'+91',  flag:'🇮🇳', name:'India' },
  { code:'+1',   flag:'🇺🇸', name:'USA' },
  { code:'+44',  flag:'🇬🇧', name:'UK' },
  { code:'+971', flag:'🇦🇪', name:'UAE' },
  { code:'+65',  flag:'🇸🇬', name:'Singapore' },
  { code:'+61',  flag:'🇦🇺', name:'Australia' },
  { code:'+49',  flag:'🇩🇪', name:'Germany' },
  { code:'+33',  flag:'🇫🇷', name:'France' },
  { code:'+81',  flag:'🇯🇵', name:'Japan' },
  { code:'+86',  flag:'🇨🇳', name:'China' },
  { code:'+82',  flag:'🇰🇷', name:'South Korea' },
  { code:'+55',  flag:'🇧🇷', name:'Brazil' },
  { code:'+52',  flag:'🇲🇽', name:'Mexico' },
  { code:'+27',  flag:'🇿🇦', name:'South Africa' },
  { code:'+234', flag:'🇳🇬', name:'Nigeria' },
  { code:'+254', flag:'🇰🇪', name:'Kenya' },
  { code:'+92',  flag:'🇵🇰', name:'Pakistan' },
  { code:'+880', flag:'🇧🇩', name:'Bangladesh' },
  { code:'+94',  flag:'🇱🇰', name:'Sri Lanka' },
  { code:'+977', flag:'🇳🇵', name:'Nepal' },
  { code:'+960', flag:'🇲🇻', name:'Maldives' },
  { code:'+966', flag:'🇸🇦', name:'Saudi Arabia' },
  { code:'+974', flag:'🇶🇦', name:'Qatar' },
  { code:'+968', flag:'🇴🇲', name:'Oman' },
  { code:'+973', flag:'🇧🇭', name:'Bahrain' },
  { code:'+965', flag:'🇰🇼', name:'Kuwait' },
  { code:'+62',  flag:'🇮🇩', name:'Indonesia' },
  { code:'+60',  flag:'🇲🇾', name:'Malaysia' },
  { code:'+66',  flag:'🇹🇭', name:'Thailand' },
  { code:'+63',  flag:'🇵🇭', name:'Philippines' },
  { code:'+64',  flag:'🇳🇿', name:'New Zealand' },
  { code:'+353', flag:'🇮🇪', name:'Ireland' },
  { code:'+31',  flag:'🇳🇱', name:'Netherlands' },
  { code:'+46',  flag:'🇸🇪', name:'Sweden' },
  { code:'+47',  flag:'🇳🇴', name:'Norway' },
  { code:'+45',  flag:'🇩🇰', name:'Denmark' },
  { code:'+41',  flag:'🇨🇭', name:'Switzerland' },
  { code:'+39',  flag:'🇮🇹', name:'Italy' },
  { code:'+34',  flag:'🇪🇸', name:'Spain' },
  { code:'+1',   flag:'🇨🇦', name:'Canada' },
];

export default function Contact() {
  const { dark } = useTheme();
  const { ref: leftRef } = useReveal();
  const { ref: rightRef } = useReveal();
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]   = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [f, setF] = useState({ name:'', email:'', phone:'', service:'', timeline:'', source:'', location:'', pincode:'', bizType:'', budget:'', msg:'' });

  const textColor = dark ? '#ffffff' : '#0d0f20';
  const inputStyle: React.CSSProperties = { background:dark?'#0b0d1a':'#fff', border:`1.5px solid ${dark?'#232545':'#c8ccec'}`, color:textColor, fontFamily:"'Montserrat',sans-serif", fontSize:'.86rem', padding:'13px 16px', outline:'none', width:'100%', borderRadius:6, resize:'none', WebkitAppearance:'none' };
  const labelStyle: React.CSSProperties = { fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:700,letterSpacing:'.13em',textTransform:'uppercase',color:'#6c7591' };
  const focusOn  = (e: React.FocusEvent<FocusEl>) => { e.target.style.borderColor='#ff4d00'; e.target.style.boxShadow='0 0 0 3px rgba(255,77,0,.1)'; };
  const focusOff = (e: React.FocusEvent<FocusEl>) => { e.target.style.borderColor=dark?'#232545':'#c8ccec'; e.target.style.boxShadow=''; };

  const handleSubmit = async () => {
    setError('');
    if (!f.name || !f.email) { setError('Please enter your name and email.'); return; }
    setSending(true);
    try {
      const fullPhone = f.phone ? `${countryCode} ${f.phone}` : '';
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:f.name, email:f.email, phone:fullPhone, service:f.service, budget:f.budget, timeline:f.timeline, company:f.bizType, source:f.location, message:f.msg || null }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.error || 'Something went wrong.'); }
      setSent(true);
      setF({ name:'', email:'', phone:'', service:'', timeline:'', source:'', location:'', pincode:'', bizType:'', budget:'', msg:'' });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding:'40px 20px 48px',background:dark?'#12103d':'#faf8f3',transition:'background .35s',position:'relative' }}>

      {/* ── SUCCESS POPUP ── */}
      {sent && (
        <div style={{ position:'fixed',inset:0,zIndex:999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,background:'rgba(0,0,0,.6)',backdropFilter:'blur(8px)' }}>
          <div style={{ background:dark?'rgba(18,16,61,.98)':'#fff',border:'1px solid rgba(34,197,94,.3)',borderRadius:24,padding:'44px 40px',maxWidth:420,width:'100%',textAlign:'center',boxShadow:'0 40px 100px rgba(0,0,0,.5)',animation:'popIn .4s cubic-bezier(.23,1,.32,1)' }}>
            {/* Check circle */}
            <div style={{ width:72,height:72,borderRadius:'50%',background:'rgba(34,197,94,.12)',border:'2px solid rgba(34,197,94,.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'1.5rem',fontWeight:900,color:dark?'#fff':'#0d0f20',marginBottom:10 }}>
              Message Sent!
            </h3>
            <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.9rem',color:'#6c7591',lineHeight:1.7,marginBottom:24 }}>
              Thanks for contacting us! We got your message and will <strong style={{ color:'#22c55e' }}>get back to you within 24 hours</strong>.
            </p>
            {/* What happens next */}
            <div style={{ display:'flex',flexDirection:'column',gap:10,marginBottom:28,textAlign:'left' }}>
              {[
                { step:'1', text:'We review your project details' },
                { step:'2', text:'Our team prepares a custom plan' },
                { step:'3', text:'We reach out within 24 hours' },
              ].map(({ step, text }) => (
                <div key={step} style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:dark?'rgba(34,197,94,.06)':'rgba(34,197,94,.05)',borderRadius:10,border:'1px solid rgba(34,197,94,.15)' }}>
                  <div style={{ width:24,height:24,borderRadius:'50%',background:'rgba(34,197,94,.15)',border:'1px solid rgba(34,197,94,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Exo 2',sans-serif",fontSize:'.65rem',fontWeight:800,color:'#22c55e',flexShrink:0 }}>{step}</div>
                  <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.82rem',color:dark?'rgba(200,220,200,.8)':'#444',fontWeight:500 }}>{text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSent(false)}
              style={{ width:'100%',padding:'13px',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff',border:'none',borderRadius:10,fontFamily:"'Montserrat',sans-serif",fontSize:'.88rem',fontWeight:700,cursor:'pointer',letterSpacing:'.05em' }}>
              Got it, Thanks!
            </button>
          </div>
          <style>{`@keyframes popIn { from{opacity:0;transform:scale(.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
        </div>
      )}
      <div className="section-inner">
      <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'start',maxWidth:1000,margin:'0 auto' }}>
        <div ref={leftRef} className="reveal contact-left">
          <div className="sec-label">Quick Inquiry</div>
          <h2 style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'clamp(2.4rem,4.5vw,4.6rem)',fontWeight:800,lineHeight:.98,marginBottom:18,letterSpacing:'-.02em',color:textColor }}>
            Let&apos;s Build<br/>Something <span style={{ color:'#ff4d00' }}>Incredible.</span>
          </h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif",color:'#6c7591',fontSize:'.91rem',lineHeight:1.78,maxWidth:380,marginBottom:24 }}>
            Have a quick question or want to say hello? Drop us a message and we'll get back within 24 hours.
          </p>

          {/* Consultation CTA */}
          <a href="/consultation" className="contact-cta" style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderRadius:14,background:dark?'rgba(255,77,0,.08)':'rgba(255,77,0,.06)',border:'1px solid rgba(255,77,0,.22)',textDecoration:'none',marginBottom:32,transition:'all .2s',gap:12 }}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background=dark?'rgba(255,77,0,.14)':'rgba(255,77,0,.1)'}
            onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background=dark?'rgba(255,77,0,.08)':'rgba(255,77,0,.06)'}>
            <div>
              <div style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:'.92rem',color:'#ff4d00',marginBottom:3 }}>Ready to start a project?</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.75rem',color:'#6c7591' }}>Book a free structured consultation — 3 steps, 2 min.</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>

          <div className="contact-info" style={{ display:'flex',flexDirection:'column',gap:16 }}>
            {INFO.map(({ Icon,label,value }) => (
              <div key={label} style={{ display:'flex',gap:14,alignItems:'center' }}>
                <div style={{ width:42,height:42,border:`1.5px solid ${dark?'#232545':'#c8ccec'}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,borderRadius:10,background:dark?'#0b0d18':'#eaecf8',color:'#ff4d00' }}><Icon size={18} color="#ff4d00"/></div>
                <div>
                  <div style={labelStyle}>{label}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.88rem',fontWeight:500,color:textColor,marginTop:2 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={rightRef} className="reveal">
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            {/* Row 1: Name + Email */}
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}><label style={labelStyle}>Your Name *</label><input style={inputStyle} type="text" placeholder="Vishal Kumar" value={f.name} onChange={e=>setF({...f,name:e.target.value})} onFocus={focusOn} onBlur={focusOff}/></div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}><label style={labelStyle}>Email Address *</label><input style={inputStyle} type="email" placeholder="you@email.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})} onFocus={focusOn} onBlur={focusOff}/></div>
            </div>
            {/* Row 2: Phone + Service */}
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>Mobile Number</label>
                <div style={{ display:'flex',gap:0,border:`1.5px solid ${dark?'#232545':'#c8ccec'}`,borderRadius:6,overflow:'hidden',background:dark?'#0b0d1a':'#fff' }}>
                  <select value={countryCode} onChange={e=>setCountryCode(e.target.value)}
                    style={{ background:dark?'#131628':'#f0f2ff',border:'none',borderRight:`1px solid ${dark?'#232545':'#c8ccec'}`,color:textColor,fontFamily:"'Montserrat',sans-serif",fontSize:'1rem',padding:'12px 6px',outline:'none',cursor:'pointer',flexShrink:0,WebkitAppearance:'none',minWidth:52 }}>
                    {COUNTRY_CODES.map((c,i)=><option key={`${c.code}-${i}`} value={c.code}>{c.flag} {c.code}</option>)}
                  </select>
                  <input style={{ ...inputStyle,border:'none',borderRadius:0,flex:1 }} type="tel" inputMode="tel" placeholder="98765 43210" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} onFocus={focusOn} onBlur={focusOff}/>
                </div>
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>Service You Need</label>
                <select style={inputStyle} value={f.service} onChange={e=>setF({...f,service:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">Choose a service...</option>
                  {SVCS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {/* Row 3: Timeline + Source */}
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>Project Timeline</label>
                <select style={inputStyle} value={f.timeline} onChange={e=>setF({...f,timeline:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">When do you need it?</option>
                  <option>ASAP (1–2 weeks)</option>
                  <option>1 Month</option>
                  <option>2–3 Months</option>
                  <option>3–6 Months</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>How Did You Find Us?</label>
                <select style={inputStyle} value={f.source} onChange={e=>setF({...f,source:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">Select source...</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Google Search</option>
                  <option>Friend / Referral</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {/* Row 4: City + Pin Code + Business Type */}
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>City</label>
                <input style={inputStyle} type="text" placeholder="e.g. Mumbai, Delhi" value={f.location} onChange={e=>setF({...f,location:e.target.value})} onFocus={focusOn} onBlur={focusOff}/>
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>Pin Code</label>
                <input style={inputStyle} type="text" inputMode="numeric" maxLength={6} placeholder="e.g. 110001" value={f.pincode} onChange={e=>setF({...f,pincode:e.target.value.replace(/\D/g,'')})} onFocus={focusOn} onBlur={focusOff}/>
              </div>
            </div>
            <div className="form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
                <label style={labelStyle}>Business Type</label>
                <select style={inputStyle} value={f.bizType} onChange={e=>setF({...f,bizType:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">What describes you best?</option>
                  <option>Startup / New Idea</option>
                  <option>Small Business</option>
                  <option>Freelancer / Individual</option>
                  <option>Growing Company</option>
                  <option>Enterprise</option>
                  <option>NGO / Non-Profit</option>
                  <option>Student Project</option>
                </select>
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              <label style={labelStyle}>Approximate Budget</label>
              <select style={inputStyle} value={f.budget} onChange={e=>setF({...f,budget:e.target.value})} onFocus={focusOn} onBlur={focusOff}>
                <option value="">Select budget range...</option>
                <option>Under ₹5,000</option>
                <option>₹5,000 – ₹10,000</option>
                <option>₹10,000 – ₹25,000</option>
                <option>₹25,000 – ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>Above ₹1,00,000</option>
                <option>Not sure yet</option>
              </select>
              </div>
            </div>
            {/* Message */}
            <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              <label style={labelStyle}>Tell Us About Your Project</label>
              <textarea style={{ ...inputStyle,height:100 }} placeholder="Describe your idea, goals, and anything else you'd like us to know!" value={f.msg} onChange={e=>setF({...f,msg:e.target.value})} onFocus={focusOn} onBlur={focusOff}/>
            </div>
            {error && <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.78rem',color:'#ff4d00',padding:'8px 12px',background:'rgba(255,77,0,.08)',borderRadius:6 }}>{error}</div>}
            <button onClick={handleSubmit} disabled={sending}
              style={{ background:'linear-gradient(135deg,#ff4d00,#c73b00)',color:'#fff',fontFamily:"'Montserrat',sans-serif",fontSize:'.82rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',border:'none',padding:'15px 36px',cursor:sending?'wait':'pointer',borderRadius:8,width:'100%',opacity:sending?0.8:1,boxShadow:'0 6px 24px rgba(255,77,0,.35)',transition:'all .25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 32px rgba(255,77,0,.5)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 6px 24px rgba(255,77,0,.35)'; }}>
              {sending ? 'Sending…' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
