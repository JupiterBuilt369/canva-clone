import React, { useEffect, useState } from "react";
import {
  MousePointer,
  Type,
  Image,
  Square,
  PaintBucket,
  Layers,
} from "lucide-react";

const Sidebar = ({ activeTool, setActiveTool }) => {
  const tools = [
    // {
    //   id: "tool_select",
    //   label: "Select",
    //   icon: MousePointer,
    //   type: "select",
    //   enabled: true,
    // },
    {
      id: "tool_text",
      label: "Text",
      icon: Type,
      type: "add_text",
      enabled: true,
    },
    // {
    //   id: "tool_image",
    //   label: "Image",
    //   icon: Image,
    //   type: "add_image",
    //   enabled: true,
    // },
    {
      id: "tool_shapes",
      label: "Shapes",
      icon: Square,
      type: "add_shape",
      enabled: true,
    },
    {
      id: "tool_background",
      label: "Background",
      icon: PaintBucket,
      type: "change_background",
      enabled: true,
    },
    // {
    //   id: "tool_elements",
    //   label: "Elements",
    //   icon: Layers,
    //   type: "add_elements",
    //   enabled: false,
    // },
  ];

  const handleActive = (type) => {
    setActiveTool((prev) => (prev === type ? null : type));
  };

  return (
    <>
      <aside className="w-[70px] bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2">
        {tools.map((item) => {
          const Icon = item.icon;
          const isActive = activeTool === item.type;

          return (
            <button
              key={item.id}
              disabled={!item.enabled}
              onClick={()=>handleActive(item.type)}
             className={`
              w-full flex flex-col items-center gap-1 py-3 rounded-xl transition
              ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-gray-100"
              }
              ${!item.enabled && "opacity-40 cursor-not-allowed"}
            `}
            >
              <Icon className="w-8 h-8" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
};

export default Sidebar;
