import React from "react";
import axios from "axios";

const UpdateAndAddButton = (props) => {
    const getATodoApi = async (id) => {

        try {
            const route = '/getATodo/' + id;
            const response = await axios.get(route);
            const [obj] = response.data['Todo'];
            return obj;
        } catch (err) {
            console.log(err);
        }
    }

    const updateTodoApi = (obj) => {
        axios.put('/update/' + props.updateTodoId, obj)
            .then(response => { console.log(response) })
            .catch(err => { console.log(err) });
        props.setUpdateBtn(false);
        getTodosApi();
        props.setName("");
        props.setDesc("");

    }
    const updateTodo = () => {
        getATodoApi(props.updateTodoId)
            .then(
                (todo) => {
                    if (todo) {
                        console.log("ID:", props.updateTodoId);
                        if (props.name === '' || props.desc === '') {
                            alert("Empty Input Fields are not allowed");
                        } else {
                            const obj = {
                                "name": props.name,
                                "desc": props.desc,
                                "isDone": props.markAsDone
                            }
                            updateTodoApi(obj);
                        }

                    } else {
                        alert("Todo not found");
                        props.setUpdateBtn(false);
                        props.setDesc("");
                        props.setName("");
                    }
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )

    }

    const getTodosApi = () => {
        axios.get("/getTodos").then(response => {
            console.log("Response :", response.data['TodoArray'])
            props.setTodos(() => {
                return [response.data['TodoArray']];
            })
        })
            .catch(err => {
                if (err.response.status === 404) {
                    props.setTodos([]);
                } else {
                    console.log(err);
                }
            })
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
        props.setName("");
        props.setDesc("");
    }
    const addTodo = () => {
        if (props.name === '' || props.desc === '') {
            alert("Empty Input Fields are not allowed");
        } else {
            const obj = {
                "name": props.name,
                "desc": props.desc,
                "isDone": false
            }
            postTodoApi(obj);
        }
    }

    if (props.updateBtn) {
        return (
            <button className="addTodoBtn" onClick={updateTodo}>Update Todo</button>
        )

    } else {
        return (
            <button className="addTodoBtn" onClick={addTodo}>Add Todo</button>
        )
    }
}

export default UpdateAndAddButton;