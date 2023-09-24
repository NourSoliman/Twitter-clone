"use client"
import Header from '@/app/Components/Header/Header'
import { useParams } from 'next/navigation'
import React , {useEffect , useState} from 'react'
import { GetUserData } from '@/app/Redux/Login/Action'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import Avatar from '@/app/Components/Sidebar/Avatar'
import UserInfo from '@/app/Components/UserInfos/UserInfo'
import {RingLoader} from 'react-spinners'
import UserBio from '@/app/Components/UserInfos/UserBio'

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
    console.log(user , `dsadsa`)
    const [isLoading , setIsLoading] = useState(true)
    useEffect(()=>{
        const singleUserId = Array.isArray(userId) ? userId[0] : userId;

        dispatch(GetUserData(singleUserId) as any)
        setIsLoading(false)
    },[dispatch , userId])
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
    </>
  )
}

export default page
// {user ? (
//     <div className='text-white'>
//         <Avatar userId={userId} imageType="profile"/>
//         <p>{user.firstName}</p>
//         <p>{user.lastName}</p>
//         <p>{user.email}</p>
//     </div>
// ):<p className='text-white'>
//     ERORORORORORORORO
//     </p>}