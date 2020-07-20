import React from "react";
import { Button } from "react-bootstrap";
import "./GridShow.css";

const SortHeader = ({ lowToHigh, highToLow }) => {
  return (
    <>
      <div className="sortTab">
        <strong> Sort Price : </strong>
        <Button
          className="sortSel"
          variant="outline-secondary"
          onClick={(e) => {
            lowToHigh();
          }}
        >
          Low To High
        </Button>
        <Button
          className="sortSel"
          variant="outline-secondary"
          onClick={(e) => {
            highToLow();
          }}
        >
          High To Low
        </Button>
      </div>
    </>
  );
};

export default SortHeader;
