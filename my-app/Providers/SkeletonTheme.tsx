
"use client"
import { useTheme } from 'next-themes'
import React, { ReactNode , useEffect , useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

interface childrenProp {
    children:ReactNode,
}
const SkeletonProvider : React.FC<childrenProp> = ({children}) => {
  const [mounted , setMounted] = useState(false)
  const {resolvedTheme} = useTheme()
  useEffect(()=>{
    setMounted(true)
  },[])
  if(!mounted){
    return null
  }
  return (
    <SkeletonTheme baseColor={resolvedTheme === `dark` ?  `#202020` : `#ebebeb`}>
        {children}
    </SkeletonTheme>
  )
}

export default SkeletonProvider