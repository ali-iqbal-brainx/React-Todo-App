import { call, put, takeEvery } from "redux-saga/effects";
import { TODO_LIST, SET_TODO_LIST, ADD_TODO, DELETE_TODO, UPDATE_TODO, MARK_AS_DONE, SIGN_IN, IS_LOGIN, SIGN_OUT, SIGN_UP } from "./constant";
import { addTodoApi } from "../api/addTodoApi";
import { deleteTodoApi } from "../api/deleteTodoApi";
import { updateTodoApi } from "../api/updateTodoApi";
import {getTodosApi} from "../api/getTodosApi";
import { getATodoApi } from "../api/getATodoApi";
import signOutApi from "../api/signOutApi";
import signInApi from "../api/signInApi";
import signUpApi from "../api/signUpApi";



function* getTodos() {
    const usrId= localStorage.getItem("userId");
    try {
        console.log("In getTodos Saga", usrId);
        const result = yield call(()=>getTodosApi(usrId));
        console.log("Result of get API: ", result);
        yield put({ type: SET_TODO_LIST, data: result.data['TodoArray'] });
    } catch (error) {
        if (error.request.status === 404) {
            yield put({ type: SET_TODO_LIST, data: [] });
        } else {
            console.log(error);
        }
    }
}

function* login(obj) {
    console.log("In Login Fn ", obj.data);
    try {
        const result = yield call(() => signInApi(obj.data));
        console.log("Result of sign IN API: ", result.data["tokenAndUserIdObj"]);
        if (result.request.status === 200) {
            localStorage.setItem('token', result.data["tokenAndUserIdObj"].token);
            localStorage.setItem('userId', result.data["tokenAndUserIdObj"].userId);
            yield put({ type: IS_LOGIN, data: 2 });
        }
    } catch (error) {
        if (error.request.status === 401) {
            alert("Invalid Credentials");
        } else {
            console.log(error);
        }
    }
}
function* signUp(obj) {
    console.log("In Sign Up Fn ", obj.data);
    try {
        const result = yield call(() => signUpApi(obj.data));
        console.log("Result of sign IN API: ", result.request.status);
        if (result.request.status === 200) {
            yield put({ type: IS_LOGIN, data: 3});
        }
    } catch (error) {
        if (error.request.status === 406) {
            alert("Error Signing Up");
        } else {
            console.log(error);
        }
    }
}
function* signout() {
    console.log("In Sign Out Fn");
    try {
        const result = yield call(() => signOutApi());
        console.log("Result of sign IN API: ", result);
        if (result.request.status === 200) {
            console.log("Local Storage: ", localStorage.getItem("token"));
            localStorage.clear();
            yield put({ type: IS_LOGIN, data: 1 });
        }
    } catch (error) {
        if (error.request.status === 500 || error.request.status === 401) {
            alert("Error Signing Out");
        } else {
            console.log(error);
        }
    }
}
function* insertTodo(obj) {
    console.log("In insert Todo", obj.data);
    try {
        const result = yield call(() => addTodoApi(obj.data));
        console.log("Result of Insert API: ", result);
        yield put({ type: TODO_LIST });
    } catch (error) {
        console.log(error);
    }
}
function* deleteTodo(obj) {
    console.log("In delete Todo", obj.data);
    const id = obj.data;
    try {
        const result = yield call(() => deleteTodoApi(id));
        console.log("Result of Delete API: ", result);
        yield put({ type: TODO_LIST });
    } catch (error) {
        console.log(error);
    }
}
function* updateTodo(obj) {
    const id = obj.data.id;
    try {
        const result = yield call(() => getATodoApi(id));
        const todo = [...result.data['Todo']];
        if (todo) {
            const updateObj = {
                "name": obj.data.name,
                "desc": obj.data.desc,
                "isDone": obj.data.isDone,
                "userId": obj.data.userId
            }
            try {
                const result = yield call(() => updateTodoApi(id, updateObj));
                console.log("Result of update API: ", result);
                yield put({ type: TODO_LIST });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Todo not present");
        }
    }
    catch (error) {
        if (error.response.status === 404) {
            alert("Todo not present");
        }
        else {
            console.log(error);
        }
    }

}
function* markTodoAsDone(obj) {
    console.log("In mark as Done Todo", obj.data);
    try {
        const result = yield call(() => getATodoApi(obj.data));
        const todo = [...result.data['Todo']];
        const updateObj = {
            "name": todo[0].name,
            "desc": todo[0].desc,
            "isDone": !todo[0].isDone,
            "userId": todo[0].userId
        }
        try {
            const result = yield call(() => updateTodoApi(obj.data, updateObj));
            console.log("Result of update Mark As Done API: ", result);
            yield put({ type: TODO_LIST });
        } catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        console.log(error);
    }

}

function* todoSaga() {
    yield takeEvery(TODO_LIST, getTodos);
    yield takeEvery(ADD_TODO, insertTodo);
    yield takeEvery(DELETE_TODO, deleteTodo);
    yield takeEvery(UPDATE_TODO, updateTodo);
    yield takeEvery(MARK_AS_DONE, markTodoAsDone);
    yield takeEvery(SIGN_IN, login);
    yield takeEvery(SIGN_OUT, signout);
    yield takeEvery(SIGN_UP, signUp);
}

export default todoSaga;