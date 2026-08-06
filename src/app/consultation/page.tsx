'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

const SERVICES = [
  'Custom Website Development',
  'Mobile App Development',
  'E-Commerce Development',
  'Website & App Maintenance',
  'Startup Launch Package',
  'Business Consulting & Strategy',
  'Not sure yet',
];

const BUDGETS = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  'Above ₹1,00,000',
  'Let\'s discuss',
];

const TIMELINES = [
  'ASAP (1–2 weeks)',
  '1 Month',
  '1–3 Months',
  '3–6 Months',
  'Flexible',
];

const HOW = [
  'Google Search',
  'Instagram',
  'LinkedIn',
  'Friend / Referral',
  'Other',
];

type F = { name:string; email:string; phone:string; service:string; budget:string; timeline:string; how:string; message:string; };

const inputBase = (dark: boolean): React.CSSProperties => ({
  width:'100%', outline:'none', fontFamily:"'Montserrat',sans-serif", fontSize:'.88rem',
  background: dark ? 'rgba(255,255,255,.04)' : '#f5f4f0',
  border: `1.5px solid ${dark ? 'rgba(100,140,255,.18)' : 'rgba(0,0,0,.1)'}`,
  color: dark ? '#e8eef8' : '#1a1510',
  borderRadius: 10, padding: '13px 16px',
  transition: 'border-color .2s, box-shadow .2s',
});

const labelStyle: React.CSSProperties = {
  fontFamily:"'Montserrat',sans-serif", fontSize:'.6rem', fontWeight:700,
  letterSpacing:'.12em', textTransform:'uppercase', color:'#6c7591', display:'block', marginBottom:7,
};

const ACCENT = '#ff4d00';

