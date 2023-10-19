import React, { useMemo, useCallback , useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import PostAvatar from "./PostAvatar";
import { AiFillDelete, AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { DeletePost, GetAllPosts, LikePost, UnLikePost } from "@/app/Redux/Posts/actions";
import PostsLoading from "./loading";
import { openDialog } from "@/app/Redux/dialog/Actions";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import ConfirmationDialog from "../Modals/ConfirmationMessage";

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
  const [showFullText, setShowFullText] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(``);

  const token = Cookies.get(`token`) || ``
  const decode: { userId: string } = token ? jwt_decode(token) || { userId: '' } : { userId: '' };
  const currentUser = decode?.userId;
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

  const toggleShowText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };

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
  function splitTextIntoLines(text : string, lineLength = 25) {
    const lines = [];
    for (let i = 0; i < text.length; i += lineLength) {
      lines.push(text.slice(i, i + lineLength));
    }
    return lines;
  }
  const postBody = showFullText ? post?.body : post?.body.slice(0, 50);
  const handleConfirmDelete =  (postId : string) => {
    dispatch(DeletePost(postId) as any)
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
  return (
    <div
     className="text-black dark:text-white flex flex-row items-start
      gap-3 border-b-[1px] p-4 border-neutral-200 dark:border-neutral-800
      
      ">
      <PostAvatar userId={post?.userId} />
      <div className="flex flex-col">
        <div
          className="flex flex-row items-center justify-between gap-2 cursor-pointer "
          
        >
          <div className="flex flex-row gap-2">
          <p>{userFirstName}</p>
          <p className="text-neutral-400">@{userLastName}</p>
          <p className="text-neutral-400 text-sm">{handlecreateAt}</p>
          </div>
        </div>
        <div className="text-sm/[15px] lg:text-lg whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
        
        >
        {splitTextIntoLines(postBody).map((line, index) => (
          <p
            key={index}
            className="text-black dark:text-white"
            
          >
            {line}
          </p>
        ))}
        {post?.body.length > 50 && (
          <button
            className="text-blue-500 hover:underline block ml-2"
            onClick={toggleShowText}
          >
            {showFullText ? "Show Less" : "Show More"}
          </button>
        )}
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
            <p>{post?.likedIds?.length || 0}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end ml-auto">
      {post?.userId === currentUser && 
          <button className="hover:opacity-20 text-red-400 dark:text-red-700" onClick={()=> handleDelete(post?._id)}><AiFillDelete  size={20}/></button>
          }
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onConfirm={()=>handleConfirmDelete(post?._id)}
        onCancel={closeConfirmationDialog}
      />
    </div>
  );
};

export default PostItem;
