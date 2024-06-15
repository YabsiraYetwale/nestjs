"use client"
import React from 'react'
// import { FcGoogle } from 'react-icons/fc'
// import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'


const Social = () => {
  const onClick = (providers:string) => {
    // signIn(providers,{
    //   callbackUrl:defaultRedirectPath
    // })

  }
  return (
    <div className='flex gap-x-2 items-center w-full'>
      <Button size="lg" variant="outline" onClick={()=>{}} className='w-full'>FcGoogle</Button>
      <Button size="lg" variant="outline" onClick={()=>{}} className='w-full'>FaGithub</Button>
      {/* <Button size="lg" variant="outline" onClick={()=>{}} className='w-full'><FcGoogle className='h-5 w-5'/></Button>
      <Button size="lg" variant="outline" onClick={()=>{}} className='w-full'><FaGithub className='h-5 w-5'/></Button> */}
    </div>
  )
}

export default Social