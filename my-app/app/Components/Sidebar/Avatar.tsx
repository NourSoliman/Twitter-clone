import React, { useCallback  } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch  } from 'react-redux'
import pegasus from '../../../public/Images/user.jpg'
import { User } from '@/app/Redux/Login/Reducer';
interface UserAvatar{
    userId:any, 
    imageType:string,
    isLarge?:boolean,
    border?:boolean,
    user?:User,
}
const  Avatar : React.FC<UserAvatar> = ({userId , isLarge , imageType , border , user}) => {
    const router = useRouter()
    const   onClick = useCallback((event : any)=>{
        event.stopPropagation();
        const url = `/users/${userId}`
        router.push(url)
    },[router, userId])
  return (
    <div className={`
    ${border ? `border-4 border-black` : ``}
    ${isLarge ? `h-32` : `h-12`}
    ${isLarge ? `w-32` : `w-12`}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
    `}
    >
    <Image 
    fill
    style={{
        objectFit:`cover`,
        borderRadius:`100%`
    }}
    alt="avatar"
    onClick={onClick}   
    src={user?.profileImage || pegasus}
    />

    </div>
  )
}

export default Avatar