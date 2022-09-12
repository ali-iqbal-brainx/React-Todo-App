import { IS_LOGIN, SET_PASSWORD_VERIFICATION, SET_UPDATE_PAGE } from "./constant"

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
        case SET_PASSWORD_VERIFICATION:
            data=action.data;
            console.log("SET_PASSWORD_VERIFICATION reducer");
            return data;
        case SET_UPDATE_PAGE:
            data=action.data;
            console.log("SET_UPDATE_PAGE reducer");
            return data;
        default:
            return data
    }
}