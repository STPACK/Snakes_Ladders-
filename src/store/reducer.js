import * as actionTypes from "./actionTypes";

const initialState = {
  player: ['pack','rat'],
  row: 7,
  col: 7,
  loading: false,
};
const addPlayer = (state, action) => {
  const newPlayer = state.player;
  newPlayer.push(action.newPlayer);
  return {
    ...state,
    player: newPlayer,
  };
};
const deletePlayer = (state, action) => {
  const oldPlayer = state.player;
  const newPlayer = oldPlayer.filter(
    (oldPlayer, index) => index !== action.indexPlayer
  );
  return {
    ...state,
    player: newPlayer,
  };
};

const setupBoard = (state, action) => {
  return {
    ...state,
    col: action.col,
    row: action.row,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      return addPlayer(state, action);
    case actionTypes.DELETE_PLAYER:
      return deletePlayer(state, action);
    case actionTypes.SETUP_BOARD:
      return setupBoard(state,action)

    default:
      return state;
  }
};

export default reducer;
