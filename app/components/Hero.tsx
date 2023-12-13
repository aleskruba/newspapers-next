"use client"

import  CustomButton  from './CustomButton'
import Image from "next/image";
import { useSearchParams } from 'next/navigation'

function Hero() {

const handlescroll = () => {

}



  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <p className='hero__subtitle'>
        search for your article worldwide  <span className='text-6xl'>🗺 </span> 
          </p>
{/*           <CustomButton
              title="Find an article"
              containerStyles="bg-primary-blue text-white rounded-full mt-10"
              handleClick={handlescroll}
          /> */}
      </div>

    </div>
  )
}

export default Hero