import React, { useState, useRef, forwardRef,useImperativeHandle } from "react";

import { TweenMax, gsap, TimelineLite } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import {selectPositionPlayer,selectPlayerMap} from '../utility';

import "./Player.css";


const TestPlayer = (props,ref) => {

  const {col,row,index}=props
  const {posLeft,posBottom}=selectPositionPlayer(index)
  const playerMap = selectPlayerMap(index)
  

  let imgPlayer = useRef(null);
  
  gsap.registerPlugin(CSSPlugin);
  let tl = new TimelineLite();

  const [stop, setStop] = useState(false)
  const [position, setPosition] = useState(1);
  const [posCol, setPosCol] = useState(0);
  const [posRow, setPosRow] = useState(0);
 

  useImperativeHandle(
      ref,
      () => ({
         Dice:(point)=>{
            move(point);
          }
      })
  )

  const move = (point) => {
    let result = point + posCol;
    let resRow =posRow
    console.log("rest ==" +result);
    
    if (result < col) {
      if (posRow % 2 === 0) { 
        TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, });
        setPosCol(result);

      } else { 
        TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, });
        setPosCol(result);
      }
    } else {
      if (posRow % 2 === 0) {
        let colResult = Math.abs(col - result);
        if(colResult>=col){
            colResult = colResult-col
            result=colResult
            tl.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
                .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom:( posRow+1) * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom })
                .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom, });
                resRow=posRow + 2
                setPosRow(posRow + 2);
                setPosCol(colResult);

        }else{
            result=colResult
            tl.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
              .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom,})
              .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom, });
              resRow=posRow + 1
            setPosRow(posRow + 1);
            setPosCol(colResult);
        }
      } else {
          let colResult = Math.abs(col - result);
          if(colResult>=col){
            colResult = colResult-col
            result=colResult
            tl.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
            .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom })
            .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow+1) * 90 + posBottom,})
            .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom,})
            .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom, });
            resRow=posRow + 2
          setPosRow(posRow + 2);
          setPosCol(colResult);
          }else{
              result=colResult
              tl.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom })
                .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom, });
                resRow=posRow + 1
              setPosRow(posRow + 1);
              setPosCol(colResult);
          }
      }
    }
        const resPosition =position+point
        console.log(resPosition);
    
        if(resPosition%7 ===0 || resPosition%9===0 || resPosition%11===0){
            specialAction(resPosition,result,resRow)
        }else{
            setPosition(resPosition);
        }
  };

  const specialAction = (resPosition,result,resRow) => {
      if(resPosition%7 ===0){
        setPosition(resPosition);
       setStop(true)
      }
      if(resPosition%9 ===0){
        setPosition(resPosition+3);
         result +=3;
    
        if (result < col) {
          if (resRow % 2 === 0) { 
            TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: resRow * 90 + posBottom, delay:1});
            setPosCol(result);
          } else { 
            TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:1 });
            setPosCol(result);
          }
        } else {
            console.log("result =="+result);
          if (resRow % 2 === 0) {
            let colResult = Math.abs(col - result);
                tl.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                  .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom,})
                  .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, });
                setPosRow(resRow + 1);
                setPosCol(colResult);
            
          } else {
              let colResult = Math.abs(col - result);
                  
                  tl.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                    .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom })
                    .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, });
                  setPosRow(resRow + 1);
                  setPosCol(colResult);
          }
        }  
      }
      if(resPosition%11 ===0){
        tl.to(imgPlayer, {left:  posLeft,bottom: posBottom,delay:1}).then(()=>console.log("go home"))
        setPosRow(0);
        setPosCol(0);
        setPosition(1); 
      }
  }

  return (
    <>
        <div className="player-icon" style={{left:`${posLeft}px`,bottom:`${posBottom}px`}} ref={(el) => (imgPlayer = el)}>
          <img src={playerMap} alt="player_img" />
        </div>
    </>
  );
};

export default forwardRef(TestPlayer)
