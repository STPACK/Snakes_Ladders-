import React, { useState, useRef,useEffect } from "react";
import {useDispatch,connect} from 'react-redux';


import * as actionTypes from '../../store/actionTypes'
import Modal from '../Modal/Modal'

import CreateGrid from "../setup/CreateGrid";
import Player from "../Player/Player";
import Info from "../Info/Info";
import "./Play.css";

const Play = (props) => {

  const {playerList,col,row,stopPlayer,whoWin,goHome,reset} = props

  const [nextTurn, setNextTurn] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if(stopPlayer[nextTurn]){                      //เช็คว่าplayer โดนหยุด 1รอบหรือไม่ ถ้าใช่ให้ + nextTurn ไปอีก1
      if(nextTurn<playerList.length-1){
        setNextTurn(nextTurn+1)
      }else{ setNextTurn(0)}
      dispatch({type:actionTypes.SET_STOP_TURN,index:nextTurn,method:false})  // reset ค่าโดนหยุด 1 รอบ
    }
  }, [stopPlayer,nextTurn])


  const player1Ref = useRef();
  const player2Ref = useRef();
  const player3Ref = useRef();
  const player4Ref = useRef();

  const selectPlayerRef =(index) =>{    //เลือก ref  ให้ player component
    switch (index) {
      case 0: return player1Ref
      case 1: return player2Ref
      case 2: return player3Ref
      case 3: return player4Ref
      default:return null
    }
  }
  const playerMove = (point)=>{       //  กำหนด ref การ move แต่ละ player
    switch (nextTurn) {
      case 0: return player1Ref.current.Dice(point)
      case 1: return player2Ref.current.Dice(point)
      case 2: return player3Ref.current.Dice(point)
      case 3: return player4Ref.current.Dice(point)
      default: return null
    }
  }
  const selectReset = (index)=>{        // กำหนด ref การ reset
    switch (index) {
      case 0: return player1Ref.current.reset()
      case 1: return player2Ref.current.reset()
      case 2: return player3Ref.current.reset()
      case 3: return player4Ref.current.reset()
      default: return null
    }
  }

  const queryPlayerTurn = (point) =>{         // กำหนด turn ของ player โดนรับค่า random มา
      const playerLength =playerList.length
      playerMove(point)
      if(nextTurn<playerLength-1){
        setNextTurn(nextTurn+1)
      }else{ setNextTurn(0)}
  }

  const playAgainHandler= ()=>{             // reset all
    dispatch({type:actionTypes.RESET})
    setNextTurn(0)
    for(let i=0 ; i<playerList.length;i++){
      selectReset(i)
    }
  }
 const goHomeHandler = () => {  //  Go home  and reset all
  playAgainHandler()
  goHome()
 }
 
 
  return (
    <div className="play__container">
      <Modal whoWin={whoWin} playerList={playerList} goHome={goHomeHandler} playAgain={playAgainHandler}/>
      <div className="squares__container">
        <CreateGrid col={col}  row={row} />
        {playerList.map((res,index)=>(
          <Player key={index} ref={selectPlayerRef(index)} col={col} row={row} index={index} name={res} reset={reset}/>
        ))}

      </div>

      <div className="playInfo__container">
        <Info playerList={playerList} diceHandler={queryPlayerTurn} nextTurn={nextTurn} goHome={goHomeHandler} restart={playAgainHandler} />
      </div>
    </div>
  );
};

const mapStateToProps = state =>{
  return{
    playerList:state.player,
    col:state.col,
    row:state.row,
    stopPlayer:state.stopPlayer,
    whoWin:state.whoWin,
  }
}


export default connect(mapStateToProps)(Play)
