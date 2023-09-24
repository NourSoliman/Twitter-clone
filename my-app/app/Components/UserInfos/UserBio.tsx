
import { RootState } from '@/app/Redux/MainStore/rootReducer';
import React, { useMemo } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { format } from 'date-fns'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import Button from '../Buttons/Button';
import { BiCalendar } from 'react-icons/bi';
import { OpenEditForm  } from '@/app/Redux/dialog/Actions';
import EditModal from '../Sidebar/EditModal';

interface UserBioProps {
    userId: string,
}
interface User {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string,
    coverImage: string,
    bio: string,
    _id: string,
}
const UserBio: React.FC<UserBioProps> = ({ userId }) => {
    const dispatch = useDispatch()
    const { user }: any = useSelector((state: RootState) => state.user);
    const token: any = Cookies.get(`token`)
    const decode: { userId: string } = jwt_decode(token);
    const currentUser = decode.userId;
    const isEditFormOpen = useSelector((state:RootState)=>state.dialog.isEditFormOpen)
    const handleOnEditClick = () => {
        dispatch(OpenEditForm())
        console.log(isEditFormOpen , `isEditFormOpen`)
    }

    const createdAt = useMemo(() => {
        if (!user?.createdAt) {
            return null
        }
        return format(new Date(user?.createdAt), `MMMM yyyy`)
    }, [user?.createdAt])

    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>
                  <EditModal />

            <div className='flex justify-end pt-2'>
                {currentUser === userId ? (
                    <Button label="edit" secondary onClick={handleOnEditClick} />
                ) : (
                    <Button label='follow' secondary onClick={()=>{}} />
                )}
            </div>
            <div className='mt-8 px-4'>
                <div className='flex flex-col left-4 text-left'>
                    <h2 className='text-white text-2xl text-semibold'>
                        {user?.firstName}
                    </h2>
                    <p className='text-neutral-400 text-sm'>@{user?.lastName}</p>
                </div>
                <div className='flex flex-col mt-4'>
                    <p className='text-white'>{user?.bio}</p>
                    <div className='flex flex-row items-center mt-4 gap-2 text-neutral-500'>
                        <BiCalendar color='white' size={20}/>
                    <p>
                    Joined {createdAt}
                    </p>
                    </div>
                </div>
                <div className='flex flex-row  items-center gap-2'>
                <div className='flex flex-row mt-4 items-center gap-2'>
                <p className='text-white'>
                    {user?.followingIds?.length}
                </p>
                <p className='text-neutral-500'>Following</p>
                </div>
                <div className='flex flex-row mt-4 items-center gap-2'>
                <p className='text-white'>
                    {user?.followerIds || 0}
                </p>
                <p className='text-neutral-500'>Followers</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio