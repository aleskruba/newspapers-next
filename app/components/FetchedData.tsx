
'use client'

import React,{useEffect,useRef, useState} from 'react'
import { NewspaperCard } from '.';
import ShowMore from './ShowMore';
import { FilterProps } from '@/types';



interface Newspaper {
    id:number;
    title: string;
    url: string;
    source: string;
  }
  
  interface FetchedDataProps {
    allNewspapers: Newspaper[];
    page:string;
    currentPage:number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    loading:boolean;
    istriggered:boolean;
    errorNewspaper:boolean
        }


  



  const FetchedData: React.FC<FetchedDataProps> = ({ allNewspapers,page,currentPage,setCurrentPage,loading,istriggered,errorNewspaper }) => {

    const scrollableRef = useRef<HTMLDivElement>(null);
    const [scroll,setScroll] = useState(false)



    const isDataEmpty = !Array.isArray(allNewspapers) || allNewspapers.length < 1 || !allNewspapers 

   
    const indexOfLastItem = currentPage * parseInt(page);

    const currentNewspapers = allNewspapers.slice(0, indexOfLastItem);
  
    const isNext = indexOfLastItem < allNewspapers.length;

    const scrollToNextData = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };



  // Scroll to next data set when currentPage changes
/*   useEffect(() => {
    scrollToNextData();
  }, [scroll]); 
 */
  return (
    <div className='flex justify-center'>
    {!(isDataEmpty && istriggered ) ? ( 
      <section>
         <div className='home__cars-wrapper' >
            {currentNewspapers?.map((newspaper)=>(
              <NewspaperCard newspaper={newspaper} key={newspaper.id}/>
            ))}
      
          </div>
          <ShowMore        currentPage={currentPage}
                           setCurrentPage={setCurrentPage}
                           isNext={isNext}
                           setScroll={setScroll}
                           scroll={scroll}
                           scrollToNextData={scrollToNextData}
                           scrollableRef={scrollableRef} 
                    
                        />
      </section>
      ):(
        
          <div className='flex w-72 h-20 justify-center items-center'>
       {!loading &&
          <h1 className='text-black text-xl font-bold'>No articles </h1> 
    }
          </div>

      )}

{errorNewspaper &&
            <h1 className='text-black text-xl font-bold'>unknown newspapers </h1> 
}
  </div>
  )
}

export default FetchedData