import React, { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import PostAvatar from "./PostAvatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { LikePost, UnLikePost } from "@/app/Redux/Posts/actions";
import PostsLoading from "./loading";
import { openDialog } from "@/app/Redux/dialog/Actions";
import Cookies from "js-cookie";
interface PostsProps {
  userId?: string;
  post?: any;
  onSubmit?: (postId: string) => void;
  page: number;
  user: any;
  isLoading?: boolean,
}
const PostItem: React.FC<PostsProps> = ({ userId, post, page, user, isLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get(`token`) || ``
  //NAVIGATE TO POST USER PAGE
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${post?.userId}`);
    },
    [router, post?.userId]
  );
  //NAVIGATE TO POST SINGLE PAGE
  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (token) {
        router.push(`/Posts/${post?._id}`);
      } else {
        dispatch(openDialog() as any)
      }
    },
    [router, post?._id]
  );


  const userFirstName = user && user[post?.userId] ? user[post.userId].firstName || "" : "";
  const userLastName = user && user[post?.userId] ? user[post.userId].lastName || "" : "";

  const likedPost = post?.likedIds?.includes(userId);


  const handleLike = useCallback(async () => {
    try {
      if (token) {
        if (post?.likedIds.includes(userId)) {
          await dispatch(UnLikePost(post?._id) as any)
        } else {
          await dispatch(LikePost(post?._id) as any)
        }
      } else {
        dispatch(openDialog() as any)
      }
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, post, page])
  const handlecreateAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post?.createdAt]);
  if (isLoading) {
    return (
      <PostsLoading />
    )
  }
  return (
    <div className="text-black dark:text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-200 dark:border-neutral-800">
      <PostAvatar userId={post?.userId} />
      <div className="flex flex-col">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={goToUser}
        >
          <p>{userFirstName}</p>
          <p className="text-neutral-400">@{userLastName}</p>
          <p className="text-neutral-400 text-sm">{handlecreateAt}</p>
        </div>
        <div>
          <p className="text-black dark:text-white" onClick={goToUser}>
            {post?.body}
          </p>
        </div>
        <div className="flex flex-row items-center mt-3 gap-10">
          <div
            className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
            onClick={goToPost}
          >
            <AiOutlineMessage size={20} />
            <p>{post?.comments?.length || 0}</p>
          </div>
          <div
            className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            onClick={handleLike}
          >
            {post?.likedIds?.includes(userId) ? (
              <AiFillHeart size={20} color="red" />
            ) : (
              <AiOutlineHeart size={20} />
            )}
            {/* {likedPost?  <AiFillHeart size={20} color="red"/> : <AiOutlineHeart size={20} />} */}
            {/* <AiOutlineHeart size={20} /> */}
            <p>{post?.likedIds?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
