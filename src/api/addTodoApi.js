import axios from 'axios';

export function* addTodoApi(obj) {
    console.log("In Api", obj);
    return yield axios.post("/", obj);
}
