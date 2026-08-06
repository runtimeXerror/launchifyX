'use client';

import { useTheme } from '@/context/ThemeContext';

export default function AnnouncementBar() {
  const { dark } = useTheme();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '6px 20px',
      background: dark ? 'rgba(8,13,26,.92)' : 'rgba(250,248,243,.95)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.07)'}`,
      backdropFilter: 'blur(12px)',
      flexWrap: 'nowrap',
      overflow: 'hidden',
    }}>
      {/* Trusted */}
      <span style={{ width:6,height:6,background:'#22c55e',borderRadius:'50%',flexShrink:0,animation:'blink 1.5s ease infinite',display:'inline-block' }}/>
      <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:600,color:'#22c55e',whiteSpace:'nowrap' }}>10+ Founders Trust Us</span>

      <span style={{ color:dark?'rgba(255,255,255,.15)':'rgba(0,0,0,.15)', fontSize:'.8rem' }}>·</span>

      {/* Accepting */}
      <span style={{ width:6,height:6,background:'#22c55e',borderRadius:'50%',flexShrink:0,animation:'avail-ping 2s ease infinite',display:'inline-block' }}/>
      <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:600,color:dark?'rgba(250,245,232,.5)':'rgba(26,21,16,.45)',whiteSpace:'nowrap' }}>Accepting Projects · 24hr Response</span>

      <span style={{ color:dark?'rgba(255,255,255,.12)':'rgba(0,0,0,.12)', fontSize:'.8rem', margin:'0 4px' }}>|</span>

      {/* Stats */}
      {([['50+','Projects'],['98%','Satisfaction'],['5x','Growth']] as const).map(([n,l], i) => (
        <span key={l} style={{ display:'inline-flex',alignItems:'baseline',gap:3,whiteSpace:'nowrap' }}>
          {i > 0 && <span style={{ color:dark?'rgba(255,255,255,.12)':'rgba(0,0,0,.12)', fontSize:'.8rem', margin:'0 2px' }}>·</span>}
          <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.78rem',fontWeight:800,color:'#ff4d00' }}>{n}</span>
          <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.55rem',fontWeight:500,color:dark?'rgba(250,245,232,.4)':'rgba(26,21,16,.4)',textTransform:'uppercase',letterSpacing:'.08em' }}>{l}</span>
        </span>
      ))}
    </div>
  );
}
