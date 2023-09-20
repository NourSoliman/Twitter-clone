import { REGISTER_FIRST , REGISTER_SUCCESS , REGISTER_FAIL , LOGIN_FAIL , LOGIN_FIRST , LOGIN_SUCCESS,
LOGOUT_FAIL , LOGOUT_FIRST , LOGOUT_SUCCESS,ALL_FAIL, ALL_FIRST ,ALL_SUCCESS
} from "./Types";

interface RegisterFirst{
    type:typeof REGISTER_FIRST,
    isLoading:boolean
}
interface LoginFirst{
    type:typeof LOGIN_FIRST,
    isLoading:boolean
}
interface AllFirst{
    type:typeof ALL_FIRST,
    isLoading:boolean,
}
interface LogoutFirst{
    type:typeof LOGOUT_FIRST,
    isLoading:boolean
}
interface LoginSuccess{
    type:typeof LOGIN_SUCCESS,
    payload:{
        user:object,
        message:string,
    }
    isLoggedIn:boolean,
    isLoading:boolean
}
interface LogoutSuccess{
    type:typeof LOGOUT_SUCCESS,
    payload:{
        message:string,
    }
    isLoading:boolean,
    isLoggedIn:boolean,

}
interface RegisterSuccess{
    type:typeof REGISTER_SUCCESS,
    payload:{
        user:object,
        message:string
    }
    isLoading:boolean
}
interface User{
    firstName:string,
    lastName:string,
    email:string
}
interface AllSuccess{
    type:typeof ALL_SUCCESS,
    payload:{
        users:User[],
    }
    isLoading:boolean,
}
interface RegisterFail{
    type:typeof REGISTER_FAIL,
    payload:{
        error:string,
    }
    isLoading:boolean
}
interface LoginFail{
    type:typeof LOGIN_FAIL,
    payload:{
        error:string,
    }
    isLoading:boolean
}
interface LogoutFail{
    type:typeof LOGOUT_FAIL,
    error:string,
    isLoading:boolean,
    isLoggedIn:boolean,
}
interface AllFail {
    type:typeof ALL_FAIL,
    error:string,
    isLoading:boolean,
}

type actionTypes = RegisterFirst | RegisterSuccess | RegisterFail | 
LoginFail | LoginFirst | LoginSuccess|LogoutFail |
 LogoutFirst | LogoutSuccess | AllSuccess |AllFail | AllFirst 
    interface intiState{
        isLoading:boolean,
        user:object,
        message:string,
        isLoggedIn:boolean,
        error:string,
        users:User[],
    }
    const initialState:intiState ={
        isLoading:false,
        users:[],
        user:{},
        message:"",
        error:"",
        isLoggedIn:false,
    }
const loginReducer = (state = initialState , action :actionTypes )=>{
    switch(action.type){
        case REGISTER_FIRST:
        case LOGIN_FIRST:
        case LOGOUT_FIRST:
        case ALL_FIRST:
            return{
                ...state,
                isLoading:true,
            }
        case REGISTER_SUCCESS:
            return{
            ...state,
            user:action.payload,
            message:action.payload,
            isLoading:false,
            }
        case LOGIN_SUCCESS:
            const {user , message} = action.payload
            return{
                ...state,
                user,
                message,
                isLoading:false,
                isLoggedIn:true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                message:action.payload,
                isLoading:false,
                isLoggedIn:false,
            }
        case ALL_SUCCESS:
            console.log("Updated users:", action.payload.users); // Log the users array

            return{
                ...state,
                users:[...state.users , ...action.payload.users],
                isLoading:false,
            }
        case LOGIN_FAIL:
            // const {error} = action.payload
            return{
                ...state,
                error:`ERROR-LOGGING`,
                isLoading:false,
            }
        case REGISTER_FAIL:
            return{
                ...state,
                error:`ERROR ROROROROROR`,
                isLoading:false,
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                error:`Error loggingout`,
                isLoading:false,
            }
        case ALL_FAIL:
            return{
                ...state,
                error:`error`,
                isLoading:false,
            }
        default:
            return state;
    }
}
export default loginReducer