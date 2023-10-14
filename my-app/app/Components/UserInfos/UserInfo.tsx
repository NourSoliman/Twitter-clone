import Image from 'next/image';
import React  from 'react'
import Avatar from '../Sidebar/Avatar'
interface userInfoProps{
    userId : string,
    user:User,
}
interface User {
    firstName: string;
    lastName: string;
    email: string;
    profileImage:string,
    coverImage:string,
    bio:string,
    _id:string,
}
const UserInfo :React.FC<userInfoProps> = ({userId , user}) => {

  return (
        <div className='bg-neutral-300 dark:bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
            <Image
            src={user.coverImage}
            fill
            alt="cover"
            style={{objectFit:`cover`}}
            />
        )}
        <div className='absolute -bottom-16 left-4'>
        <Avatar userId={userId} imageType="profile" isLarge={true} border user={user}/>

        </div>
        </div>
  )
}

export default UserInfo