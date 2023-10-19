
import React from 'react'
import { RingLoader } from "react-spinners";
import { RootState } from "@/app/Redux/MainStore/rootReducer";
import { useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";

interface loadingProps {
    isLoading: boolean
}
const Loading: React.FC<loadingProps> = ({ isLoading }) => {

    return (
        <div className='hidden lg:block'>
            {isLoading &&
                <div className="flex justify-center items-center space-x-4 flex-col mt-10 ">
                    <div className='flex items-center  flex-wrap mb-5'>
                        <div className="w-12 h-12 rounded-full mr-4" >
                            <Skeleton width={48} height={48} circle />
                        </div>
                        <div className="w-32 h-4  rounded">
                            <Skeleton />
                        </div>
                    </div>

                    <div className='flex items-center  flex-wrap mb-5'>
                        <div className="w-12 h-12 rounded-full mr-4" >
                            <Skeleton width={48} height={48} circle />
                        </div>
                        <div className="w-32 h-4  rounded">
                            <Skeleton />
                        </div>
                    </div>

                    <div className='flex items-center  flex-wrap mb-5'>
                        <div className="w-12 h-12 rounded-full mr-4" >
                            <Skeleton width={48} height={48} circle />
                        </div>
                        <div className="w-32 h-4  rounded">
                            <Skeleton />
                        </div>
                    </div>

                    <div className='flex items-center  flex-wrap mb-5'>
                        <div className="w-12 h-12 rounded-full mr-4" >
                            <Skeleton width={48} height={48} circle />
                        </div>
                        <div className="w-32 h-4  rounded">
                            <Skeleton />
                        </div>
                    </div>

                    <div className='flex items-center  flex-wrap mb-5'>
                        <div className="w-12 h-12 rounded-full mr-4" >
                            <Skeleton width={48} height={48} circle />
                        </div>
                        <div className="w-32 h-4  rounded">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}
export default Loading