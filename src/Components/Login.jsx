import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../redux/userActions";
import { useDispatch } from 'react-redux';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const emailEvent = (e) => {
        setEmail(e.target.value);
    }
    const passwordEvent = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = () => {
        if (email === '' || password === '') {
            alert("Empty or Invalid Input");
        } else {
            dispatch(signIn(email, password));
            setEmail("");
            setPassword("");
        }
    }

    return (
        <>
            <div className="App">
                <div className="center_div">
                    <br />
                    <h1> Log In</h1>
                    <br />
                    <input type="email" name="email" placeholder="Add email" onChange={emailEvent} value={email} /><br /><br />
                    <input type="password" name="password" placeholder="Add password" onChange={passwordEvent} value={password} /><br /><br />
                    <button className="addTodoBtn" type="submit" onClick={loginHandler}>Log In</button><br /><br />
                    <Link to="/signup" style={{ textDecoration: "none", color: "white" }}><button className="addTodoBtn">Sign Up</button></Link>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default Login;