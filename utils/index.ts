import { FilterProps } from "@/types"

export async function fetchNews(filters:FilterProps) {

    const {keyword,newspapers,page} = filters


    
    
    if (newspapers && newspapers !== "all newspapers") { 
    const response = await fetch(`http://localhost:3000/api/news/${newspapers}?keyword=${keyword}&page=${page}`)
    const data = await response.json()
    return data.message
    
} else { 
    const response = await fetch(`http://localhost:3000/api/news?keyword=${keyword}&page=${page}`)
    const data = await response.json()
    return data.message
    }

}



export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };