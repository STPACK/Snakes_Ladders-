import React, { useState, useRef, forwardRef,useImperativeHandle } from "react";

import { TweenMax, gsap, TimelineLite } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import {selectPositionPlayer,selectPlayerMap} from '../utility';

import "./Player.css";


const TestPlayer2 = (props,ref) => {

  const {col,row,index}=props
  const {posLeft,posBottom}=selectPositionPlayer(index)
  const playerMap = selectPlayerMap(index)
  

  let imgPlayer = useRef(null);
  
  gsap.registerPlugin(CSSPlugin);
  
  

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
    
    let master =new TimelineLite();

    let result = point + posCol;
    let resRow =posRow
    const resPosition =position+point
    
    
    if (result < col) {                     // เช็คว่าเลื่อนภายใน column หรือไม่
      if (posRow % 2 === 0) {               // เช็คว่าเป็นแถวคู่หรือแถวคี่
        master.add(TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, }))  // แถวคู่ add timeline
        setPosCol(result);

      } else { 
        master.add(TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, }))  // แถวคี่ add timeline
        setPosCol(result);
      }
    } else {                                // มีการขยับ Row
      if (posRow % 2 === 0) {               // เช็ค row ปัจจุบันว่า อยู่ คู่หรือคี่
        let colResult = Math.abs(result-col);
        if(colResult>=col){                 //  มีการขยับมากกว่า 1 row
            colResult = colResult-col
            result=colResult
            master.add(master.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
                .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom:( posRow+1) * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom })
                .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom, }))
                resRow=posRow + 2
                setPosRow(posRow + 2);
                setPosCol(colResult);

        }else{                          // มีการขยับ 1 row
            result=colResult
            master.add(master.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
              .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom,})
              .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom, }))
              resRow=posRow + 1
            setPosRow(posRow + 1);
            setPosCol(colResult);
        }
      } else {
          let colResult = Math.abs(result-col);
          if(colResult>=col){
            colResult = colResult-col
            result=colResult
            master.add(master.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
            .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom })
            .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow+1) * 90 + posBottom,})
            .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom,})
            .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (posRow + 2) * 90 + posBottom, }))
            resRow=posRow + 2
          setPosRow(posRow + 2);
          setPosCol(colResult);
          }else{
              result=colResult
              master.add(master.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: posRow * 90 + posBottom,})
                .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom })
                .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (posRow + 1) * 90 + posBottom, }))
                resRow=posRow + 1
              setPosRow(posRow + 1);
              setPosCol(colResult);
          }
      }
    }

    if(resPosition%7 ===0 || resPosition%9===0 || resPosition%11===0){   // เช็ค special Action
        
        if(resPosition%7 ===0){    //หยุด 1 รอบ
            setPosition(resPosition);
            setStop(true)
          }
          if(resPosition%9 ===0){  // เดินหน้า 3 ช่อง
             result +=3 ;
            if (result < col) {
              if (resRow % 2 === 0) { 
                master.add(TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:1}))
                setPosCol(result);
              } else { 
                master.add(TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:1}))
                setPosCol(result);
              }
            } else {
                
              if (resRow % 2 === 0) {
                let colResult = Math.abs(result-col);
                master.add(master.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                      .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom,})
                      .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, }))
                    setPosRow(resRow + 1);
                    setPosCol(colResult);
                
              } else {
                  let colResult = Math.abs(result-col);
                  master.add(master.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                        .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom })
                        .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, }))
                      setPosRow(resRow + 1);
                      setPosCol(colResult);
              }
            }  

            if((resPosition+3)%7 === 0){
                setStop(true)
            }
            setPosition(resPosition+3);
          }
          if(resPosition%11 ===0){
            master.add(master.to(imgPlayer, {left:  posLeft,bottom: posBottom,delay:1}))
            setPosRow(0);
            setPosCol(0);
            setPosition(1); 
          }
        }else{
            setPosition(resPosition);
        }

    master.play().then(()=>console.log("movedone"))

   
  };
  
  return (
    <>
        <div className="player-icon" style={{left:`${posLeft}px`,bottom:`${posBottom}px`}} ref={(el) => (imgPlayer = el)}>
          <img src={playerMap} alt="player_img" />
        </div>
    </>
  );
};

export default forwardRef(TestPlayer2)
