import PostAvatar from '@/app/Components/HomeContent/PostAvatar'
import { User, Username } from '@/app/Redux/Login/Reducer';
import { DeleteCommentFromPost } from '@/app/Redux/Posts/actions';
import { CommentInterface } from '@/app/Redux/Posts/reducers';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useMemo  } from 'react'
import {  useDispatch } from 'react-redux'
import {  useParams } from 'next/navigation'
import { AiFillDelete } from 'react-icons/ai';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

interface replyProps {
    comment?:CommentInterface,
    user?:Username,
    commentId:string,

}
  
const Reply : React.FC<replyProps> = ({comment , user  , commentId   }) => {
  const token: any = Cookies.get(`token`) || null;
  const decode: { userId: string } = jwt_decode(token) || null;
  const currentUser = decode?.userId;
  const dispatch = useDispatch()
  const userFirstName: string | undefined = user && comment
  ? user[comment.userId]?.firstName
  : undefined;

const userLastName: string | undefined = user && comment
  ? user[comment.userId]?.lastName
  : undefined;
  const params = useParams()
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;
    const handlecreateAt = useMemo(() => {
        if (!comment?.createdAt) {
          return null;
        }
        return formatDistanceToNowStrict(new Date(comment?.createdAt));
      }, [comment?.createdAt]);

      const handleDelete = (postId: string , commentId:string) => {
        dispatch(DeleteCommentFromPost(postId , commentId) as any)
      }
  return (
    <div className="text-black dark:text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-800">
      <PostAvatar userId={comment?.userId} />
      <div className="flex flex-col">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          
        >
          <p>{userFirstName}</p>
          <p className="text-neutral-400">@{userLastName}</p>
          <p className="text-neutral-400 text-sm">{handlecreateAt}</p>
        </div>
        <div>
          <p className="text-black dark:text-white">
            {comment?.body}
          </p>
          {comment?.userId === currentUser &&           
          <button className="hover:opacity-20 text-red-400 dark:text-red-700"
          onClick={()=>handleDelete(postId , commentId)}>
            <AiFillDelete size={30} />
            </button>
          }
        </div>
      </div>
    </div>
  )
}
export default Reply