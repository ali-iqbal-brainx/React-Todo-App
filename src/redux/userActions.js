import { SIGN_IN, SIGN_OUT, SIGN_UP, DELETE_USER, UPDATE_USER, SET_UPDATE_USER, CHECK_USER_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD} from "./constant"

export const signIn = (email, password) => {

    console.log("In Sign In Action", email, password);
    return {
        type: SIGN_IN,
        data: {
            email: email,
            password: password
        }
    }
}

export const signout = () => {

    console.log("In Sign out Action");
    return {
        type: SIGN_OUT
    }
}

export const signUp = (name, email, password, matchPassword) => {

    console.log("In Sign In Action", name, email, password, matchPassword);
    return {
        type: SIGN_UP,
        data: {
            name: name,
            email: email,
            password: password,
            matchPassword: matchPassword
        }
    }
}

export const updateUser = (name, email, password) => {

    console.log("In Update User Action", name, email, password);
    return {
        type: UPDATE_USER,
        data: {
            name,
            email,
            password
        }
    }
}

export const setUpdateUser = (data) => {

    console.log("In set Update User Action", data);
    return {
        type: SET_UPDATE_USER,
        data
    }
}

export const checkUserPassword = (password, userId) => {

    console.log("In check User Password Action", password, userId);
    return {
        type: CHECK_USER_PASSWORD,
        data: {
            password,
            userId
        }
    }
}
export const deleteUser = (data) => {

    console.log("In delete user Action", data);
    return {
        type: DELETE_USER,
        data
    }
}

export const forgotPassword = (email, credentialEmail) => {

    console.log("In forgot password user Action", email, credentialEmail);
    return {
        type: FORGOT_PASSWORD,
        data: {
            email,
            credentialEmail
        }
    }
}
export const resetPassword = (id, token, password) => {

    console.log("In reset password user Action", id, token, password);
    return {
        type: RESET_PASSWORD,
        data: {
            id,
            token,
            password
        }
    }
}