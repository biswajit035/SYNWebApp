import React from "react";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import UpdateDash from "./Components/Dashboard/UpdateDash";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <SignUp/> */}
      {/* <Login/> */}
      {/* <Dashboard/> */}
      {/* <UpdateDash/> */}
      {/* <ForgetPassword/> */}
      <Routes>
        {/* client Side */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reset" element={<ForgetPassword />} />
        <Route path="update" element={<UpdateDash />} />
      </Routes>
    </div>
  );
}

export default App;
