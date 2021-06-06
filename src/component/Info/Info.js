import React, { useState } from "react";
import {useDispatch,useSelector } from 'react-redux'

import * as actionTypes from '../../store/actionTypes'
import {selectPlayerMap,selectPlayerIcon} from '../utility';


import dice from "../../assets/Play/Dice.svg";
import "./Info.css";

const Info = (props) => {
    const {playerList,diceHandler,nextTurn} = props
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const history = useSelector(state => state.history)

    const [dicePoint, setDicePoint] = useState(0)

    const diceRandom =()=>{
        const point = Math.floor(Math.random() * 6) + 1;
        dispatch({type:actionTypes.SET_LOADING,method:true})
        setDicePoint(point)
        diceHandler(point)
    }
    const diceRandomTest =(point)=>{
        dispatch({type:actionTypes.SET_LOADING,method:true})
        setDicePoint(point)
        diceHandler(point)
    }
  return (
    <div className="info__container">
      <div className="info-header">
        <h3>{loading ? 'Waiting' : 'Your Turn !'}</h3>
        <img src={selectPlayerIcon(nextTurn)} alt="player-icon" className="info-img" />
        <p className="info-turnName">
          {`"  `}{playerList[nextTurn]} {`  "`}
        </p>
        <hr />
      </div>
      <div className="info-content">
        <p>History</p>
        <div className="info-history">
          <ul>
            {history.map((res,index)=>( <li key={index}>•  {res.name}: {res.point} point | {res.text}</li>))}
          </ul>
        </div>
        <p>player</p>
        <div className="player-info">
            {playerList.map((res,index)=>(

            <div key={index} className="player-detail">
                <img src={selectPlayerMap(index)} alt="" />
                <h6>{res}</h6>
            </div>
            ))}
           
        </div>
        <div className="player-action">
          <div className="info-point" >
            <p>Point</p>
            <div className="show-point">{dicePoint}</div>
          </div>
          
          <button onClick={diceRandom} className="play-action-button" disabled={loading} >
             <img  src={dice} alt="" className={loading ? 'dice-rotate' : null}  />
          </button>
        
          
        </div>
          <button onClick={()=>diceRandomTest(1)} >1</button>
          <button onClick={()=>diceRandomTest(2)} >2</button>
          <button onClick={()=>diceRandomTest(3)} >3</button>
          <button onClick={()=>diceRandomTest(4)} >4</button>
          <button onClick={()=>diceRandomTest(5)} >5</button>
          <button onClick={()=>diceRandomTest(6)} >6</button>
      </div>
    </div>
  );
};

export default Info;
