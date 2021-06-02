import React from "react";
import "./CreatGrid.css";

const CreateGrid = ({ row, col }) => {
  const drawingSquares = () => {
    let items = [];
    for (let i = 0; i < row; i++) {
      items.push(
        <div className={`row row__grid ${i % 2 !== 0 && "row__flex"}`} key={i}>
          {createCol(i)}
        </div>
      );
    }
    return items;
  };

  const createCol = (rowIndex) => {
    let items = [];
    for (let i = 1; i <= col; i++) {
      items.push(
        <div className={`col col__grid ${i % 2 === 0 && "col__color"}`} key={i}>
          {rowIndex * row + i}
        </div>
      );
    }
    return items;
  };

  return (
    <>
      <div className="squares__container">{drawingSquares()}</div>
    </>
  );
};

export default CreateGrid;
