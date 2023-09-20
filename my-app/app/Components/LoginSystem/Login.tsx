
import React , {useState} from 'react'
import Input from '../Modals/Inputs'
import Modal from '../Modals/Modal'
import { useSelector , useDispatch ,  } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { closeDialog , OpenRegisterForm } from '@/app/Redux/dialog/Actions'
import { loginAction } from '@/app/Redux/Login/Action'
import Cookies from "js-cookie";
import { setCookie } from 'nookies';

function Login() {
    const [email , setEmail] = useState(``)
    const [password , setPassword] = useState(``)
    const [isLoading , setIsLoading] = useState(false)
    const {isLoginFormOpen} = useSelector((state:RootState)=>state.dialog)
    console.log(isLoginFormOpen)
    const dispatch = useDispatch()
    //close login modal
    const handleOnClose =() =>{
        dispatch(closeDialog())
        console.log(`closed`)
    }

    //login function
    const handleSubmit=async()=>{
        console.log(`clicked`)
        const userData ={
            email:email,
            password:password,
        }
        try{
            const response = await dispatch(loginAction(userData) as any)
            console.log(response , `response from frntenddsadsa`);
            
            // if(response && response.token) {
            //     const token = response.token
            //     Cookies.set(`token`,token)
            //     console.log(token , `token`);
            //     // Refresh the page after successful login
            //     window.location.reload();
                
            // }
            if (response && response.token) {
                const token = response.token;
          
                // Use Nookies to set the token cookie
                setCookie(null, 'token', token, {
                  maxAge: 24 * 60 * 60, // 24 hours in seconds
                  path: '/', // Cookie path
                  secure: false, // Change to true if using HTTPS
                });
          
                console.log(token, `token`);
                // Refresh the page after successful login
                window.location.reload();
              }
          
            setEmail(``)
            setPassword(``)
            dispatch(closeDialog())

        }catch(error){
            console.log(error)
        }
    }
    //switch to Register Modal
    const SwitchToRegister = () => {
        dispatch(closeDialog())
        dispatch(OpenRegisterForm())
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
    <Input 
        placeholder='email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        />
    <Input 
        placeholder='password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        />
        </div>
    )
    const footerContent = (
        <div className='text-neutral-400 text-center'>
            <p>First Time here? <span
            className='text-white
            hover:underline
            cursor-pointer
            '
            onClick={SwitchToRegister}
            >create an account</span></p>
        </div>
    )
  return (
    <Modal 
    disabled={isLoading}
    isOpen={isLoginFormOpen}
    title={"login"}
    actionLabel={"Sign in"}
    onClose={handleOnClose}
    onSubmit={handleSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default Login