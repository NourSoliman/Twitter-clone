"use client"
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { addPost, GetAllPosts,  replyOnPost } from "@/app/Redux/Posts/actions";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, OpenRegisterForm } from "@/app/Redux/dialog/Actions";
import Button from "../Buttons/Button";
import Avatar from "../Sidebar/Avatar";
import { RootState } from "@/app/Redux/MainStore/rootReducer";

import Skeleton from "react-loading-skeleton"; 

interface addPostProps{
  placeHolder:string,
  isreply?:boolean,
  postId?:string,

}
const AddPost: React.FC<addPostProps> = ({placeHolder , isreply , postId }) => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState(``);
  const [userId, setUserId] = useState(``);
  const [page, setPage] = useState(1);
  const [loading , setLoading] = useState(true)
  const { user }: any = useSelector((state: RootState) => state.user);
  const { isLoading }: any = useSelector((state: RootState) => state.posts);
  const  loggedUser : any = useSelector((state: RootState) => state.user.loggedUser);

  useEffect(() => {
    const clientToken = Cookies.get("token") || null;

    if (clientToken) {
      // Decode the token to access its payload
      const decodedToken: { userId: string } | undefined =
        jwt_decode(clientToken);
      const user = decodedToken?.userId || ``;
      // Set the userId state with the extracted value
      setUserId(user);
    }
    setLoading(false)
  }, []);

  const onSubmit = useCallback(async () => {
    console.log(`this comment`)

    try {
      await dispatch(addPost(userId, postContent) as any);
      dispatch(GetAllPosts(1) as any);
    //   await dispatch(GetUserData(userId) as any);
      setPostContent(``);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userId, postContent]);

  const onReply = useCallback(async () => {
    console.log(`this reply`)
    try {
      if(postId) {
        await dispatch(replyOnPost(postId , postContent) as any)
        await dispatch(GetAllPosts(1) as any);
        setPostContent(``);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch,postContent]);
  const handleLoginButton = () => {
    dispatch(openDialog());
  };
  const handleRegisterForm = () => {
    dispatch(OpenRegisterForm());
  };
  if(loading) {
    return(
<div className="ml-3 flex items-center gap-4 border-b-[1px] border-neutral-800 ">
  <div className="mb-5">
    <Skeleton width={48} height={48} circle />
  </div>
  <div className="flex-grow">
    <Skeleton width={200} />
  </div>
  <div className="self-end">
    <Skeleton width={48} />
  </div>
</div>
    )
  }
  return (
    <div className="border-b-[1px] border-neutral-200 dark:border-neutral-800 px-5 py-2">
      {userId ? (
        <div className="flex flex-row">
          <div className="pt-3">

              <Avatar userId={userId} user={loggedUser} imageType="profile" />

          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              placeholder={placeHolder}
              className="w-full  bg-white dark:bg-transparent mt-3 ml-3 resize-none text-black dark:text-white outline-none"
            />
            <div className="flex justify-end ">
              <Button
                onClick={isreply ? onReply : onSubmit}
                label="Tweet"
                disabled={isLoading || !postContent}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-4  mb-4">
          <h1 className="text-black dark:text-white font-bold mb-4 mt-4">
            Welcome to Twitter Clone!
          </h1>
          <div className="flex gap-4 mb-7">
            <Button label={"login"} secondary onClick={handleLoginButton} />
            <Button label="Register" onClick={handleRegisterForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
