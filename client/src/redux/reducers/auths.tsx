export const auths=(state={isLoading:true,auths:[]},action)=>{
    switch (action.type) {
        case "START_LOADING":
            return {...state,isLoading:true}
        case "END_LOADING":
            return {...state,isLoading:false}
        case "AUTH":
            localStorage.setItem('profile',JSON.stringify({...action.payload})) 
            return {state,auths:[...state.auths,action.payload]}
        case "LOGOUT":
           localStorage.clear();
            return {state,auths:[...state.auths,null]}
        default:
            return state;
    }
}