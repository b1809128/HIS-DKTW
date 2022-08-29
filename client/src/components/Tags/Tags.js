import React from "react";
import "./Tags.css";
import { AiOutlineHolder } from "react-icons/ai";
function Tags({ title, dataNumber }) {
  return (
    <div className="tags">
      <div className="tags-content">
        <h4 className="tags-title">{title}</h4>
        <div className="tags-dataNumber">{dataNumber}</div>
      </div>
      <AiOutlineHolder className="tags-holder" />
    </div>
  );
}

export default Tags;
