import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL , START_LOADING, UPDATE } from "../actionTypes/index"

export const items=(state={isLoading:true,items:[]},action:any)=>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true}
        case END_LOADING:
            return {...state,isLoading:false}
        case CREATE:
        case FETCH_ALL:
        case FETCH:
            return {...state,...action.payload}
        case UPDATE:
            return {...state,items:state?.items?.map((item)=>item?.id === action?.payload?.id ? action.payload : state)}
        case DELETE:
            return {...state,items:state.items.filter((item)=>item.id !== action.payload)}
        default:
            return state;
    }
}