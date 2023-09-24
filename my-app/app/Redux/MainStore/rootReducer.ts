import {combineReducers} from 'redux';
import dialogReducer from '../dialog/Reducer';
import storeReducer from '../Store/reducer';
import loginReducer from '../Login/Reducer';
export interface RootState{
    dialog:ReturnType<typeof dialogReducer>;
    store:ReturnType<typeof storeReducer>;
    user:ReturnType<typeof loginReducer>;
}
const rootReducer = combineReducers({
    dialog:dialogReducer,
    store:storeReducer,
    user:loginReducer,
})
export default rootReducer