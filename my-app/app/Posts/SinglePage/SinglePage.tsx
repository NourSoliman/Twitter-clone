"use client"
import PostAvatar from '@/app/Components/HomeContent/PostAvatar'
import { GetLoggedInUser, GetUserData, GetUserProfileImage } from '@/app/Redux/Login/Action'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { GetPostSinglePage, getReplyOnPosts, LikeProfilePost, SinglePageLike, SinglePageUnLike, UnLikeProfilePost } from '@/app/Redux/Posts/actions'
import { CommentInterface, SinglePost } from '@/app/Redux/Posts/reducers'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter,  useParams } from 'next/navigation'
import React, {useCallback, useEffect , useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { useSelector  , useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import AddPost from '@/app/Components/HomeContent/AddPost'
import  Reply  from './Reply'
import Header from '@/app/Components/Header/Header'
import { openDialog } from '@/app/Redux/dialog/Actions'

function SinglePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const params = useParams()
  const token: any = Cookies.get(`token`) || null;
  const decode: { userId: string } = jwt_decode(token) || null;
  const currentUser = decode?.userId;
  const singlePost = useSelector((state:RootState) => state.posts.singlePost) as SinglePost
  const  loggedUser : any = useSelector((state: RootState) => state.user.loggedUser);
  const postReplyComments  = useSelector((state:RootState) => state.posts.postReplyComments)
  console.log(postReplyComments , `reply comments`)

  useEffect(()=>{
    const postId = params.postId
    dispatch(GetPostSinglePage(postId as string) as any)
    dispatch(getReplyOnPosts(postId as string) as any)
    if(token){
      dispatch(GetLoggedInUser(currentUser) as any)
    }
  },[params.postId , currentUser ])
  
  const { user } = useSelector((state: RootState) => state.user) as any;
  console.log(user , `user[reply.userId]`)
  const userFirstName = user[singlePost.userId]?.firstName || ``;
  const userLastName = user[singlePost.userId]?.lastName || ``;


  const handleLike = useCallback(
    async (postId: any) => {
      console.log(`LIKEDDDDDD111`)
      if(token){        
        try {
          await dispatch(SinglePageLike(postId) as any);
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(openDialog() as any)
      }
    },
    [dispatch]
  );
  const handleUnLike = useCallback(
    async (postId: any) => {
      try {
        await dispatch(SinglePageUnLike(postId) as any);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  
  return (
    <div>
        <Header label={userFirstName + ` ` + `Post`} showBackArrow/>
      <div className="text-black dark:text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-800" key={singlePost?._id}>
        <PostAvatar userId={singlePost.userId} />
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <p>{userFirstName}</p>
            <p className="text-neutral-400">@{userLastName}</p>
            <p className="text-neutral-400 text-sm">
              {singlePost?.createdAt
                ? formatDistanceToNowStrict(new Date(singlePost?.createdAt))
                : null}
            </p>
          </div>
          <div>
            <p className="text-black dark:text-white">{singlePost?.body}</p>
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{singlePost?.comments?.length || 0}</p>
            </div>
            <div
              className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
              
            >
              {singlePost?.likedIds?.includes(currentUser) ? (
                
                <AiFillHeart size={20} color="red" onClick={()=> handleUnLike(singlePost._id)}/>
              ) : (
                <AiOutlineHeart size={20} onClick={()=> handleLike(singlePost._id)}/>
              )}
              <p>{singlePost?.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
      {postReplyComments?.map((comment : CommentInterface)=>(
            <Reply comment={comment} user={user}/>
      ))}
            <AddPost placeHolder='Tweet Your Reply' isreply postId={singlePost._id}/>
  </div>
);
}

export default SinglePage