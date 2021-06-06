import React from "react";

import { selectPlayerIcon } from "../utility";
import winner from "../../assets/Winner.svg";
import "./modal.css";

const Modal = ({ whoWin,playerList,playAgain,goHome }) => {

  return (
    <>
      {whoWin !== null && (
        <div className="backDrop__container">
          <div className="modal__container"  style={{
                    transform:whoWin !== null ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: whoWin !== null? '1':'0'
                }}>
            <img className="modal-player-winner mb-3" src={winner} alt="" />
            <h2>The winner</h2>
            <img
              className="modal-player-icon mt-4 mb-4"
              src={selectPlayerIcon(whoWin)}
              alt="player-icon"
            />
            <h2 style={{ color: "black", fontWeight: "700" }}>{`" ${playerList[whoWin]} "`}</h2>
            <div className="modal-action mt-5">
              <button onClick={playAgain} className="button__playAgain">Play Again</button>
              <button onClick={goHome} className="button__goHome">Go Home</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
