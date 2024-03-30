// import {END_LOADING, FETCH_ALL, LOGIN, LOGOUT, SIGNUP, START_LOADING } from "../actionTypes/index"

// export const auths=(state={isLoading:true,auths:[]},action: { type: any; payload: any })=>{
//     switch (action.type) {
//         case START_LOADING:
//             return {...state,isLoading:true}
//         case END_LOADING:
//             return {...state,isLoading:false}
//         case SIGNUP:
//             return {state,auths:[...state.auths,action.payload]}
//         case FETCH_ALL:
//             return {...state.auths,...action.payload}
//         case LOGIN:
//             localStorage.setItem('InvoiceAuth',JSON.stringify({...action.payload})) 
//             return {state,auths:[...state.auths,action.payload]}
//         case LOGOUT:
//            localStorage.clear();
//             return {state,auths:[...state.auths,null]}
//         default:
//             return state;
//     }
// }
import { END_LOADING, FETCH_ALL, LOGIN, LOGOUT, SIGNUP, START_LOADING, FETCH_USER } from "../actionTypes/index";

const initialState = {
  isLoading: true,
  auths: [],
  currentUser: null,
};

export const auths = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case SIGNUP:
      return { ...state, auths: [...state.auths, action.payload] };
    case FETCH_ALL:
      return { ...state, auths: action.payload };
    case LOGIN:
      const { token, user } = action.payload;

      // Store the authentication token and user data in localStorage
      localStorage.setItem("InvoiceAuth", JSON.stringify({ token, user }));

      return { ...state, auths: [...state.auths, user] };
    case LOGOUT:
      localStorage.clear();
      return { ...state, auths: [null], currentUser: null };
    case FETCH_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
