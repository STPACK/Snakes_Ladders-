import * as actionTypes from "./actionTypes";

const initialState = {
  player: ['pack','rat'],
  history:[],
  stopPlayer:[false,false,false,false],
  whoWin:null,
  reset:false,
  row: 4,
  col: 4,
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
const addHistory = (state, action) => {
  const oldHistory = state.history
  oldHistory.push({name:action.name,point:action.point,text:action.text})
  return {
    ...state,
    history:oldHistory
    
  };
};
const setStopTurn = (state, action) => {
  const oldStopPlayer = state.stopPlayer
  oldStopPlayer[action.index]=action.method
  return {
    ...state,
    stopPlayer:oldStopPlayer
  };
};
const reset = (state, action) => {
  return {
    ...state,
    history:[],
    stopPlayer:[false,false,false,false],
    whoWin:null,
    reset:true,
    loading: false,
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
    case actionTypes.SET_LOADING:
      return {...state,loading:action.method}
    case actionTypes.ADD_HISTORY:
      return addHistory(state,action)
    case actionTypes.SET_STOP_TURN:
      return setStopTurn(state,action)
    case actionTypes.SET_WHO_WIN:
      return {...state,whoWin:action.index}
    case actionTypes.RESET:
      return reset(state,action) 

    default:
      return state;
  }
};

export default reducer;
