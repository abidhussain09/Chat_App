import React from "react";
import { Navbar } from "./components/Navbar";
import { ChatBox } from "./components/ChatBox";
import {Route, Routes} from "react-router"
import { Signin } from "./components/Signin";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen items-center bg-gradient-to-r from-slate-300 to-slate-500">
      <Navbar/>
      <div className="w-full h-[85vh]">
        <Routes>
          <Route path="/" element={<ChatBox/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
