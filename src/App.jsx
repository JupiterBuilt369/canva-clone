import React from "react";
import Home from "./app/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Editor from "./app/Editor";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
    </>
  );
}

export default App;
