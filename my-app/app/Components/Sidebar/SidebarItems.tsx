import React,{useCallback} from 'react'
import { IconType } from 'react-icons/lib'
import { useRouter } from 'next/navigation';
interface SidebarItemsProps{
    label:string,
    href?:string,
    icon:IconType,
    onClick?:()=>void,
}
const  SidebarItems: React.FC<SidebarItemsProps> = ({label , href , icon : Icon , onClick}) => {
  const router = useRouter()
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
        items-center justify-center p-4 hover:bg-slate-300
        hover:bg-opacity-10 cursor-pointer lg:hidden
        '>
        <Icon size={28} color={"white"}/>
        </div>
        <div className='relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        '>
        <Icon size={28} color={"white"}/>
        <div className="hidden lg:block text-white text-xlf">
        {label}
        </div>
        </div>
    </div>
  )
}

export default SidebarItems