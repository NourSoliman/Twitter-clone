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
      <div className='flex gap-4 ml-12'>
    <BsFillSunFill color="orange" size={30}/>
    <p>Light </p>
      </div>
    
    ):(
      <div className='flex gap-4 ml-12'>
        <BsMoonFill color="black" size={30}/>
        <p>Dark </p>
      </div>
    )}
    </button>
  )
}

export default DarkMode