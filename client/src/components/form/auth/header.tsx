import Link from 'next/link'
import React from 'react'
interface HeaderProps{
  label: string
}
const Header = ({label}:HeaderProps) => {
  return (<div className='w-full flex flex-col gap-y-4 items-center justify-center'>
    <h1 className='3xl font-semibold'> 
    <div className="flex 
     p-2 bg-opacity-20 text-lg lg:text-2xl font-bold justify-center drop-shadow-md">
      <span className='text-green-500 dark:text-green-400  '>Invoice</span>
      <span className='text-blue-500 dark:text-yellow-400'>Systm</span>
    </div></h1>
    <p className='text-muted-foreground text-md'>{label}</p>
  </div>
  )
}

export default Header