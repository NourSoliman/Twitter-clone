"use client"
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import React , {useCallback, useEffect, useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { GetAllPosts, GetAllUserPosts, LikePost } from '@/app/Redux/Posts/actions'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import PostItem from './PostItem'
import Avatar from '../Sidebar/Avatar'
import { fetchAllUsers, GetLoggedInUser, GetUserData, GetUserProfileImage } from '@/app/Redux/Login/Action'
import Button from '../Buttons/Button'
import InfiniteScroll from 'react-infinite-scroll-component';

interface userPosts {
  posts?:[],
}
const UserPosts : React.FC<userPosts> = () => {
    const dispatch=  useDispatch()
    const [page , setPage] = useState(1)
    const token: string | undefined = Cookies.get('token') || ''; 
    const decode: { userId: string } | null = token ? jwt_decode(token) : null;
    const currentUser = decode?.userId || '';
    const { user } = useSelector((state: RootState) => state.user) as any;
    const {posts} = useSelector((state:RootState) => state.posts)
  console.log(posts , `this posts comes from HOMEMMEME`)


    useEffect(()=>{
      console.log(`fetched all data again!`)
      dispatch(GetAllPosts(page) as any)
      dispatch(GetLoggedInUser(currentUser) as any)
    },[dispatch , page ])

    const fetchMorePosts = () => {
      console.log(`worked`)
      setPage(page + 1);
    };

  return (
    <div>


    <InfiniteScroll
    dataLength={posts?.length} 
    next={fetchMorePosts}
    hasMore={true} 
    loader={<h4>Loading...</h4>} 
>
        {posts?.map((post : Record<string , any>)=>(
            <PostItem userId={currentUser} post={post}  key={post._id} page={page} user={user} />
        ))}
    </InfiniteScroll>
        <button onClick={fetchMorePosts} className="text-white">CLICK ME</button>
        </div>
  )
}

export default UserPosts