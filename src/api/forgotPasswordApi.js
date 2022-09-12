import axios from 'axios';

export function* forgotPasswordApi(obj) {
    console.log("In Forgot password Api",obj);
    return yield axios.post('/forgotPassword',obj);
}