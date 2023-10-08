import {combineReducers} from 'redux';
import dialogReducer from '../dialog/Reducer';
import storeReducer from '../Store/reducer';
import loginReducer from '../Login/Reducer';
import PostsReducer from '../Posts/reducers';
export interface RootState{
    dialog:ReturnType<typeof dialogReducer>;
    store:ReturnType<typeof storeReducer>;
    user:ReturnType<typeof loginReducer>;
    posts:ReturnType<typeof PostsReducer>;
}
const rootReducer = combineReducers({
    dialog:dialogReducer,
    store:storeReducer,
    user:loginReducer,
    posts:PostsReducer,
})
export default rootReducer