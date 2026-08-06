'use client';

import { useTheme } from '@/context/ThemeContext';

const ITEMS = [
  { text: 'WEB DEVELOPMENT',  accent: '#4f8cff' },
  { text: 'MOBILE APPS',      accent: '#a855f7' },
  { text: 'E-COMMERCE',       accent: '#ff4d00' },
  { text: 'BRANDING',         accent: '#ffb800' },
  { text: 'STARTUP LAUNCH',   accent: '#22c55e' },
  { text: 'UI/UX DESIGN',     accent: '#e1306c' },
];

const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function Ticker() {
  const { dark } = useTheme();
  const bg   = dark ? '#12103d' : '#faf8f3';

  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      background: bg,
      overflow: 'hidden',
      padding: '0',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* fade edges */}
      <div style={{ position:'absolute',left:0,top:0,bottom:0,width:120,background:`linear-gradient(90deg,${bg},transparent)`,zIndex:2,pointerEvents:'none' }}/>
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:120,background:`linear-gradient(270deg,${bg},transparent)`,zIndex:2,pointerEvents:'none' }}/>

      <div style={{ display:'flex', animation:'ticker 35s linear infinite', width:'max-content', alignItems:'center' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:0, flexShrink:0 }}>
            <span style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: '.72rem',
              fontWeight: 700,
              letterSpacing: '.2em',
              color: dark ? 'rgba(250,245,232,.45)' : 'rgba(26,21,16,.4)',
              padding: '0 28px',
              whiteSpace: 'nowrap',
              transition: 'color .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = item.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = dark ? 'rgba(250,245,232,.45)' : 'rgba(26,21,16,.4)'; }}
            >
              {item.text}
            </span>
            {/* colored dot separator */}
            <span style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: item.accent,
              opacity: 0.6,
              flexShrink: 0,
            }}/>
          </span>
        ))}
      </div>
    </div>
  );
}
