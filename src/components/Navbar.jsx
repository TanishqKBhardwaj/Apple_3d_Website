import React from 'react'
import {appleImg,searchImg,bagImg} from '../utils/index'
import {navLists} from '../constants'

function Navbar() {
  return (
   <header className='w-full py-5 sm:px-10 px-5 flex justify-between  items-center'>
      <img src={appleImg} alt="Apple" width={14} height={18}/>
    <nav className='flex w-full max-w-[80%] justify-center'>
      <div className='flex gap-10 w-full  justify-center max-sm:hidden'>
        {
         navLists.map((item,index)=>(
            <div key={index} className='text-gray-100 text-sm cursor-pointer hover:text-white transition-all'>
              {item}
              </div>
          ))
        }
      </div>

    </nav>
     <div className=' flex w-[10%] justify-center flex-col md:flex-row gap-4'>

      <img src={searchImg} alt="search" width={14} height={18}/>
      <img src={bagImg} alt="search" width={14} height={18}/>
     </div>
   </header>
  )
}

export default Navbar
