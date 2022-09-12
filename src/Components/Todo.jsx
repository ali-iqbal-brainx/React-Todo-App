import { addTodo, updateTodo, deleteTodo, markAsDone } from "../redux/actions";
import { signout } from "../redux/userActions";
import { updateUser } from "../redux/userActions";
import { checkUserPassword } from "../redux/userActions";
import { deleteUser } from "../redux/userActions";
import { setUpdateUser } from "../redux/userActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { todoList } from "../redux/actions";
import { useSelector } from 'react-redux';


function Todo(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(todoList());
    }, []);
    let data = useSelector((state) => state.todoData);
    console.log("Data in Todo Component: ", data);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [updateBtn, setUpdateBtn] = useState(false);
    const [updateId, setUpdateId] = useState('');
    const [markDone, setMarkDone] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [updatePassword, setUpdatePassword] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    
    const updateEmailEvent = (e) => {
        setUpdateEmail(e.target.value);
    }
    const updatePasswordEvent = (e) => {
        setUpdatePassword(e.target.value);
    }
    const updateNameEvent = (e) => {
        setUpdateName(e.target.value);
    }
    const passwordEvent = (e) => {
        setPassword(e.target.value);
    }
    const nameEvent = (e) => {
        setName(e.target.value);
    }
    const descEvent = (e) => {
        setDesc(e.target.value);
    }

    const setUpdateTodo = (id, name, desc, isDone, userId) => {
        setUpdateBtn(true);
        setName(name);
        setDesc(desc);
        setUpdateId(id);
        setMarkDone(isDone);
        setUserId(userId);
    }
    const ConditionalRendering = () => {
        if (data.length > 0) {
            return (
                data[0].map((todo) => {
                    return (
                        <tr key={todo._id}>
                            <td style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.name}</td>
                            <td colSpan={2} style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.desc}</td>
                            <td><button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button><button onClick={() => dispatch(setUpdateTodo(todo._id, todo.name, todo.desc, todo.isDone, todo.userId))}>Update</button><button onClick={() => dispatch(markAsDone(todo._id))}>Mark as Done</button></td>
                        </tr>
                    )
                })
            )
        }
    }
    const UpdateAndAddButtonConditionalRendering = () => {
        if (updateBtn) {
            return (
                <button className="addTodoBtn" onClick={() => {
                    if (name === '' || desc === '') {
                        alert("Empty or Invalid Input");
                    } else {
                        dispatch(updateTodo(updateId, name, desc, markDone, userId));
                        setUpdateBtn(false);
                        setMarkDone(false);
                        setName("");
                        setDesc("");
                        setUserId("");
                    }
                }}>Update Todo</button>
            )
        } else {
            return (
                <button className="addTodoBtn" onClick={() => {
                    if (name === '' || desc === '') {
                        alert("Empty or Invalid Input");
                    } else {
                        dispatch(addTodo(name, desc));
                        setName("");
                        setDesc("");
                    }
                }}>Add Todo</button>
            )
        }
    }
    if (props.data === 2) {
        return (
            <>
                <div className="App">
                    <div className="center_div">
                        <br />
                        <h1> ToDo List</h1>
                        <br />
                        <input type="text" name="name" placeholder="Add name" onChange={nameEvent} value={name} /><br /><br />
                        <input type="text" name="desc" placeholder="Add description" onChange={descEvent} value={desc} /><br /><br />
                        <UpdateAndAddButtonConditionalRendering />
                        <br />
                        <table>
                            <tr>
                                <th>Name</th>
                                <th colSpan={2}>Desc</th>
                                <th>Actions</th>
                            </tr>
                            <ConditionalRendering />
                        </table>
                        <br />
                    </div>
                    <button className="signOutBtn" onClick={() => {
                        dispatch(signout())
                    }}>Log Out</button>
                    <button className="signOutBtn" onClick={() => {
                        dispatch(setUpdateUser(localStorage.getItem("userId")))
                    }}>Update User</button>
                    <button className="signOutBtn" onClick={() => {
                        dispatch(deleteUser(localStorage.getItem("userId")))
                    }}>Delete User</button>
                </div>
            </>
        );
    } else if (props.data === 4) {
        return (
            <>
                <div className="App">
                    <div className="center_div">
                        <br />
                        <h1>Enter Password</h1>
                        <br />
                        <input type="password" name="password" placeholder="enter password" onChange={passwordEvent} value={password} /><br /><br />
                        <button className="addTodoBtn" type="submit" onClick={() => {
                            dispatch(checkUserPassword(password, localStorage.getItem("userId")))
                        }}>Submit</button><br /><br />
                        <br />
                        <br />
                    </div>
                </div>
            </>
        );
    } else if (props.data === 5) {
        return (
            <>
                <div className="App">
                    <div className="center_div">
                        <br />
                        <h1>Update User</h1>
                        <br />
                        <input type="text" name="name" placeholder="update name" onChange={updateNameEvent} value={updateName} /><br /><br />
                        <input type="email" name="email" placeholder="update email" onChange={updateEmailEvent} value={updateEmail} /><br /><br />
                        <input type="password" name="password" placeholder="update password" onChange={updatePasswordEvent} value={updatePassword} /><br /><br />
                        <button className="addTodoBtn" type="submit" onClick={() => {
                            dispatch(updateUser(updateName, updateEmail, updatePassword))
                        }}>Submit</button><br /><br />
                        <br />
                        <br />
                    </div>
                </div>
            </>
        );
    }
}

export default Todo;