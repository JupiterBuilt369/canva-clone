import React from "react";

const EditorPanel = () => {
      const [bg, setBg] = useState("#ffffff")

  return (
    <div>
      <div
        style={{
          background: bg,
        }}
        className="w-[800px] h-[450px] bg-white shadow-lg rounded-md"
      />
    </div>
  );
};

export default EditorPanel;
