import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import * as actionTypes from "../../store/actionTypes";
import Player from "./Player";
import Logo from "../../assets/Home-Setting/Logo.svg";

import "./Home.css";

const Home = (props) => {

  const { player, letPlay } = props;
  const dispatch = useDispatch();

  const [row, setRow] = useState(4);
  const [col, setCol] = useState(4);
  const [name, setName] = useState("");

  const configRow = (payload) => {
    if (payload > 7 && payload !== "") return setRow(7);
    if (payload < 4 && payload !== "") return setRow(4);
    return setRow(payload);
  };
  const configCol = (payload) => {
    if (payload > 7 && payload !== "") return setCol(7);
    if (payload < 4 && payload !== "") return setCol(4);
    return setCol(payload);
  };

  const letPlayHandler = () => {
    dispatch({ type: actionTypes.SETUP_BOARD,col:col,row:row });
    letPlay()
  }

  const addPlayerHandler = (e) => {
    e.preventDefault();
    const newPlayer = name.trim();
    if (newPlayer !== "") {
      dispatch({ type: actionTypes.ADD_PLAYER, newPlayer: newPlayer });
    }
    setName("");
  };

  const deleteHandler = (i) => {
    dispatch({ type: actionTypes.DELETE_PLAYER, indexPlayer: i });
  };

  return (
    <div className="home__container">
      <div className="header__container">
        <img src={Logo} alt="" />
        <p className="mt-3">Welcome !!</p>
        <h2 className="mb-2">Snakes Labs & ladders</h2>
      </div>
      <hr />
      <div className="input__container">
        <div>
          <label htmlFor="" className="form-label">
            Row(4-7)
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => configRow(e.target.value)}
            value={row}
          />
        </div>
        <div className="input__x">
          <p>X</p>
        </div>
        <div>
          <label htmlFor="" className="form-label">
            Column(4-7)
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => configCol(e.target.value)}
            value={col}
          />
        </div>
      </div>
      <div className="createPlayer__container">
        <form onSubmit={addPlayerHandler}>
          <label htmlFor="" className="form-label">
            Player (max 4 people)
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder={player.length === 4 ? "Max player" : "Enter name"}
              disabled={player.length === 4}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button
              type="submit"
              className="button button-add"
              disabled={player.length === 4}
            >
              +
            </button>
          </div>
        </form>
      </div>

      <div className="players__container">
        {player.map((res, index) => (
          <Player
            key={index}
            index={index}
            playerName={res}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <button
        className="button button-play"
        onClick={letPlayHandler}
        disabled={player.length <= 0}
      >
        Let's Play
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Home);
