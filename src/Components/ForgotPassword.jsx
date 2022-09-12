import React, { useState } from "react";
import { forgotPassword } from "../redux/userActions";
import { useDispatch } from 'react-redux';
const ForgotPassword = () => {

    const dispatch = useDispatch();
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [credEmail, setCredEmail] = useState("");

    const credEmailEvent = (e) => {
        setCredEmail(e.target.value);
    }
    const forgotPasswordEmailEvent = (e) => {
        setForgotPasswordEmail(e.target.value);
    }

    return (
        <>
            <div className="App">
                <div className="center_div">
                    <br />
                    <h1>Forgot Password</h1>
                    <br />
                    <input type="email" name="email" placeholder="enter email..." onChange={forgotPasswordEmailEvent} value={forgotPasswordEmail} /><br /><br />
                    <input type="email" name="credemail" placeholder="email to recieve reset password link..." onChange={credEmailEvent} value={credEmail} /><br /><br />
                    <button className="addTodoBtn" type="submit" onClick={() => {
                        dispatch(forgotPassword(forgotPasswordEmail, credEmail))
                    }}>Submit</button><br /><br />
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;