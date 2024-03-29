import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_BY_SEARCH, PAID, READ, START_LOADING, UNPAID, UPDATE } from "../actionTypes/index"

export const invoices=(state={isLoading:true,invoices:[]},action)=>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true}
        case END_LOADING:
            return {...state,isLoading:false}
        case CREATE:
        case FETCH_ALL:
        case FETCH:
        case FETCH_BY_SEARCH:
        case PAID:
        case UNPAID:
        case READ:
            return {...state,...action.payload}
        case UPDATE:
            return {...state,invoices:state?.invoices?.map((invoice)=>invoice?._id === action?.payload?._id ? action.payload : state)}
        case DELETE:
            return {...state,invoices:state.invoices.filter((invoice)=>invoice._id !== action.payload)}
        default:
            return state;
    }
}