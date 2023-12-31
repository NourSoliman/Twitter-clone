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
import { openDialog } from '@/app/Redux/dialog/Actions'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation'
import Loading from './loading'
import DarkMode from './DarkMode'

const  Sidebar = () => {
    const dispatch = useDispatch()
    const [isLoading , setIsLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter()
    const { loggedUser }: any = useSelector((state: RootState) => state.user);

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
            icon:BsBellFill,
            alert:loggedUser.hasNotification,
        },
        {
            label:"Profile",
            href:`/users/${userId}`,
            icon:FaUser
        },

    ]
    if(isLoading) {
        return (
            <Loading isLoading={isLoading}/>
        )
    }
  return (
    <div>
    <div className='hidden lg:block lg:col-span-1 lg:h-full pr-4 md:pr-6' >
        <div className='lg:flex lg:flex-col  lg:items-end'>
            <div className="lg:space-y-2 lg:w-[230px]">
                <SideBarLogo />
                {items.map((item)=>(
                    (item.href === '/' || token) ? (
                        <SidebarItems key={item.href} label={item.label} href={item.href} icon={item.icon} alert={item.alert}/>
                    ) : (
                        <SidebarItems key={item.href} label={item.label} icon={item.icon} onClick={handleShowLogIn} alert={item.alert}/>
                    )
                ))}
                <DarkMode />
                {token ? (
                    <SidebarItems icon={BiLogOut} label={"Logout"} onClick={handleSignOut} isLoading={true}/>
                ):(null)
                }
                <TweetButton userId={userId}/>
            </div>
        </div>
    </div>
    <div className="lg:hidden fixed bottom-0 left-0 z-50  w-full  bg-white dark:bg-slate-900">
        <div className='flex flex-row  items-end justify-between '>
          {items.map((item) => (
            (item.href === '/' || token) ? (
              <SidebarItems key={item.href} label={item.label} href={item.href} icon={item.icon} alert={item.alert} />
            ) : (
              <SidebarItems key={item.href} label={item.label} icon={item.icon} onClick={handleShowLogIn} alert={item.alert} />
            )
          ))}
          <DarkMode />
          {token ? (
            <SidebarItems icon={BiLogOut} label="Logout" onClick={handleSignOut} isLoading={true} />
          ) : (null)
          }
        </div>
      </div>

    </div>
  )
}

export default Sidebar