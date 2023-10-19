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
import { useTheme } from 'next-themes'
import LoadingIndicator from '../LoginSystem/loading'
interface User {
    firstName: string;
    lastName: string;
    email: string;
    profileImage:string,
    coverImage:string,
    bio:string,
    _id:string,
}
function UserPage() {

    const dispatch = useDispatch()
    const {userId} = useParams()
    const {resolvedTheme} = useTheme()
    const {user} : any = useSelector((state: RootState) => state.user);
    const {userPosts} : any = useSelector((state: RootState) => state.user);
    const {isLoading} : any = useSelector((state: RootState) => state.user);
    // const token: string  = Cookies.get('token') || ``;
    const [newToken , setNewToken] = useState(``)
  // Decode the token to get the user ID
    const decode: { userId: string  , role:string} | null = newToken ? jwt_decode(newToken) : null;
    const currentUser = newToken ? decode?.userId || `` : ``;
    const role = newToken ? decode?.role || `` : ``;
    useEffect(()=>{
    const tokenFromCookies = Cookies.get(`token`)
    if(tokenFromCookies){
        setNewToken(tokenFromCookies)
    }
    },[])
    useEffect(()=>{
        const singleUserId = Array.isArray(userId) ? userId[0] : userId;

        if(newToken) {
        dispatch(GetUserData(singleUserId) as any)
            dispatch(GetLoggedInUser(currentUser) as any)
        }
    },[dispatch , userId , currentUser ]) 
    if(isLoading || !newToken) {
        return(
            <div>
                <LoadingIndicator />
            </div>
        )
    }
  return (
    <>
        <Header label={user?.firstName} showBackArrow theme={resolvedTheme}/>
        <UserInfo userId={userId as string} user={user as User} />
        <UserBio userId={userId as string} theme={resolvedTheme} role={role}/>
        <UserPosts userId={userId as string} />
        {/* <PostItem userId={userId as string} /> */}
    </>
  )
}

export default UserPage
