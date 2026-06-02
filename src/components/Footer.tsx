'use client';

import { useTheme } from '@/context/ThemeContext';

const LINKS: Record<string, [string, string][]> = {
  Services: [['Web Development','#services'],['Mobile Apps','#services'],['E-Commerce','#services'],['Branding','#services']],
  Company:  [['About Us','#'],['Portfolio','#portfolio'],['Blog','#'],['Contact','#contact']],
  Connect:  [['LinkedIn','https://www.linkedin.com/company/launchifyx'],['Instagram','https://www.instagram.com/launchifyx'],['Twitter / X','#'],['Behance','#']],
};

export default function Footer() {
  const { dark } = useTheme();
  const bg     = dark ? '#0b0d18' : '#eaecf8';
  const border = dark ? '#232545' : '#c8ccec';
  const text   = dark ? '#f0f2ff' : '#0d0f20';
  const muted  = '#6c7591';
  const linkC  = dark ? 'rgba(240,242,255,.44)' : 'rgba(0,0,50,.45)';

  return (
    <footer style={{ background:bg,borderTop:`1px solid ${border}`,padding:'62px 60px 32px',transition:'background .35s' }}>
      <div className="footer-top" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:50,flexWrap:'wrap',gap:40 }}>
        <div style={{ maxWidth:280 }}>
          <a href="#hero" style={{ display:'flex',alignItems:'center',gap:10,textDecoration:'none',marginBottom:14 }}>
            <div style={{ width:36,height:36,borderRadius:'50%',overflow:'hidden',border:'2px solid rgba(79,140,255,.3)',flexShrink:0,background:'#0d1633',display:'flex',alignItems:'center',justifyContent:'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="LaunchifyX" style={{ width:32,height:32,objectFit:'contain' }}/>
            </div>
            <span style={{ fontFamily:"'Exo 2',sans-serif",fontSize:'.98rem',fontWeight:800,color:text }}>
              Launchify<span style={{ background:'linear-gradient(135deg,#4f8cff,#ff8c00)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>X</span>
            </span>
          </a>
          <p style={{ fontFamily:"'Montserrat',sans-serif",color:muted,fontSize:'.82rem',lineHeight:1.72 }}>Empowering founders and startups to launch, grow, and dominate digitally — one product at a time.</p>
          {/* Social badges */}
          <div style={{ display:'flex',gap:10,marginTop:18 }}>
            <a href="https://www.linkedin.com/company/launchifyx" target="_blank" rel="noopener noreferrer"
              style={{ width:34,height:34,borderRadius:'50%',border:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'center',color:'#0a66c2',textDecoration:'none',background:'rgba(10,102,194,.08)',fontSize:'1rem',transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(10,102,194,.2)'; e.currentTarget.style.borderColor='#0a66c2'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(10,102,194,.08)'; e.currentTarget.style.borderColor=border; }}>in</a>
            <a href="https://www.instagram.com/launchifyx" target="_blank" rel="noopener noreferrer"
              style={{ width:34,height:34,borderRadius:'50%',border:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'center',color:'#e1306c',textDecoration:'none',background:'rgba(225,48,108,.08)',fontSize:'.85rem',transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(225,48,108,.2)'; e.currentTarget.style.borderColor='#e1306c'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(225,48,108,.08)'; e.currentTarget.style.borderColor=border; }}>📸</a>
          </div>
        </div>
        {Object.entries(LINKS).map(([group,items]) => (
          <div key={group}>
            <h4 style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.6rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:muted,marginBottom:16 }}>{group}</h4>
            <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:9 }}>
              {items.map(([label,href]) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer"
                    style={{ fontFamily:"'Montserrat',sans-serif",color:linkC,fontSize:'.82rem',textDecoration:'none',transition:'color .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=text}
                    onMouseLeave={e=>e.currentTarget.style.color=linkC}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:24,borderTop:`1px solid ${border}`,flexWrap:'wrap',gap:10 }}>
        <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.72rem',color:muted }}>© 2025 <span style={{ color:'#ff4d00' }}>LaunchifyX</span>. All rights reserved.</p>
        <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:'.7rem',color:muted }}>Built with ❤️ for Founders who Dream Big</p>
      </div>
    </footer>
  );
}
