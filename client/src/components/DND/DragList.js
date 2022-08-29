import React, { useState, useRef } from "react";
import "./Drag.css";

function DragList() {
  const [items, setItems] = useState(["Medical", "Supplier", "Unit", "User"]);
  let dragItems = useRef(null);
  let dragOverItems = useRef(null);

  const handleSort = () => {
    let duplicateItems = [...items];
    const draggedItemsContent = duplicateItems.splice(dragItems.current, 1)[0];
    duplicateItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;

    setItems(duplicateItems);
  };

  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div
          key={index}
          className="list-item"
          draggable
          onDragStart={(e) => (dragItems.current = index)}
          onDragEnter={(e) => (dragOverItems.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
}

export default DragList;
