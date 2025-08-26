
import Carsection from '@/app/carSection/page'
import ExploreSection from '@/app/explore/page'
import HeroSection from '@/app/heroSection/page'
import ProductSection from '@/components/productSection/productSection'
import TestimonialSlider from '@/components/testimonals/testimonal'
import React from 'react'
import BlogsSection from './blog/page'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Carsection/>
      <TestimonialSlider />
      <ProductSection />
      <ExploreSection />
      <BlogsSection />
    </div>
  )
}

export default HomePage
