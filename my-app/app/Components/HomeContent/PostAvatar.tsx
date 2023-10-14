import React, { useCallback , useEffect  } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch , useSelector  } from 'react-redux'
import pegasus from '../../../public/Images/user.jpg'
import Cookies from 'js-cookie';
import { RootState } from '@/app/Redux/MainStore/rootReducer';
import { GetUserProfileImage } from '@/app/Redux/Login/Action';
import { openDialog } from '@/app/Redux/dialog/Actions';
interface UserAvatar{
    userId:any, 
    // imageType?:string,
    isLarge?:boolean,
    border?:boolean,
    // user?:User,

    profileIamge?:string,
}
const  PostAvatar : React.FC<UserAvatar> = ({profileIamge , userId , border , isLarge }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const token = Cookies.get(`token`) || ``;
    const   onClick = useCallback((event : any)=>{
        event.stopPropagation();
        if(token){
            const url = `/users/${userId}`
            router.push(url)
        } else {
            dispatch(openDialog() as any)
        }
    },[router, userId])
    const { ProfileImage }: any = useSelector((state: RootState) => state.user);
    const profileImage = ProfileImage[userId] || pegasus;

    useEffect(()=>{
        dispatch(GetUserProfileImage(userId) as any)
    },[dispatch , userId])
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
    src={profileImage || pegasus}
    // src={ProfileImage|| pegasus}
    />

    </div>
  )
}

export default PostAvatar