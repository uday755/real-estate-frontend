import React from 'react'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import CTASection from './CTASection'
import FooterSection from './FooterSection'

const Landing = () => {
  return (
    <div className="bg-primary-950">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export default Landing