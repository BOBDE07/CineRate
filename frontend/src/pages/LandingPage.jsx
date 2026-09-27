import LandingNavbar from '../components/layout/LandingNavbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorks';
import RatingShowcase from '../components/landing/RatingShowcase';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <LandingNavbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <FeatureSection />
        <HowItWorks />
        <RatingShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
