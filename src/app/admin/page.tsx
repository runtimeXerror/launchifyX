'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ClientRequest {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  timeline?: string | null;
  source?: string | null;
  message?: string | null;
  notes?: string | null;
  status: string;
  createdAt?: string;
}

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalServices: number;
  recentRequests: ClientRequest[];
}

const ADMIN_USERNAME = 'foundervishal';
const ADMIN_PASSWORD = 'LaunchifyX@2025';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'Pending',     color: '#ffb800', bg: 'rgba(255,184,0,.15)'  },
  contacted:   { label: 'Contacted',   color: '#4f8cff', bg: 'rgba(79,140,255,.15)' },
  in_progress: { label: 'In Progress', color: '#a855f7', bg: 'rgba(168,85,247,.15)' },
  completed:   { label: 'Completed',   color: '#22c55e', bg: 'rgba(34,197,94,.15)'  },
  cancelled:   { label: 'Cancelled',   color: '#ff4d00', bg: 'rgba(255,77,0,.15)'   },
};

/* ─── SVG ICONS ─── */
const Icons = {
  chart:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  inbox:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  logout:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  users:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  pending:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  done:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  rocket:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  search:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  mail:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  building: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  tag:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  money:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  message:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  eye:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  refresh:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  filter:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
};

/* ─── LOGIN ─── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [pw, setPw]   = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && pw === ADMIN_PASSWORD) {
      localStorage.setItem('lx-admin-auth', '1');
      onLogin();
    } else {
      setError(true); setShake(true); setPw('');
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080d1a', fontFamily:"'Montserrat',sans-serif", padding:20 }}>
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
      `}</style>

      {/* bg orbs */}
      <div style={{ position:'fixed', top:'20%', left:'15%', width:400, height:400, background:'radial-gradient(circle,rgba(79,140,255,.08),transparent 70%)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', bottom:'20%', right:'15%', width:320, height:320, background:'radial-gradient(circle,rgba(255,77,0,.06),transparent 70%)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }}/>

      <div style={{ width:'100%', maxWidth:400, animation: shake ? 'shake .5s ease' : 'fadeIn .5s ease both' }}>
        <div style={{ background:'rgba(18,16,61,.97)', border:'1px solid rgba(100,140,255,.2)', borderRadius:24, padding:'44px 40px', backdropFilter:'blur(24px)', boxShadow:'0 40px 100px rgba(0,0,0,.6)' }}>

          <div style={{ textAlign:'center', marginBottom:36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="LaunchifyX" style={{ width:64, height:64, objectFit:'contain', marginBottom:16 }}/>
            <h1 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.7rem', fontWeight:900, color:'#fff', margin:0 }}>
              Launchify<span style={{ background:'linear-gradient(135deg,#ff4d00,#ffb800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>X</span>
            </h1>
            <p style={{ fontSize:'.72rem', color:'rgba(200,215,245,.35)', marginTop:8, letterSpacing:'.18em', textTransform:'uppercase' }}>Admin Dashboard</p>
          </div>

          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(200,215,245,.45)', display:'block', marginBottom:8 }}>Username</label>
              <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} autoFocus
                style={{ width:'100%', background:'rgba(255,255,255,.04)', border:`1.5px solid ${error ? '#ff4d00' : 'rgba(100,140,255,.18)'}`, borderRadius:10, padding:'13px 16px', color:'#fff', fontSize:'.9rem', outline:'none', fontFamily:"'Montserrat',sans-serif", boxSizing:'border-box', transition:'border-color .2s' }}
                onFocus={e => e.target.style.borderColor='rgba(100,140,255,.6)'}
                onBlur={e  => e.target.style.borderColor=error?'#ff4d00':'rgba(100,140,255,.18)'}/>
            </div>

            <div>
              <label style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(200,215,245,.45)', display:'block', marginBottom:8 }}>Password</label>
              <div style={{ position:'relative' }}>
                <input type={show ? 'text' : 'password'} placeholder="Enter password" value={pw} onChange={e => setPw(e.target.value)}
                  style={{ width:'100%', background:'rgba(255,255,255,.04)', border:`1.5px solid ${error ? '#ff4d00' : 'rgba(100,140,255,.18)'}`, borderRadius:10, padding:'13px 44px 13px 16px', color:'#fff', fontSize:'.9rem', outline:'none', fontFamily:"'Montserrat',sans-serif", boxSizing:'border-box', transition:'border-color .2s' }}
                  onFocus={e => e.target.style.borderColor='rgba(100,140,255,.6)'}
                  onBlur={e  => e.target.style.borderColor=error?'#ff4d00':'rgba(100,140,255,.18)'}/>
                <button type="button" onClick={() => setShow(!show)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(200,215,245,.35)', cursor:'pointer', padding:4, display:'flex', alignItems:'center' }}>
                  {show ? Icons.eyeOff : Icons.eye}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,77,0,.1)', border:'1px solid rgba(255,77,0,.3)', borderRadius:8, padding:'10px 14px', color:'#ff4d00', fontSize:'.8rem', fontWeight:600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Wrong username or password
              </div>
            )}

            <button type="submit"
              style={{ marginTop:4, background:'linear-gradient(135deg,#ff4d00,#c73b00)', color:'#fff', border:'none', borderRadius:10, padding:'14px', fontSize:'.9rem', fontWeight:700, cursor:'pointer', letterSpacing:'.06em', fontFamily:"'Montserrat',sans-serif", boxShadow:'0 6px 24px rgba(255,77,0,.35)', transition:'opacity .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='.88'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform=''; }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  const { dark } = useTheme();
  const bg = dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)';
  const labelColor = dark ? 'rgba(200,215,245,.45)' : 'rgba(60,50,30,.45)';
  return (
    <div style={{ background:bg, border:`1px solid ${color}25`, borderRadius:18, padding:'22px 20px', backdropFilter:'blur(24px)', transition:'transform .22s, box-shadow .22s', cursor:'default', position:'relative', overflow:'hidden', boxShadow:`0 4px 20px ${color}0e` }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${color}28`; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=`0 4px 20px ${color}0e`; }}>
      {/* gradient orb */}
      <div style={{ position:'absolute', top:-30, right:-30, width:110, height:110, borderRadius:'50%', background:`radial-gradient(circle,${color}20,transparent 70%)`, pointerEvents:'none' }}/>
      {/* bottom bar */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${color}00,${color},${color}00)` }}/>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, position:'relative' }}>
        <div style={{ width:44, height:44, borderRadius:13, background:`linear-gradient(135deg,${color}22,${color}0a)`, border:`1.5px solid ${color}35`, display:'flex', alignItems:'center', justifyContent:'center', color, boxShadow:`0 4px 14px ${color}20` }}>
          {icon}
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
          <div style={{ width:28, height:3, borderRadius:4, background:`${color}40` }}/>
          <div style={{ width:18, height:3, borderRadius:4, background:`${color}25` }}/>
        </div>
      </div>

      <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'2.6rem', fontWeight:900, color, lineHeight:1, marginBottom:8, position:'relative', letterSpacing:'-.02em' }}>{value}</div>
      <div style={{ fontSize:'.67rem', fontWeight:700, color:labelColor, textTransform:'uppercase', letterSpacing:'.16em' }}>{label}</div>
    </div>
  );
}

