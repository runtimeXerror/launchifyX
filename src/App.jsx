import './styles/global.css';
import { ThemeProvider } from './ThemeContext';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Ticker       from './components/Ticker';
import Services     from './components/Services';
import Pricing      from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}
