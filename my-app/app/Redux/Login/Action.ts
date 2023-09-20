import { REGISTER_FIRST , REGISTER_SUCCESS , REGISTER_FAIL , LOGIN_FAIL , LOGIN_FIRST , LOGIN_SUCCESS,
    LOGOUT_FAIL , LOGOUT_FIRST , LOGOUT_SUCCESS,ALL_FAIL, ALL_FIRST ,ALL_SUCCESS
    } from "./Types";
import {  Dispatch } from "redux";
import Cookies from "js-cookie";
const serverUrl = "http://localhost:1997/api"
interface UserData {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
    lastName: string;
  }
  interface UserLogin{
    email:string,
    password:string,
  }
export const registerAction = (userData : UserData) => {
    return async(dispatch : Dispatch) =>{
        try{
            dispatch({type:REGISTER_FIRST})
        const response = await fetch(`${serverUrl}/register`,{
            method:`POST`,
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(
                userData
            )
        })
        if(response.ok){
        const data = await response.json()
        console.log(data , `dsadasdad`)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:{
                user:data.user,
                message:data.message
            }
        })
        return data
        } else {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        }catch(error){
            console.log(error)
            dispatch({
                type:REGISTER_FAIL,
                error:`An error occurred while creating new account.`
            })
        }
    }
}

export const loginAction = (userData : UserLogin) => {
    return async(dispatch:Dispatch) =>{
        try{
            dispatch({type:LOGIN_FIRST})
            const response = await fetch(`${serverUrl}/login`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data ,` dasdasdas`)
            if(response.ok){
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:{
                        user:data.user,
                        message:data.message,
                        isLoggedIn:true,
                    }
                })
            }else{
                const ErrorData = await response.json()
                throw new Error(ErrorData.error)
            }
            return data
        }catch(error){
            console.log(error)
            dispatch({
                type:LOGIN_FAIL,
                error:`failed to login`
            })
        }
    }
}

export const LogoutAction = () => {
    return async(dispatch : Dispatch) => {
        try{
        dispatch({type:LOGOUT_FIRST})
        Cookies.remove(`token`,{path:`/`})
        dispatch({
            type:LOGOUT_SUCCESS
        })
        window.location.href="/"
        }catch(error){
            console.log(error)
        }
    }
}
export const fetchAllUsers = (currentPage : number) =>{
    return async(dispatch : Dispatch)=>{
        try{ 
        dispatch({type:ALL_FIRST})
        console.log('Fetching page', currentPage);

        const response = await fetch(`${serverUrl}/allusers/${currentPage}`)
        const data =await response.json()
        console.log(data.users , `all users data`)
            dispatch({type:ALL_SUCCESS,
            payload:data.users
            })  
        }catch(error){  
            console.log(error)
        }
    }
}