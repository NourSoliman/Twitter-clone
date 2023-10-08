"use client"
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { addPost, GetAllPosts, replyOnPost } from "@/app/Redux/Posts/actions";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, OpenRegisterForm } from "@/app/Redux/dialog/Actions";
import Button from "../Buttons/Button";
import Input from "../Modals/Inputs";
import Avatar from "../Sidebar/Avatar";
import { RootState } from "@/app/Redux/MainStore/rootReducer";
import { GetUserData } from "@/app/Redux/Login/Action";
import { RingLoader } from "react-spinners";
import PostAvatar from "./PostAvatar";
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
  const { user }: any = useSelector((state: RootState) => state.user);
  const  loggedUser : any = useSelector((state: RootState) => state.user.loggedUser);
  const { isLoading } = useSelector((state: RootState) => state.posts);
  // Retrieve the token from the cookie on the client side
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
        dispatch(GetAllPosts(1) as any);
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <RingLoader color="#1948ef" size={70} />
      </div>
    );
  }
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
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
              className="w-full bg-black mt-3 ml-3 resize-none text-white outline-none"
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
          <h1 className="text-white font-bold mb-4 mt-4">
            Welcome to Twitter Clone!
          </h1>
          <div className="flex gap-4 mb-7">
            <Button label="login" secondary onClick={handleLoginButton} />
            <Button label="Register" onClick={handleRegisterForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
