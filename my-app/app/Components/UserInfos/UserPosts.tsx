import { RootState } from "@/app/Redux/MainStore/rootReducer";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllUserPosts,
  UnLikeProfilePost,
  LikeProfilePost,
  DeletePost,
  DeleteUserPost,

} from "@/app/Redux/Posts/actions";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import PostAvatar from "../HomeContent/PostAvatar";
import { AiFillDelete, AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import ConfirmationDialog from '../Modals/ConfirmationMessage'
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
interface userPostsProps {
  userId: string;

}
const UserPosts: React.FC<userPostsProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(``);
  const [page, setPage] = useState(1);
  const [showFullText, setShowFullText] = useState(false);
  const token: any = Cookies.get(`token`) || null;
  const decode: { userId: string } = jwt_decode(token) || null;
  const currentUser = decode?.userId;
  const userPosts = useSelector((state: RootState) => state.posts.userPosts) as []
  useEffect(() => {

    dispatch(GetAllUserPosts(userId, page) as any);
  }, [dispatch, userId, page]);
  const { user } = useSelector((state: RootState) => state.user) as any;
  const userFirstName = user?.firstName;
  const userLastName = user?.lastName;
  const handleLike = useCallback(
    async (postId: any) => {
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
    (event: any, postId: string) => {
      event.stopPropagation();
      router.push(`/Posts/${postId}`);
    },
    [router]
  );
  const handleConfirmDelete =  (postId : string) => {
  dispatch(DeleteUserPost(postId) as any)
        closeConfirmationDialog()
  }

  const openConfirmationDialog = (postId : string) => {
    setPostIdToDelete(postId);
    setIsConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setPostIdToDelete(``);
    setIsConfirmationDialogOpen(false);
  };

  const handleDelete = (postId : string) => {
    openConfirmationDialog(postId);
  };
  //split post on lines
  function splitTextIntoLines(text : string, lineLength = 40) {
    const lines = [];
    for (let i = 0; i < text.length; i += lineLength) {
      lines.push(text.slice(i, i + lineLength));
    }
    return lines;
  }
  const toggleShowText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };
  return (
    <div className="mb-12 lg:mb-0">
      {userPosts?.map((post: any) => (
        <div className="text-black dark:text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-200 dark:border-neutral-800" key={post?._id}>
          <PostAvatar userId={post?.userId} />
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 cursor-pointer text-sm/[14px]">
              <p>{userFirstName}</p>
              <p className="text-neutral-400">@{userLastName}</p>
              <p className="text-neutral-400 text-sm">
                {post?.createdAt
                  ? formatDistanceToNowStrict(new Date(post.createdAt))
                  : null}
              </p>
            </div>
            <div>
              {splitTextIntoLines(showFullText ? post?.body : post?.body.slice(0, 100)).map((line, index) => (
                <p
                  key={index}
                  className="text-black dark:text-white"
                  style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                >
                  {line}
                </p>
              ))}
              {post?.body.length > 100 && (
                <button
                  className="text-blue-500 hover:underline block ml-2"
                  onClick={toggleShowText}
                >
                  {showFullText ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500" onClick={() => goToPost(event, post?._id)}>
                <AiOutlineMessage size={20} />
                <p>{post?.comments?.length || 0}</p>
              </div>
              <div
                className="text-sm/[15px] flex flex-row text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"

              >
                {post?.likedIds?.includes(currentUser) ? (

                  <AiFillHeart size={20} color="red" onClick={() => handleUnLike(post?._id)} />
                ) : (
                  <AiOutlineHeart size={20} onClick={() => handleLike(post?._id)} />
                )}
                <p>{post?.likedIds?.length || 0}</p>
              </div>

            </div>
          </div>
          <div className="flex items-end justify-end ml-auto">
            {post?.userId === currentUser &&
            <button className="hover:opacity-20 text-red-400 dark:text-red-700" onClick={() => handleDelete(post?._id)}><AiFillDelete size={20} /></button>
            }
          </div>
          <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onConfirm={()=>handleConfirmDelete(post?._id)}
        onCancel={closeConfirmationDialog}
      />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
