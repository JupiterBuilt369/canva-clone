import React, { useState } from "react";

const colorSet = [
  "#a3a3a3", // neutral-400
  "#64748b", // slate-500
  "#111827", // gray-900
  "#fafafa", // zinc-100
  "#57534e", // stone-600
  "#2563eb", // blue-600
  "#6366f1", // indigo-500
  "#38bdf8", // sky-400
  "#0e7490", // cyan-700
  "#eff6ff", // blue-50
  "#10b981", // emerald-500
  "#16a34a", // green-600
  "#dc2626", // red-600
  "#f43f5e", // rose-500
  "#fbbf24", // amber-400
  "#f97316", // orange-500
  "#7c3aed", // violet-600
  "#a855f7", // purple-500
  "#d946ef", // fuchsia-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#312e81", // indigo-950
  "#0f172a", // slate-900
  "#7f1d1d", // red-900
  "#052e16", // green-950
  "#fde047", // yellow-300
  "#a3e635", // lime-400
  "#ffedd5", // orange-100
  "#ddd6fe", // violet-200
  "#e0f2fe", // sky-100
];

const BackgroundTool = ({ setCanvasBg }) => {
  const [color, setColor] = useState("#123123");
  // useRef(color)

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h2 className="text-lg font-semibold text-gray-800">Colours</h2>

      <div className="grid grid-cols-5 gap-3 mt-10">
        {colorSet.map((colors, index) => (
          <button
            key={index}
            onClick={() => setCanvasBg(colors)}
            style={{ backgroundColor: colors }}
            className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition cursor-pointer"
            title={colors}
          />
        ))}
      </div>

      <label
        className="text-sm font-semibold text-gray-600 mt-10"
        htmlFor="picker"
      >
        Pick a color:
      </label>

      <div className="flex justify-between items-center">
        <div
          style={{ backgroundColor: color }}
          className="w-8 h-8 rounded-full border border-gray-200"
        ></div>

        <input
          className="w-1/2 h-10 cursor-pointer"
          type="color"
          id="picker"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setCanvasBg(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default BackgroundTool;
