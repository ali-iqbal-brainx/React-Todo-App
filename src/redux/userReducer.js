import { IS_LOGIN } from "./constant"

export const userData = (data=1, action) => {
    switch (action.type) {
        case IS_LOGIN:
            // data["isLogin"] = action.data["isLogin"];
            // data["token"] = action.data["token"];
            // console.log(data["token"]);
            // console.log(data["isLogin"]);
            data=action.data;
            console.log("IS_LOGIN condition");
            return data
        default:
            return data
    }
}