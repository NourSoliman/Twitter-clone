"use client"
import { useTheme } from 'next-themes'
import React , {useState , useEffect} from 'react'

import {BsFillSunFill, BsMoonFill} from 'react-icons/bs'

const DarkMode = () => {
    const {resolvedTheme , setTheme }  = useTheme()

    const [mounted , setMounted] = useState(false)
    useEffect(()=>{
    setMounted(true)
    },[])
    if(!mounted) {
        return null
    }
  return (
    <button
    className='flex items-center justify-center w-16 '
    aria-label='Toggle Dark Mode'
    type="button"
    onClick={()=>setTheme(resolvedTheme === `dark` ? `light` : `dark`)}
    >
    {resolvedTheme === `dark` ? (
      <div className='flex gap-4 lg:ml-12 ml-0 mb-3'>
    <BsFillSunFill color="orange" size={30}/>
    <p className='hidden lg:block'>Light </p>
      </div>
    
    ):(
      <div className='flex gap-4 lg:ml-12 ml-0 mb-3 lg:mb-0'>
        <BsMoonFill color="black" size={30}/>
        <p className='hidden lg:block'>Dark </p>
      </div>
    )}
    </button>
  )
}

export default DarkMode