import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import * as fabric from "fabric";

const FONT_FAMILIES = [
  { label: "Arial", value: "Arial" },
  { label: "Poppins", value: "Poppins" },
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Lobster", value: "Lobster" },
  { label: "Courier New", value: "Courier New" },
];

const ALLOWED_TEXT_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "underline",
  "fill",
  "opacity",
  "textAlign",
  "lineHeight",
  "charSpacing",
];

const TextTool = ({ fabricCanvasRef, selectedObject }) => {
  const [values, setValues] = useState({
    fontSize: 32,
    fill: "#000000",
    opacity: 1,
    lineHeight: 1.2,
    charSpacing: 0,
    fontFamily: "Arial",
  });

  useEffect(() => {
    if (selectedObject && selectedObject.type === "i-text") {
      setValues({
        fontSize: selectedObject.fontSize || 32,
        fill: selectedObject.fill || "#000000",
        opacity: selectedObject.opacity ?? 1,
        lineHeight: selectedObject.lineHeight || 1.2,
        charSpacing: selectedObject.charSpacing || 0,
        fontFamily: selectedObject.fontFamily || "Arial",
      });
    }
  }, [selectedObject]);

  const addText = (type) => {
    const canvas = fabricCanvasRef?.current;
    if (!canvas) return;
    const presets = {
      heading: {
        text: "Add a heading",
        fontSize: 48,
        fontWeight: "bold",
        left: 400,
        top: 40,
      },
      subheading: {
        text: "Add a subheading",
        fontSize: 28,
        fontWeight: "600",
        left: 200,
        top: 80,
      },
      body: {
        text: "Add body text",
        fontSize: 18,
        fontWeight: "normal",
        left: 200,
        top: 120,
      },
    };
    const preset = presets[type] || presets.body;
    const text = new fabric.IText(" Add Text Here ", {
      left: preset.left,
      top: preset.top,
      fontFamily: "Arial",
      fontSize: preset.fontSize,
      fontWeight: preset.fontWeight,
      fill: "#000000",
      editable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();

    canvas.renderAll();
  };
  
  const deleteSelected = () => {
  const canvas = fabricCanvasRef.current;
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  canvas.remove(activeObject);
  canvas.discardActiveObject();
  canvas.renderAll();
};


  const changeFont = (fontFamily) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontFamily", fontFamily);
      canvas.renderAll();
      setValues((prev) => ({ ...prev, fontFamily }));
    }
  };

  const updateText = (prop, value) => {
    if (!ALLOWED_TEXT_PROPS.includes(prop)) return;

    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();

    if (!active || active.type !== "i-text") return;

    active.set(prop, value);
    canvas.requestRenderAll();
    setValues((prev) => ({ ...prev, [prop]: value }));
  };

  const toggleTextProp = (prop, onValue, offValue) => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();
    if (!active || active.type !== "i-text") return;

    const current = active[prop];
    const next = current === onValue ? offValue : onValue;

    active.set(prop, next);
    canvas.requestRenderAll();
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">Text</h2>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => addText("heading")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold text-2xl">Add a heading</span>
        </button>

        <button
          onClick={() => addText("subheading")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold text-1xl">Add a subheading</span>
        </button>

        <button
          onClick={() => addText("body")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add body text</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t -my-1" />

      {/* Text Styles (Optional, placeholder) */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-600">Text styles</p>

        {/* font family selection */}
        <div className="w-full flex justify-between items-center">
          <select
            className="w-[60%] p-2 rounded-lg border border-gray-200 "
            onChange={(e) => changeFont(e.target.value)}
            value={values.fontFamily}
          >
            {FONT_FAMILIES.map((font) => (
              <option
                key={font.value}
                value={font.value}
                className="`${font.value}`"
              >
                {font.label}
              </option>
            ))}
          </select>
          <input
            className="bg-gray-200 rounded-md p-2 text-center"
            type="number"
            value={values.fontSize}
            onChange={(e) => updateText("fontSize", Number(e.target.value))}
            min="8"
            max="200"
          />
        </div>

        {/* font-size */}
        <div className="flex justify-between items-center gap-1">
          <p className="text-sm font-semibold text-gray-600">Font Size</p>
          <input
            onChange={(e) => updateText("fontSize", Number(e.target.value))}
            className="w-[50%] p-1 rounded-lg border border-gray-200"
            type="range"
            name="font-size"
            min="8"
            max="200"
            value={values.fontSize}
          />
        </div>
        {/* text-color */}
        <div className="flex justify-between items-center gap-1">
          <p className="text-sm font-semibold text-gray-600">Text-Color</p>
          <input
            onChange={(e) => updateText("fill", e.target.value)}
            className="w-[50%]  border-collapse"
            type="color"
            value={values.fill}
          ></input>
        </div>
        {/* opacity */}
        <div className=" flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-600">Opacity</label>
          <input
            onChange={(e) => updateText("opacity", e.target.value / 100)}
            className="w-[50%] p-1 rounded-lg border border-gray-200"
            type="range"
            min="0"
            max="100"
            value={Math.round(values.opacity * 100)}
          />
        </div>

        {/* <!-- TEXT STYLES --> */}
        <div className=" flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-600">Style</label>

          <div className=" w-[50%] flex justify-center gap-2">
            <button
              onClick={() => toggleTextProp("fontWeight", "bold", "normal")}
              className=" w-1/3 h-1/3 border border-black  text-xl font-semibold rounded-xl "
            >
              B
            </button>
            <button
              onClick={() => toggleTextProp("fontStyle", "italic", "normal")}
              className=" w-1/3 h-1/3 border border-black text-xl italic"
            >
              I
            </button>
            <button
              onClick={() => toggleTextProp("underline", true, false)}
              className=" w-1/3 h-1/3 border border-black  text-xl   underline"
            >
              U
            </button>
          </div>
        </div>

        {/* <!-- SPACING --> */}
        <div className=" flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-600">
            Letter spacing
          </label>
          <input
            className="w-[50%] p-1 rounded-lg border border-gray-200"
            type="range"
            min="-5"
            max="20"
            value={values.charSpacing / 10}
            onChange={(e) => updateText("charSpacing", e.target.value * 10)}
          />
        </div>
        {/* line height */}
        <div className=" flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-600">
            Line height
          </label>

          <input
            className="w-[50%] p-1 rounded-lg border border-gray-200"
            type="range"
            min="0.8"
            max="3"
            step="0.1"
            value={values.lineHeight}
            onChange={(e) => updateText("lineHeight", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default TextTool;