export default function ConsultationPage() {
  const { dark } = useTheme();
  const router = useRouter();
  const [f, setF] = useState<F>({ name:'', email:'', phone:'', service:'', budget:'', timeline:'', how:'', message:'' });
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const bg     = dark ? '#080d1a'           : '#faf8f3';
  const card   = dark ? 'rgba(18,16,61,.8)' : '#ffffff';
  const text   = dark ? '#e8eef8'           : '#1a1510';
  const muted  = dark ? 'rgba(200,215,245,.45)' : '#8a8070';
  const border = dark ? 'rgba(100,140,255,.12)'  : 'rgba(0,0,0,.07)';

  const set = (k: keyof F, v: string) => setF(p => ({ ...p, [k]:v }));

  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = ACCENT;
    e.target.style.boxShadow   = `0 0 0 3px rgba(255,77,0,.1)`;
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = dark ? 'rgba(100,140,255,.18)' : 'rgba(0,0,0,.1)';
    e.target.style.boxShadow   = '';
  };

  const next = () => {
    if (step === 1 && (!f.name || !f.email || !f.phone)) { setError('Name, email and phone number are required.'); return; }
    setError('');
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSending(true); setError('');
    try {
      const res = await fetch('/api/clients', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:f.name, email:f.email, phone:f.phone, service:f.service, budget:f.budget, timeline:f.timeline, source:f.how, message:f.message, notes:'consultation' }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.error||'Something went wrong.'); }
      setDone(true);
    } catch(err) { setError((err as Error).message); }
    finally { setSending(false); }
  };

  const STEPS = ['Your Info', 'Project Details', 'Confirm'];

  if (done) return (
    <div style={{ minHeight:'100vh', background:bg, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ textAlign:'center', maxWidth:480 }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(34,197,94,.12)', border:'2px solid rgba(34,197,94,.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.8rem', fontWeight:900, color:text, marginBottom:12 }}>Request Submitted!</h2>
        <p style={{ color:muted, lineHeight:1.7, marginBottom:28, fontSize:'.9rem' }}>
          Thanks <strong style={{ color:text }}>{f.name}</strong>! We've received your consultation request and will get back to you at <strong style={{ color:ACCENT }}>{f.email}</strong> within <strong style={{ color:text }}>24 hours</strong>.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'20px', background:dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)', borderRadius:14, border:`1px solid ${border}`, marginBottom:28, textAlign:'left' }}>
          {[
            { label:'Service', value: f.service || 'Not specified' },
            { label:'Budget',  value: f.budget  || 'To be discussed' },
            { label:'Timeline', value: f.timeline || 'Flexible' },
          ].map(row => (
            <div key={row.label} style={{ display:'flex', justifyContent:'space-between', fontSize:'.82rem' }}>
              <span style={{ color:muted }}>{row.label}</span>
              <span style={{ color:text, fontWeight:600 }}>{row.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
          <button onClick={() => router.push('/')}
            style={{ padding:'11px 24px', borderRadius:10, border:`1px solid ${border}`, background:'transparent', color:muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:'.82rem' }}>
            Back to Home
          </button>
          <button onClick={() => router.push('/#services')}
            style={{ padding:'11px 24px', borderRadius:10, border:'none', background:ACCENT, color:'#fff', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:'.82rem' }}>
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:bg, color:text, fontFamily:"'Montserrat',sans-serif" }}>

      {/* bg glow */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', background:`radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,77,0,.08), transparent)` }}/>

      {/* Top bar */}
      <div style={{ position:'sticky', top:0, zIndex:100, background: dark?'rgba(8,13,26,.9)':'rgba(250,248,243,.92)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${border}` }}>
        <div style={{ maxWidth:720, margin:'0 auto', padding:'0 24px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={() => router.push('/')}
            style={{ display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', color:muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.8rem', fontWeight:600 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.85rem', fontWeight:800, color:text }}>
            Launchify<span style={{ color:ACCENT }}>X</span>
          </span>
          <span style={{ fontSize:'.72rem', color:muted, fontWeight:600 }}>Free Consultation</span>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'48px 24px 80px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:20, background:'rgba(255,77,0,.1)', border:'1px solid rgba(255,77,0,.25)', marginBottom:16 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:ACCENT }}/>
            <span style={{ color:ACCENT, fontSize:'.6rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase' }}>100% Free · No Commitment</span>
          </div>
          <h1 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:text, marginBottom:12, lineHeight:1.2 }}>
            Book a Free Consultation
          </h1>
          <p style={{ color:muted, fontSize:'.9rem', lineHeight:1.7, maxWidth:480, margin:'0 auto' }}>
            Tell us about your project. We'll review it and get back to you within 24 hours with a clear plan and quote.
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, marginBottom:36 }}>
          {STEPS.map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done_ = step > num;
            return (
              <div key={label} style={{ display:'flex', alignItems:'center' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'.8rem', transition:'all .3s',
                    background: done_ ? ACCENT : active ? `${ACCENT}20` : dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)',
                    border: `2px solid ${done_||active ? ACCENT : border}`,
                    color: done_ ? '#fff' : active ? ACCENT : muted }}>
                    {done_ ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : num}
                  </div>
                  <span style={{ fontSize:'.56rem', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color: active ? ACCENT : muted, whiteSpace:'nowrap' }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width:80, height:2, background: step > num ? ACCENT : border, margin:'0 8px', marginBottom:18, transition:'background .4s' }}/>
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div style={{ background:card, border:`1px solid ${border}`, borderRadius:20, padding:'32px', backdropFilter:'blur(12px)', boxShadow: dark?'0 20px 60px rgba(0,0,0,.3)':'0 8px 40px rgba(0,0,0,.08)' }}>

          {/* ── STEP 1: Your Info ── */}
          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <StepTitle title="Tell us who you are" sub="We'll use this to get in touch with you." dark={dark} text={text} muted={muted}/>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={f.name} onChange={e=>set('name',e.target.value)} placeholder="Your name"
                    style={inputBase(dark)} onFocus={focusOn} onBlur={focusOff}/>
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={f.email} onChange={e=>set('email',e.target.value)} placeholder="you@email.com"
                    style={inputBase(dark)} onFocus={focusOn} onBlur={focusOff}/>
                </div>
              </div>
              <div>
                <label style={labelStyle}>WhatsApp / Phone Number *</label>
                <input value={f.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 98765 43210"
                  style={inputBase(dark)} onFocus={focusOn} onBlur={focusOff}/>
                <div style={{ fontSize:'.62rem', color:'#25d366', fontWeight:600, marginTop:5, display:'flex', alignItems:'center', gap:4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  We'll reach out on WhatsApp
                </div>
              </div>
              <div>
                <label style={labelStyle}>How did you find us?</label>
                <select value={f.how} onChange={e=>set('how',e.target.value)}
                  style={{ ...inputBase(dark), cursor:'pointer', appearance:'none' as const }} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">Select an option</option>
                  {HOW.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* ── STEP 2: Project Details ── */}
          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <StepTitle title="Tell us about your project" sub="This helps us prepare before we talk to you." dark={dark} text={text} muted={muted}/>
              <div>
                <label style={labelStyle}>Service You Need</label>
                <select value={f.service} onChange={e=>set('service',e.target.value)}
                  style={{ ...inputBase(dark), cursor:'pointer', appearance:'none' as const }} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">Select a service</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={labelStyle}>Approximate Budget</label>
                  <select value={f.budget} onChange={e=>set('budget',e.target.value)}
                    style={{ ...inputBase(dark), cursor:'pointer', appearance:'none' as const }} onFocus={focusOn} onBlur={focusOff}>
                    <option value="">Select budget</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Project Timeline</label>
                  <select value={f.timeline} onChange={e=>set('timeline',e.target.value)}
                    style={{ ...inputBase(dark), cursor:'pointer', appearance:'none' as const }} onFocus={focusOn} onBlur={focusOff}>
                    <option value="">Select timeline</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Tell Us About Your Project</label>
                <textarea value={f.message} onChange={e=>set('message',e.target.value)} rows={5}
                  placeholder="Describe your idea, what you want to build, any specific features, or any questions you have..."
                  style={{ ...inputBase(dark), resize:'vertical' as const, lineHeight:1.6 }} onFocus={focusOn} onBlur={focusOff}/>
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirm ── */}
          {step === 3 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <StepTitle title="Review & confirm" sub="Everything look good? Submit and we'll be in touch." dark={dark} text={text} muted={muted}/>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { label:'Name',     value: f.name },
                  { label:'Email',    value: f.email },
                  { label:'Phone',    value: f.phone || '—' },
                  { label:'Service',  value: f.service || '—' },
                  { label:'Budget',   value: f.budget || '—' },
                  { label:'Timeline', value: f.timeline || '—' },
                  { label:'Found us via', value: f.how || '—' },
                ].map(row => (
                  <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderRadius:10, background:dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)', border:`1px solid ${border}` }}>
                    <span style={{ fontSize:'.75rem', color:muted, fontWeight:600 }}>{row.label}</span>
                    <span style={{ fontSize:'.82rem', color:text, fontWeight:700, textAlign:'right', maxWidth:'60%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              {f.message && (
                <div style={{ padding:'14px', borderRadius:10, background:dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)', border:`1px solid ${border}` }}>
                  <div style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:muted, marginBottom:6 }}>Project Description</div>
                  <p style={{ fontSize:'.82rem', color:text, lineHeight:1.65, margin:0 }}>{f.message}</p>
                </div>
              )}
              <div style={{ padding:'14px 16px', borderRadius:10, background:'rgba(255,77,0,.06)', border:'1px solid rgba(255,77,0,.2)', display:'flex', alignItems:'center', gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/></svg>
                <span style={{ fontSize:'.75rem', color:ACCENT, fontWeight:600 }}>We'll respond within 24 hours with a plan and quote — completely free.</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div style={{ marginTop:12, padding:'10px 14px', borderRadius:8, background:'rgba(255,77,0,.08)', border:'1px solid rgba(255,77,0,.2)', color:ACCENT, fontSize:'.8rem', fontWeight:600 }}>{error}</div>}

          {/* Buttons */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:28 }}>
            {step > 1
              ? <button onClick={() => setStep(s=>s-1)} style={{ padding:'11px 22px', borderRadius:10, border:`1px solid ${border}`, background:'transparent', color:muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:'.82rem' }}>← Back</button>
              : <div/>
            }
            {step < 3
              ? <button onClick={next} style={{ padding:'12px 28px', borderRadius:10, border:'none', background:ACCENT, color:'#fff', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:'.85rem', boxShadow:`0 6px 20px rgba(255,77,0,.3)`, transition:'transform .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform=''}>
                  Continue →
                </button>
              : <button onClick={submit} disabled={sending} style={{ padding:'12px 28px', borderRadius:10, border:'none', background: sending?'#999':ACCENT, color:'#fff', cursor: sending?'not-allowed':'pointer', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:'.85rem', boxShadow:`0 6px 20px rgba(255,77,0,.3)`, transition:'all .2s' }}>
                  {sending ? 'Submitting...' : 'Submit Request'}
                </button>
            }
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display:'flex', gap:20, justifyContent:'center', marginTop:28, flexWrap:'wrap' }}>
          {[
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:'100% Free' },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Reply in 24 hrs' },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text:'No spam, ever' },
          ].map(b => (
            <div key={b.text} style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.72rem', color:muted, fontWeight:600 }}>
              <span style={{ color:ACCENT }}>{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        select option { background: ${dark ? '#12103d' : '#fff'}; }
        @media (max-width: 520px) {
          .consult-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StepTitle({ title, sub, dark, text, muted }: { title:string; sub:string; dark:boolean; text:string; muted:string }) {
  return (
    <div style={{ marginBottom:4 }}>
      <h2 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.15rem', fontWeight:800, color:text, marginBottom:6 }}>{title}</h2>
      <p style={{ fontSize:'.8rem', color:muted }}>{sub}</p>
    </div>
  );
}
