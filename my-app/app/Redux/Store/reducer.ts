import { CREATE_STORE_FIRST , CREATE_STORE_FAIL , CREATE_STORE_SUCCESS,
GET_STORE_FAIL , GET_STORE_FIRST , GET_STORE_SUCCESS
} from "./Types";
interface Store {
    name: string;
    _id: string;
    createdAt: Date; 
    updatedAt: Date; 
  }
interface StoreName{
    store:string,
    isLoading:boolean,
    error:string,
    message:string,
    stores:Store[],
}
interface AddStore{
    type:typeof CREATE_STORE_SUCCESS,
    store:string,
    isLoading:boolean,
    error:string,
    message:string,

}
interface AddStoreFirst {
    type:typeof CREATE_STORE_FIRST,
    store:string,
    isLoading:boolean,
    error:string,
    message:string,

}
interface AddStoreFail {
    type:typeof CREATE_STORE_FAIL,
    store:string,
    isLoading:boolean,
    error:string,
    message:string,
}

interface GetStoreSuccess{
    type:typeof GET_STORE_SUCCESS,
    stores:Array<string>,
    isLoading:boolean,
}
interface GetStoreFail {
    type:typeof GET_STORE_FAIL,
    error:string,
    isLoading:boolean,
}
interface GetStoreFrist{
    type:typeof GET_STORE_FIRST,
    isLoading:boolean,
}
type allActionTypes = AddStore | AddStoreFirst | AddStoreFail | GetStoreSuccess | GetStoreFail | GetStoreFrist
const initialState: StoreName = {
    store:"",
    isLoading:false,
    message:"",
    error:"",
    stores:[],
}

const storeReducer = (state = initialState , action : allActionTypes) =>{
    switch(action.type) {
        case CREATE_STORE_FIRST:
        case GET_STORE_FIRST:
            return {
                ...state,
                isLoading:true,
            }
        case CREATE_STORE_FAIL:
            return {
                ...state,
                error:action.error,
                isLoading:false
            }
        case CREATE_STORE_SUCCESS:
            return{
                ...state,
                store:action.store,
                isLoading:false,
            }
        case GET_STORE_SUCCESS:
            return{
                ...state,
                stores:action.stores,
                isLoading:false,
            }
        case GET_STORE_FAIL:
            return{
                ...state,
                error:action.error,
                isLoading:false,
            }
        default:
            return state;
    }
}
export default storeReducer