import { OPEN_LOGIN_FORM , CLOSE_LOGIN_FORM , OPEN_REGISTER_FORM , CLOSE_REGISTER_FORM, 
OPEN_EDIT_FORM , CLOSE_EDIT_FORM , OPEN_TWEET_FORM , CLOSE_TWEET_FORM
} from "./Types";

interface OpenLoginForm {
    type:typeof OPEN_LOGIN_FORM;
    isLoginFormOpen:boolean;
}
interface OpenEditForm {
    type:typeof OPEN_EDIT_FORM;
    isEditFormOpen:boolean;
}
interface CloseLoginForm{
    type:typeof CLOSE_LOGIN_FORM;
    isLoginFormOpen:boolean;
}
interface CloseEditForm{
    type:typeof CLOSE_EDIT_FORM;
    isEditFormOpen:boolean;
}
interface OpenRegisterForm{
    type:typeof OPEN_REGISTER_FORM;
    isRegisterFormOpen:boolean,
}
interface CloseRegisterForm{
    type:typeof CLOSE_REGISTER_FORM;
    isRegisterFormOpen:boolean,
}
interface OpenTweet{
    type:typeof OPEN_TWEET_FORM;
    isTweetFormOpen:boolean,
}
interface CloseTweet{
    type:typeof CLOSE_TWEET_FORM;
    isTweetFormOpen:boolean,
}
type DialogActionTypes = OpenLoginForm | CloseLoginForm |OpenRegisterForm |CloseRegisterForm | CloseEditForm |
 OpenEditForm | OpenTweet | CloseTweet
interface myInterFace{
    isLoginFormOpen:boolean,
    isRegisterFormOpen:boolean,
    isEditFormOpen:boolean,
    isTweetFormOpen:boolean,
}
const intialState : myInterFace = {
    isLoginFormOpen:false,
    isRegisterFormOpen:false,
    isEditFormOpen:false,
    isTweetFormOpen:false,
}
const dialogReducer = (state = intialState , action : DialogActionTypes ) =>{
    switch(action.type){
    case OPEN_LOGIN_FORM:
        return {
            ...state,
            isLoginFormOpen:action.isLoginFormOpen,
        }
    case CLOSE_LOGIN_FORM:
        return {
            ...state,
            isLoginFormOpen:action.isLoginFormOpen,
        }
    case OPEN_REGISTER_FORM:
        return{
            ...state,
            isRegisterFormOpen:action.isRegisterFormOpen
        }
    case OPEN_EDIT_FORM:
        return{
            ...state,
            isEditFormOpen:action.isEditFormOpen
        }
    case CLOSE_EDIT_FORM:
        return{
            ...state,
            isEditFormOpen:action.isEditFormOpen
        }
    case CLOSE_REGISTER_FORM:
        return{
            ...state,
            isRegisterFormOpen : action.isRegisterFormOpen
        }
    case OPEN_TWEET_FORM:
        return{
            ...state,
            isTweetFormOpen:action.isTweetFormOpen
        }
    case CLOSE_TWEET_FORM:
        return{
            ...state,
            isTweetFormOpen:action.isTweetFormOpen
        }
    default:
        return state;
    }
}
export default dialogReducer