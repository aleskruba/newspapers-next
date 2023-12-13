"use client"

import {useEffect} from 'react'
import {  SearchNewspapers } from "."
import { useRouter,useSearchParams,usePathname } from "next/navigation"
import React,{ Suspense, useState,useRef } from "react"
import Image from "next/image"
import { fetchNews } from "@/utils"
import FetchedData from "./FetchedData"



type DivRef = HTMLDivElement | null;

 function SearchBar() {

   const router = useRouter()
   const pathname = usePathname()

    const [newspapers,setNewspapers] = useState('')
    const [keyword,setKeyword] = useState('')
    const [allNewspapers,setAllNewspapers] = useState([])
    const page  = '5'
    
    const [currentPage,setCurrentPage] = useState(1);
    const [loading,setLoading]= useState(false)
    const [istriggered,setIsTriggered]= useState(false)
    const targetDivRef = useRef<DivRef>(null);
  
    const [errorNewspaper,setErrorNewspaper] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
      const manualSearch = async () => {
        try {

         setErrorNewspaper(false)
          const keyword = searchParams.get('keyword');
          const newspapers = searchParams.get('newspapers');
          const page = searchParams.get('page');
    
          if (keyword  && page) {
            if (newspapers && newspapers != 'cnn' && newspapers != 'bbc') {
               setErrorNewspaper(true)
            } else {
              setLoading(true);
              setIsTriggered(true);
    
              const response = await fetchNews({
                keyword: keyword,
                newspapers: newspapers,
                page: page,
              });
    
              setAllNewspapers(response);
              setLoading(false);
              if (targetDivRef.current) {
               targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
             }
            }
          } else {
            console.log('Missing required parameters');
          }
        } catch (error) {
          console.error('Error occurred during manual search:', error);
          setLoading(false); // Set loading state to false to indicate the end of loading process
        }
      };
    
      manualSearch();
    }, []);
    

    const handleSearch = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const page = searchParams.get('page');
      setCurrentPage(1)
      //delete query.page; // Remove the 'page' query parameter from the query object

      //router.replace({ pathname, query }, undefined, { shallow: true });
      setErrorNewspaper(false)
      setLoading(true)
      setIsTriggered(true)

      if (keyword === '' ) {
         setLoading(false)
         return alert('Please enter a keyword')
     
      }
      updateSearchParams(
               newspapers.toLowerCase(),
               keyword.toLowerCase())

     }




     const updateSearchParams = async (newspapers:string, keyword:string) => {
         
      const searchParams = new URLSearchParams(window.location.search);

         if(newspapers){
            searchParams.set('newspapers',newspapers)
         } else {
            searchParams.delete('newspapers')
         }

         if(keyword){
            searchParams.set('keyword',keyword)
         } else {
            searchParams.delete('keyword')
         }
         //searchParams.set('page',`${currentPage}`)
         searchParams.set('page',`1`)

         const newPathname = `${window.location.pathname}?${searchParams.toString()}`
     
         router.push(newPathname)
       
      

     

         const response = await fetchNews(
            {keyword: searchParams.get('keyword'),
             newspapers: searchParams.get('newspapers'),
             page: searchParams.get('page')}
            ) 
        
         setAllNewspapers(response)
         setLoading(false)
         if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      }

  return (
    <>
   <div className='hero__image-container mt-1'>

        <div className='hero__image'>
      
         {loading ?
          <>
         <Image src="/wait.svg" alt="hero" fill className="object-contain" />  *
  
          </>
  
         :
         <Image src="/articles-svg.svg" alt="hero" fill className="object-contain" />
         }

                
        </div>

    
      </div>

   {!loading && 
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
            <SearchNewspapers
               newspapers={newspapers}
               setNewspapers={setNewspapers}
            />
            </div>
         <div className="searchbar__item">
 
          <Image src="/key-logo.svg"
                  width={25}
                  height={25}
                  className="absolute w-[20px] h-[20px] ml-4"
                  alt="key word"
          />
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            placeholder="keyword"
            className="searchbar__input"
          />
           </div>
           <input
              type="submit"
              value="Search"
              className="w-20 h-10 bg-blue-500 rounded-full lg:ml-10"
                  />
    </form>
 }    <div ref={targetDivRef}>
               <FetchedData allNewspapers={allNewspapers} 
                            loading={loading} 
                            istriggered={istriggered}
                            page={page} 
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage}
                            errorNewspaper={errorNewspaper}
                            />
   </div>

       </>
  )
}

export default SearchBar