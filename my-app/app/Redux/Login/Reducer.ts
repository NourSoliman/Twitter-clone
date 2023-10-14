import {
    REGISTER_FIRST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_FIRST, LOGIN_SUCCESS,
    LOGOUT_FAIL, LOGOUT_FIRST, LOGOUT_SUCCESS, ALL_FAIL, ALL_FIRST, ALL_SUCCESS, IMAGES_SUCCESS,
    GET_USER_DATA_FAIL, GET_USER_DATA_FIRST, GET_USER_DATA_SUCCESS, CHANGE_BIO_FAIL, CHANGE_BIO_FIRST,
    CHANGE_BIO_SUCCESS, GET_PROFILE_IMAGE_SUCCESS,FOLLOW_SOMEONE,GET_LOGGED_IN_USER , UN_FOLLOW_SOMEONE
} from "./Types";
//FIRST TYPES///////////////////////////
interface RegisterFirst {
    type: typeof REGISTER_FIRST,
    isLoading: boolean
}
interface LoginFirst {
    type: typeof LOGIN_FIRST,
    isLoading: boolean
}
interface AllFirst {
    type: typeof ALL_FIRST,
    isLoading: boolean,
}
interface LogoutFirst {
    type: typeof LOGOUT_FIRST,
    isLoading: boolean
}
interface GetUser {
    type: typeof GET_USER_DATA_FIRST,
    isLoading: boolean,
}
interface ChangeBio {
    type: typeof CHANGE_BIO_FIRST
    isLoading: boolean,
}
///////////SUCCESS TYpeS////////////////////////////////////
interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    payload: {
        user: object,
        message: string,
    }
    isLoggedIn: boolean,
    isLoading: boolean
}
interface LogoutSuccess {
    type: typeof LOGOUT_SUCCESS,
    payload: {
        message: string,
    }
    isLoading: boolean,
    isLoggedIn: boolean,

}
interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS,
    payload: {
        user: object,
        message: string
    }
    isLoading: boolean
}
interface GetProfileImageSuccess {
    type: typeof GET_PROFILE_IMAGE_SUCCESS,
    payload: {
        userId: string,
        ProfileImage: string,
        firstName:string,
        lastName:string,
    }
}
export interface Username {
    [key:string]:{
        firstName:string,
        lastName:string,
    },
}
export interface User {

    firstName: string;
    lastName: string;
    email: string;
    profileImage: string,
    coverImage: string,
    bio: string,
    _id: string,
}
interface AllSuccess {
    type: typeof ALL_SUCCESS,
    payload: {
        users: User[],
    }
    isLoading: boolean,
}
interface Image {
    type: typeof IMAGES_SUCCESS,
    payload: {
        userImage: string,
    }
}
interface GetUserSuccess {
    type: typeof GET_USER_DATA_SUCCESS,
    payload: User,
    isLoading: boolean,
}
interface ChangeProfileBioSuccess {
    type: typeof CHANGE_BIO_SUCCESS,
    payload: User,
    isLoading: boolean,
}
interface FollowSomeone{
    type:typeof FOLLOW_SOMEONE,
    payload:User,
    isLoading:boolean,
}
interface UnFollow {
    type:typeof UN_FOLLOW_SOMEONE,
    payload:User,
    isLoading:boolean,
}
interface GetLoggedUser {
    type:typeof GET_LOGGED_IN_USER,
    payload:User,
    isLoading:boolean,
}
///////////////////FAIL TYPEs////////////////////////////////////////
interface RegisterFail {
    type: typeof REGISTER_FAIL,
    payload: {
        error: string,
    }
    isLoading: boolean
}
interface LoginFail {
    type: typeof LOGIN_FAIL,
    payload: {
        error: string,
    }
    isLoading: boolean
}
interface LogoutFail {
    type: typeof LOGOUT_FAIL,
    error: string,
    isLoading: boolean,
    isLoggedIn: boolean,
}
interface AllFail {
    type: typeof ALL_FAIL,
    error: string,
    isLoading: boolean,
}
interface GetUserFail {
    type: typeof GET_USER_DATA_FAIL,
    error: string,
    isLoading: boolean,
}


