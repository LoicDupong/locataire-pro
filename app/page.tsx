import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import ProblemBanner from '@/components/landing/ProblemBanner'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesGrid from '@/components/landing/FeaturesGrid'
import LandingCta from '@/components/landing/LandingCta'
import LandingFooter from '@/components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemBanner />
      <HowItWorks />
      <FeaturesGrid />
      <LandingCta />
      <LandingFooter />
    </>
  )
}
