import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/userActions";

const Signup = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");


    if (props.isSignUped === 3) {
        return (
            <Navigate to="/" />
        )

    } else {
        const nameEvent = (e) => {
            setName(e.target.value);
        }
        const emailEvent = (e) => {
            setEmail(e.target.value);
        }
        const passwordEvent = (e) => {
            setPassword(e.target.value);
        }
        const matchPasswordEvent = (e) => {
            setMatchPassword(e.target.value);
        }
        return (
            <>
                <div className="App">
                    <div className="center_div">
                        <br />
                        <h1> Sign Up</h1>
                        <br />
                        <input type="text" name="name" placeholder="Add name" onChange={nameEvent} value={name} /><br /><br />
                        <input type="email" name="email" placeholder="Add email" onChange={emailEvent} value={email} /><br /><br />
                        <input type="password" name="password" placeholder="Add password" onChange={passwordEvent} value={password} /><br /><br />
                        <input type="password" name="matchPassword" placeholder="Re-enter Password" onChange={matchPasswordEvent} value={matchPassword} /><br /><br />
                        <button className="addTodoBtn" type="submit" onClick={() => {
                            if (email === '' || password === '' || name === '' || matchPassword === '') {
                                alert("Empty or Invalid Input");
                            } else if (password !== matchPassword) {
                                alert("Passowrd fields mismatch");
                            } else {
                                dispatch(signUp(name, email, password, matchPassword));
                                setEmail("");
                                setPassword("");
                                setMatchPassword("");
                                setName("");
                            }
                        }}>Register</button><br /><br />
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}><button className="addTodoBtn">Log In</button></Link>
                        <br />
                        <br />
                    </div>
                </div>
            </>
        )
    }
}

export default Signup;