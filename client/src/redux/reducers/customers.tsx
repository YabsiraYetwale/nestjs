export const tours=(state={isLoading:true,tours:[]},action)=>{
    switch (action.type) {
        case "START_LOADING":
            return {...state,isLoading:true}
        case "END_LOADING":
            return {...state,isLoading:false}
        case "CREATE":
        case "FETCH_ALL":
        case "FETCH_BY_USER":
        case "FETCH":
        case "SEARCH":
            return {...state,...action.payload}
        case "COMMENT":
            return {...state,...action.payload}
        case "UPDATE":
        case "LIKE":
            return {...state,tours:state?.tours?.map((tour)=>tour?._id === action?.payload?._id ? action.payload : state)}
        case "DELETE":
            return {...state,tours:state.tours.filter((tour)=>tour._id !== action.payload)}
        default:
            return state;
    }
}