import React, { useState, useRef } from "react";
import {connect} from 'react-redux'

import CreateGrid from "../setup/CreateGrid";
import TestPlayer from "../Player/TestPlayer";
import TestPlayer2 from "../Player/TestPlayer2";
import Info from "../Info/Info";

import "./Play.css";


const Play = (props) => {

  const {playerList,col,row} = props
  const [nextTurn, setNextTurn] = useState(0)

  const player1Ref = useRef();
  const player2Ref = useRef();
  const player3Ref = useRef();
  const player4Ref = useRef();

  const selectPlayerRef =(index) =>{
    switch (index) {
      case 0: return player1Ref
      case 1: return player2Ref
      case 2: return player3Ref
      case 3: return player4Ref
      default:return null
    }
  }

  const queryPlayerTurn = (point) =>{
      const playerLength =playerList.length
      console.log("point = "+point);
      playerMove(point)
      if(nextTurn<playerLength-1){
        setNextTurn(nextTurn+1)
      }else{ setNextTurn(0)}
  }

  const playerMove = (point)=>{
    switch (nextTurn) {
      case 0: return player1Ref.current.Dice(point)
      case 1: return player2Ref.current.Dice(point)
      case 2: return player3Ref.current.Dice(point)
      case 3: return player4Ref.current.Dice(point)
      default: return null
    }
  }
 

  return (
    <div className="play__container">
      <div className="squares__container">
        <CreateGrid col={col}  row={row} />
        {playerList.map((res,index)=>(
          <TestPlayer2 key={index} ref={selectPlayerRef(index)} col={col} row={row} index={index} name={res}/>
        ))}

      </div>

      <div className="playInfo__container">
        <Info playerList={playerList} diceHandler={queryPlayerTurn} nextTurn={nextTurn} />
        
        <button onClick={()=>player1Ref.current.Dice(1)}>1</button>
        <button onClick={()=>player1Ref.current.Dice(2)}>2</button>
        <button onClick={()=>player1Ref.current.Dice(3)}>3</button>
        <button onClick={()=>player1Ref.current.Dice(4)}>4</button>
        <button onClick={()=>player1Ref.current.Dice(5)}>5</button>
        <button onClick={()=>player1Ref.current.Dice(6)}>6</button>
        <br />
        <button onClick={()=>player2Ref.current.Dice(1)}>1</button>
        <button onClick={()=>player2Ref.current.Dice(2)}>2</button>
        <button onClick={()=>player2Ref.current.Dice(3)}>3</button>
        <button onClick={()=>player2Ref.current.Dice(4)}>4</button>
        <button onClick={()=>player2Ref.current.Dice(5)}>5</button>
        <button onClick={()=>player2Ref.current.Dice(6)}>6</button>
      </div>
    </div>
  );
};

const mapStateToProps = state =>{
  return{
    playerList:state.player,
    col:state.col,
    row:state.row
  }
}


export default connect(mapStateToProps)(Play)
