import {END_LOADING, LOGIN, LOGOUT, SIGNUP, START_LOADING } from "../actionTypes/index"

export const auths=(state={isLoading:true,auths:[]},action: { type: any; payload: any })=>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true}
        case END_LOADING:
            return {...state,isLoading:false}
        case SIGNUP:
            return {state,auths:[...state.auths,action.payload]}
        case LOGIN:
            localStorage.setItem('InvoiceAuth',JSON.stringify({...action.payload})) 
            return {state,auths:[...state.auths,action.payload]}
        case LOGOUT:
           localStorage.clear();
            return {state,auths:[...state.auths,null]}
        default:
            return state;
    }
}