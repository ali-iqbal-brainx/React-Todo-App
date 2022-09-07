import axios from 'axios';

export default function* signUpApi(obj) {
    console.log("In Sign Up Api", obj);
    return yield axios.post("/addUser",obj);
}
