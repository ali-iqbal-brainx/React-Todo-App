import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import todoSaga from "./todoSaga";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware= createSagaMiddleware();

const store = configureStore(
    {
        reducer:rootReducer,
        middleware:()=>[sagaMiddleware]
    }
    );

sagaMiddleware.run(todoSaga);
export default store;