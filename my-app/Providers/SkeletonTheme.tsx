
"use client"
import { useTheme } from 'next-themes'
import React, { ReactNode , useEffect , useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

interface childrenProp {
    children:ReactNode,
}
const SkeletonProvider : React.FC<childrenProp> = ({children}) => {
  const [mounted , setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  if(!mounted){
    return null
  }
  const {resolvedTheme} = useTheme()
    console.log(resolvedTheme ,`resolvedTheme from skeleton`)
  return (
    <SkeletonTheme baseColor={resolvedTheme === `dark` ?  `#202020` : `#ebebeb`}>
        {children}
    </SkeletonTheme>
  )
}

export default SkeletonProvider