import React from "react";
import { Routes, Route,} from "react-router-dom";
import Home from "./page/home";

export default function App (){
  return(
    <React.Fragment>
      <Routes > 
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      </Routes>
    </React.Fragment>
  )
}