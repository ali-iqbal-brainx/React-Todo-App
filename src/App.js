import './App.css';
import Todo from "./Components/Todo";
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useSelector } from 'react-redux';
import React from 'react';


function App() {
  let data = useSelector((state) => state.userData);
  console.log("Data in App Component: ", data);
  return (
    <React.Fragment>
      {data === 2?
        <Routes>
          <Route exact path="/" element={<Todo />} />
        </Routes>
        :
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/signup" element={<Signup isSignUped={data}/>} />
        </Routes>
      }
    </React.Fragment>

  );
}

export default App;