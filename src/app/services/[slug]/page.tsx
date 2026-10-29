'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';

const SERVICES: Record<string, {
  title: string; color: string; tagline: string;
  overview: string;
  whatYouGet: { heading: string; points: string[] }[];
  process: { step: string; title: string; desc: string }[];
  ideal: string[];
  deliverables: string[];
  timeline: string; startingPrice: string;
}> = {
  'custom-website-development': {
    title: 'Custom Website Development', color: '#4f8cff',
    tagline: 'Your brand deserves a website that works as hard as you do.',
    overview: 'We build fully custom websites from scratch — no templates, no shortcuts. Every pixel is crafted to match your brand, your goals, and your audience. Whether you need a business landing page, a portfolio, or a full multi-page website, we deliver fast, responsive, and SEO-ready results.',
    whatYouGet: [
      { heading: 'Design & UI', points: ['100% Custom Design — no templates', 'Mobile-First & Fully Responsive', 'Dark/Light Mode (if needed)', 'Animations & Smooth Interactions', 'Brand-consistent Color & Typography'] },
      { heading: 'Development', points: ['Built with Next.js / React for speed', 'SEO Optimized — meta tags, sitemap, schema', 'Fast Load Time (90+ PageSpeed Score)', 'Secure HTTPS & SSL Setup', 'CMS Integration (if content updates needed)'] },
      { heading: 'Pages Included', points: ['Home / Landing Page', 'About Us', 'Services / What We Do', 'Contact Page with Form', 'Additional pages as per requirement'] },
      { heading: 'Post Launch', points: ['1 Month Free Bug Support', 'Deployment on your domain', 'Google Analytics Setup', 'Basic SEO Setup', 'Training to update content (if CMS)'] },
    ],
    process: [
      { step: '01', title: 'Discovery Call', desc: 'We understand your business, goals, target audience, and competitors.' },
      { step: '02', title: 'Planning & Wireframe', desc: 'We map out the site structure, pages, and layout before writing a single line of code.' },
      { step: '03', title: 'Design', desc: 'Full UI design with your brand colors, fonts, and visual identity.' },
      { step: '04', title: 'Development', desc: 'We build the site — fast, clean, and fully responsive.' },
      { step: '05', title: 'Testing', desc: 'Cross-browser, cross-device testing. Speed and SEO checks.' },
      { step: '06', title: 'Launch & Handover', desc: 'We go live and hand over everything — code, credentials, and training.' },
    ],
    ideal: ['Businesses without an online presence', 'Freelancers & consultants needing a portfolio', 'Startups needing a launch-ready website', 'Anyone whose current website is outdated or slow'],
    deliverables: ['Fully functional website', 'Source code', 'Deployed on your domain', 'Google Analytics integration', 'SEO setup', '1 month support'],
    timeline: '1 – 3 Weeks', startingPrice: '₹8,000',
  },
  'mobile-app-development': {
    title: 'Mobile App Development', color: '#a855f7',
    tagline: 'An app your users will love — on both iOS and Android.',
    overview: 'We build cross-platform mobile apps using React Native — one codebase, two platforms (iOS & Android). From concept to App Store, we handle everything: design, development, backend, and deployment.',
    whatYouGet: [
      { heading: 'App Design', points: ['Clean, intuitive UI/UX design', 'Platform-specific design patterns', 'Onboarding flow & splash screens', 'Dark mode support', 'Figma prototype before development'] },
      { heading: 'Development', points: ['React Native (iOS + Android)', 'Real-time features (chat, notifications)', 'REST API & backend integration', 'Authentication (OTP, Google, Email)', 'Offline support where needed'] },
      { heading: 'Backend & Database', points: ['Node.js / Next.js API backend', 'PostgreSQL / Firebase database', 'Cloud storage for media files', 'Admin panel for managing data', 'Secure data handling'] },
      { heading: 'Deployment', points: ['Google Play Store submission', 'Apple App Store submission', 'App Store listing optimization', 'Push notification setup', '1 month post-launch support'] },
    ],
    process: [
      { step: '01', title: 'Requirement Gathering', desc: 'What does your app do? Who uses it? What problem does it solve?' },
      { step: '02', title: 'UI/UX Design', desc: 'Wireframes first, then full visual design in Figma.' },
      { step: '03', title: 'Frontend Development', desc: 'We build the app screens using React Native.' },
      { step: '04', title: 'Backend & API', desc: 'Server, database, and APIs — all connected and secured.' },
      { step: '05', title: 'Testing', desc: 'Manual and automated testing on real devices.' },
      { step: '06', title: 'Store Submission', desc: 'We submit to Play Store and App Store and handle review responses.' },
    ],
    ideal: ['Businesses needing a customer-facing app', 'Startups with an app idea', 'Service providers wanting booking/delivery apps', 'Anyone with an existing website who needs a mobile version'],
    deliverables: ['iOS + Android app', 'Backend & admin panel', 'Source code', 'Store listing assets', 'App Store submission', '1 month support'],
    timeline: '4 – 10 Weeks', startingPrice: '₹25,000',
  },
  'e-commerce-development': {
    title: 'E-Commerce Development', color: '#ff4d00',
    tagline: 'Your online store — built to sell, built to scale.',
    overview: 'We build powerful e-commerce stores that are fast, secure, and easy to manage. From product listings to payment gateway integration, we handle everything so you can focus on selling.',
    whatYouGet: [
      { heading: 'Store Features', points: ['Product catalog with categories & filters', 'Shopping cart & wishlist', 'Secure checkout flow', 'Order tracking for customers', 'Coupon & discount system'] },
      { heading: 'Payments & Security', points: ['Razorpay / Stripe / PayU integration', 'UPI, Card, Net Banking support', 'SSL & HTTPS security', 'PCI-compliant payment handling', 'Automatic invoice generation'] },
      { heading: 'Admin Dashboard', points: ['Add/edit/delete products easily', 'Order management & status updates', 'Customer management', 'Sales & revenue reports', 'Inventory tracking & alerts'] },
      { heading: 'Performance & SEO', points: ['Fast loading product pages', 'SEO-friendly URLs & meta tags', 'Mobile-first responsive design', 'Image optimization', 'Google Shopping ready'] },
    ],
    process: [
      { step: '01', title: 'Business Understanding', desc: 'What do you sell? How many products? Who are your customers?' },
      { step: '02', title: 'Store Architecture', desc: 'We plan categories, product structure, and checkout flow.' },
      { step: '03', title: 'Design', desc: 'Custom store design — homepage, product pages, cart, and checkout.' },
      { step: '04', title: 'Development', desc: 'Full store development with payment integration and admin panel.' },
      { step: '05', title: 'Testing', desc: 'Full checkout flow testing, payment testing, mobile testing.' },
      { step: '06', title: 'Launch', desc: 'Go live, product upload support, and handover.' },
    ],
    ideal: ['Product-based businesses going online', 'Retail shops needing an online store', 'Dropshipping businesses', 'D2C brands launching online'],
    deliverables: ['Full e-commerce website', 'Admin dashboard', 'Payment gateway integration', 'Source code', 'Product upload training', '1 month support'],
    timeline: '2 – 5 Weeks', startingPrice: '₹15,000',
  },
  'website-app-maintenance': {
    title: 'Website & App Maintenance', color: '#ffb800',
    tagline: 'We keep your product running — so you never have to worry.',
    overview: 'A website or app is never truly "done." It needs regular updates, security patches, performance monitoring, and feature improvements. We offer flexible monthly maintenance plans so your product always stays fast, secure, and up-to-date.',
    whatYouGet: [
      { heading: 'Bug Fixes & Support', points: ['Priority bug reporting & fixing', 'Cross-browser compatibility fixes', 'Form & functionality issues', 'Database errors & downtime response', 'Same-day response for critical issues'] },
      { heading: 'Performance & Security', points: ['Monthly speed & performance audit', 'Security vulnerability checks', 'SSL certificate renewal', 'Malware scanning & removal', 'Server & hosting monitoring'] },
      { heading: 'Updates & Improvements', points: ['Content updates (text, images, prices)', 'Package & dependency updates', 'Small feature additions', 'UI tweaks & improvements', 'SEO monitoring & updates'] },
      { heading: 'Reporting', points: ['Monthly maintenance report', 'Uptime monitoring (99.9% target)', 'Google Analytics summary', 'Task log of all work done', 'Suggestions for improvement'] },
    ],
    process: [
      { step: '01', title: 'Onboarding', desc: 'We get access to your codebase, hosting, and domain.' },
      { step: '02', title: 'Initial Audit', desc: 'We run a full health check — bugs, speed, security, SEO.' },
      { step: '03', title: 'Fix & Optimize', desc: 'We fix all existing issues in the first week.' },
      { step: '04', title: 'Ongoing Monitoring', desc: 'Continuous monitoring, monthly updates, and task handling.' },
      { step: '05', title: 'Monthly Report', desc: 'You receive a detailed report every month of work done.' },
    ],
    ideal: ['Businesses with an existing website/app', "Founders who don't want to manage tech", 'Products that need regular content updates', 'Anyone who wants peace of mind with their digital product'],
    deliverables: ['Monthly task completion report', 'Bug fix logs', 'Uptime monitoring', 'Security audit summary', 'Improvement suggestions'],
    timeline: 'Monthly Ongoing', startingPrice: '₹3,000/month',
  },
  'startup-launch-package': {
    title: 'Startup Launch Package', color: '#22c55e',
    tagline: 'From idea to live product — in record time.',
    overview: 'The Startup Launch Package is everything you need to go from zero to launched. We handle strategy, design, development, and deployment — in one bundled package built for speed and budget.',
    whatYouGet: [
      { heading: 'Strategy & Planning', points: ['1-hour strategy call', 'Target audience definition', 'Competitor research', 'Feature prioritization (MVP scope)', 'Tech stack recommendation'] },
      { heading: 'Design & Branding', points: ['Logo & brand color palette', 'UI/UX design for website or app', 'Brand style guide (basic)', 'Social media profile setup', 'Launch-ready visual assets'] },
      { heading: 'Development', points: ['Website or Mobile App development', 'Contact/Lead capture form', 'Basic SEO setup', 'Hosting & domain setup', 'Deployment & go-live'] },
      { heading: 'Launch Support', points: ['Google Analytics setup', '2 rounds of revisions included', '1 month free maintenance', 'Post-launch checklist walkthrough', 'Training & handover session'] },
    ],
    process: [
      { step: '01', title: 'Discovery Session', desc: 'We learn your idea, audience, goals, and timeline.' },
      { step: '02', title: 'MVP Planning', desc: 'We define the minimum viable product to get you launched fast.' },
      { step: '03', title: 'Design Sprint', desc: 'Brand identity + UI design — fast and focused.' },
      { step: '04', title: 'Build & Deploy', desc: 'Development, testing, and launch — all in one sprint.' },
      { step: '05', title: "Handover & Support", desc: '1 month of support + training so you\'re independent from Day 1.' },
    ],
    ideal: ['First-time founders with a new idea', 'Side projects that need to go live fast', 'Small businesses starting their online journey', 'Anyone who needs everything done in one place'],
    deliverables: ['Logo & brand kit', 'Website or App', 'Source code', 'Hosting setup', 'Analytics integration', '1 month support'],
    timeline: '2 – 4 Weeks', startingPrice: '₹20,000',
  },
  'business-consulting-strategy': {
    title: 'Business Consulting & Strategy', color: '#ec4899',
    tagline: "Don't just start a business — start the right way.",
    overview: "Starting from scratch and don't know where to begin? We sit with you, understand your idea, and guide you on everything — from validating your concept and building your brand identity to choosing the right technology and creating a roadmap for growth.",
    whatYouGet: [
      { heading: 'Idea & Business Validation', points: ["Is your idea viable? We'll tell you honestly", 'Market research & competitor analysis', 'Target audience identification', 'Revenue model suggestions', 'Risk & opportunity assessment'] },
      { heading: 'Brand Identity Guidance', points: ['Business name brainstorming', 'Brand positioning & tone of voice', 'Logo & color direction', 'Domain name suggestions', 'Social media handle availability check'] },
      { heading: 'Digital Strategy', points: ['Which platforms to be on', 'Website vs App — what do you need first?', 'Content & marketing strategy basics', 'SEO & online visibility plan', 'Growth roadmap for next 6–12 months'] },
      { heading: 'Tech & Product Advice', points: ['What tech stack suits your product', 'Build vs buy vs use SaaS tools', 'Cost estimation for your product', 'Team & hiring guidance', 'Vendor & tools recommendation'] },
    ],
    process: [
      { step: '01', title: 'Free Intro Call', desc: '30-minute free call to understand your situation and whether we are the right fit.' },
      { step: '02', title: 'Deep Dive Session', desc: 'A structured 90-minute session covering your idea, goals, and challenges in detail.' },
      { step: '03', title: 'Research & Analysis', desc: 'We research your market, competitors, and audience before the next session.' },
      { step: '04', title: 'Strategy Presentation', desc: 'A clear, written strategy and roadmap tailored to your business.' },
      { step: '05', title: 'Action Plan Handover', desc: 'Step-by-step action plan — what to do, in what order, and how.' },
      { step: '06', title: 'Follow-up Support', desc: 'Ongoing Q&A and guidance as you execute the plan.' },
    ],
    ideal: ['First-time entrepreneurs with an idea', 'Professionals wanting to start their own business', 'Small business owners going digital for the first time', 'Anyone confused about where to start or what to build'],
    deliverables: ['Written strategy document', 'Brand identity direction', 'Digital roadmap', 'Tech recommendation report', 'Action plan', 'Follow-up support'],
    timeline: '1 – 2 Weeks', startingPrice: '₹5,000',
  },
};

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { dark } = useTheme();
  const slug = params?.slug as string;
  const svc = SERVICES[slug];
  const [mounted, setMounted] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => setShowScroll(window.scrollY < 200);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!svc) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background: dark ? '#080d1a' : '#faf8f3' }}>
      <div style={{ textAlign:'center', fontFamily:"'Montserrat',sans-serif" }}>
        <div style={{ fontSize:'5rem', marginBottom:12 }}>404</div>
        <div style={{ color: dark ? 'rgba(200,215,245,.6)' : '#6a6050', marginBottom:24 }}>Service not found</div>
        <button onClick={() => router.push('/#services')} style={{ padding:'12px 28px', borderRadius:10, background:'#ff4d00', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:'.9rem' }}>
          ← Back to Services
        </button>
      </div>
    </div>
  );

  /* ── Theme tokens ── */
  const bg      = dark ? '#080d1a'                        : '#faf8f3';
  const bgCard  = dark ? 'rgba(18,16,61,.7)'              : '#ffffff';
  const bgCard2 = dark ? 'rgba(255,255,255,.03)'          : 'rgba(0,0,0,.025)';
  const text     = dark ? '#e8eef8'                       : '#1a1510';
  const textMid  = dark ? 'rgba(200,215,245,.75)'         : '#4a4540';
  const muted    = dark ? 'rgba(200,215,245,.45)'         : '#8a8070';
  const border   = dark ? 'rgba(100,140,255,.12)'         : 'rgba(0,0,0,.07)';
  const heroBg   = dark
    ? `radial-gradient(ellipse 80% 50% at 50% -10%, ${svc.color}18, transparent)`
    : `radial-gradient(ellipse 80% 50% at 50% -10%, ${svc.color}12, transparent)`;

  return (
    <div style={{ background:bg, minHeight:'100vh', color:text, fontFamily:"'Montserrat',sans-serif", overflowX:'hidden' }}>

      {/* ── ambient glow bg ── */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, background:heroBg }}/>

      {/* ── NAVBAR ROW ── */}
      <div style={{ position:'sticky', top:0, zIndex:100, background: dark ? 'rgba(8,13,26,.85)' : 'rgba(250,248,243,.9)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${border}` }}>
        <div className="svc-topbar" style={{ maxWidth:1120, margin:'0 auto', padding:'0 24px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <button onClick={() => router.push('/')}
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'none', border:`1px solid ${border}`, borderRadius:8, padding:'7px 14px', color:muted, cursor:'pointer', fontFamily:"'Montserrat',sans-serif", fontSize:'.75rem', fontWeight:600, transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=svc.color; e.currentTarget.style.color=svc.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=border; e.currentTarget.style.color=muted; }}>
            ← Back
          </button>
          <a href="/#services" className="svc-topbar-all" style={{ fontSize:'.72rem', color:muted, textDecoration:'none', fontWeight:600, letterSpacing:'.06em' }}>All Services</a>
          <a href="/#contact"
            style={{ padding:'8px 18px', borderRadius:8, background:'linear-gradient(135deg,#ff4d00,#c73b00)', color:'#fff', textDecoration:'none', fontSize:'.72rem', fontWeight:700, letterSpacing:'.06em', whiteSpace:'nowrap' }}>
            Get Started →
          </a>
        </div>
      </div>

      <div className="svc-page-wrap" style={{ maxWidth:1120, margin:'0 auto', padding:'0 24px', position:'relative', zIndex:1 }}>

        {/* ── HERO ── */}
        <div className="svc-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', padding:'56px 0 64px', borderBottom:`1px solid ${border}`, marginBottom:64 }}>

          {/* Left */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:20, background:`${svc.color}12`, border:`1px solid ${svc.color}30`, marginBottom:20 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:svc.color }}/>
              <span style={{ color:svc.color, fontSize:'.6rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase' }}>LaunchifyX Service</span>
            </div>
            <h1 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:900, color:text, marginBottom:16, lineHeight:1.15, letterSpacing:'-.02em' }}>{svc.title}</h1>
            <p style={{ fontSize:'.95rem', color:svc.color, fontWeight:600, marginBottom:16, lineHeight:1.5 }}>"{svc.tagline}"</p>
            <p style={{ lineHeight:1.85, color:textMid, fontSize:'.88rem', marginBottom:28 }}>{svc.overview}</p>
            <a href="/consultation"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:10, background:`linear-gradient(135deg,${svc.color},${svc.color}bb)`, color:'#fff', textDecoration:'none', fontWeight:700, fontSize:'.85rem', boxShadow:`0 8px 28px ${svc.color}35`, transition:'transform .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform=''}>
              Book Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          {/* Right — service icon + stats */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div className="svc-hero-card" style={{ background:bgCard, border:`1px solid ${svc.color}25`, borderRadius:20, padding:'32px', display:'flex', flexDirection:'column', alignItems:'center', gap:16, backdropFilter:'blur(12px)' }}>
              <div style={{ width:80, height:80, borderRadius:22, background:`${svc.color}15`, border:`2px solid ${svc.color}30`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 32px ${svc.color}20` }}>
                <SvcIcon slug={slug} color={svc.color}/>
              </div>
              <div style={{ width:'100%', height:1, background:`${svc.color}15` }}/>
              <div className="svc-hero-stats" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, width:'100%' }}>
                {[
                  { label:'Starting At', value: svc.startingPrice },
                  { label:'Timeline',    value: svc.timeline },
                  { label:'Deliverables', value:`${svc.deliverables.length} items` },
                  { label:'Support',     value: '1 Month Free' },
                ].map(stat => (
                  <div key={stat.label} style={{ padding:'12px 14px', borderRadius:10, background:bgCard2, border:`1px solid ${border}` }}>
                    <div style={{ fontSize:'.52rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:svc.color, marginBottom:4 }}>{stat.label}</div>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1rem', fontWeight:800, color:text }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── WHAT YOU GET ── */}
        <section style={{ marginBottom:80 }}>
          <SectionHeader title="What You Get" sub="Everything included — no hidden costs, no surprises." color={svc.color} dark={dark}/>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap:16 }}>
            {svc.whatYouGet.map((section, i) => (
              <div key={section.heading} style={{ background:bgCard, border:`1px solid ${border}`, borderTop:`3px solid ${svc.color}`, borderRadius:14, padding:'22px', backdropFilter:'blur(12px)', transition:'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 40px ${svc.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:`${svc.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'.65rem', fontWeight:900, color:svc.color }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <span style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:svc.color }}>{section.heading}</span>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:9 }}>
                  {section.points.map(pt => (
                    <li key={pt} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:'.8rem', color:textMid, lineHeight:1.55 }}>
                      <span style={{ width:16, height:16, borderRadius:'50%', background:`${svc.color}15`, border:`1px solid ${svc.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section style={{ marginBottom:80 }}>
          <SectionHeader title="How It Works" sub="Transparent process — you know exactly what happens at every step." color={svc.color} dark={dark}/>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {svc.process.map((step, i) => (
              <div key={step.step} style={{ display:'flex', gap:0, alignItems:'stretch' }}>
                {/* Step line */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:56, flexShrink:0 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${svc.color}15`, border:`2px solid ${svc.color}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 }}>
                    <span style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:'.8rem', color:svc.color }}>{step.step}</span>
                  </div>
                  {i < svc.process.length - 1 && (
                    <div style={{ width:2, flex:1, background:`linear-gradient(${svc.color}40, transparent)`, margin:'4px 0' }}/>
                  )}
                </div>
                {/* Content */}
                <div style={{ flex:1, paddingLeft:16, paddingBottom: i < svc.process.length - 1 ? 24 : 0 }}>
                  <div style={{ background:bgCard, border:`1px solid ${border}`, borderRadius:12, padding:'16px 20px', marginBottom:0 }}>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, color:text, fontSize:'.95rem', marginBottom:5 }}>{step.title}</div>
                    <div style={{ fontSize:'.82rem', color:muted, lineHeight:1.65 }}>{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── IDEAL FOR + DELIVERABLES ── */}
        <section style={{ marginBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap:20 }}>
            {/* Ideal for */}
            <div style={{ background:bgCard, border:`1px solid ${border}`, borderRadius:16, padding:'28px', backdropFilter:'blur(12px)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${svc.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:800, color:text, fontSize:'1rem', margin:0 }}>This Is Perfect For You If…</h3>
              </div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {svc.ideal.map(pt => (
                  <li key={pt} style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:'.83rem', color:textMid, lineHeight:1.5 }}>
                    <span style={{ color:svc.color, fontWeight:900, fontSize:'.9rem', flexShrink:0, marginTop:1 }}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div style={{ background:bgCard, border:`1px solid ${border}`, borderRadius:16, padding:'28px', backdropFilter:'blur(12px)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${svc.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:800, color:text, fontSize:'1rem', margin:0 }}>What You'll Receive</h3>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {svc.deliverables.map(pt => (
                  <span key={pt} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:8, background:`${svc.color}10`, border:`1px solid ${svc.color}25`, fontSize:'.78rem', color:svc.color, fontWeight:600 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ marginBottom:80 }}>
          <div className="svc-cta-box" style={{ textAlign:'center', padding:'56px 32px', background:bgCard, border:`1px solid ${svc.color}25`, borderRadius:24, backdropFilter:'blur(20px)', position:'relative', overflow:'hidden' }}>
            {/* glow */}
            <div style={{ position:'absolute', top:'-40%', left:'50%', transform:'translateX(-50%)', width:'60%', height:'200%', background:`radial-gradient(ellipse, ${svc.color}14, transparent 70%)`, pointerEvents:'none' }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:`${svc.color}15`, border:`1px solid ${svc.color}30`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h2 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:text, marginBottom:12 }}>Ready to Get Started?</h2>
              <p style={{ color:muted, marginBottom:32, fontSize:'.9rem', maxWidth:480, margin:'0 auto 32px', lineHeight:1.7 }}>
                Tell us about your project and we'll get back to you within 24 hours with a plan and quote — completely free.
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <a href="/#contact"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', borderRadius:12, background:`linear-gradient(135deg,${svc.color},${svc.color}bb)`, color:'#fff', textDecoration:'none', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:'.88rem', boxShadow:`0 8px 32px ${svc.color}35`, transition:'transform .2s, box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 14px 40px ${svc.color}50`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform=''; (e.currentTarget as HTMLAnchorElement).style.boxShadow=`0 8px 32px ${svc.color}35`; }}>
                  Book a Free Consultation →
                </a>
                <a href="/#services"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:12, background:'transparent', border:`1px solid ${border}`, color:textMid, textDecoration:'none', fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:'.85rem', transition:'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor=svc.color; (e.currentTarget as HTMLAnchorElement).style.color=svc.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor=border; (e.currentTarget as HTMLAnchorElement).style.color=textMid; }}>
                  View Other Services
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── Scroll Down Indicator ── */}
      <div className="svc-scroll-hint" onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior:'smooth' })}
        style={{ position:'fixed', right:24, bottom:32, zIndex:200, display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor:'pointer',
          opacity: showScroll ? 1 : 0, transform: showScroll ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity .4s, transform .4s', pointerEvents: showScroll ? 'auto' : 'none' }}>
        <div style={{ writingMode:'vertical-rl', fontSize:'.6rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color: dark ? 'rgba(200,215,245,.4)' : 'rgba(0,0,0,.3)', marginBottom:4 }}>
          Scroll
        </div>
        <div style={{ width:1, height:40, background:`linear-gradient(${svc.color}, transparent)`, borderRadius:1 }}/>
        <div style={{ width:32, height:32, borderRadius:'50%', background:`${svc.color}15`, border:`1px solid ${svc.color}40`, display:'flex', alignItems:'center', justifyContent:'center', animation:'scrollBounce 1.6s ease-in-out infinite' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
        </div>
      </div>

      {/* fonts + reset come from globals.css; dangerouslySetInnerHTML avoids a hydration mismatch on escaped CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      ` }}/>
    </div>
  );
}

function SvcIcon({ slug, color }: { slug: string; color: string }) {
  const s = { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:color, strokeWidth:1.8, strokeLinecap:'round' as const, strokeLinejoin:'round' as const };
  if (slug === 'custom-website-development') return <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
  if (slug === 'mobile-app-development')     return <svg {...s}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={3}/></svg>;
  if (slug === 'e-commerce-development')     return <svg {...s}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
  if (slug === 'website-app-maintenance')    return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
  if (slug === 'startup-launch-package')     return <svg {...s}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>;
  return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}

function SectionHeader({ title, sub, color, dark }: { title:string; sub:string; color:string; dark:boolean }) {
  return (
    <div style={{ marginBottom:36 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
        <div style={{ width:28, height:3, borderRadius:2, background:color }}/>
        <h2 style={{ fontFamily:"'Exo 2',sans-serif", fontSize:'1.5rem', fontWeight:800, color: dark ? '#e8eef8' : '#1a1510', margin:0 }}>{title}</h2>
      </div>
      <p style={{ color: dark ? 'rgba(200,215,245,.45)' : '#8a8070', fontSize:'.85rem', paddingLeft:38 }}>{sub}</p>
    </div>
  );
}
