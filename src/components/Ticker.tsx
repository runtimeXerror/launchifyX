const ITEMS = ['WEB DEVELOPMENT','MOBILE APPS','E-COMMERCE','BRANDING','STARTUP LAUNCH','UI/UX DESIGN'];
const repeated = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div style={{ background:'linear-gradient(90deg,#ff4d00,#ff8c00,#ffb800)', padding:'13px 0', overflow:'hidden', whiteSpace:'nowrap', position:'relative', zIndex:1 }}>
      <div style={{ display:'inline-block', animation:'ticker 28s linear infinite', fontFamily:"'Exo 2',sans-serif", fontSize:'.92rem', fontWeight:700, letterSpacing:'.14em' }}>
        {repeated.map((item, i) => (
          <span key={i}>
            {item}
            <em style={{ margin:'0 30px', color:'rgba(255,255,255,.38)', fontStyle:'normal' }}>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}
