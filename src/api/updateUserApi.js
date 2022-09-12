import axios from 'axios';

export function* updateUserApi(userId, obj) {
    console.log("In update User Api",userId, obj);
    return yield axios.put('/updateUser/'+userId,obj);
}