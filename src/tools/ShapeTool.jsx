import React from "react";
import * as fabric from "fabric";

const ShapeTool = ({ fabricCanvasRef }) => {
  const addShape = (type) => {
    const canvas = fabricCanvasRef?.current;
    if (!canvas) return;

    let shape;

    switch (type) {

      case "rect-filled":
        shape = new fabric.Rect({
          width: 140,
          height: 90,
          fill: "#111827",
          rx: 8,
          ry: 8,
          left: 300,
          top: 150,
        });
        break;

      case "rect-hollow":
        shape = new fabric.Rect({
          width: 140,
          height: 90,
          fill: "transparent",
          stroke: "#111827",
          strokeWidth: 3,
          rx: 8,
          ry: 8,
          left: 300,
          top: 150,
        });
        break;

    

      case "square-filled":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: "#111827",
          rx: 6,
          ry: 6,
          left: 320,
          top: 150,
        });
        break;

      case "square-hollow":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: "transparent",
          stroke: "#111827",
          strokeWidth: 3,
          rx: 6,
          ry: 6,
          left: 320,
          top: 150,
        });
        break;


      case "circle":
        shape = new fabric.Circle({
          radius: 45,
          fill: "#111827",
          left: 320,
          top: 160,
        });
        break;

      case "triangle":
        shape = new fabric.Triangle({
          width: 90,
          height: 80,
          fill: "#111827",
          left: 320,
          top: 150,
        });
        break;

      case "line":
        shape = new fabric.Line([0, 0, 120, 0], {
          stroke: "#111827",
          strokeWidth: 4,
          left: 300,
          top: 200,
        });
        break;

    
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4 bg-white">
      <h2 className="text-lg font-semibold">Shapes</h2>

      <div className="grid grid-cols-3 gap-3">
        {/* Rectangles */}
        <ShapeButton onClick={() => addShape("rect-filled")}>▭</ShapeButton>
        <ShapeButton onClick={() => addShape("rect-hollow")}>▯</ShapeButton>

        {/* Squares */}
        <ShapeButton onClick={() => addShape("square-filled")}>■</ShapeButton>
        <ShapeButton onClick={() => addShape("square-hollow")}>□</ShapeButton>

        {/* Others */}
        <ShapeButton onClick={() => addShape("circle")}>●</ShapeButton>
        <ShapeButton onClick={() => addShape("triangle")}>▲</ShapeButton>
        <ShapeButton onClick={() => addShape("line")}>—</ShapeButton>
      </div>
    </div>
  );
};

const ShapeButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="aspect-square rounded-xl border
    flex items-center justify-center text-2xl
    hover:bg-gray-100 active:scale-95 transition"
  >
    {children}
  </button>
);

export default ShapeTool;
