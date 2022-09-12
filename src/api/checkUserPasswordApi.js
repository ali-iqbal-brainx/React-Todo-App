import axios from 'axios';

export function* checkUserPasswordApi(obj) {
    console.log("In check User Password Api", obj);
    return yield axios.post('/checkUserPassword/', obj);
}