interface ChangeBioFail {
    type: typeof CHANGE_BIO_FAIL,
    error: string,
    isLoading: boolean,
}

type actionTypes = RegisterFirst | RegisterSuccess | RegisterFail |
    LoginFail | LoginFirst | LoginSuccess | LogoutFail |
    LogoutFirst | LogoutSuccess | AllSuccess | AllFail | AllFirst | Image |
    GetUserSuccess | GetUser | GetUserFail | ChangeBio | ChangeBioFail
    | ChangeProfileBioSuccess | GetProfileImageSuccess | FollowSomeone | GetLoggedUser | UnFollow


interface intiState {
    isLoading: boolean,
    user: object,
    message: string,
    isLoggedIn: boolean,
    error: string,
    users: User[],
    ProfileImage: object,
    loggedUser : object,
}
const initialState: intiState = {
    isLoading: false,
    users: [],
    user: {} as User,
    message: "",
    error: "",
    isLoggedIn: false,
    ProfileImage: {},
    loggedUser:{
        firstName: '',      
        lastName: '',
        email: '',
        profileImage: '',
        coverImage: '',
        bio: '',
        _id: '',
        isFollowing: false,
    },
}
const loginReducer = (state = initialState, action: actionTypes) => {
    switch (action.type) {
        case REGISTER_FIRST:
        case LOGIN_FIRST:
        case LOGOUT_FIRST:
        case ALL_FIRST:
        case GET_USER_DATA_FIRST:
        case CHANGE_BIO_FIRST:
            return {
                ...state,
                isLoading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                message: action.payload,
                isLoading: false,
            }
        case LOGIN_SUCCESS:
            const { user, message } = action.payload
            return {
                ...state,
                user,
                message,
                isLoading: false,
                isLoggedIn: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                message: action.payload,
                isLoading: false,
                isLoggedIn: false,
            }
        case ALL_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                isLoading: false,
            }
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        case CHANGE_BIO_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
            case GET_PROFILE_IMAGE_SUCCESS:
                return {
                    ...state,
                    ProfileImage: {
                        ...state.ProfileImage,
                        [action.payload.userId]: action.payload.ProfileImage,
                    },
                    // Include firstName and lastName in the user object
                    user: {
                        ...state.user,
                        [action.payload.userId]: {
                            firstName: action.payload.firstName,
                            lastName: action.payload.lastName,
                        },
                    },
                };
            case GET_LOGGED_IN_USER:
                return{
                    ...state,
                    loggedUser:action.payload,
                    isLoading:false,
                }
            case FOLLOW_SOMEONE:
                return{
                    ...state,
                    // user:action.payload,
                    loggedUser:{
                    ...state.loggedUser,
                    isFollowing:true,
                    },
                    isLoading:false,
                }
            case UN_FOLLOW_SOMEONE:
                return{
                    ...state,
                    // user:action.payload,
                    loggedUser:{
                        ...state.loggedUser,
                        isFollowing:false,
                        },
                    isLoading:false
                }
        case LOGIN_FAIL:
            // const {error} = action.payload
            return {
                ...state,
                error: `ERROR-LOGGING`,
                isLoading: false,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                error: `ERROR ROROROROROR`,
                isLoading: false,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: `Error loggingout`,
                isLoading: false,
            }
        case ALL_FAIL:
            return {
                ...state,
                error: `error`,
                isLoading: false,
            }
        case GET_USER_DATA_FAIL:
            return {
                ...state,
                error: `ERORORO`,
                isLoading: false,
            }
        case CHANGE_BIO_FAIL:
            return {
                ...state,
                error: `error`,
                isLoading: false,
            }
        default:
            return state;
    }
}
export default loginReducer