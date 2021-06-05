import React, { useState, useRef } from "react";
import { TweenMax, gsap, TimelineLite } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import Player from "../../assets/Play/PlayerMaps_4.svg";
import "./Player.css";


const Player4 = (props) => {
const {col,row,randomDice}=props
  const [stop, setStop] = useState(false)
  const [position, setPosition] = useState(1);
  const [posCol, setPosCol] = useState(0);
  const [posRow, setPosRow] = useState(0);
  const posLeft = 55
  const posBottom = 45

 



  let imgPlayer = useRef(null);
  gsap.registerPlugin(CSSPlugin);
  let tl = new TimelineLite();

  const Dice = () => {
    const rndInt = Math.floor(Math.random() * 6) + 1;
    random(rndInt);
  };
    randomDice(Dice)

    const random = (i) => {
        let result = i + posCol;
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
            const resPosition =position+i
            console.log(resPosition);
        
            if(resPosition%7 ===0 || resPosition%9===0 || resPosition%11===0){
                spAction(resPosition,result,resRow)
            }else{
                setPosition(position+i);
            }
      };
    
      const spAction = (i,res,resRow) => {
          if(i%7 ===0){
            setPosition(i);
           setStop(true)
          }
          if(i%9 ===0){
            setPosition(i+3);
            let result = 3 + res;
        
            if (result < col) {
              if (posRow % 2 === 0) { 
                TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: resRow * 90 + posBottom, delay:1});
                setPosCol(result);
        
              } else { 
                TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:1 });
                setPosCol(result);
              }
            } else {
                console.log("result =="+result);
              if (posRow % 2 === 0) {
                let colResult = Math.abs(col - result);
                
                    result=colResult
                    tl.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                      .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom,})
                      .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, });
                    setPosRow(resRow + 1);
                    setPosCol(colResult);
                
              } else {
                  let colResult = Math.abs(col - result);
                      result=colResult
                      tl.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:1})
                        .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom })
                        .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, });
                      setPosRow(resRow + 1);
                      setPosCol(colResult);
              }
            }  
          }
          if(i%11 ===0){
            tl.to(imgPlayer, {left:  posLeft,bottom: posBottom,delay:1}) 
            setPosRow(0);
            setPosCol(0);
            setPosition(1); 
          }
      }
    

  return (
    
        <div className="player__img4" ref={(el) => (imgPlayer = el)}>
          <img src={Player} alt="player4" />
        </div>
  );
};

export default Player4;
