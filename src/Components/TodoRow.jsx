import React from "react";
import axios from "axios";

const TodoRow = (props) => {

    const getTodosApi = () => {
        axios.get("/getTodos").then(response => {
            console.log("Response :", response.data['TodoArray']);
            props.setTodos(() => {
                return [response.data['TodoArray']];
            })
        })
            .catch(err => {
                if(err.response.status===404){
                    props.setTodos([]);
                }else{
                    console.log(err);
                }            
            })
    }
    const getATodoApi = async(id) => {
        
        try{
            const response = await axios.get('/getATodo/'+id);
            const [obj]= response.data['Todo'];
            return obj;
        }catch(err){
            console.log(err);
        }
    }

    // const deleteTodoApi = (key) => {
    //     axios.delete('/delete/' + key)
    //         .then(response => {
    //             console.log(response);
    //             getTodosApi();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
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
        props.setUpdateBtn(true);
        props.setName(name);
        props.setDesc(desc);
        props.setupdateTodoId(id);
        props.setMarkAsDone(isDone);
    }
    if (props.tds) {
        return (
            props.tds[0].map((todo) => {
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

export default TodoRow;