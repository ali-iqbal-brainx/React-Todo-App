import { SIGN_IN, SIGN_OUT, SIGN_UP} from "./constant"

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