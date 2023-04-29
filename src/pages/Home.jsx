import React from 'react'
import HeroProduct from '../components/HeroProduct'
import HomeCategory from '../components/HomeCategory'
import useFetch from '../hooks/useFetch'
import FeatureProducts from '../components/FeatureProducts'


export default function Home() {
    const { error, loading, data} = useFetch(
        'https://ecommtest.onrender.com/products'
    )
  return (
    <>
        <HeroProduct error={error} data={data} loading={loading}/>
        <HomeCategory/>
        <FeatureProducts error={error} data={data} loading={loading}/>
    </>
  )
}
