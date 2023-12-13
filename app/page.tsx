
import {Hero, SearchBar} from '@/app/components'
import { FilterProps } from '@/types';


export default async function Home() {



  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className='padding-x padding-y max-width' id='discover'>

            
            <div className='home__filters'>
              <SearchBar />
            </div>
  
  

      </div>
    </main>
  )
}
