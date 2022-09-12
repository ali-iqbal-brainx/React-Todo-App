import axios from 'axios';

export function* resetPasswordApi(obj) {
    console.log("In reset password Api", obj);
    return yield axios.put('/resetPassword', obj);
}