import React from "react";
import stop from "../../assets/Play/stop.svg";
import Next from "../../assets/Play/Next.svg";
import goHome from "../../assets/Play/MoveFromStart.svg";
import finish from "../../assets/Play/Finish.svg";
import "./CreatGrid.css";

const CreateGrid = ({col,row}) => {
  
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
          className={`col col__grid ${result % 2 !== 0 && "col__color"}`}
          style={{backgroundColor: result===1? '#ffb648' : (result===col*row) ? '#39cdbc': null}}
          
          key={i}
          id={rowIndex * col + i}
        >
          <img src="" alt="" />
          {result % 7 === 0 && result !== row * col && (
            <img src={stop} alt="" />
          )}
          {result % 9 === 0 && <img src={Next} alt="" className={ rowIndex%2 !== 0 ? 'flip-img' : null} />}
          {result % 11 === 0 && <img src={goHome} alt="" />}
          {result === col*row && <img src={finish} alt="" />}

          <p className="mx-1"> {result} { result===col*row && 'FINISH'}{ result===1 && 'START'}</p>
        </div>
      );
    }
    return items;
  };

  return <>{drawingSquares()}</>;
};

export default React.memo(CreateGrid);
