"use client"
import React from 'react'
import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import { useTheme } from 'next-themes'
function SideBarLogo() {
  const {resolvedTheme} = useTheme()
  return (
    <div className="rounded-full h-14 w-14 p-4 flex 
    items-center justify-center hover:bg-blue-300 
    hover:bg-opacity-10 cursor-pointer transition"
    >
        <Link href="/">
    <BsTwitter size={28} color={resolvedTheme === `dark` ? `white` : `#020817`} />
        </Link>
    </div>
  )
}

export default SideBarLogo