import React, { useState, useRef, useEffect } from "react";

import CreateGrid from "../setup/CreateGrid";

import Dice from "../../assets/Play/Dice.svg";
import "./Play.css";
import Player1 from "../Player/Player1";
import Player2 from "../Player/Player2";
import Player3 from "../Player/Player3";
import Player4 from "../Player/Player4";

const Play = (props) => {
  const [col, setCol] = useState(5);
  const [row, setRow] = useState(7);

  const [queryPlayer, setQueryPlayer] = useState(1);

  const callbackRef1 = useRef();
  const callbackRef2 = useRef();
  const callbackRef3 = useRef();
  const callbackRef4 = useRef();

  const selectPlayer = () => {
    if (queryPlayer === 1) {
      callbackRef1.current();
      setQueryPlayer(queryPlayer + 1);
    }
    if (queryPlayer === 2) {
      callbackRef2.current();
      setQueryPlayer(queryPlayer + 1);
    }
    if (queryPlayer === 3) {
      callbackRef3.current();
      setQueryPlayer(queryPlayer + 1);
    }
    if (queryPlayer === 4) {
      callbackRef4.current();
      setQueryPlayer(1);
    }
  };

  const randomDice1 = (callback) => {
    callbackRef1.current = callback;
  };
  const randomDice2 = (callback) => {
    callbackRef2.current = callback;
  };
  const randomDice3 = (callback) => {
    callbackRef3.current = callback;
  };
  const randomDice4 = (callback) => {
    callbackRef4.current = callback;
  };

  return (
    <div className="app__container">
      <div className="squares__container">
        <CreateGrid col={col} row={row} />
        <Player1 randomDice={randomDice1} col={col} row={row} />
        <Player2 randomDice={randomDice2} col={col} row={row} />
        <Player3 randomDice={randomDice3} col={col} row={row} />
        <Player4 randomDice={randomDice4} col={col} row={row} />
      </div>

      <div>
        <h2>Your turn</h2>

        <div onClick={selectPlayer}>
          <img src={Dice} alt="dice" />
        </div>
      </div>
    </div>
  );
};

export default Play;
