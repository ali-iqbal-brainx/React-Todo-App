import axios from 'axios';

export function* updateTodoApi(id,obj) {
    console.log("In update API", id);
    return yield axios.put('/update/'+id,obj);
}