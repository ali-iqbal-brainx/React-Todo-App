import './App.css';
import Todo from "./Components/Todo";
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword'
import { useSelector } from 'react-redux';
import React from 'react';


function App() {


  let data = useSelector((state) => state.userData);
  console.log("Data in App Component: ", data);
  if((localStorage.getItem("token") && data === 1)){
    data = 2
  }
  return (
    <React.Fragment>
      {data === 2 || data === 4 || data === 5 ?
        <Routes>
          <Route exact path="/" element={<Todo data={data} />} />
        </Routes>
        :
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/signup" element={<Signup isSignUped={data} />} />
          <Route exact path="/setPassword/:id/:token" element={<ResetPassword isPasswordReset={data} />} />
        </Routes>
      }
    </React.Fragment>

  );
}

export default App;