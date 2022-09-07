import axios from 'axios';

export default function* signInApi(obj) {
    console.log("In Sign In Api", obj);
    return yield axios.post("/signIn",obj);
}
