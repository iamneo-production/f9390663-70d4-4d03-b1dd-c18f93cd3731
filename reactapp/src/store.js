// import {createStore} from "redux"


// const reducer = (state={counter:0},action) => {
//     if(action.type === "INC"){
//         return {counter:state.counter+1}
//     }
   
//     return state;
// }
// const store=createStore(reducer);
// export default store;


import { createStore } from 'redux';

const initialState = {
  counter: 0,
  user: {} // The user object will hold the user details
};

const reducer = (state = initialState, action) => {
  if (action.type === 'INC') {
    return { ...state, counter: state.counter + 1 };
  }
  if (action.type === 'SET_USER') {
    return { ...state, user: action.payload };
  }
  return state;
};

const store = createStore(reducer);
export default store;


