import React from "react";
import Login from "./page/login";
import {  Route, Routes } from "react-router-dom";
import Register from "./page/register";
import ResetPw from "./page/restPw";
import Dashboard from "./page/home/dashboard";
import Home from "./page/home";
import Member from "./page/home/member";
import Outlets from "./page/home/outlet";
import Paket from "./page/home/paket";

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPw />} />
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="member" element={<Member />} />
          <Route path="outlet" element={<Outlets />} />
          <Route path="paket" element={<Paket />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}