/* ─── CALENDAR ─── */
function OrderCalendar({ requests }: { requests: ClientRequest[] }) {
  const { dark } = useTheme();
  const card       = dark ? '#1a1850' : '#ffffff';
  const cardBorder = dark ? '#2e2b6e' : 'rgba(0,0,0,.08)';
  const muted      = dark ? '#a8a4d8' : '#6a6050';
  const sidebarBg  = dark ? 'rgba(16,14,58,.99)' : 'rgba(250,248,243,.99)';
  const today = new Date();
  const [cur, setCur] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  useEffect(() => {
    if (!monthPickerOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('#month-picker-wrapper')) setMonthPickerOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [monthPickerOpen]);
  useEffect(() => {
    if (!yearPickerOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('#year-picker-wrapper')) setYearPickerOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [yearPickerOpen]);
  const allYears = Array.from({ length: today.getFullYear() - 2000 + 1 }, (_, i) => today.getFullYear() - i).reverse();

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Build date → count map
  const countMap: Record<string, number> = {};
  requests.forEach(r => {
    if (!r.createdAt) return;
    const d = new Date(r.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    countMap[key] = (countMap[key] || 0) + 1;
  });

  const firstDay = new Date(cur.year, cur.month, 1).getDay();
  const daysInMonth = new Date(cur.year, cur.month + 1, 0).getDate();
  const prevMonth = () => setCur(c => c.month === 0 ? { year:c.year-1, month:11 } : { ...c, month:c.month-1 });
  const nextMonth = () => setCur(c => c.month === 11 ? { year:c.year+1, month:0 } : { ...c, month:c.month+1 });

  const selectedOrders = selectedDay
    ? requests.filter(r => {
        if (!r.createdAt) return false;
        const d = new Date(r.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === selectedDay;
      })
    : [];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const maxCount = Math.max(...Object.values(countMap), 1);

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:16, alignItems:'stretch', height:'calc(100vh - 200px)', minHeight:500 }} className="cal-layout">
      {/* Calendar */}
      <div style={{ background:card, border:`1px solid ${cardBorder}`, borderRadius:16, padding:20, backdropFilter:'blur(20px)', overflowY:'auto', width:'100%', minWidth:0, height:'100%' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>

          {/* Left arrow */}
          <button onClick={prevMonth} style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(100,140,255,.2)', background:'rgba(100,140,255,.08)', color:'#4f8cff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(100,140,255,.2)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(100,140,255,.08)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {/* Center: Month + Year + Reset */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>

              {/* Month picker */}
              <div id="month-picker-wrapper" style={{ position:'relative' }}>
                <button onClick={() => setMonthPickerOpen(o => !o)}
                  style={{ background:'rgba(79,140,255,.12)', border:'1px solid rgba(79,140,255,.25)', borderRadius:8, padding:'4px 10px', color: '#fff', fontFamily:"'Exo 2',sans-serif", fontSize:'.82rem', fontWeight:800, cursor:'pointer', outline:'none', display:'flex', alignItems:'center', gap:5 }}>
                  {MONTHS[cur.month]}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'transform .2s', transform: monthPickerOpen ? 'rotate(180deg)':'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {monthPickerOpen && (
                  <div style={{ position:'absolute', top:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)', background:sidebarBg, border:'1px solid rgba(100,140,255,.2)', borderRadius:12, padding:10, zIndex:100, boxShadow:'0 16px 40px rgba(0,0,0,.5)', backdropFilter:'blur(20px)', width:180 }}>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4 }}>
                      {MONTHS.map((m, i) => {
                        const isCurrentMonth = i === today.getMonth() && cur.year === today.getFullYear();
                        const isSelected = cur.month === i;
                        return (
                          <button key={m} onClick={() => { setCur(c => ({ ...c, month:i })); setMonthPickerOpen(false); }}
                            style={{ padding:'7px 4px', borderRadius:7, border:'none', background: isSelected ? '#4f8cff' : 'transparent', color: isSelected ? '#fff' : isCurrentMonth ? '#ff4d00' : 'rgba(200,215,245,.7)', cursor:'pointer', fontFamily:"'Exo 2',sans-serif", fontSize:'.72rem', fontWeight: isCurrentMonth ? 900 : 700, transition:'all .15s', position:'relative' }}
                            onMouseEnter={e => { if(!isSelected) e.currentTarget.style.background='rgba(79,140,255,.15)'; }}
                            onMouseLeave={e => { if(!isSelected) e.currentTarget.style.background='transparent'; }}>
                            {m.slice(0,3)}
                            {isCurrentMonth && !isSelected && <span style={{ position:'absolute', top:2, right:3, width:5, height:5, borderRadius:'50%', background:'#ff4d00', boxShadow:'0 0 6px #ff4d00' }}/>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Year picker */}
              <div id="year-picker-wrapper" style={{ position:'relative' }}>
                <button onClick={() => setYearPickerOpen(o => !o)}
                  style={{ background:'rgba(79,140,255,.12)', border:'1px solid rgba(79,140,255,.25)', borderRadius:8, padding:'4px 10px', color:'#fff', fontFamily:"'Exo 2',sans-serif", fontSize:'.82rem', fontWeight:800, cursor:'pointer', outline:'none', display:'flex', alignItems:'center', gap:5 }}>
                  {cur.year}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'transform .2s', transform: yearPickerOpen ? 'rotate(180deg)':'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {yearPickerOpen && (
                  <div style={{ position:'absolute', top:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)', background:sidebarBg, border:'1px solid rgba(100,140,255,.2)', borderRadius:12, padding:10, zIndex:100, boxShadow:'0 16px 40px rgba(0,0,0,.5)', backdropFilter:'blur(20px)', width:180 }}>
                    <div id="yr-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4, maxHeight:200, overflowY:'auto' }}
                      ref={el => { if(el){ const active = el.querySelector('[data-active="true"]') as HTMLElement; if(active) el.scrollTop = active.offsetTop - el.clientHeight/2; } }}>
                      {allYears.map(y => (
                        <button key={y} data-active={cur.year===y} onClick={() => { setCur(c => ({ ...c, year:y })); setYearPickerOpen(false); }}
                          style={{ padding:'6px 4px', borderRadius:7, border:'none', background: cur.year===y ? '#4f8cff' : 'transparent', color: cur.year===y ? '#fff' : y===today.getFullYear() ? '#ff4d00' : 'rgba(200,215,245,.7)', cursor:'pointer', fontFamily:"'Exo 2',sans-serif", fontSize:'.78rem', fontWeight: y===today.getFullYear() ? 900 : 700, transition:'all .15s', position:'relative' }}
                          onMouseEnter={e => { if(cur.year!==y) e.currentTarget.style.background='rgba(79,140,255,.15)'; }}
                          onMouseLeave={e => { if(cur.year!==y) e.currentTarget.style.background='transparent'; }}>
                          {y}
                          {y === today.getFullYear() && cur.year !== y && <span style={{ position:'absolute', top:3, right:4, width:5, height:5, borderRadius:'50%', background:'#ff4d00', boxShadow:'0 0 6px #ff4d00' }}/>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reset button — next to year */}
              <button title="Reset to today"
                onClick={() => { setCur({ year: today.getFullYear(), month: today.getMonth() }); setSelectedDay(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`); }}
                style={{ width:26, height:26, borderRadius:7, border:'1px solid rgba(255,77,0,.25)', background:'rgba(255,77,0,.08)', color:'#ff4d00', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,77,0,.2)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,77,0,.08)'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              </button>
            </div>
            <div style={{ fontSize:'.58rem', color:'#ff6b35', fontWeight:600 }}>Total Req: {selectedDay ? (countMap[selectedDay] || 0) : 0}</div>
          </div>

          {/* Right arrow */}
          <button onClick={nextMonth} style={{ width:30, height:30, borderRadius:8, border:'1px solid rgba(100,140,255,.2)', background:'rgba(100,140,255,.08)', color:'#4f8cff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(100,140,255,.2)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(100,140,255,.08)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:4 }}>
          {DAYS.map(d => (
            <div key={d} style={{ textAlign:'center', fontSize:'.58rem', fontWeight:700, color:muted, textTransform:'uppercase', letterSpacing:'.06em', padding:'3px 0' }}>{d}</div>
          ))}
        </div>

        {/* Cells */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`}/>;
            const key = `${cur.year}-${cur.month}-${day}`;
            const count = countMap[key] || 0;
            const isToday = cur.year === today.getFullYear() && cur.month === today.getMonth() && day === today.getDate();
            const isSelected = selectedDay === key;
            const intensity = count > 0 ? Math.max(0.2, count / maxCount) : 0;

            return (
              <button key={key} onClick={() => setSelectedDay(isSelected ? null : key)}
                style={{
                  position:'relative', width:'100%', aspectRatio:'1', borderRadius:10, border:`1px solid ${isSelected ? '#ff4d00' : isToday ? 'rgba(79,140,255,.5)' : count > 0 ? 'rgba(255,77,0,.3)' : 'rgba(100,140,255,.08)'}`,
                  background: isSelected ? 'rgba(255,77,0,.2)' : isToday ? 'rgba(79,140,255,.12)' : count > 0 ? `rgba(255,77,0,${intensity * 0.18})` : 'rgba(255,255,255,.02)',
                  color: isSelected ? '#ff4d00' : isToday ? '#4f8cff' : '#e8eef8',
                  cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2, transition:'all .2s', padding:2,
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = count > 0 ? 'rgba(255,77,0,.15)' : 'rgba(100,140,255,.1)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = count > 0 ? `rgba(255,77,0,${intensity * 0.18})` : 'rgba(255,255,255,.02)'; }}>
                <span style={{ fontSize:'.68rem', fontWeight: isToday || isSelected ? 800 : 500, lineHeight:1 }}>{day}</span>
                {count > 0 && (
                  <div style={{ display:'flex', alignItems:'center', gap:2 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background: isSelected ? '#ff4d00' : '#ff6b35' }}/>
                    <span style={{ fontSize:'.5rem', fontWeight:700, color: isSelected ? '#ff4d00' : '#ff9966' }}>{count}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:12, paddingTop:12, borderTop:'1px solid rgba(100,140,255,.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:muted }}>
            <div style={{ width:10, height:10, borderRadius:3, background:'rgba(79,140,255,.3)', border:'1px solid rgba(79,140,255,.5)' }}/> Today
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:muted }}>
            <div style={{ width:10, height:10, borderRadius:3, background:'rgba(255,77,0,.18)', border:'1px solid rgba(255,77,0,.3)' }}/> Has Orders
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:muted }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#ff6b35' }}/> Count
          </div>
        </div>
      </div>

      {/* Day detail panel */}
      <div style={{ background:card, border:`1px solid ${cardBorder}`, borderRadius:16, padding:18, backdropFilter:'blur(20px)', display:'flex', flexDirection:'column', width:'100%', minWidth:0, height:'100%', overflow:'hidden' }}>
        {selectedDay ? (
          <>
            <div style={{ marginBottom:16, textAlign:'center', paddingBottom:14, borderBottom:'1px solid rgba(100,140,255,.08)' }}>
              <div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(200,215,245,.35)', marginBottom:6 }}>Selected Date</div>
              <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.05rem', fontWeight:800, color:'#fff', marginBottom:6 }}>
                {(() => { const [y,m,d] = selectedDay.split('-').map(Number); return new Date(y,m,d).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}); })()}
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 12px', borderRadius:20, background: selectedOrders.length > 0 ? 'rgba(255,77,0,.12)' : 'rgba(100,140,255,.08)', border: `1px solid ${selectedOrders.length > 0 ? 'rgba(255,77,0,.25)' : 'rgba(100,140,255,.15)'}`, fontSize:'.68rem', color: selectedOrders.length > 0 ? '#ff4d00' : 'rgba(200,215,245,.4)', fontWeight:700 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background: selectedOrders.length > 0 ? '#ff4d00' : 'rgba(200,215,245,.3)', display:'inline-block' }}/>
                {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} received
              </span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10, overflowY:'auto', flex:1 }}>
              {selectedOrders.map(req => {
                const s = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.pending;
                return (
                  <div key={req.id} style={{ padding:'14px', background:'rgba(255,255,255,.03)', borderRadius:12, border:'1px solid rgba(100,140,255,.08)', borderLeft:`3px solid ${s.color}` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                      <div style={{ width:34, height:34, borderRadius:'50%', background:`linear-gradient(135deg,${s.color},#4f8cff)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'.85rem', color:'#fff', flexShrink:0 }}>
                        {req.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, color:'#fff', fontSize:'.88rem' }}>{req.name}</div>
                        <div style={{ fontSize:'.7rem', color:'#4f8cff' }}>{req.email}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {req.service && <span style={{ padding:'3px 8px', background:'rgba(79,140,255,.1)', borderRadius:6, fontSize:'.66rem', color:'#4f8cff', fontWeight:600 }}>{req.service}</span>}
                      {req.phone && <span style={{ padding:'3px 8px', background:'rgba(168,85,247,.1)', borderRadius:6, fontSize:'.66rem', color:'#a855f7', fontWeight:600 }}>{req.phone}</span>}
                      <span style={{ padding:'3px 8px', background:s.bg, borderRadius:6, fontSize:'.66rem', color:s.color, fontWeight:700, textTransform:'uppercase' }}>{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:muted, textAlign:'center', gap:16 }}>
            <div style={{ opacity:.3 }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:'.9rem', marginBottom:6 }}>Select a Day</div>
              <div style={{ fontSize:'.78rem', lineHeight:1.6 }}>Click any date on the calendar to see orders received on that day</div>
            </div>
            <div style={{ padding:'12px 16px', background:'rgba(255,77,0,.06)', border:'1px solid rgba(255,77,0,.15)', borderRadius:10, fontSize:'.75rem', color:'#ff6b35' }}>
              Dates with orders show an orange dot
            </div>
          </div>
        )}
      </div>

      <style>{`.cal-layout { @media (max-width: 900px) { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ─── MAIN ─── */
export default function AdminDashboard() {
  const [authed, setAuthed]     = useState(false);
  const [checking, setChecking] = useState(true);
  const [stats, setStats]       = useState<Stats | null>(null);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'overview'|'requests'|'consultations'|'settings'|'calendar'|'status'>('overview');
  const [socialLinks, setSocialLinks] = useState<Record<string,string>>({});
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialSaved, setSocialSaved] = useState(false);
  const [socialNewKey, setSocialNewKey] = useState('social_linkedin');
  const [socialNewUrl, setSocialNewUrl] = useState('');
  const [socialEditKey, setSocialEditKey] = useState<string|null>(null);
  const [socialEditVal, setSocialEditVal] = useState('');
  const [socialConfirmDel, setSocialConfirmDel] = useState<string|null>(null);
  const [search, setSearch]     = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate]   = useState('');
  const [filterService, setFilterService] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [calResetKey, setCalResetKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const SW = sidebarCollapsed ? 64 : 230;
  const [calendarMode, setCalendarMode] = useState<'requests'|'consultations'>('requests');

  const todayKey = new Date().toISOString().slice(0, 10); // "2026-06-04"
  const todayRequestCount = requests.filter(r => {
    if (!r.createdAt || r.notes === 'consultation') return false;
    return new Date(r.createdAt).toISOString().slice(0, 10) === todayKey;
  }).length;

  const todayConsultCount = requests.filter(r => {
    if (!r.createdAt || r.notes !== 'consultation') return false;
    return new Date(r.createdAt).toISOString().slice(0, 10) === todayKey;
  }).length;

  const fetchStats = useCallback(async () => {
    try { const r = await fetch('/api/analytics/overview'); setStats(await r.json()); } catch {}
  }, []);

  const fetchRequests = useCallback(async () => {
    try { const r = await fetch('/api/clients'); setRequests(await r.json()); } catch {}
  }, []);

  const fetchSettings = useCallback(async () => {
    try { const r = await fetch('/api/settings'); setSocialLinks(await r.json()); } catch {}
  }, []);

  const saveSettings = async () => {
    setSocialSaving(true);
    try {
      await fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(socialLinks) });
      setSocialSaved(true);
      setTimeout(() => setSocialSaved(false), 2500);
    } catch {}
    setSocialSaving(false);
  };

  const refresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchRequests()]);
    setRefreshing(false);
    if (activeTab === 'calendar') setCalResetKey(k => k + 1);
  };

  useEffect(() => {
    if (localStorage.getItem('lx-admin-auth') === '1') setAuthed(true);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (authed) { fetchStats(); fetchRequests(); fetchSettings(); }
  }, [authed, fetchStats, fetchRequests, fetchSettings]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/clients/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status }) });
      fetchRequests(); fetchStats();
    } catch {}
  };

  const logout = () => { localStorage.removeItem('lx-admin-auth'); setAuthed(false); };

  if (checking) return null;
  if (!authed)  return <LoginScreen onLogin={() => setAuthed(true)} />;

  const FIXED_SERVICES = [
    'Custom Website Development',
    'Mobile App Development',
    'E-Commerce Development',
    'Website & App Maintenance',
    'Startup Launch Package',
    'Business Consulting & Strategy',
  ];
  const allServices = Array.from(new Set([...FIXED_SERVICES, ...requests.map(r => r.service).filter(Boolean)])) as string[];

  const filtered = requests.filter(r => {
    if (r.notes === 'consultation') return false;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.service||'').toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchDate = !filterDate || (r.createdAt && new Date(r.createdAt).toISOString().slice(0,10) === filterDate);
    const matchService = filterService === 'all' || r.service === filterService;
    return matchSearch && matchStatus && matchDate && matchService;
  });

  // Day-wise breakdown for overview
  const dayMap: Record<string, number> = {};
  requests.forEach(r => {
    if (!r.createdAt) return;
    const key = new Date(r.createdAt).toISOString().slice(0,10);
    dayMap[key] = (dayMap[key] || 0) + 1;
  });
  const dayEntries = Object.entries(dayMap).sort((a,b) => b[0].localeCompare(a[0]));

  const { dark, toggle: toggleTheme } = useTheme();
  // Exact colors from main website globals.css
  const bg         = dark ? '#12103d'                    : '#faf8f3';
  const bg2        = dark ? '#1a1850'                    : '#f2ede2';
  const card       = dark ? '#1a1850'                    : '#ffffff';
  const cardBorder = dark ? '#2e2b6e'                    : 'rgba(0,0,0,.08)';
  const cardShadow = dark ? 'none'                       : '0 2px 12px rgba(80,60,20,.08)';
  const text       = dark ? '#ffffff'                    : '#1a1510';
  const muted      = dark ? '#a8a4d8'                    : '#6a6050';
  const sidebarBg  = dark ? 'rgba(16,14,58,.99)'         : 'rgba(250,248,243,.99)';
  const sidebarBdr = dark ? '#2e2b6e'                    : '#d8d0bc';

  const settingsIcon  = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
  const calendarIcon  = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

  const consultIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

  const NAV = [
    { id:'overview'       as const, label:'Overview',      icon: Icons.chart },
    { id:'requests'       as const, label:'Requests',      icon: Icons.inbox },
    { id:'consultations'  as const, label:'Consultations', icon: consultIcon },
    { id:'calendar'       as const, label:'Calendar',      icon: calendarIcon },
  ];

  return (
    <div style={{ minHeight:'100vh', background:bg, fontFamily:"'Montserrat',sans-serif", color:text }}>
      <style>{`
        html, body { background: ${bg} !important; color: ${text} !important; transition: background .35s, color .35s; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes bellPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(100,140,255,.2); border-radius: 8px; }
        select option { background: #12103d; }
        @media (max-width: 768px) {
          .admin-sidebar { transform: translateX(-100%) !important; transition: transform .3s ease !important; }
          .admin-sidebar.open { transform: translateX(0) !important; }
          .admin-main { margin-left: 0 !important; padding: 20px 16px 40px !important; }
          .admin-stat-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          .admin-settings-grid { grid-template-columns: 1fr !important; }
          .admin-hamburger { display: flex !important; align-items: center; }
          .admin-topbar { flex-wrap: wrap; gap: 12px; }
          .sidebar-close-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .admin-stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:99, backdropFilter:'blur(4px)' }}/>}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`} style={{ position:'fixed', top:0, left:0, bottom:0, width:SW, background:sidebarBg, borderRight:`1px solid ${sidebarBdr}`, backdropFilter:'blur(24px)', zIndex:100, display:'flex', flexDirection:'column', transition:'width .25s ease', overflow:'hidden' }}>

        {/* Profile top */}
        <div style={{ padding: sidebarCollapsed ? '16px 0' : '14px 14px', borderBottom:'1px solid rgba(100,140,255,.1)', display:'flex', flexDirection: sidebarCollapsed ? 'column' : 'row', alignItems:'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', gap:10, minHeight:70 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, overflow:'hidden' }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#ff4d00,#4f8cff)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'.9rem', color:'#fff', flexShrink:0, boxShadow:'0 3px 12px rgba(255,77,0,.3)' }}>V</div>
            {!sidebarCollapsed && (
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:'.84rem', fontWeight:700, color:'#fff', lineHeight:1.2, whiteSpace:'nowrap' }}>Vishal</div>
                <div style={{ fontSize:'.58rem', color:'#ff4d00', marginTop:2, fontWeight:600, letterSpacing:'.06em' }}>Administrator</div>
              </div>
            )}
          </div>

          {/* Toggle button */}
          <button onClick={() => setSidebarCollapsed(c => !c)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ width:28, height:28, borderRadius:8, border:'1px solid rgba(100,140,255,.2)', background: sidebarCollapsed ? 'rgba(79,140,255,.12)' : 'rgba(100,140,255,.06)', color:'#4f8cff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .25s' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(79,140,255,.22)'; e.currentTarget.style.borderColor='rgba(79,140,255,.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background= sidebarCollapsed ? 'rgba(79,140,255,.12)' : 'rgba(100,140,255,.06)'; e.currentTarget.style.borderColor='rgba(100,140,255,.2)'; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'transform .25s', transform: sidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'14px 8px', display:'flex', flexDirection:'column', gap:4 }}>
          {!sidebarCollapsed && <div style={{ fontSize:'.56rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:muted, padding:'0 8px', marginBottom:8 }}>Navigation</div>}
          {NAV.map(item => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                title={sidebarCollapsed ? item.label : undefined}
                style={{ display:'flex', alignItems:'center', gap:10, padding: sidebarCollapsed ? '11px 0' : '11px 12px', borderRadius:10, border:'none', cursor:'pointer', textAlign:'left', width:'100%', fontFamily:"'Montserrat',sans-serif", fontSize:'.82rem', fontWeight:600, transition:'all .2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  background: active ? 'linear-gradient(135deg,rgba(255,77,0,.18),rgba(79,140,255,.12))' : 'transparent',
                  color: active ? (dark ? '#fff' : '#1a1510') : muted,
                  borderLeft: sidebarCollapsed ? 'none' : (active ? '3px solid #ff4d00' : '3px solid transparent'),
                  outline: sidebarCollapsed && active ? `2px solid rgba(255,77,0,.4)` : 'none',
                }}>
                <span style={{ color: active ? '#ff4d00' : muted, display:'flex', flexShrink:0 }}>{item.icon}</span>
                {!sidebarCollapsed && item.label}
                {!sidebarCollapsed && item.id === 'requests' && (stats?.pendingRequests ?? 0) > 0 && (
                  <span style={{ marginLeft:'auto', background:'#ff4d00', color:'#fff', borderRadius:20, padding:'2px 8px', fontSize:'.6rem', fontWeight:800 }}>{stats!.pendingRequests}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Settings + Logout */}
        <div style={{ padding:'12px 8px 8px', borderTop:`1px solid ${sidebarBdr}` }}>
          <button onClick={logout} title={sidebarCollapsed ? 'Sign Out' : undefined}
            style={{ width:'100%', padding:'7px 10px', borderRadius:8, border:'1px solid rgba(255,77,0,.2)', background:'rgba(255,77,0,.06)', color:'#ff4d00', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.72rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap:7, transition:'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,77,0,.15)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,77,0,.06)'}>
            <span style={{ display:'flex', flexShrink:0 }}>{Icons.logout}</span>
            {!sidebarCollapsed && 'Sign Out'}
          </button>
        </div>
        <div style={{ padding:'8px 8px 20px' }}>
          <button onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }} title={sidebarCollapsed ? 'Settings' : undefined}
            style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'none', background: activeTab === 'settings' ? 'linear-gradient(135deg,rgba(255,77,0,.18),rgba(79,140,255,.12))' : 'transparent', color: activeTab === 'settings' ? '#fff' : muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.82rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap:10, transition:'all .2s',
              borderLeft: sidebarCollapsed ? 'none' : (activeTab === 'settings' ? '3px solid #ff4d00' : '3px solid transparent') }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(100,140,255,.08)'}
            onMouseLeave={e => e.currentTarget.style.background= activeTab === 'settings' ? 'linear-gradient(135deg,rgba(255,77,0,.18),rgba(79,140,255,.12))' : 'transparent'}>
            <span style={{ color: activeTab === 'settings' ? '#ff4d00' : muted, display:'flex', flexShrink:0 }}>{settingsIcon}</span>
            {!sidebarCollapsed && 'Settings'}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="admin-main" style={{ marginLeft:SW, height:'100vh', transition:'margin-left .25s ease', display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Topbar */}
        <div style={{ flexShrink:0, background:bg, padding:'16px 32px 12px', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(45,20,80,.92)', border:'1px solid rgba(160,100,255,.25)', borderRadius:14, padding:'12px 20px', backdropFilter:'blur(24px)', boxShadow:'0 4px 24px rgba(45,20,80,.3)' }}>
          {/* Hamburger — mobile only */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display:'none', background:'rgba(100,140,255,.1)', border:'1px solid rgba(100,140,255,.2)', borderRadius:8, padding:'8px 10px', color:'#4f8cff', cursor:'pointer', marginRight:12 }}
            className="admin-hamburger">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div style={{ flex:1 }}>
            <div>
              <h2 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.5rem', fontWeight:900, margin:0, color:'#ffffff' }}>
                {activeTab === 'overview' ? 'Overview' : activeTab === 'requests' ? 'Requests' : activeTab === 'consultations' ? 'Consultations' : activeTab === 'calendar' ? 'Calendar' : activeTab === 'status' ? 'Status Breakdown' : 'Settings'}
              </h2>
              {/* Date pill below — only on calendar */}
              {activeTab === 'calendar' && (
                <button onClick={() => setCalResetKey(k => k + 1)}
                  style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', background:'rgba(255,77,0,.1)', border:'1px solid rgba(255,77,0,.22)', borderRadius:20, cursor:'pointer', transition:'all .2s', marginTop:5 }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,77,0,.2)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,77,0,.1)'}>
                  <span style={{ fontSize:'.65rem', color:'#ff4d00', fontWeight:700, fontFamily:"'Montserrat',sans-serif" }}>{new Date().toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}</span>
                </button>
              )}
            </div>
            {/* Date pill for non-calendar tabs */}
            {activeTab !== 'settings' && activeTab !== 'calendar' && (() => {
              const isConsult = activeTab === 'consultations';
              const pillColor = isConsult ? '#ec4899' : '#4f8cff';
              const pillBg    = isConsult ? 'rgba(236,72,153,.1)' : 'rgba(79,140,255,.1)';
              const pillBgH   = isConsult ? 'rgba(236,72,153,.2)' : 'rgba(79,140,255,.2)';
              const pillBorder= isConsult ? 'rgba(236,72,153,.2)' : 'rgba(79,140,255,.2)';
              return (
                <button onClick={() => { setCalendarMode(isConsult ? 'consultations' : 'requests'); setActiveTab('calendar'); }}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 12px', background:pillBg, border:`1px solid ${pillBorder}`, borderRadius:20, cursor:'pointer', transition:'all .2s', marginTop:6 }}
                  onMouseEnter={e => e.currentTarget.style.background=pillBgH}
                  onMouseLeave={e => e.currentTarget.style.background=pillBg}>
                  <span style={{ fontSize:'.68rem', color:pillColor, fontWeight:600, fontFamily:"'Montserrat',sans-serif" }}>
                    {new Date().toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}
                  </span>
                </button>
              );
            })()}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} title={dark ? 'Light Mode' : 'Dark Mode'}
              style={{ width:42, height:42, borderRadius:10, border:`1px solid ${dark ? 'rgba(255,184,0,.25)' : 'rgba(79,140,255,.25)'}`, background: dark ? 'rgba(255,184,0,.08)' : 'rgba(79,140,255,.08)', color: dark ? '#ffb800' : '#4f8cff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}
              onMouseEnter={e => { e.currentTarget.style.background= dark?'rgba(255,184,0,.2)':'rgba(79,140,255,.2)'; e.currentTarget.style.transform='rotate(15deg)'; }}
              onMouseLeave={e => { e.currentTarget.style.background= dark?'rgba(255,184,0,.08)':'rgba(79,140,255,.08)'; e.currentTarget.style.transform=''; }}>
              {dark
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            {/* Notification Bell */}
            <button onClick={() => setActiveTab(todayConsultCount > todayRequestCount ? 'consultations' : 'requests')}
              style={{ position:'relative', width:42, height:42, borderRadius:10, border:'1px solid rgba(100,140,255,.2)', background:'rgba(100,140,255,.08)', color:'#4f8cff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(100,140,255,.2)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(100,140,255,.08)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {(todayRequestCount + todayConsultCount) > 0 && (
                <span style={{ position:'absolute', top:-5, right:-5, width:18, height:18, borderRadius:'50%', background:'#ff4d00', color:'#fff', fontSize:'.55rem', fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #080d1a', animation:'bellPulse 2s ease infinite' }}>
                  {(todayRequestCount + todayConsultCount) > 9 ? '9+' : (todayRequestCount + todayConsultCount)}
                </span>
              )}
            </button>

            {/* Refresh — hidden on calendar tab */}
            {activeTab !== 'calendar' && (
              <button onClick={refresh}
                style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 18px', background:'rgba(79,140,255,.1)', border:'1px solid rgba(79,140,255,.25)', borderRadius:10, color:'#4f8cff', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.78rem', fontWeight:600, transition:'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(79,140,255,.2)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(79,140,255,.1)'}>
                <span style={{ display:'flex', animation: refreshing ? 'spin .8s linear infinite' : 'none' }}>{Icons.refresh}</span>
                Refresh
              </button>
            )}
          </div>
        </div>
        </div>

        <div style={{ flex:1, padding:'16px 32px 48px', overflowY:'auto' }}>
        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            {/* ── Row 1: Stat Cards ── */}
            <div className="admin-stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20 }}>
              <StatCard label="Total Requests"  value={stats?.totalRequests ?? 0}   color="#6366f1" icon={Icons.users}/>
              <StatCard label="Pending"         value={stats?.pendingRequests ?? 0}  color="#f59e0b" icon={Icons.pending}/>
              <StatCard label="Completed"       value={stats?.completedRequests ?? 0} color="#10b981" icon={Icons.done}/>
              <StatCard label="Active Services" value={stats?.totalServices ?? 0}    color="#ec4899" icon={Icons.rocket}/>
            </div>

            {/* ── Row 2: Today | Week | [icon] | Month | Year ── */}
            {(() => {
              const now = new Date();
              const weekAgo = new Date(Date.now() - 7*864e5);
              const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
              const yearStart  = new Date(now.getFullYear(), 0, 1);
              const weekCount  = requests.filter(r => r.createdAt && new Date(r.createdAt) >= weekAgo).length;
              const monthCount = requests.filter(r => r.createdAt && new Date(r.createdAt) >= monthStart).length;
              const yearCount  = requests.filter(r => r.createdAt && new Date(r.createdAt) >= yearStart).length;

              const QuickBox = ({ label, value, color, sub, onClick }: { label:string; value:number; color:string; sub:string; onClick:()=>void }) => (
                <div onClick={onClick}
                  style={{ background: dark ? 'rgba(26,24,80,.7)' : 'rgba(255,255,255,.85)', border:`1px solid ${color}20`, borderRadius:14, padding:'16px 16px 14px', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:12, cursor:'pointer', transition:'transform .22s, box-shadow .22s', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 28px ${color}22`; (e.currentTarget.querySelector('.qb-arrow') as HTMLElement).style.transform='translateX(3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; (e.currentTarget.querySelector('.qb-arrow') as HTMLElement).style.transform=''; }}>
                  <div style={{ position:'absolute', bottom:-16, right:-16, width:64, height:64, borderRadius:'50%', background:`radial-gradient(circle,${color}18,transparent 70%)`, pointerEvents:'none' }}/>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'.5rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color }}>{label}</span>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:color, opacity:.6 }}/>
                  </div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'2rem', fontWeight:900, color, lineHeight:1, letterSpacing:'-.02em' }}>{value}</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'.58rem', color:muted }}>{sub}</span>
                    <span className="qb-arrow" style={{ fontSize:'.65rem', fontWeight:700, color, transition:'transform .2s' }}>→</span>
                  </div>
                </div>
              );

              return (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16 }}>
              <QuickBox label="Today"      value={todayRequestCount} color="#f97316" sub={now.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})} onClick={() => { setFilterDate(todayKey); setFilterStatus('all'); setFilterService('all'); setSearch(''); setActiveTab('requests'); }}/>
              <QuickBox label="This Week"  value={weekCount}  color="#06b6d4" sub="Last 7 days"  onClick={() => { setFilterDate(''); setFilterStatus('all'); setFilterService('all'); setSearch(''); setActiveTab('requests'); }}/>

              {/* Center — Status Breakdown */}
              <button onClick={() => setActiveTab('status')}
                style={{ background:'linear-gradient(135deg,rgba(139,92,246,.12),rgba(236,72,153,.08))', border:'1px solid rgba(139,92,246,.28)', borderRadius:14, padding:'16px 16px 14px', cursor:'pointer', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:12, transition:'transform .22s, box-shadow .22s', textAlign:'left', fontFamily:"'Montserrat',sans-serif", position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(139,92,246,.22)'; e.currentTarget.style.background='linear-gradient(135deg,rgba(139,92,246,.2),rgba(236,72,153,.14))'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.background='linear-gradient(135deg,rgba(139,92,246,.12),rgba(236,72,153,.08))'; }}>
                <div style={{ position:'absolute', bottom:-16, right:-16, width:64, height:64, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,.15),transparent 70%)', pointerEvents:'none' }}/>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:'.5rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#8b5cf6' }}>Status</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                </div>
                <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.05rem', fontWeight:900, background:'linear-gradient(135deg,#8b5cf6,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1.2 }}>Breakdown</div>
                <span style={{ fontSize:'.58rem', color:'rgba(139,92,246,.7)', fontWeight:600 }}>View details →</span>
              </button>

              <QuickBox label="This Month" value={monthCount} color="#8b5cf6" sub={now.toLocaleDateString('en-IN',{month:'long',year:'numeric'})} onClick={() => { setFilterDate(''); setFilterStatus('all'); setFilterService('all'); setSearch(''); setActiveTab('requests'); }}/>
              <QuickBox label="This Year"  value={yearCount}  color="#14b8a6" sub={`${now.getFullYear()}`} onClick={() => { setFilterDate(''); setFilterStatus('all'); setFilterService('all'); setSearch(''); setActiveTab('requests'); }}/>
            </div>
              );
            })()}

            {/* ── Row 3: Recent Requests ── */}
            <div style={{ background:card, border:`1px solid ${cardBorder}`, borderRadius:16, padding:'20px 24px', backdropFilter:'blur(20px)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <div>
                  <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.95rem', fontWeight:700, color:text, margin:0 }}>Recent Requests</h3>
                  <div style={{ fontSize:'.65rem', color:muted, marginTop:2 }}>Latest client submissions</div>
                </div>
                <button onClick={() => setActiveTab('requests')}
                  style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:8, border:'1px solid rgba(79,140,255,.25)', background:'rgba(79,140,255,.08)', color:'#4f8cff', cursor:'pointer', fontSize:'.72rem', fontWeight:600, fontFamily:"'Montserrat',sans-serif", transition:'all .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(79,140,255,.2)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(79,140,255,.08)'}>
                  View All {Icons.inbox}
                </button>
              </div>

              {(stats?.recentRequests?.length ?? 0) > 0 ? (
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {stats!.recentRequests.map((req, i) => {
                    const s = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.pending;
                    return (
                      <div key={req.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)', borderRadius:10, border:`1px solid ${cardBorder}`, borderLeft:`3px solid ${s.color}`, transition:'all .2s' }}
                        onMouseEnter={e => e.currentTarget.style.background=dark?'rgba(79,140,255,.06)':'rgba(79,140,255,.04)'}
                        onMouseLeave={e => e.currentTarget.style.background=dark?'rgba(255,255,255,.03)':'rgba(0,0,0,.03)'}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:14, textAlign:'center', fontSize:'.6rem', color:muted, fontWeight:700, flexShrink:0 }}>#{i+1}</div>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${s.color},#4f8cff)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'.8rem', color:'#fff', flexShrink:0 }}>
                            {req.name[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:700, color:text, fontSize:'.85rem' }}>{req.name}</div>
                            <div style={{ fontSize:'.68rem', color:muted }}>{req.service || req.email}</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          {req.createdAt && (
                            <div style={{ textAlign:'right' }}>
                              <div style={{ fontSize:'.65rem', color:'#a78bfa', fontWeight:700 }}>{new Date(req.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>
                              <div style={{ fontSize:'.56rem', color:'rgba(167,139,250,.5)' }}>{new Date(req.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
                            </div>
                          )}
                          <span style={{ padding:'3px 10px', borderRadius:20, fontSize:'.6rem', fontWeight:700, background:s.bg, color:s.color, textTransform:'uppercase', whiteSpace:'nowrap' }}>
                            {s.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign:'center', padding:'36px 0', color:muted }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:12, opacity:.3 }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg></div>
                  <div style={{ fontWeight:600, fontSize:'.88rem', marginBottom:4 }}>No requests yet</div>
                  <div style={{ fontSize:'.75rem' }}>Contact form submissions will appear here</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── REQUESTS ── */}
        {activeTab === 'requests' && (
          <>
            {/* Filters */}
            <div style={{ background:card, border:'1px solid rgba(100,140,255,.1)', borderRadius:14, padding:'16px 18px', marginBottom:18, backdropFilter:'blur(20px)' }}>
              {/* Row 1: Search */}
              <div style={{ position:'relative', marginBottom:12 }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:muted, display:'flex' }}>{Icons.search}</span>
                <input type="text" placeholder="Search by name, email or service..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(100,140,255,.18)', borderRadius:10, padding:'10px 16px 10px 40px', color:'#fff', fontSize:'.85rem', outline:'none', fontFamily:"'Montserrat',sans-serif" }}
                  onFocus={e => e.target.style.borderColor='rgba(100,140,255,.5)'}
                  onBlur={e  => e.target.style.borderColor='rgba(100,140,255,.18)'}/>
              </div>
              {/* Row 2: Dropdowns + Date */}
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(100,140,255,.18)', borderRadius:8, padding:'8px 14px', color:'#fff', fontSize:'.8rem', outline:'none', fontFamily:"'Montserrat',sans-serif", cursor:'pointer', flex:1, minWidth:130 }}>
                  <option value="all">All Status</option>
                  {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <select value={filterService} onChange={e => setFilterService(e.target.value)}
                  style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(100,140,255,.18)', borderRadius:8, padding:'8px 14px', color:'#fff', fontSize:'.8rem', outline:'none', fontFamily:"'Montserrat',sans-serif", cursor:'pointer', flex:1, minWidth:150 }}>
                  <option value="all">All Services</option>
                  {allServices.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                  style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(100,140,255,.18)', borderRadius:8, padding:'8px 14px', color: filterDate ? '#fff' : muted, fontSize:'.8rem', outline:'none', fontFamily:"'Montserrat',sans-serif", cursor:'pointer', colorScheme:'dark', flex:1, minWidth:140 }}/>
                {(filterDate || filterStatus !== 'all' || filterService !== 'all' || search) && (
                  <button onClick={() => { setFilterDate(''); setFilterStatus('all'); setFilterService('all'); setSearch(''); }}
                    style={{ padding:'8px 14px', borderRadius:8, border:'1px solid rgba(255,77,0,.3)', background:'rgba(255,77,0,.08)', color:'#ff4d00', cursor:'pointer', fontSize:'.78rem', fontWeight:700, fontFamily:"'Montserrat',sans-serif", whiteSpace:'nowrap' }}>
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Count bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontSize:'.75rem', color:muted, fontWeight:600 }}>{filtered.length} of {requests.length} requests</span>
              <div style={{ display:'flex', gap:8 }}>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => {
                  const cnt = requests.filter(r => r.status === k).length;
                  if (!cnt) return null;
                  return <span key={k} style={{ padding:'3px 10px', borderRadius:20, fontSize:'.65rem', fontWeight:700, background:v.bg, color:v.color }}>{cnt} {v.label}</span>;
                })}
              </div>
            </div>

            {/* Cards */}
            {filtered.length ? (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {filtered.map(req => {
                  const s = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.pending;
                  return (
                    <div key={req.id} style={{ background:card, border:'1px solid rgba(100,140,255,.1)', borderRadius:16, padding:'22px 24px', backdropFilter:'blur(20px)', transition:'box-shadow .2s, border-color .2s', position:'relative', overflow:'hidden' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 40px rgba(0,0,0,.3)'; e.currentTarget.style.borderColor='rgba(100,140,255,.22)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='rgba(100,140,255,.1)'; }}>

                      {/* left accent */}
                      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:3, background:`linear-gradient(180deg,${s.color},${s.color}44,transparent)`, borderRadius:'16px 0 0 16px' }}/>

                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                          <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg,${s.color},#4f8cff)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'1.1rem', color:'#fff', flexShrink:0 }}>
                            {req.name[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:700, color:'#fff', fontSize:'1rem', marginBottom:4 }}>{req.name}</div>
                            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.76rem', color:'#4f8cff' }}>
                              <span style={{ display:'flex', opacity:.6 }}>{Icons.mail}</span>{req.email}
                            </div>
                            {req.company && (
                              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.74rem', color:muted, marginTop:3 }}>
                                <span style={{ display:'flex' }}>{Icons.building}</span>{req.company}
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                          {req.createdAt && (() => { const d = new Date(req.createdAt); return (
                            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2 }}>
                              <span style={{ fontSize:'.72rem', color:'#a78bfa', fontWeight:700, whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:4 }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                              </span>
                              <span style={{ fontSize:'.6rem', color:'rgba(167,139,250,.5)', fontWeight:500, whiteSpace:'nowrap' }}>
                                {d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                              </span>
                            </div>
                          ); })()}
                          <select value={req.status} onChange={e => updateStatus(req.id, e.target.value)}
                            style={{ background:s.bg, border:`1px solid ${s.color}40`, borderRadius:8, padding:'7px 12px', color:s.color, fontSize:'.75rem', fontWeight:700, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", outline:'none' }}>
                            {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Tags row */}
                      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:16 }}>
                        {req.phone && (
                          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', background:'rgba(168,85,247,.1)', border:'1px solid rgba(168,85,247,.2)', borderRadius:8, fontSize:'.74rem', color:'#a855f7', fontWeight:600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            {req.phone}
                          </span>
                        )}
                        {req.service && (
                          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', background:'rgba(79,140,255,.1)', border:'1px solid rgba(79,140,255,.2)', borderRadius:8, fontSize:'.74rem', color:'#4f8cff', fontWeight:600 }}>
                            {Icons.tag} {req.service}
                          </span>
                        )}
                        {req.budget && (
                          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.2)', borderRadius:8, fontSize:'.74rem', color:'#22c55e', fontWeight:600 }}>
                            ₹ {req.budget}
                          </span>
                        )}
                        {req.timeline && (
                          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', background:'rgba(255,184,0,.1)', border:'1px solid rgba(255,184,0,.2)', borderRadius:8, fontSize:'.74rem', color:'#ffb800', fontWeight:600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {req.timeline}
                          </span>
                        )}
                        {req.source && (
                          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', background:'rgba(255,77,0,.1)', border:'1px solid rgba(255,77,0,.2)', borderRadius:8, fontSize:'.74rem', color:'#ff6b35', fontWeight:600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {req.source}
                          </span>
                        )}
                      </div>

                      {req.message && (
                        <div style={{ marginTop:14, padding:'13px 16px', background:'rgba(255,255,255,.03)', borderRadius:10, border:'1px solid rgba(255,255,255,.05)', fontSize:'.82rem', color:'rgba(200,215,245,.65)', lineHeight:1.68, display:'flex', gap:10 }}>
                          <span style={{ display:'flex', flexShrink:0, marginTop:2, opacity:.5 }}>{Icons.message}</span>
                          {req.message}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'80px 0', color:muted }}>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:16, opacity:.3 }}><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
                <div style={{ fontWeight:700, fontSize:'1rem', marginBottom:8 }}>No results found</div>
                <div style={{ fontSize:'.82rem' }}>Try a different search term or filter</div>
              </div>
            )}
          </>
        )}

        {/* ── CONSULTATIONS ── */}
        {activeTab === 'consultations' && (() => {
          const consultations = requests.filter(r => r.notes === 'consultation');
          const pendingC   = consultations.filter(r => r.status === 'pending').length;
          const completedC = consultations.filter(r => r.status === 'completed').length;
          const inProgC    = consultations.filter(r => r.status === 'in_progress').length;

          return (
            <>
              {/* ── Stat Cards ── */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }} className="admin-stat-grid">
                {[
                  { label:'Total',       value: consultations.length, color:'#6366f1', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { label:'Pending',     value: pendingC,   color:'#f59e0b', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                  { label:'In Progress', value: inProgC,    color:'#8b5cf6', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> },
                  { label:'Completed',   value: completedC, color:'#10b981', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
                ].map(s => (
                  <div key={s.label} style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:`1px solid ${s.color}25`, borderRadius:18, padding:'22px 20px', backdropFilter:'blur(24px)', transition:'transform .22s, box-shadow .22s', position:'relative', overflow:'hidden', boxShadow:`0 4px 20px ${s.color}0e`, cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${s.color}28`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=`0 4px 20px ${s.color}0e`; }}>
                    <div style={{ position:'absolute', top:-30, right:-30, width:110, height:110, borderRadius:'50%', background:`radial-gradient(circle,${s.color}20,transparent 70%)`, pointerEvents:'none' }}/>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${s.color}00,${s.color},${s.color}00)` }}/>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, position:'relative' }}>
                      <div style={{ width:44, height:44, borderRadius:13, background:`linear-gradient(135deg,${s.color}22,${s.color}0a)`, border:`1.5px solid ${s.color}35`, display:'flex', alignItems:'center', justifyContent:'center', color:s.color, boxShadow:`0 4px 14px ${s.color}20` }}>{s.icon}</div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
                        <div style={{ width:28, height:3, borderRadius:4, background:`${s.color}40` }}/>
                        <div style={{ width:18, height:3, borderRadius:4, background:`${s.color}25` }}/>
                      </div>
                    </div>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'2.6rem', fontWeight:900, color:s.color, lineHeight:1, marginBottom:8, letterSpacing:'-.02em', position:'relative' }}>{s.value}</div>
                    <div style={{ fontSize:'.67rem', fontWeight:700, color: dark ? 'rgba(200,215,245,.45)' : 'rgba(60,50,30,.45)', textTransform:'uppercase', letterSpacing:'.16em' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* ── Cards ── */}
              {consultations.length === 0 ? (
                <div style={{ background:card, border:'1px solid rgba(100,140,255,.1)', borderRadius:18, padding:'72px 32px', textAlign:'center', backdropFilter:'blur(20px)' }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:18, opacity:.25 }}>
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:800, fontSize:'1.05rem', marginBottom:8 }}>No consultations yet</div>
                  <div style={{ fontSize:'.82rem', color:'rgba(200,215,245,.35)', maxWidth:320, margin:'0 auto' }}>Bookings from <span style={{ color:'#4f8cff' }}>/consultation</span> will appear here</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {consultations.map(req => {
                    const s = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.pending;
                    return (
                      <div key={req.id} style={{ background:card, border:`1px solid rgba(100,140,255,.1)`, borderLeft:`3px solid ${s.color}`, borderRadius:16, overflow:'hidden', backdropFilter:'blur(20px)', transition:'box-shadow .2s' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow=`0 8px 32px rgba(0,0,0,.25)`}
                        onMouseLeave={e => e.currentTarget.style.boxShadow=''}>

                        {/* Top row */}
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid rgba(100,140,255,.07)', gap:12, flexWrap:'wrap' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                            <div style={{ width:46, height:46, borderRadius:'50%', background:`linear-gradient(135deg,${s.color},#4f8cff)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'1.1rem', color:'#fff', flexShrink:0, boxShadow:`0 4px 14px ${s.color}30` }}>
                              {req.name[0].toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight:700, color:'#fff', fontSize:'.95rem', marginBottom:3 }}>{req.name}</div>
                              <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                                <span style={{ fontSize:'.72rem', color:'#4f8cff', display:'flex', alignItems:'center', gap:4 }}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                  {req.email}
                                </span>
                                {req.phone && (
                                  <span style={{ fontSize:'.72rem', color:'#25d366', display:'flex', alignItems:'center', gap:4 }}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    {req.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0 }}>
                            {req.createdAt && (
                              <div style={{ textAlign:'right' }}>
                                <div style={{ fontSize:'.68rem', color:'#a78bfa', fontWeight:700 }}>{new Date(req.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>
                                <div style={{ fontSize:'.58rem', color:'rgba(167,139,250,.45)' }}>{new Date(req.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                              </div>
                            )}
                            <select value={req.status} onChange={e => updateStatus(req.id, e.target.value)}
                              style={{ background:s.bg, border:`1px solid ${s.color}40`, borderRadius:8, padding:'6px 12px', color:s.color, fontSize:'.72rem', fontWeight:700, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", outline:'none' }}>
                              {Object.entries(STATUS_CONFIG).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Detail row */}
                        <div style={{ padding:'14px 22px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'flex-start' }}>
                          {req.service  && <span style={{ padding:'5px 12px', borderRadius:8, background:'rgba(79,140,255,.1)',  border:'1px solid rgba(79,140,255,.2)',  fontSize:'.72rem', color:'#4f8cff',  fontWeight:600, display:'flex', alignItems:'center', gap:5 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>{req.service}</span>}
                          {req.budget   && <span style={{ padding:'5px 12px', borderRadius:8, background:'rgba(34,197,94,.1)',   border:'1px solid rgba(34,197,94,.2)',   fontSize:'.72rem', color:'#22c55e', fontWeight:600 }}>₹ {req.budget}</span>}
                          {req.timeline && <span style={{ padding:'5px 12px', borderRadius:8, background:'rgba(255,184,0,.1)',   border:'1px solid rgba(255,184,0,.2)',   fontSize:'.72rem', color:'#ffb800', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{req.timeline}</span>}
                          {req.source   && <span style={{ padding:'5px 12px', borderRadius:8, background:'rgba(168,85,247,.1)',  border:'1px solid rgba(168,85,247,.2)',  fontSize:'.72rem', color:'#a855f7', fontWeight:600 }}>via {req.source}</span>}
                          {req.message  && (
                            <div style={{ width:'100%', marginTop:4, padding:'12px 14px', background:'rgba(255,255,255,.025)', borderRadius:10, border:'1px solid rgba(255,255,255,.05)', fontSize:'.8rem', color:'rgba(200,215,245,.6)', lineHeight:1.65, display:'flex', gap:10 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,215,245,.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:2 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              {req.message}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}

        {/* ── CALENDAR ── */}
        {activeTab === 'calendar' && (
          <>
            {/* Header */}
            <div style={{ position:'sticky', top:0, zIndex:10, background:bg, paddingBottom:14, paddingTop:2, marginBottom:4, display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', gap:6 }}>
                {(['requests','consultations'] as const).map(mode => {
                  const active = calendarMode === mode;
                  const color  = mode === 'consultations' ? '#ec4899' : '#4f8cff';
                  return (
                    <button key={mode} onClick={() => setCalendarMode(mode)}
                      style={{ padding:'7px 18px', borderRadius:10, border:`1px solid ${active ? color : 'rgba(100,140,255,.15)'}`, background: active ? `${color}18` : 'transparent', color: active ? color : 'rgba(200,215,245,.4)', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.75rem', fontWeight:700, transition:'all .2s' }}>
                      {mode === 'requests' ? 'Client Requests' : 'Consultations'}
                    </button>
                  );
                })}
              </div>
            </div>
            <OrderCalendar key={calResetKey} requests={calendarMode === 'consultations' ? requests.filter(r => r.notes === 'consultation') : requests.filter(r => r.notes !== 'consultation')} />
          </>
        )}

        {/* ── STATUS BREAKDOWN ── */}
        {activeTab === 'status' && (
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <button onClick={() => setActiveTab('overview')}
              style={{ display:'inline-flex', alignItems:'center', gap:6, background:'none', border:`1px solid ${cardBorder}`, borderRadius:8, padding:'7px 14px', color:muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.78rem', fontWeight:600, alignSelf:'flex-start', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#4f8cff'; e.currentTarget.style.color='#4f8cff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=cardBorder; e.currentTarget.style.color=muted; }}>
              ← Back to Overview
            </button>

            {/* Requests status */}
            <div style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:'1px solid rgba(99,102,241,.25)', borderRadius:18, padding:'26px', backdropFilter:'blur(24px)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.15),transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#6366f100,#6366f1,#6366f100)' }}/>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(99,102,241,.15)', border:'1.5px solid rgba(99,102,241,.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#6366f1' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#6366f1' }}>Client Requests</div>
                  <div style={{ fontSize:'.58rem', color:muted, marginTop:2 }}>Status distribution</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => {
                  const cnt = requests.filter(r => r.status === k && r.notes !== 'consultation').length;
                  const total = requests.filter(r => r.notes !== 'consultation').length;
                  const pct = total ? Math.round((cnt/total)*100) : 0;
                  return (
                    <div key={k}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:v.color, boxShadow:`0 0 6px ${v.color}` }}/>
                          <span style={{ fontSize:'.75rem', color:v.color, fontWeight:700 }}>{v.label}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1rem', fontWeight:900, color:v.color }}>{cnt}</span>
                          <span style={{ fontSize:'.65rem', color:muted, minWidth:30, textAlign:'right' }}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{ background:dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)', borderRadius:8, height:8, overflow:'hidden' }}>
                        <div style={{ width:`${pct}%`, height:'100%', background:`linear-gradient(90deg,${v.color},${v.color}aa)`, borderRadius:8, transition:'width .6s cubic-bezier(.4,0,.2,1)', boxShadow:`0 0 8px ${v.color}50` }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consultations status */}
            <div style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:'1px solid rgba(236,72,153,.25)', borderRadius:18, padding:'26px', backdropFilter:'blur(24px)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,.15),transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#ec489900,#ec4899,#ec489900)' }}/>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(236,72,153,.15)', border:'1.5px solid rgba(236,72,153,.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#ec4899' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#ec4899' }}>Consultations</div>
                  <div style={{ fontSize:'.58rem', color:muted, marginTop:2 }}>Status distribution</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => {
                  const cnt = requests.filter(r => r.status === k && r.notes === 'consultation').length;
                  const total = requests.filter(r => r.notes === 'consultation').length;
                  const pct = total ? Math.round((cnt/total)*100) : 0;
                  return (
                    <div key={k}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:v.color, boxShadow:`0 0 6px ${v.color}` }}/>
                          <span style={{ fontSize:'.75rem', color:v.color, fontWeight:700 }}>{v.label}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1rem', fontWeight:900, color:v.color }}>{cnt}</span>
                          <span style={{ fontSize:'.65rem', color:muted, minWidth:30, textAlign:'right' }}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{ background:dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)', borderRadius:8, height:8, overflow:'hidden' }}>
                        <div style={{ width:`${pct}%`, height:'100%', background:`linear-gradient(90deg,${v.color},${v.color}aa)`, borderRadius:8, transition:'width .6s cubic-bezier(.4,0,.2,1)', boxShadow:`0 0 8px ${v.color}50` }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
              {[
                { label:'Total Requests',      value: requests.filter(r => r.notes !== 'consultation').length, color:'#6366f1' },
                { label:'Total Consultations', value: requests.filter(r => r.notes === 'consultation').length, color:'#ec4899' },
                { label:"Today's Requests",    value: todayRequestCount, color:'#f97316' },
                { label:'This Week',           value: requests.filter(r => { if (!r.createdAt) return false; return new Date(r.createdAt) >= new Date(Date.now() - 7*864e5); }).length, color:'#10b981' },
              ].map(s => (
                <div key={s.label} style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:`1px solid ${s.color}22`, borderRadius:16, padding:'18px 20px', backdropFilter:'blur(24px)', position:'relative', overflow:'hidden', transition:'transform .2s, box-shadow .2s', cursor:'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${s.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${s.color}00,${s.color},${s.color}00)` }}/>
                  <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:'50%', background:`radial-gradient(circle,${s.color}18,transparent 70%)`, pointerEvents:'none' }}/>
                  <div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:s.color, marginBottom:10 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'2.2rem', fontWeight:900, color:s.color, letterSpacing:'-.02em' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div style={{ display:'flex', flexDirection:'column', gap:16, maxWidth:900 }}>

            {/* Row 1: Profile only */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:16, alignItems:'start' }}>

              {/* Profile Card */}
              <div style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:'1px solid rgba(99,102,241,.22)', borderRadius:20, padding:'24px', backdropFilter:'blur(24px)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.14),transparent 70%)', pointerEvents:'none' }}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#6366f100,#6366f1,#ec489980,#6366f100)' }}/>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20, position:'relative' }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#6366f1,#ec4899)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'1.4rem', color:'#fff', flexShrink:0, boxShadow:'0 6px 20px rgba(99,102,241,.4)' }}>V</div>
                  <div>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1rem', fontWeight:900, color: dark ? '#fff' : '#1a1510', marginBottom:2 }}>Vishal Kumar</div>
                    <div style={{ fontSize:'.68rem', color:'#6366f1', fontWeight:600, marginBottom:6 }}>vishalkumar86765@gmail.com</div>
                    <span style={{ padding:'2px 10px', borderRadius:20, fontSize:'.52rem', fontWeight:700, background:'rgba(99,102,241,.15)', color:'#6366f1', textTransform:'uppercase', letterSpacing:'.1em', border:'1px solid rgba(99,102,241,.3)' }}>Administrator</span>
                  </div>
                </div>
                <div style={{ height:1, background: dark ? 'rgba(99,102,241,.1)' : 'rgba(99,102,241,.07)', marginBottom:16 }}/>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  {[
                    { label:'Username', value:'foundervishal', color:'#6366f1' },
                    { label:'Role',     value:'Admin',         color:'#ec4899' },
                    { label:'Company',  value:'LaunchifyX',    color:'#f59e0b' },
                    { label:'Based In', value:'India',         color:'#10b981' },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 13px', background: dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.025)', borderRadius:10, border:`1px solid ${color}18` }}>
                      <span style={{ fontSize:'.68rem', color:muted, fontWeight:600 }}>{label}</span>
                      <span style={{ fontSize:'.78rem', fontWeight:700, color: dark ? '#fff' : '#1a1510' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Social Links Manager — full width */}
            {(() => {
              const PLATFORM_META: Record<string,{label:string;color:string;placeholder:string}> = {
                social_linkedin:  { label:'LinkedIn',    color:'#06b6d4', placeholder:'https://linkedin.com/company/...' },
                social_instagram: { label:'Instagram',   color:'#ec4899', placeholder:'https://instagram.com/...' },
                social_twitter:   { label:'X / Twitter', color:'#6366f1', placeholder:'https://x.com/...' },
                social_facebook:  { label:'Facebook',    color:'#3b82f6', placeholder:'https://facebook.com/...' },
                social_youtube:   { label:'YouTube',     color:'#f97316', placeholder:'https://youtube.com/@...' },
                social_whatsapp:  { label:'WhatsApp',    color:'#10b981', placeholder:'https://wa.me/91...' },
              };

              const activeSocials = Object.entries(socialLinks).filter(([k,v]) => k.startsWith('social_') && v);
              const addedKeys = activeSocials.map(([k]) => k);

              const handleAdd = async () => {
                if (!socialNewUrl.trim()) return;
                const updated = { ...socialLinks, [socialNewKey]: socialNewUrl.trim() };
                setSocialLinks(updated);
                setSocialNewUrl('');
                setSocialSaving(true);
                try {
                  await fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updated) });
                  setSocialSaved(true);
                  setTimeout(() => setSocialSaved(false), 2500);
                } catch {}
                setSocialSaving(false);
              };
              const handleSave = async (key: string) => {
                const updated = { ...socialLinks, [key]: socialEditVal };
                setSocialLinks(updated);
                setSocialEditKey(null);
                setSocialSaving(true);
                try {
                  await fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updated) });
                  setSocialSaved(true);
                  setTimeout(() => setSocialSaved(false), 2500);
                } catch {}
                setSocialSaving(false);
              };
              const handleDelete = async (key: string) => {
                const updated = { ...socialLinks, [key]: '' };
                setSocialLinks(updated);
                setSocialConfirmDel(null);
                setSocialSaving(true);
                try {
                  await fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updated) });
                  setSocialSaved(true);
                  setTimeout(() => setSocialSaved(false), 2500);
                } catch {}
                setSocialSaving(false);
              };

              return (
                <div style={{ background: dark ? 'rgba(26,24,80,.8)' : 'rgba(255,255,255,.9)', border:'1px solid rgba(139,92,246,.22)', borderRadius:20, padding:'24px 26px', backdropFilter:'blur(24px)', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)', pointerEvents:'none' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#8b5cf600,#8b5cf6,#ec489980,#8b5cf600)' }}/>

                  {/* Header */}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, position:'relative' }}>
                    <div>
                      <div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#8b5cf6', marginBottom:3 }}>Social Media Handles</div>
                      <div style={{ fontSize:'.68rem', color:muted }}>Add, edit ya delete karo — website pe turant reflect hoga</div>
                    </div>
                    <button onClick={saveSettings} disabled={socialSaving}
                      style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:10, border:'none', background: socialSaved ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#8b5cf6,#6366f1)', color:'#fff', cursor: socialSaving ? 'not-allowed' : 'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.75rem', fontWeight:700, transition:'all .2s', opacity: socialSaving ? .7 : 1, flexShrink:0 }}>
                      {socialSaved ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Saved!</> : socialSaving ? 'Saving...' : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save Changes</>}
                    </button>
                  </div>

                  {/* Existing handles list */}
                  <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:18 }}>
                    {activeSocials.length === 0 && (
                      <div style={{ textAlign:'center', padding:'20px 0', color:muted, fontSize:'.78rem' }}>Koi social link nahi hai — neeche se add karo</div>
                    )}
                    {activeSocials.map(([key, url]) => {
                      const meta = PLATFORM_META[key] ?? { label: key.replace('social_',''), color:'#8b5cf6', placeholder:'' };
                      const isEditing = socialEditKey === key;
                      const isDeleting = socialConfirmDel === key;
                      return (
                        <div key={key} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 14px', background: dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.025)', borderRadius:12, border:`1.5px solid ${isEditing ? meta.color : meta.color+'22'}`, transition:'border-color .2s' }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:meta.color, flexShrink:0, boxShadow:`0 0 6px ${meta.color}80` }}/>
                          <span style={{ fontSize:'.68rem', fontWeight:700, color:meta.color, minWidth:80, flexShrink:0 }}>{meta.label}</span>

                          {isEditing ? (
                            <>
                              <input autoFocus value={socialEditVal} onChange={e => setSocialEditVal(e.target.value)}
                                onKeyDown={e => { if(e.key==='Enter') handleSave(key); if(e.key==='Escape') setSocialEditKey(null); }}
                                style={{ flex:1, background: dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.04)', border:`1.5px solid ${meta.color}`, borderRadius:8, padding:'6px 12px', color: dark?'#e8eef8':'#1a1510', fontSize:'.8rem', outline:'none', fontFamily:"'Montserrat',sans-serif" }}/>
                              <button onClick={() => handleSave(key)} style={{ padding:'5px 14px', borderRadius:7, border:'none', background:'#10b981', color:'#fff', cursor:'pointer', fontSize:'.7rem', fontWeight:700, fontFamily:"'Montserrat',sans-serif" }}>Save</button>
                              <button onClick={() => setSocialEditKey(null)} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid rgba(200,215,245,.15)', background:'transparent', color:muted, cursor:'pointer', fontSize:'.7rem', fontWeight:600, fontFamily:"'Montserrat',sans-serif" }}>Cancel</button>
                            </>
                          ) : isDeleting ? (
                            <>
                              <span style={{ flex:1, fontSize:'.72rem', color:'#f97316', fontWeight:600 }}>Delete karna chahte ho?</span>
                              <button onClick={() => handleDelete(key)} style={{ padding:'5px 14px', borderRadius:7, border:'none', background:'#ef4444', color:'#fff', cursor:'pointer', fontSize:'.7rem', fontWeight:700, fontFamily:"'Montserrat',sans-serif" }}>Haan, Delete</button>
                              <button onClick={() => setSocialConfirmDel(null)} style={{ padding:'5px 12px', borderRadius:7, border:'1px solid rgba(200,215,245,.15)', background:'transparent', color:muted, cursor:'pointer', fontSize:'.7rem', fontWeight:600, fontFamily:"'Montserrat',sans-serif" }}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <span style={{ flex:1, fontSize:'.75rem', color:muted, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{url}</span>
                              <a href={url} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:7, border:'1px solid rgba(100,140,255,.15)', background:'rgba(100,140,255,.06)', color:'#4f8cff', textDecoration:'none', flexShrink:0, transition:'all .2s' }}
                                onMouseEnter={e => e.currentTarget.style.background='rgba(100,140,255,.18)'}
                                onMouseLeave={e => e.currentTarget.style.background='rgba(100,140,255,.06)'}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                              </a>
                              <button onClick={() => { setSocialEditKey(key); setSocialEditVal(url); setSocialConfirmDel(null); }}
                                style={{ display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:7, border:`1px solid ${meta.color}30`, background:`${meta.color}10`, color:meta.color, cursor:'pointer', flexShrink:0, transition:'all .2s' }}
                                onMouseEnter={e => e.currentTarget.style.background=`${meta.color}25`}
                                onMouseLeave={e => e.currentTarget.style.background=`${meta.color}10`}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button onClick={() => { setSocialConfirmDel(key); setSocialEditKey(null); }}
                                style={{ display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:7, border:'1px solid rgba(239,68,68,.25)', background:'rgba(239,68,68,.08)', color:'#ef4444', cursor:'pointer', flexShrink:0, transition:'all .2s' }}
                                onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,.2)'}
                                onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,.08)'}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add new handle */}
                  <div style={{ borderTop:`1px solid ${dark?'rgba(139,92,246,.12)':'rgba(139,92,246,.08)'}`, paddingTop:18 }}>
                    <div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#8b5cf6', marginBottom:14 }}>Platform Select Karo</div>
                    {/* Platform pill buttons */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:14 }}>
                      {Object.entries(PLATFORM_META).filter(([k]) => !addedKeys.includes(k)).map(([k, m]) => (
                        <button key={k} onClick={() => setSocialNewKey(k)}
                          style={{ padding:'6px 14px', borderRadius:20, border:`1.5px solid ${socialNewKey===k ? m.color : m.color+'30'}`, background: socialNewKey===k ? `${m.color}18` : 'transparent', color: socialNewKey===k ? m.color : muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.72rem', fontWeight:700, transition:'all .2s' }}
                          onMouseEnter={e => { if(socialNewKey!==k){ e.currentTarget.style.borderColor=m.color+'60'; e.currentTarget.style.color=m.color; }}}
                          onMouseLeave={e => { if(socialNewKey!==k){ e.currentTarget.style.borderColor=m.color+'30'; e.currentTarget.style.color=muted; }}}>
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <input type="text" placeholder={PLATFORM_META[socialNewKey]?.placeholder ?? 'https://...'} value={socialNewUrl} onChange={e => setSocialNewUrl(e.target.value)}
                        onKeyDown={e => { if(e.key==='Enter') handleAdd(); }}
                        style={{ flex:1, background: dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.03)', border:`1.5px solid ${(PLATFORM_META[socialNewKey]?.color ?? '#8b5cf6')+'30'}`, borderRadius:10, padding:'10px 14px', color: dark?'#e8eef8':'#1a1510', fontSize:'.82rem', outline:'none', fontFamily:"'Montserrat',sans-serif", transition:'border-color .2s' }}
                        onFocus={e => e.target.style.borderColor=PLATFORM_META[socialNewKey]?.color ?? '#8b5cf6'}
                        onBlur={e => e.target.style.borderColor=(PLATFORM_META[socialNewKey]?.color ?? '#8b5cf6')+'30'}/>
                      <button onClick={handleAdd}
                        style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 20px', borderRadius:10, border:'none', background:`linear-gradient(135deg,${PLATFORM_META[socialNewKey]?.color ?? '#8b5cf6'},#6366f1)`, color:'#fff', cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.8rem', fontWeight:700, flexShrink:0, boxShadow:`0 4px 14px ${PLATFORM_META[socialNewKey]?.color ?? '#8b5cf6'}40` }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        )}
        </div>

      </main>
    </div>
  );
}
