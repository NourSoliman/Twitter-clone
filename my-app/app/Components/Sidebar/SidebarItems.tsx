import React,{useCallback } from 'react'
import { IconType } from 'react-icons/lib'
import { useRouter } from 'next/navigation';
import { BsDot } from 'react-icons/bs';
import { useTheme } from 'next-themes';
interface SidebarItemsProps{
    label:string,
    href?:string,
    icon:IconType,
    onClick?:()=>void,
    alert?:boolean,
    isLoading?:boolean,
}
const  SidebarItems: React.FC<SidebarItemsProps> = ({label , href , icon : Icon , onClick , alert , isLoading}) => {
  const router = useRouter()
  const {resolvedTheme} = useTheme()
  const handleClick = useCallback(()=>{
    if(onClick){
      return onClick()
    }
    if(href){
      router.push(href)
    }
  },[router ,onClick , href])
  return (
    <div className='flex flex-row items-center' onClick={handleClick}>

        <div className='relative rounded-full h-14 w-14 flex 
        items-center justify-center p-4 hover:bg-slate-500
        hover:bg-opacity-10  cursor-pointer lg:hidden
        '>
        <Icon size={28} color={"white"} />
        {alert? <BsDot  className='text-sky-500 absolute -top-4 left-0 ' size={70}/> : null}
        </div>
        <div className='relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-600
        hover:bg-opacity-10
        dark:hover:bg-opacity-10 hover:bg-slate-300
        cursor-pointer
        '>
        <Icon size={28} color={resolvedTheme === `dark` ? `white` : `#020817`}/>
        <div className="hidden lg:block text-black dark:text-white text-xlf">
        {label}
        {alert? <BsDot  className='text-sky-500 absolute -top-4 left-0 ' size={70}/> : null}

        </div>
        </div>
    </div>
  )
}

export default SidebarItems