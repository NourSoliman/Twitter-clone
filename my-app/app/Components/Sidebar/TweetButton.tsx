  "use client"
  import React , {useCallback, useState} from 'react'
  import { FaFeather } from 'react-icons/fa'
  import {CloseTweetForm, openDialog, OpenTweetForm} from '../../Redux/dialog/Actions'
  import { useDispatch , useSelector } from 'react-redux'
  import TweetModal from '../Modals/TweetModal'
  import { addPost, GetAllPosts } from '@/app/Redux/Posts/actions'
  import { RootState } from '@/app/Redux/MainStore/rootReducer'
  import Cookies from 'js-cookie'
  interface tweetButton {
    userId?:string | null,
  }
  const TweetButton: React.FC<tweetButton> = ({userId}) => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state:RootState) => state.dialog.isTweetFormOpen)
    const token = Cookies.get(`token`)
    const handleClick = () => {
      if(token){
        dispatch(OpenTweetForm())
      } else {
        dispatch(openDialog())
      }
    }

    const handleClose = () => {
      dispatch(CloseTweetForm())
    }

    const onSubmit = async (content: string) => {
      if (userId) {
        try {
          await dispatch(addPost(userId, content) as any);
          await dispatch(GetAllPosts(1) as any);
        //   await dispatch(GetUserData(userId) as any);
        } catch (error) {
          console.log(error);
        }
      }
    };
    return (
      <div >
        <div className="
          relative
          mt-6
          lg:hidden
          rounded-full
          h-14
          w-14
          p-4
          flex items-center
          justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer
              "
              onClick={handleClick}
              >
          <FaFeather size={24} color={"white"} />
        </div>
        <div className='
          mt-6
          hidden
          lg:block
          px-4
          py-2
          rounded-full
          bg-sky-500
          hover:bg-opacity-90
          curosr-pointer
          transition
          '
          onClick={handleClick}
          >
          <p className='
          hidden
          lg:block
          text-center
          font-semibold
          text-white dark:text-white
          text-[20px]
          cursor-pointer
          '>Tweet</p>
        </div>
        <TweetModal open={isOpen} onClose={handleClose} AddTweet={onSubmit} />
      </div>
    )
  }

  export default TweetButton