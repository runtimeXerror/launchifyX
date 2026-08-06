import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Fixed footer — slides up on scroll down, slides down on scroll up */}
      <Footer />

      {/* Page content */}
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <Contact />
      {/* Spacer — matches footer bg so no gap is visible */}
      <div className="footer-spacer" style={{ height:'100vh' }} />
    </>
  );
}
