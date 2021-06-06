import React, { useState } from "react";
import {useDispatch,useSelector } from 'react-redux'

import * as actionTypes from '../../store/actionTypes'
import {selectPlayerMap,selectPlayerIcon} from '../utility';
import dice from "../../assets/Play/Dice.svg";
import settingIcon from '../../assets/Play/Setting.svg'
import stop from "../../assets/Play/stop.svg";
import Next from "../../assets/Play/Next.svg";
import Home from "../../assets/Play/MoveFromStart.svg";
import finish from "../../assets/Play/Finish.svg";
import "./Info.css";

const Info = (props) => {
    const {playerList,diceHandler,nextTurn,restart,goHome} = props
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const history = useSelector(state => state.history)

    const [dicePoint, setDicePoint] = useState(0)

    const diceRandom =()=>{                   // random และส่งค่าไป component แม่ เพื่อหา turn
        const point = Math.floor(Math.random() * 6) + 1;
        dispatch({type:actionTypes.SET_LOADING,method:true})
        setDicePoint(point)
        diceHandler(point)
    }
    // const diceRandomTest =(point)=>{   เอาไว้ เทส
    //     dispatch({type:actionTypes.SET_LOADING,method:true})
    //     setDicePoint(point)
    //     diceHandler(point)
    // }
  return (
    <div className="info__container">
      <div className="info-header">
        <div className="info-header-dropdown">
        <h3>{loading ? 'Waiting' : 'Your Turn !'}</h3>
        <div className="dropdown  info-dropdown">
          <button className="setting-button " type="button" id="dropdown1" data-bs-toggle="dropdown" >
            <img src={settingIcon} alt="" />
          </button>
          <ul className="dropdown-menu  " aria-labelledby="dropdown1">
            <li className="dropdown-item" onClick={restart}>Restart</li>
            <li className="dropdown-item" onClick={goHome}>Go To Homepage</li>
        
          </ul>
      </div>
        </div>
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
            {history.map((res,index)=>( <li key={index}>•  {res.name}:{res.point !==0 ? res.point+' point' : '  '}   | {res.text}</li>))}
          </ul>
        </div>
        <p>player</p>
        <div className="player-info">
            {playerList.map((res,index)=>(

            <div key={index} className="player-detail">
                <img src={selectPlayerMap(index)} alt="" />
                <p>{res}</p>
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
        <div className="special-info ">
            <div  className="special-detail">
                <img src={stop} alt="" />
                <p>หยุดเดิน1ตา</p>
            </div>
            <div  className=" special-detail">
                <img src={Next} alt="" />
                <p>ไปข้างหน้า3ช่อง</p>
            </div>
            <div  className="special-detail">
                <img src={Home} alt="" />
                <p>กลับจุดเริ่มต้น</p>
            </div>
        </div>           
          {/* <button onClick={()=>diceRandomTest(1)} >1</button>   เอาไว้test 
          <button onClick={()=>diceRandomTest(2)} >2</button>
          <button onClick={()=>diceRandomTest(3)} >3</button>
          <button onClick={()=>diceRandomTest(4)} >4</button>
          <button onClick={()=>diceRandomTest(5)} >5</button>
          <button onClick={()=>diceRandomTest(6)} >6</button> */} 
      </div>
    </div>
  );
};

export default Info;
