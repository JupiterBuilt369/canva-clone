import { useEffect, useState } from "react";

const ColorTool = ({ fabricCanvasRef, selectedObject }) => {
  const [fill, setFill] = useState("#000000");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!selectedObject) return;

    setFill(selectedObject.fill || "#000000");
    setOpacity(selectedObject.opacity ?? 1);
  }, [selectedObject]);

  const setProp = (prop, value) => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();
    if (!active) return;

    active.set(prop, value);
    canvas.requestRenderAll();
  };

  return {
    fill,
    opacity,
    setFill: (val) => setProp("fill", val),
    setOpacity: (val) => setProp("opacity", val),
  };
};

export default ColorTool;
