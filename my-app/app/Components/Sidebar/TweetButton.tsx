"use client"
import React from 'react'
import { FaFeather } from 'react-icons/fa'
import {openDialog} from '../../Redux/dialog/Actions'
import { useDispatch } from 'react-redux'
function TweetButton() {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(openDialog())
  }
  return (
    <div onClick={handleClick}>
      <div className="
        relative
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        p-4
        flex items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
            ">
        <FaFeather size={24} color={"white"} />
      </div>
      <div className='
        mt-6
        hidden
        lg:block
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90
        curosr-pointer
        transition
        '>
        <p className='
        hidden
        lg:block
        text-center
        font-semibold
        text-white dark:text-white
        text-[20px]
        cursor-pointer
        '>Tweet</p>
      </div>
    </div>
  )
}

export default TweetButton