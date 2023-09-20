import { OPEN_LOGIN_FORM , CLOSE_LOGIN_FORM , OPEN_REGISTER_FORM , CLOSE_REGISTER_FORM } from "./Types";

interface OpenLoginForm {
    type:typeof OPEN_LOGIN_FORM;
    isLoginFormOpen:boolean;
}
interface CloseLoginForm{
    type:typeof CLOSE_LOGIN_FORM;
    isLoginFormOpen:boolean;
}
interface OpenRegisterForm{
    type:typeof OPEN_REGISTER_FORM;
    isRegisterFormOpen:boolean,
}
interface CloseRegisterForm{
    type:typeof CLOSE_REGISTER_FORM;
    isRegisterFormOpen:boolean,
}
type DialogActionTypes = OpenLoginForm | CloseLoginForm |OpenRegisterForm |CloseRegisterForm
interface myInterFace{
    isLoginFormOpen:boolean,
    isRegisterFormOpen:boolean,
}
const intialState : myInterFace = {
    isLoginFormOpen:false,
    isRegisterFormOpen:false,
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
    case CLOSE_REGISTER_FORM:
        return{
            ...state,
            isRegisterFormOpen : action.isRegisterFormOpen
        }
    default:
        return state;
    }
}
export default dialogReducer