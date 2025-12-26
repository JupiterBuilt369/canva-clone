import React from "react";
import { Plus } from "lucide-react";

const TextTool = () => {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        Text
      </h2>

      {/* Quick Add Buttons */}
      <div className="flex flex-col gap-3">
        
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold text-2xl">Add a heading</span>
        </button>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold text-1xl">Add a subheading</span>
        </button>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
          border border-gray-200 hover:bg-gray-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add body text</span>
        </button>

      </div>

      {/* Divider */}
      <div className="border-t my-2" />

      {/* Text Styles (Optional, placeholder) */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-600">
          Text styles
        </p>

        <div className="p-3 rounded-lg border border-dashed text-sm text-gray-400">
          Coming soon…
        </div>
      </div>

    </div>
  );
};

export default TextTool;
