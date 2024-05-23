import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, START_LOADING, UPDATE } from "../actionTypes/index"

type props ={
    id:string
}
export const clients=(state={isLoading:true,clients:[]},action:any)=>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading:true}
        case END_LOADING:
            return {...state,isLoading:false}
        case CREATE:
        case FETCH_ALL:
        case FETCH:
            console.log("CREATE")
            return {...state,...action.payload}
        case UPDATE:
            return {...state,clients:state?.clients?.map((client:props)=>client?.id === action?.payload?.id ? action.payload : state)}
        case DELETE:
            return {...state,clients:state.clients.filter((client:props)=>client.id !== action.payload)}
        default:
            return state;
    }
}