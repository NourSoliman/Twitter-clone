"use client"
import React from 'react'
import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
function SideBarLogo() {

  return (
    <div className="rounded-full h-14 w-14 p-4 flex 
    items-center justify-center hover:bg-blue-300 
    hover:bg-opacity-10 cursor-pointer transition"
    >
        <Link href="/">
    <BsTwitter size={28} color={"white"} />
        </Link>
    </div>
  )
}

export default SideBarLogo