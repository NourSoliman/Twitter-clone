import React, { useCallback   } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import pegasus from '../../../public/Images/user.jpg'
import { User } from '@/app/Redux/Login/Reducer';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { openDialog } from '@/app/Redux/dialog/Actions';
import { useTheme } from 'next-themes';
interface UserAvatar{
    userId:any, 
    imageType?:string,
    isLarge?:boolean,
    border?:boolean,
    user?:User,

}
const  Avatar : React.FC<UserAvatar> = ({userId , isLarge , imageType , border , user  }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {resolvedTheme} = useTheme()
    const token = Cookies.get(`token`) || ``;
    const onClick = useCallback((event : any)=>{
        event.stopPropagation();
        if(token) {
          const url = `/users/${userId}`
          router.push(url)
        }else{
          dispatch(openDialog() as any)
        }
    },[router, userId])

  return (
    <div className={`
    ${border ? resolvedTheme === `dark` ? `border-4 border-black` : `border-white` : ``}
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
    // src={ProfileImage|| pegasus}
    />

    </div>
  )
}

export default Avatar