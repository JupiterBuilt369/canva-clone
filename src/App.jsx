import React from "react";
import Hero from "./Pages/Hero";
import { Routes, Route } from "react-router-dom";
import Editor from "./Pages/Editor";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
    </>
  );
}

export default App;
