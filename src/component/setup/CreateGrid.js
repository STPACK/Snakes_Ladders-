import React, { useRef } from "react";
import img2 from "../../assets/Play/PlayerMaps_2.svg";
import Back from "../../assets/Play/stop.svg";
import Next from "../../assets/Play/Next.svg";
import Gohome from "../../assets/Play/MoveFromStart.svg";
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
      const result = rowIndex * col + i;
      items.push(
        <div
          className={`col col__grid ${i % 2 === 0 && "col__color"}`}
          key={i}
          id={rowIndex * col + i}
        >
          <img src="" alt="" />
          {result % 7 === 0 && result !== row * col && (
            <img src={Back} alt="" />
          )}
          {result % 9 === 0 && <img src={Next} alt="" />}
          {result % 11 === 0 && <img src={Gohome} alt="" />}

          <p> {result}</p>
        </div>
      );
    }
    return items;
  };

  return <>{drawingSquares()}</>;
};

export default React.memo(CreateGrid);
