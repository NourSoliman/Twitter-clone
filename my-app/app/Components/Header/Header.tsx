import React from 'react'
import Link from 'next/link'
import {BiArrowBack} from 'react-icons/bi'
interface HeaderLabelProps{
    label:string,
    showBackArrow?:boolean,
    theme?:string,
}
const  Header: React.FC<HeaderLabelProps> = ({label , showBackArrow , theme}) => {
    const ReturnBack = () => {
        if(typeof window !== `undefined`){
            window.history.back();
        }
    }
  return (
    <div className='border-b-[1px] border-neutral-200 dark:border-neutral-800 p-5'>
    <div className='flex flex-row items-center gap-2'>
        {
            showBackArrow && (
                <BiArrowBack 
                onClick={ReturnBack}
                color={theme === `dark` ? `green` : `green`}
                size={20}
                className="
                cursor-pointer
                hover:opacity-70
                transition
                "
                />
                
            )
        }
        <h1 className='text-black dark:text-white text-xl font-semibold'>{label}</h1>
    </div>
    </div>
  )
}

export default Header