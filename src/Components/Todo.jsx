import React, { useEffect, useState } from "react";
import axios from "axios";
// import UpdateAndAddButton from "./UpdateAndAddButton";
// import TodoRow from "./TodoRow";

function Todo() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [todos, setTodos] = useState([]);
    const [updateTodoId, setupdateTodoId] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [markAsDone, setMarkAsDone] = useState(false);

    const nameEvent = (e) => {
        setName(e.target.value);
    }
    const descEvent = (e) => {
        setDesc(e.target.value);
    }

    const getTodosApi = () => {
        console.log("Get Todos API");
        axios.get("/getTodos").then(response => {
            console.log("Response :", response.data['TodoArray']);
            setTodos(() => {
                return [response.data['TodoArray']];
            })
        })
            .catch(err => {
                if (err.response.status === 404) {
                    setTodos([]);
                } else {
                    console.log(err);

                }
            })
    }
    const getATodoApi = async(id) => {

        try{
            const route= '/getATodo/'+id;
            const response = await axios.get(route);
            const [obj]= response.data['Todo'];
            return obj;
        }catch(err){
            console.log(err);
        }
    }
    const postTodoApi = (obj) => {

        axios.post('/', obj)
            .then(response => {
                console.log(response);
                getTodosApi();
            })
            .catch(error => {
                console.log(error);
            })
        setName("");
        setDesc("");
    }
    const deleteTodoApi = (key) => {

        const route = '/delete/' + key;
        axios.delete(route)
            .then(response => {
                console.log(response);
                getTodosApi();
            })
            .catch(error => {
                console.log(error);
            })
    }
    const updateTodoApi = (obj) => {
        axios.put('/update/'+updateTodoId,obj)
            .then(response=>{console.log(response)})
            .catch(err=>{console.log(err)}); 
        setUpdateBtn(false);
        getTodosApi();
        setName("");
        setDesc("");

    }
    const addTodo = () => {
        if (name === '' || desc === '') {
            alert("Empty Input Fields are not allowed");
        } else {
            const obj = {
                "name": name,
                "desc": desc,
                "isDone": false
            }
            postTodoApi(obj);
        }
    }
    const deleteTodo = (id) => {
        console.log("Key", id);
        deleteTodoApi(id);
    }
    const markTodoAsDone = (id) => {
        //get that specific todo
        getATodoApi(id)
            .then((response)=>{
                const obj=response;
                obj.isDone=!obj.isDone;
                axios.put('/update/'+id,obj)
                    .then(response=>{console.log(response)})
                    .catch(err=>{console.log(err)}); 
                getTodosApi();
            })
            .catch(err=>console.log(err))
    }
    const setupdateTodo=(id, name ,desc, isDone)=>{
        setUpdateBtn(true);
        setName(name);
        setDesc(desc);
        setupdateTodoId(id);
        setMarkAsDone(isDone);
    }
    const updateTodo=()=>{
        getATodoApi(updateTodoId)
        .then(
            (todo)=>{
                if (todo) {
                    console.log("ID:",updateTodoId);
                    if (name === '' || desc === '') {
                        alert("Empty Input Fields are not allowed");
                    } else {
                        const obj = {
                            "name": name,
                            "desc": desc,
                            "isDone": markAsDone
                        }
                        updateTodoApi(obj);
                    }

                } else {
                    alert("Todo not found");
                    setUpdateBtn(false);
                    setDesc("");
                    setName("");
                }
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )

    }

    const ConditionalRendering = () => {
        if (todos.length) {
            return (
                todos[0].map((todo) => {
                    return (
                        <tr key={todo._id}>
                            <td style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.name}</td>
                            <td colSpan={2} style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.desc}</td>
                            <td><button onClick={() => deleteTodo(todo._id)}>Delete</button><button onClick={() => setupdateTodo(todo._id,todo.name,todo.desc, todo.isDone)}>Update</button><button onClick={() => markTodoAsDone(todo._id)}>Mark as Done</button></td>
                        </tr>
                    )
                })
            )
        }
    }

    const UpdateAndAddButtonConditionalRendering=()=>{
        if(updateBtn){
            return(
                <button className="addTodoBtn" onClick={updateTodo}>Update Todo</button>
            )

        }else{
            return(
                <button className="addTodoBtn" onClick={addTodo}>Add Todo</button> 
            )
        }
    }
    useEffect(() => {
        console.log("Use Effect");
        getTodosApi();
    }, []);

    return (
        <>
            <div className="App">
                <div className="center_div">
                    <br />
                    <h1> ToDo List</h1>
                    <br />
                    <input type="text" name="name" placeholder="Add name" onChange={nameEvent} value={name} /><br /><br />
                    <input type="text" name="desc" placeholder="Add description" onChange={descEvent} value={desc} /><br /><br />
                    {/* <UpdateAndAddButton updateBtn={updateBtn} setUpdateBtn={setUpdateBtn} updateTodoId={updateTodoId}
                        setupdateTodoId={setupdateTodoId} markAsDone={markAsDone} setMarkAsDone={setMarkAsDone}
                        todos={todos} setTodos={setTodos} name={name} desc={desc} setName={setName} setDesc={setDesc} /> */}
                    <UpdateAndAddButtonConditionalRendering />
                    <br />
                    <table>
                        <tr>
                            <th>Name</th>
                            <th colSpan={2}>Desc</th>
                            <th>Actions</th>
                        </tr>
                        {/* <TodoRow updateBtn={updateBtn} setUpdateBtn={setUpdateBtn} updateTodoId={updateTodoId}
                            setupdateTodoId={setupdateTodoId} markAsDone={markAsDone} setMarkAsDone={setMarkAsDone}
                            tds={todos} setTodos={setTodos} name={name} desc={desc} setName={setName} setDesc={setDesc} /> */}

                        <ConditionalRendering />
                    </table>
                    <br />
                </div>
            </div>
        </>
    );
}

export default Todo;