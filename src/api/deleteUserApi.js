import axios from 'axios';

export function* deleteUserApi(id) {
    console.log("In delete User API", id);
    return yield axios.delete("/deleteUser/"+id);
}
