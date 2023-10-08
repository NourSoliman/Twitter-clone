"use client"
import Header from '@/app/Components/Header/Header'
import { useParams } from 'next/navigation'
import React , {useEffect , useState} from 'react'
import { GetLoggedInUser, GetUserData } from '@/app/Redux/Login/Action'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import Avatar from '@/app/Components/Sidebar/Avatar'
import UserInfo from '@/app/Components/UserInfos/UserInfo'
import {RingLoader} from 'react-spinners'
import UserBio from '@/app/Components/UserInfos/UserBio'
import UserPosts from '@/app/Components/UserInfos/UserPosts'
import { GetAllPosts, GetAllUserPosts } from '@/app/Redux/Posts/actions'
import PostItem from '@/app/Components/HomeContent/PostItem'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
interface User {
    firstName: string;
    lastName: string;
    email: string;
    profileImage:string,
    coverImage:string,
    bio:string,
    _id:string,
}
function page() {

    const dispatch = useDispatch()
    const {userId} = useParams()
    const {user} : any = useSelector((state: RootState) => state.user);
    const {userPosts} : any = useSelector((state: RootState) => state.user);
    const {isLoading} : any = useSelector((state: RootState) => state.user);
    // const [isLoading , setIsLoading] = useState(true)
    const token: string | null = Cookies.get('token') || null;
  // Decode the token to get the user ID (assuming the token contains a userId field)
  const decode: { userId: string , followingIds:[], } | null = token ? jwt_decode(token) : null;
  const currentUser = decode?.userId || ``;
  const { posts } = useSelector((state: RootState) => state.posts)

    useEffect(()=>{
        const singleUserId = Array.isArray(userId) ? userId[0] : userId;

        dispatch(GetUserData(singleUserId) as any)
        dispatch(GetLoggedInUser(currentUser) as any)
        // setIsLoading(false)
    },[dispatch , userId , currentUser ]) 
    if(isLoading) {
        return(
            <div className='flex justify-center items-center h-full'>
                <RingLoader color='#1948ef' size={70}/>
            </div>
        )
    }
  return (
    <>
        <Header label={user?.firstName} showBackArrow/>
        <UserInfo userId={userId as string} user={user as User} />
        <UserBio userId={userId as string} />
        <UserPosts userId={userId as string} />
        {/* <PostItem userId={userId as string} /> */}
    </>
  )
}

export default page
