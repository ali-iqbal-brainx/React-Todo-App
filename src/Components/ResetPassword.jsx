import React, { useState } from "react";
import { resetPassword } from "../redux/userActions";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
const ResetPassword = (props) => {

    const { id, token } = useParams();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");

    const passwordEvent = (e) => {
        setPassword(e.target.value);
    }
    const matchPasswordEvent = (e) => {
        setMatchPassword(e.target.value);
    }
    const resetPasswordHandler = () => {
        if (password !== matchPassword) {
            alert("Password mismatch");
        }
        else if (!password || !matchPassword) {
            alert("Empty Input Fields are not allowed");
        } else {
            dispatch(resetPassword(id, token, password));
        }
    }

    if (props.isPasswordReset === 9) {
        return (
            <Navigate to="/" />
        )
    } else {
        return (
            <>
                <div className="App">
                    <div className="center_div">
                        <br />
                        <h1>Forgot Password</h1>
                        <br />
                        <input type="password" name="password" placeholder="enter password..." onChange={passwordEvent} value={password} /><br /><br />
                        <input type="password" name="mPassword" placeholder="confirm passowrd..." onChange={matchPasswordEvent} value={matchPassword} /><br /><br />
                        <button className="addTodoBtn" type="submit" onClick={resetPasswordHandler}>Submit</button><br /><br />
                        <br />
                        <br />
                    </div>
                </div>
            </>
        );
    }
}

export default ResetPassword;