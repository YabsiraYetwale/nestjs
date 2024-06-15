import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, START_LOADING, UPDATE } from "../actionTypes/index"

type props ={
    id:string
}
export const customers=(state={isLoading:true,customers:[]},action:any)=>{
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
            return {...state,customers:state?.customers?.map((customer:props)=>customer?.id === action?.payload?.id ? action.payload : state)}
        case DELETE:
            return {...state,customers:state.customers.filter((customer:props)=>customer.id !== action.payload)}
        default:
            return state;
    }
}