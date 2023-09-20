import { AnyAction, Dispatch } from "redux";
import { CREATE_STORE_FIRST , CREATE_STORE_FAIL , CREATE_STORE_SUCCESS,
    GET_STORE_FAIL , GET_STORE_FIRST , GET_STORE_SUCCESS
    } from "./Types";
    const serverUrl = "http://localhost:1997/api"

export const createStoreFirst = () => ({
    type: CREATE_STORE_FIRST,
    isLoading:true,

  });
  
  export const createStoreSuccess = (store: string) => ({
    type: CREATE_STORE_SUCCESS,
    store,
    isLoading:false,
  });
  
  export const createStoreFail = (error: string) => ({
    type: CREATE_STORE_FAIL,
    error,
    isLoading:false,
  });

export const AddStore = (storeName:string , userName: string ) => {
    return async(dispatch : Dispatch) => {
        console.log(`dispatching.....`)
        try{
            dispatch(createStoreFirst())
            console.log(`first`)
        const response = await fetch(`${serverUrl}/addStore`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify({
                storeName,
                userName,
            })
        })
        console.log(`second`)
        if(response.ok) {
            const data = await response.json()
            console.log(data , `data`)
            dispatch({type:CREATE_STORE_SUCCESS , payload:{
                stores:data.store
            }})
        }else{
            const errorData = await response.json();
            console.error(errorData , `error`)
            const errorMessage = errorData.message || "Failed to create store.";
            dispatch(createStoreFail(errorMessage))
        }
        }catch(error){
            console.error("An error occurred:", error);

            // Dispatch an action indicating a store creation failure
            dispatch(createStoreFail("An error occurred while creating the store."));

        }
    }
}

export const GetStoreByName=(userName : string)=>{
    return async(dispatch:Dispatch) => {
        try{
        dispatch({
            type:GET_STORE_FIRST
        })
        const response = await fetch(`${serverUrl}/getstore/${userName}`)
        console.log(response)
        if(response.ok) {
            const data = await response.json()
            console.log(data , `data store`)
            dispatch({
                type:GET_STORE_SUCCESS,
                stores:data.stores,
            })
            
        } else {
            const ErrorData = await response.json()
            const errorMessage = ErrorData.message || "Failed to Get store.";
            console.log(errorMessage)
            dispatch({
                type:GET_STORE_FAIL,
                error:errorMessage
            })
        }
        }catch(error){
            console.log(error)
            dispatch({
                type:GET_STORE_FAIL,
                error:`Error getting Store`
            })
        }
    }
}