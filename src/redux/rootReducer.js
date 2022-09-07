import { combineReducers } from 'redux'
import { todoData } from './reducer'
import { userData } from "./userReducer";
export default combineReducers({
    todoData,
    userData
})