import { addTodo, updateTodo, deleteTodo, markAsDone } from "../redux/actions";
import { signout } from "../redux/userActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { todoList } from "../redux/actions";
import { useSelector } from 'react-redux';


function Todo() {
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
            </div>
        </>
    );
}

export default Todo;