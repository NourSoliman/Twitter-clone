"use client"
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import React , { useEffect, useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { GetAllPosts } from '@/app/Redux/Posts/actions'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import PostItem from './PostItem'
import {  GetLoggedInUser } from '@/app/Redux/Login/Action'
import InfiniteScroll from 'react-infinite-scroll-component';
import PostsLoading from './loading'

interface userPosts {
  posts?:[],
}
const UserPosts : React.FC<userPosts> = () => {
    const dispatch=  useDispatch()
    const [page , setPage] = useState(1)
    const token: string | undefined = Cookies.get('token') || ''; 
    const decode: { userId: string } | null = token ? jwt_decode(token) : null;
    const currentUser = token ? decode?.userId || '' : ``;
    const { user } = useSelector((state: RootState) => state.user) as any;
    const {posts} = useSelector((state:RootState) => state.posts)
    const {isLoading} = useSelector((state:RootState)=>state.posts)



    useEffect(()=>{
      dispatch(GetAllPosts(page) as any)
      if(token){
        dispatch(GetLoggedInUser(currentUser) as any)
      }
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
    loader={<PostsLoading />} 
>
        {posts?.map((post : Record<string , any>)=>(
            <PostItem userId={currentUser} post={post}  key={post._id} page={page} user={user} isLoading={isLoading} />
        ))}
    </InfiniteScroll>
        {/* <button onClick={fetchMorePosts} className="text-white">CLICK ME</button> */}
        </div>
  )
}

export default UserPosts