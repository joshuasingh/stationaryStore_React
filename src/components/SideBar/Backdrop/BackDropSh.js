import React from "react";
import "./BackDropSh.css";

const BackDropSh = ({ toggle }) => {
  return (
    <>
      <div className="BackDropSh_Root" onClick={toggle}>
        BackDropSh
      </div>
    </>
  );
};

export default BackDropSh;
