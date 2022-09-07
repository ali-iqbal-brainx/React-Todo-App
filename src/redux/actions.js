import { ADD_TODO, UPDATE_TODO, DELETE_TODO, MARK_AS_DONE, TODO_LIST, SET_TODO_LIST } from "./constant"

export const addTodo = (name, desc) => {
    console.log("Action Add Todo :", name, desc);
    return {
        type: ADD_TODO,
        data: {
            "name": name,
            "desc": desc,
            "isDone": false,
            "userId": localStorage.getItem("userId") 
        }
    }
}

export const deleteTodo = (id) => {
    console.log("Action Delete Todo :", id);
    return {
        type: DELETE_TODO,
        data: id
    }
}

export const markAsDone = (id) => {
    console.log("Action Mark As Done", id);
    return {
        type: MARK_AS_DONE,
        data: id
    }
}

export const updateTodo = (id, name, desc, isDone, userId) => {
    console.log("Action Update Todo :", id, name, desc, isDone, userId);
    return {
        type: UPDATE_TODO,
        data: {
            "id": id,
            "name": name,
            "desc": desc,
            "isDone": isDone,
            "userId": userId
        }
    }
}

export const todoList = () => {

    console.log("In TodoList Action");
    return {
        type: TODO_LIST
    }
}

export const setTodoList = (data) => {

    console.log("data in set Todo Action :", data);
    return {
        type: SET_TODO_LIST,
        data
    }
}

