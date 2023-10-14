import React from 'react'
import { RingLoader } from "react-spinners";
import { RootState } from "@/app/Redux/MainStore/rootReducer";
import { useSelector } from 'react-redux';
const Loading = () => {
    const isLoading = false;
    return (
        <div>
            {isLoading &&
                <div className='flex justify-center items-center h-full z-1'>
                    <RingLoader color='#1948ef' size={70} />
                </div>
            }
        </div>
    )
}
export default Loading