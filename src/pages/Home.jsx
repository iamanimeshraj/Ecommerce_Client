import React from 'react'
import Products from '../components/Products'
import Herosection from '../components/Herosection'
import Collection from '../components/Collection'

const Home = () => {
  return (
    <div className='mt-10'>
      <Herosection/>
      <Products/>
      <Collection/>
    </div>
  )
}

export default Home