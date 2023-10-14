"use client"
import React from 'react'

import Skeleton from "react-loading-skeleton"; 

const PostsLoading = () => {
    return (
      <div className="text-black dark:text-white flex flex-row items-start gap-3 border-b-[1px] p-4 border-neutral-800">
      <Skeleton width={48} height={48} circle/>
      <Skeleton  count={2} width={300}/>
    </div>
    )
}
export default PostsLoading