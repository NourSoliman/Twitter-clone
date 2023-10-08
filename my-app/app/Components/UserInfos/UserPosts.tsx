import { RootState } from "@/app/Redux/MainStore/rootReducer";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllUserPosts,
  UnLikeProfilePost,
  LikeProfilePost,

} from "@/app/Redux/Posts/actions";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import PostAvatar from "../HomeContent/PostAvatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
interface userPostsProps {
  userId: string;
}
const UserPosts: React.FC<userPostsProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [page, setPage] = useState(1);
  const token: any = Cookies.get(`token`) || null;
  const decode: { userId: string } = jwt_decode(token) || null;
  const currentUser = decode?.userId;
  // const { posts } = useSelector((state: RootState) => state.posts);
  const userPosts  = useSelector((state: RootState) => state.posts.userPosts) as []
  console.log(userPosts , `userPosts!`)
  useEffect(() => {
    dispatch(GetAllUserPosts(userId, page) as any);
  }, [dispatch, userId, page]);
  const { user } = useSelector((state: RootState) => state.user) as any;
  // console.log(user ,`userdata`)
  const userFirstName = user?.firstName;
  const userLastName = user?.lastName;
  const handleLike = useCallback(
    async (postId: any) => {
      console.log(`LIKEDDDDDD111`)
      try {
        await dispatch(LikeProfilePost(postId) as any);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const handleUnLike = useCallback(
    async (postId: any) => {
      try {
        await dispatch(UnLikeProfilePost(postId) as any);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const goToPost = useCallback(
    (event: any , postId : string) => {
      event.stopPropagation();
      router.push(`/Posts/${postId}`);
    },
    [router]
  );
  return (
    <div>
      {userPosts?.map((post: any) => (
        // <div>
        //     <p className='text-white'>{post.body}</p>
        // </div>
        <div className="text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-800" key={post?._id}>
          <PostAvatar userId={post?.userId} />
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <p>{userFirstName}</p>
              <p className="text-neutral-400">@{userLastName}</p>
              <p className="text-neutral-400 text-sm">
                {post?.createdAt
                  ? formatDistanceToNowStrict(new Date(post.createdAt))
                  : null}
              </p>
            </div>
            <div>
              <p className="text-white">{post?.body}</p>
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500" onClick={() => goToPost( event,  post?._id)}>
                <AiOutlineMessage size={20} />
                <p>{post?.comments?.length || 0}</p>
              </div>
              <div
                className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
                
              >
                {post?.likedIds?.includes(currentUser) ? (
                  
                  <AiFillHeart size={20} color="red" onClick={() => handleUnLike(post?._id)}/>
                ) : (
                  <AiOutlineHeart size={20} onClick={() => handleLike(post?._id)}/>
                )}
                <p>{post?.likedIds?.length || 0}</p>
              </div>

            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
