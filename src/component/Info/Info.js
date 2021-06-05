import React, { useState } from "react";

import {selectPlayerMap,selectPlayerIcon} from '../utility';


import dice from "../../assets/Play/Dice.svg";
import "./Info.css";

const Info = (props) => {
    const {playerList,diceHandler,nextTurn} = props
    const [dicePoint, setDicePoint] = useState(0)

    const diceRandom =()=>{
        const point = Math.floor(Math.random() * 6) + 1;
        setDicePoint(point)
        diceHandler(point)
    }
  return (
    <div className="info__container">
      <div className="info-header">
        <h3>Your Turn !</h3>
        <img src={selectPlayerIcon(nextTurn)} alt="player-icon" className="info-img" />
        <p className="info-turnName">
          {`"  `}{playerList[nextTurn]} {`  "`}
        </p>
        <hr />
      </div>
      <div className="info-content">
        <p>History</p>
        <div className="info-history">
            
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
          <div className="info-point">
            <p>Point</p>
            <div className="show-point">{dicePoint}</div>
          </div>
          <img onClick={diceRandom} src={dice} alt="" className="player-action-img" />
        </div>
      </div>
    </div>
  );
};

export default Info;
