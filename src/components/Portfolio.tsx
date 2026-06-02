'use client';

import useReveal from './useReveal';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Taste of India Restaurant',
    category: 'Restaurant Website',
    description: 'Full-featured restaurant website with online ordering, table reservations, and real-time menu management.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#ff6b35'
  },
  {
    id: 2,
    title: 'Urban Bistro',
    category: 'Restaurant Website',
    description: 'Modern bistro website with dynamic menu, customer reviews, and loyalty program integration.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    color: '#4f8cff'
  },
  {
    id: 3,
    title: 'Spice Garden',
    category: 'Restaurant Website',
    description: 'Elegant restaurant platform with multi-location support, inventory management, and analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    tags: ['React', 'Express', 'Redis', 'Chart.js'],
    color: '#ff4d00'
  },
  {
    id: 4,
    title: 'RRS DCE BGS Attendance',
    category: 'Mobile App',
    description: 'Class attendance tracking app for RRS DCE BGS with QR code scanning, real-time sync, and detailed reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React Native', 'Firebase', 'QR Scanner'],
    color: '#00c853'
  }
];

export default function Portfolio() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section id="portfolio" ref={ref} style={{
      padding: '120px 20px',
      background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1633 50%, #0a0e1a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(79,140,255,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          <span style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, rgba(79,140,255,0.2), rgba(255,77,0,0.2))',
            border: '1px solid rgba(79,140,255,0.3)',
            borderRadius: '30px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#4f8cff',
            marginBottom: '20px'
          }}>
            Our Work
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#f0f2ff',
            marginBottom: '20px',
            fontFamily: "'Exo 2', sans-serif"
          }}>
            Projects We&apos;ve{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f8cff, #ff4d00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Built
            </span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            From restaurant platforms to mobile apps, we deliver solutions that drive real business results
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {PROJECTS.map((project, index) => (
            <div key={project.id} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(60px)',
              background: 'rgba(13, 22, 51, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(79,140,255,0.15)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              transition: `opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.15}s, transform 0.4s, box-shadow 0.4s`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 20px 60px ${project.color}25`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}>
              {/* Image */}
              <div style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  padding: '6px 14px',
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}40`,
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: project.color
                }}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#f0f2ff',
                  marginBottom: '12px',
                  fontFamily: "'Exo 2', sans-serif"
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '6px 12px',
                      background: 'rgba(79,140,255,0.1)',
                      border: '1px solid rgba(79,140,255,0.2)',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#4f8cff'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s`
        }}>
          <a href="#contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #4f8cff, #ff4d00)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '50px',
            boxShadow: '0 8px 30px rgba(79,140,255,0.4)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(79,140,255,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,140,255,0.4)';
          }}>
            Start Your Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
