
import BlogsSection from '@/app/blog/blogsSection'
import Carsection from '@/app/carSection/page'
import ExploreSection from '@/app/explore/page'
import Footer from '@/components/footer/footer'
import HeroSection from '@/app/heroSection/page'
import Navbar from '@/components/navbar/Navbar'
import ProductSection from '@/components/productSection/productSection'
import TestimonialSlider from '@/components/testimonals/testimonal'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Carsection />
      <TestimonialSlider />
      <ProductSection />
      <ExploreSection />
      <BlogsSection />
    </div>
  )
}

export default HomePage
