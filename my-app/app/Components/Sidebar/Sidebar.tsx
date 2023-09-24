"use client"
import React, {useState , useEffect} from 'react'
import {BsBellFill, BsHouseFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import SidebarItems from './SidebarItems'
import SideBarLogo from './SideBarLogo'
import { LogoutAction } from '@/app/Redux/Login/Action'
import { useSelector , useDispatch } from 'react-redux'
import TweetButton from './TweetButton'
import Cookies from "js-cookie";
import {SlLogin} from 'react-icons/sl'
import { openDialog } from '@/app/Redux/dialog/Actions'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
// import { destroyCookie } from 'nookies';
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/navigation'
function Sidebar() {
    const dispatch = useDispatch()
    const [isLoading , setIsLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== 'undefined') {
          // Check for the token cookie after the component mounts on the client side
        const newToken = Cookies.get('token') ?? null;
        setToken(newToken);
        setIsLoading(false)
        }
    }, []);
    const decodedToken:{userId:string | null} | null = token? jwt_decode(token) : null;
    const userId = decodedToken? decodedToken.userId : null;
    const handleSignOut = () =>{
        console.log(`logged out`);
        
        dispatch(LogoutAction() as any)
        Cookies.remove('token');
        setToken(null); // Update the state to reflect the user being logged out
        router.push(`/`)
    }
    const handleShowLogIn = () => {
        dispatch(openDialog())
    }
    const items = [
        {
            label:`Home`,
            href:"/",
            icon:BsHouseFill
        },
        {
            label:"Notifications",
            href:"/notifications",
            icon:BsBellFill
        },
        {
            label:"Profile",
            href:`/users/${userId}`,
            icon:FaUser
        },

    ]
        if (isLoading) {
            return <div>Loading...</div>;
        }
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6' >
        <div className='flex flex-col items-end'>
            <div className="space-y-2 lg:w-[230px]">
                <SideBarLogo />
                {items.map((item)=>(
                    (item.href === '/' || token) ? (
                        <SidebarItems key={item.href} label={item.label} href={item.href} icon={item.icon} />
                    ) : (
                        <SidebarItems key={item.href} label={item.label} icon={item.icon} onClick={handleShowLogIn} />
                    )
                ))}
                {token &&
                <SidebarItems icon={BiLogOut} label={"Logout"} onClick={handleSignOut}/>
                }
                {/* <SidebarItems icon={BiLogOut} label={"Logout"} onClick={handleSignOut}/>: */}

                <TweetButton />
            </div>
        </div>
    </div>
  )
}

export default Sidebar