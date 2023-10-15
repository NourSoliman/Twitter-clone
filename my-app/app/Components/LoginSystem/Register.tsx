"use client"

import React , {useState} from 'react'
import Input from '../Modals/Inputs'
import Modal from '../Modals/Modal'
import { useSelector , useDispatch } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { CloseRegisterForm , openDialog } from '@/app/Redux/dialog/Actions'
import { registerAction } from '@/app/Redux/Login/Action'
import LoadingIndicator from './loading'
const Register = () => {
    const [firstName , setFirstName] = useState(``)
    const [lastName , setLastName] = useState(``)
    const [email , setEmail] = useState(``)
    const [password , setPassword] = useState(``)
    const [confirmPassword , setConfirmPassword] = useState(``)
    // const [isLoading , setIsLoading] = useState(false)
    const {isRegisterFormOpen} = useSelector((state : RootState)=>state.dialog)
    const {error , isLoading , message} = useSelector((state : RootState)=>state.user)
    const dispatch = useDispatch()
    console.log(error , `erro from register`)
    console.log(message , `erro from register`)
    const handleSignInLink = () => {
    dispatch(openDialog())
    dispatch(CloseRegisterForm())
    }
    const closeRegisterForm = () =>{
        dispatch(CloseRegisterForm())
    }
    const handleOnSubmit =  () => {
        const userData = {
        firstName,
        email,
        password,
        confirmPassword,
        lastName,
        };
        dispatch(registerAction(userData) as any);
        //show error if exist
        if (error && typeof error === 'string') {
            return;
          }
      
        //reset form after success register
            setFirstName(``)
            setLastName(``)
            setEmail(``)
            setPassword(``)
            setConfirmPassword(``)

    };
    if(isLoading){
        return(
            <LoadingIndicator />
        )
    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            {message && typeof message === `string` &&(
            <div className='text-green-500'>
            {message}
            </div>
            )}
            {error && typeof error === 'string' && (
            <div className='text-red-500'>
                {error}
            </div>
            )}
            <Input placeholder='FirstName'
            onChange={(e)=>setFirstName(e.target.value)}
            value={firstName}
            disabled={isLoading}
            type={"text"}
            />
            <Input placeholder='LastName'
            onChange={(e)=>setLastName(e.target.value)}
            value={lastName}
            disabled={isLoading}
            type={"text"}
            />
            <Input placeholder='email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            type={"email"}
            />
            <Input placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            type={"password"}
            />
            <Input placeholder='Confrim Password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            disabled={isLoading}
            type={"password"}
            />
        </div>
    )
    const footerContent = (
        <div className='text-neutral-400 text-center'>
            <p>Already have an account? <span
            className='text-white
            hover:underline
            cursor-pointer
            '
            onClick={handleSignInLink}
            >Sign in</span></p>

        </div>
    )
  return (
    <Modal 
    disabled={isLoading}
    isOpen={isRegisterFormOpen}
    title={"Create an Account"}
    actionLabel={"Sign up"}
    onClose={closeRegisterForm}
    onSubmit={handleOnSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default Register