import { SET_TODO_LIST } from "./constant";



export const todoData = (data = [], action) => {
    switch (action.type) {
        case SET_TODO_LIST:
            console.log("SET TODO LIST condition ", action)
            return [action.data]
        default:
            return data
    }
}