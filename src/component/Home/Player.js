import React from 'react'
import './Player.css'
import icon1 from "../../assets/Home-Setting/Player_1.svg";
import icon2 from "../../assets/Home-Setting/Player_2.svg";
import icon3 from "../../assets/Home-Setting/Player_3.svg";
import icon4 from "../../assets/Home-Setting/Player_4.svg";

const Player = ({playerName,index,deleteHandler}) => {

  const iconHandler = () => {
      switch (index) {
          case 0: return icon1
          case 1: return icon2
          case 2: return icon3
          case 3: return icon4
          default: return icon1
      }
      
  }
    return (
        <div className="playerIcon__container">

            <div className="delete_player">
               <p className="delete-button" onClick={()=>deleteHandler(index)} >x</p>
            </div>
            <div>

            <img src={iconHandler()} alt="player_icon" />
            <p>{playerName}</p>
            </div>
            
        </div>
    )
}

export default Player
