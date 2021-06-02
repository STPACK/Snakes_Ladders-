import React, { useState, useRef } from "react";
import { TweenMax, gsap ,TimelineLite} from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import CreateGrid from "./component/setup/CreateGrid";
import Info from "./component/Info/Info";
import Player1 from "./assets/Play/PlayerMaps_1.svg";
import "./App.css";

const App = () => {
  const [col, setCol] = useState(5);
  const [row, setRow] = useState(6);
  const [position, setPosition] = useState(1);
  const [posCol, setPosCol] = useState(0);
  const [posRow, setPosRow] = useState(0);

  let imgPlayer1 = useRef(null);
  let squaresRef = useRef();
  gsap.registerPlugin(CSSPlugin);
  let tl = new TimelineLite();
  
  
  const random = (i) => {
    let result = i+posCol

    if(result < col){
      if(posRow%2 ===0){
        TweenMax.to(imgPlayer1, {left: result * (500 / col) + 10,bottom: posRow * 90 + 10});
        setPosCol(result)
        
      }else{
        TweenMax.to(imgPlayer1, {left: (col-result-1) * (500 / col) + 10,bottom: posRow * 90 + 10});
        setPosCol(result)
      }
        
    }else{
      if(posRow%2 === 0){
       const  colResult = Math.abs((col-result))
        tl.to(imgPlayer1, {left: (col-1) * (500 / col) + 10,bottom: posRow * 90 + 10})
        .to(imgPlayer1, {left: (col-1) * (500 / col) + 10,bottom:(posRow+1)*  90 + 10})
        .to(imgPlayer1, {left: (col-colResult-1) * (500 / col) + 10,bottom:(posRow+1)*  90 + 10})
        setPosRow(posRow+1)
        setPosCol(colResult)
      }else{
        const  colResult = Math.abs((col-result))
        tl.to(imgPlayer1, {left: 0 * (500 / col) + 10,bottom: posRow * 90 + 10})
        .to(imgPlayer1, {left: 0* (500 / col) + 10,bottom:(posRow+1)*  90 + 10})
        .to(imgPlayer1, {left: (colResult) * (500 / col) + 10,bottom:(posRow+1)*  90 + 10})
        setPosRow(posRow+1)
        setPosCol(colResult)
      }
    }

  }

  const playerMove = () => {
    console.log("loop");
    console.log(position);
    if(posRow%2 === 0){
      if (posCol < col-1 ) {
        setPosCol(posCol + 3);
        TweenMax.to(imgPlayer1, {left: posCol * (500 / col) + 10,bottom: posRow * 90 + 10});
      } else {
        setPosRow(posRow + 1);
          TweenMax.to(imgPlayer1, {left: posCol * (500 / col) + 10,bottom: posRow * 90 + 10});
      }
    }else{
      if (posCol > 0 ) {
        TweenMax.to(imgPlayer1, {left: posCol * (500 / col) + 10,bottom: posRow * 90 + 10});
        setPosCol(posCol - 1);
      } else {
        setPosRow(posRow + 1);
          TweenMax.to(imgPlayer1, {left: posCol * (500 / col) + 10,bottom: posRow * 90 + 10});
      }
    }
    setPosition(position+1)
  };

  return (
    <div className="app__container">
      <div
        className="squares__container"
        ref={(el) => {
          if (!el) return;
        }}
      >
        <CreateGrid col={5} row={6} />
        <div className="player__img" ref={(el) => (imgPlayer1 = el)}>
          <img src={Player1} alt="player1" />
        </div>
      </div>

      <div>
        <button onClick={()=>random(1)} >1</button>
        <button onClick={()=>random(2)} >2</button>
        <button onClick={()=>random(3)} >3</button>
        <button onClick={()=>random(4)} >4</button>
        <button onClick={()=>random(5)} >5</button>
        <button onClick={()=>random(6)} >6</button>
        
        <button onClick={playerMove}>position</button>
      </div>
    </div>
  );
};

export default App;
