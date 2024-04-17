import React from 'react'
import UnitSelect from './UnitSelect'
import Search from './Search'

const MobileNavbar = () => {
  return (
    <div className='max-w-7xl mx-auto  flex md:hidden items-center sm:gap-1 justify-around min-h-[40px] mt-2'>
    <UnitSelect />
   <div className='h-[25px]'>
   <Search />
   </div>
</div>
  )
}

export default MobileNavbar
