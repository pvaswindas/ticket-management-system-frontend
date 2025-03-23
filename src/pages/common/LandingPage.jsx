import React from 'react'
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import IntegrationSection from '../../components/landing/IntegrationSection';
import ContactSection from '../../components/landing/ContactSection';
import Footer from '../../components/landing/Footer';


function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-github-dark to-charcoal-gray overflow-y-auto">
      <HeroSection />
      <FeaturesSection />
      <IntegrationSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default LandingPage