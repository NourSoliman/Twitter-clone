import React , {useState} from 'react'
import Input from '../Modals/Inputs'
import Modal from '../Modals/Modal'
import { useSelector , useDispatch } from 'react-redux'
import { RootState } from '@/app/Redux/MainStore/rootReducer'
import { CloseRegisterForm , openDialog } from '@/app/Redux/dialog/Actions'
import { registerAction } from '@/app/Redux/Login/Action'
const Register = () => {
    const [firstName , setFirstName] = useState(``)
    const [lastName , setLastName] = useState(``)
    const [email , setEmail] = useState(``)
    const [password , setPassword] = useState(``)
    const [confirmPassword , setConfirmPassword] = useState(``)
    const [isLoading , setIsLoading] = useState(false)
    const {isRegisterFormOpen} = useSelector((state : RootState)=>state.dialog)
    console.log(isRegisterFormOpen , `is register`);
    const handleSignInLink = () => {
    dispatch(openDialog())
    dispatch(CloseRegisterForm())
    }
    const dispatch = useDispatch()
    const closeRegisterForm = () =>{
        dispatch(CloseRegisterForm())
    }
    const handleOnSubmit =  () => {
        // e.preventDefault();
        const userData = {
        firstName,
        email,
        password,
        confirmPassword,
        lastName,
        };
        // Dispatch the action
        dispatch(registerAction(userData) as any);
        //reset form after success register
        setFirstName(``)
        setLastName(``)
        setEmail(``)
        setConfirmPassword(``)
    };
    const bodyContent = (
        <div className="flex flex-col gap-4">
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