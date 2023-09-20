import { OPEN_LOGIN_FORM , CLOSE_LOGIN_FORM , OPEN_REGISTER_FORM , CLOSE_REGISTER_FORM  } from "./Types";
export const openDialog = () =>({
    type:OPEN_LOGIN_FORM,
    isLoginFormOpen:true,
})
export const closeDialog = () =>({
    type:CLOSE_LOGIN_FORM,
    isLoginFormOpen:false,
})
export const OpenRegisterForm = () =>({
    type:OPEN_REGISTER_FORM,
    isRegisterFormOpen:true,
})

export const CloseRegisterForm = () =>({
    type:CLOSE_REGISTER_FORM,
    isRegisterFormOpen:false,
})
