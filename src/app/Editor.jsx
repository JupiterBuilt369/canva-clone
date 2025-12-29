import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import TextTool from "../tools/TextTool";
import ImageTool from "../tools/ImageTool";
import ShapeTool from "../tools/ShapeTool";
import BackgroundTool from "../tools/BackgroundTool";
import ElementsTool from "../tools/ElementsTool";
// import { Canvas, IText, Rect, Image as FabricImage } from "fabric";
import * as fabric from "fabric";
const TOOL_PANELS = {
  add_text: TextTool,
  add_image: ImageTool,
  add_shape: ShapeTool,
  change_background: BackgroundTool,
  add_elements: ElementsTool,
};

const Editor = () => {
  const [activeTool, setActiveTool] = useState("select");
  const [canvasBg, setCanvasBg] = useState("#ffffff");
  const [selectedObject, setSelectedObject] = useState(null);

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const ActivePanel = TOOL_PANELS[activeTool];

  const saveState = () => {
    const json = fabricCanvasRef.current.toJSON();
    undoStack.current.push(json);
    redoStack.current = []; // clear redo
  };
  const undo = () => {
    const currCanvas = fabricCanvasRef.current;
    if (!currCanvas) return;
    if (undoStack.current.length < 2) return;
    const prev = currCanvas.current.pop();
    redoStack.current.push(prev);
    const prevState = undoStack.current[undoStack.current.length - 1];
    currCanvas.current.loadFromJSON(prevState);
    currCanvas.current.renderAll();
  };

  const redo = () => {
    if (!fabricCanvasRef.current) return;
    if (redoStack.current.length === 0) return;
    const currStack = redoStack.current.pop();
    undoStack.current.push(currStack);
    fabricCanvasRef.current.loadFromJSON(currStack);
    fabricCanvasRef.current.renderAll();
  };

  // Create Fabric canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 450,
      backgroundColor: canvasBg,
    });

    fabricCanvasRef.current = canvas;

    //for undo and redo functionality
    undoStack.current.push(canvas.toJSON());
    canvas.on("object:added", saveState);
    canvas.on("object:removed", saveState);
    canvas.on("object:modified", saveState);

    canvas.on("selection:created", (e) => {
      setSelectedObject(e.selected[0]);
    });

    canvas.on("selection:updated", (e) => {
      setSelectedObject(e.selected[0]);
    });

    canvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    // root canvas lines
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const verticalLine = new fabric.Line([centerX, 0, centerX, canvas.height], {
      stroke: "#999",
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      excludeFromExport: true,
    });

    const horizontalLine = new fabric.Line(
      [0, centerY, canvas.width, centerY],
      {
        stroke: "#999",
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        excludeFromExport: true,
      }
    );

    canvas.add(verticalLine);
    canvas.add(horizontalLine);
    canvas.sendObjectToBack(verticalLine);
    canvas.sendObjectToBack(horizontalLine);

    const vGuide = new fabric.Line([centerX, 0, centerX, canvas.height], {
      stroke: "#9ca3af",
      strokeWidth: 1,
      strokeDashArray: [6, 6],
      selectable: false,
      evented: false,
      visible: false,
    });

    const hGuide = new fabric.Line([0, centerY, canvas.width, centerY], {
      stroke: "#9ca3af",
      strokeWidth: 1,
      strokeDashArray: [6, 6],
      selectable: false,
      evented: false,
      visible: false,
    });

    canvas.add(vGuide);
    canvas.add(hGuide);
    canvas.sendObjectToBack(vGuide);
    canvas.sendObjectToBack(hGuide);

    //conditions for alignment guide

    const SNAP_THRESHOLD = 5; // px
    canvas.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;

      const objCenter = obj.getCenterPoint();

      let snapX = false;
      let snapY = false;

      // Horizontal snap (X axis)
      if (Math.abs(objCenter.x - centerX) < SNAP_THRESHOLD) {
        obj.setPositionByOrigin(
          new fabric.Point(centerX, objCenter.y),
          "center",
          "center"
        );
        snapX = true;
      }

      // Vertical snap (Y axis)
      if (Math.abs(objCenter.y - centerY) < SNAP_THRESHOLD) {
        obj.setPositionByOrigin(
          new fabric.Point(objCenter.x, centerY),
          "center",
          "center"
        );
        snapY = true;
      }

      vGuide.visible = snapX;
      hGuide.visible = snapY;

      canvas.renderAll();
    });

    canvas.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;

      const objCenter = obj.getCenterPoint();

      let snapX = false;
      let snapY = false;

      // Horizontal snap (X axis)
      if (Math.abs(objCenter.x - centerX) < SNAP_THRESHOLD) {
        obj.setPositionByOrigin(
          new fabric.Point(centerX, objCenter.y),
          "center",
          "center"
        );
        snapX = true;
      }

      // Vertical snap (Y axis)
      if (Math.abs(objCenter.y - centerY) < SNAP_THRESHOLD) {
        obj.setPositionByOrigin(
          new fabric.Point(objCenter.x, centerY),
          "center",
          "center"
        );
        snapY = true;
      }

      vGuide.visible = snapX;
      hGuide.visible = snapY;

      canvas.renderAll();
    });

    // /hide guide
    canvas.on("object:modified", () => {
      vGuide.visible = false;
      hGuide.visible = false;
      canvas.renderAll();
    });

    canvas.renderAll();

    return () => canvas.dispose();
  }, []);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    fabricCanvasRef.current.backgroundColor = canvasBg;
    fabricCanvasRef.current.renderAll();
  }, [canvasBg]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmd = e.ctrlKey || e.metaKey;

      if (isCmd && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (isCmd && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />

      {ActivePanel && (
        <div className="w-[280px] bg-white border-r">
          <ActivePanel
            setCanvasBg={setCanvasBg}
            fabricCanvasRef={fabricCanvasRef}
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
          />
        </div>
      )}

      <main className="flex-1 flex items-center justify-center">
        <canvas ref={canvasRef} className="shadow-lg rounded-md" />
      </main>
    </div>
  );
};

export default Editor;
