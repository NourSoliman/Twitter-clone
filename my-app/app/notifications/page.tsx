"use client"
import React , {useCallback, useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import Header from '../Components/Header/Header'
import PostAvatar from '../Components/HomeContent/PostAvatar'
import { RootState } from '../Redux/MainStore/rootReducer'
import { getNotifications } from '../Redux/Posts/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GetLoggedInUser, GetUserData } from '../Redux/Login/Action'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
const notifications = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const notifications = useSelector((state:RootState) => state.posts.notifications)
    console.log(notifications  , `notificationsnotifications`)
    const token: any = Cookies.get(`token`)
    const decode: { userId: string } = jwt_decode(token);
    const currentUser = decode.userId;
    const { loggedUser }: any = useSelector((state: RootState) => state.user);
  console.log(loggedUser , `this logged user from notific`)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getNotifications() as any);
      await dispatch(GetLoggedInUser(currentUser) as any);
    };
  
    fetchData();
  }, [dispatch, currentUser]);

  return (
    <div className='text-black dark:text-white'>
      <Header label='Notifications' showBackArrow/>
      {notifications.map((notifi : any)=>(
          <div key={notifi._id} className="flex  items-center gap-2 p-2 border-b-[1px] dark:border-neutral-800 border-neutral-300 ">
            <PostAvatar userId={notifi.likedUserId}/>
            <Link href={`/Posts/${notifi.postId._id}`} className="hover:text-sky-400">
              <p>{notifi.body}</p>
            </Link>
          </div>
      ))}
    </div>
  )
}
export default notifications
