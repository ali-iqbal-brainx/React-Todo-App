import axios from 'axios';

export function* deleteTodoApi(id) {
    console.log("In delete API", id);
    return yield axios.delete("/delete/"+id);
}
