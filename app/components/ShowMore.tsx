"use client";

import { FilterProps, ShowMoreProps } from '@/types'
import React from 'react'
import { useRouter } from "next/navigation";
import { updateSearchParams } from '@/utils';
import { CustomButton } from '.';

function ShowMore({ currentPage,setCurrentPage, isNext,setScroll,scroll,scrollToNextData,scrollableRef }:any) {


    const router = useRouter();
  
    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
        // Calculate the new limit based on the page number and navigation type
        setCurrentPage((prev: number)=>prev+1)
           // Update the "limit" search parameter in the URL with the new value
        const newPathname = updateSearchParams("page", `${currentPage+1}`);
   
        router.push(newPathname, { scroll: false });

        console.log('currentPage',currentPage)
        scrollToNextData()
      };

  return (
    <div className="w-full flex-center gap-5 mt-10" >


     {isNext && 
     <div ref={scrollableRef}>
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
    </div>
     }
    </div>

  )
}

export default ShowMore