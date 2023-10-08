import PostAvatar from '@/app/Components/HomeContent/PostAvatar'
import { User } from '@/app/Redux/Login/Reducer';
import { CommentInterface } from '@/app/Redux/Posts/reducers';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useMemo } from 'react'
interface replyProps {
    comment?:CommentInterface,
    user?:User,
}
  
const Reply : React.FC<replyProps> = ({comment , user }) => {
    const userFirstName: string | undefined = user ? user[comment?.userId]?.firstName : undefined;
    const userLastName: string | undefined = user ? user[comment?.userId]?.lastName : undefined;

    const handlecreateAt = useMemo(() => {
        if (!comment?.createdAt) {
          return null;
        }
        return formatDistanceToNowStrict(new Date(comment?.createdAt));
      }, [comment?.createdAt]);

  return (
    <div className="text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-800">
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
          <p className="text-white">
            {comment?.body}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Reply