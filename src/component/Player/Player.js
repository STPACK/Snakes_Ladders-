import React, { useState, useRef, forwardRef,useImperativeHandle } from "react";
import {useDispatch } from 'react-redux'

import * as actionTypes from '../../store/actionTypes'

import { TweenMax, gsap, TimelineLite } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import {selectPositionPlayer,selectPlayerMap} from '../utility';

import "./Player.css";


const Player = (props,ref) => {

  const {col,row,index,name}=props

  const dispatch = useDispatch()
  const {posLeft,posBottom}=selectPositionPlayer(index)
  const playerMap = selectPlayerMap(index)
  
  gsap.registerPlugin(CSSPlugin);

  
  const [position, setPosition] = useState(1);
  const [posCol, setPosCol] = useState(0);
  const [posRow, setPosRow] = useState(0);
  let imgPlayer = useRef(null);
  
  
  useImperativeHandle(
      ref,
      () => ({
         Dice:(point)=>{
            move(point);
          },
          reset:()=>{
            resetAll()
          }
      })
  )
  const resetAll =()=>{             // reset
    TweenMax.to(imgPlayer, {left:  posLeft,bottom: posBottom})
    setPosRow(0);
    setPosCol(0);
    setPosition(1); 
  }

  const move = (point) => {
    
    let master =new TimelineLite();

    let result = point + posCol;   // บวกเพื่อ นำมาคำนวณเพื่อหาว่า ขยับใน column พอหรือไม่
    let resRow =posRow
    const resPosition =position+point
    if(resPosition >= col*row){ return  dispatch({type:actionTypes.SET_WHO_WIN,index:index})}  // หากแต้มเกิน จำนวนช่อง คือผู้ชนะ
    
    
    if (result < col) {                     // เช็คว่าเลื่อนภายใน column หรือไม่
      if (posRow % 2 === 0) {               // เช็คว่าเป็นแถวคู่หรือแถวคี่
        master.add(TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, }))
          // แถวคู่ add timeline
        setPosCol(result);

      } else { 
        master.add(TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: posRow * 90 + posBottom, }))  // แถวคี่ add timeline
        setPosCol(result);
      }
    } else {                                // มีการขยับ Row
      if (posRow % 2 === 0) {               // เช็ค row ปัจจุบันว่า อยู่ คู่หรือคี่  แถวคู่
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
      } else {                      //แถวคี่
          let colResult = Math.abs(result-col);
          if(colResult>=col){                       //ขยับมากกว่า 1row
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
          }else{                                //ขยับ 1 row
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
    dispatch({type:actionTypes.ADD_HISTORY,name:name,point:point,text:'เดินไปข้างหน้า'})           // เพิ่ม history

    if(resPosition%7 ===0 || resPosition%9===0 || resPosition%11===0){   // เช็ค special Action
        
        if(resPosition%7 ===0){    //หยุด 1 รอบ
            dispatch({type:actionTypes.SET_STOP_TURN,index:index,method:true})
            dispatch({type:actionTypes.ADD_HISTORY,name:name,point:0,text:'หยุดเดิน 1 ครั้ง'})
            setPosition(resPosition);
          }
          if(resPosition%9 ===0){  // เดินหน้า 3 ช่อง
             result +=3 ;
            if (result < col) {
              if (resRow % 2 === 0) { 
                master.add(TweenMax.to(imgPlayer, { left: result * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:0.8}))
                setPosCol(result);
              } else { 
                master.add(TweenMax.to(imgPlayer, {left: (col - result - 1) * (500 / col) + posLeft, bottom: resRow * 90 + posBottom,delay:0.8}))
                setPosCol(result);
              }
            } else {
                
              if (resRow % 2 === 0) {
                let colResult = Math.abs(result-col);
                master.add(master.to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:0.8})
                      .to(imgPlayer, {left: (col - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom,})
                      .to(imgPlayer, {left: (col - colResult - 1) * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, }))
                    setPosRow(resRow + 1);
                    setPosCol(colResult);
                
              } else {
                  let colResult = Math.abs(result-col);
                  master.add(master.to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: resRow * 90 + posBottom,delay:0.8})
                        .to(imgPlayer, {left: 0 * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom })
                        .to(imgPlayer, {left: colResult * (500 / col) + posLeft,bottom: (resRow + 1) * 90 + posBottom, }))
                      setPosRow(resRow + 1);
                      setPosCol(colResult);
              }
            }  

            dispatch({type:actionTypes.ADD_HISTORY,name:name,point:0,text:'เดินหน้า 3 ช่อง'})

            if((resPosition+3)%7 === 0){   //  เช็คอีกครั้งมาขยับมาเจอ หยุด 1 รอบหรือไม่
                dispatch({type:actionTypes.SET_STOP_TURN,index:index,method:true})
                dispatch({type:actionTypes.ADD_HISTORY,name:name,point:0,text:'หยุดเดิน 1 ครั้ง'})
                
            }
            
            setPosition(resPosition+3);
          }
          if(resPosition%11 ===0){    // กลับไปจุดเริ่มต้น
            master.add(master.to(imgPlayer, {left:  posLeft,bottom: posBottom,delay:0.8}))
            dispatch({type:actionTypes.ADD_HISTORY,name:name,point:0,text:'กลับจุดเริ่มต้น'})
            setPosRow(0);
            setPosCol(0);
            setPosition(1); 
          }
    }else{
        setPosition(resPosition);
    }

    master.play().then(()=> dispatch({type:actionTypes.SET_LOADING,method:false}))   // เริ่ม animation

   
  };
  
  return (
    <>
        <div className="player-icon" style={{left:`${posLeft}px`,bottom:`${posBottom}px`}} ref={(el) => (imgPlayer = el)}>
          <img src={playerMap} alt="player_img" />
        </div>
    </>
  );
};

export default forwardRef(Player)
