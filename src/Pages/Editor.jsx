import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import TextTool from "../Component/TextTool";
import ImageTool from "../Component/ImageTool";
import ShapeTool from "../Component/ShapeTool";
import BackgroundTool from "../Component/BackgroundTool";
// import SelectTool from "../Component/SelectTool";
import ElementsTool from "../Component/ElementsTool";

const TOOL_PANELS = {
  add_text: TextTool,
  add_image: ImageTool,
  add_shape: ShapeTool,
  change_background: BackgroundTool,
  // select: SelectTool,
  add_elements: ElementsTool,
};

const Editor = () => {
  const [activeTool, setActiveTool] = useState("select");
  const [canvas, setCanvasBg] = useState("#ffffff");


  const ActivePanel = TOOL_PANELS[activeTool];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />

      {ActivePanel && (
        <div className="w-[280px] bg-white border-r">
          <ActivePanel  setCanvasBg={setCanvasBg} />
        </div>)}

      <main className="flex-1 flex items-center justify-center">
        <div
        style={{
          background: canvas
        }} 
        className="w-[800px] h-[450px] bg-white shadow-lg rounded-md" />
      </main>
    </div>
  );
};

export default Editor;
