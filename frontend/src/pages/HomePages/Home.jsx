import React from 'react'
import HeroSec from '../../components/HeroSec'
import Hero from '../../components/Hero'
import CategoryGrid from '../../components/CategoryGrid'
import Cms from '../../components/Cms'
import FeatureProducts from '../../components/FeatureProducts'
import ProductCard from '../../components/ProductCard'
import NewProducts from '../../components/NewProduct'

import ShopByCategory from '../../components/ShopByCategory'
import CmsBanner from '../../components/CmsBanner'
import BestSeller from '../../components/BestSeller'
const Home = () => {
  return (
    <>
     <Hero/>
     <HeroSec/>
     <CategoryGrid/>
     <FeatureProducts/>
     <NewProducts/>
     <CmsBanner/>
     <ShopByCategory/>
     <BestSeller/>
     <Cms/>


    </>
  )
}

export default Home
