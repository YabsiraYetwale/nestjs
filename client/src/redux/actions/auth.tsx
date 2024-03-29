import * as api from '../api'

export const signUp=(user,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.signUp(user)
        dispatch({type:"AUTH",payload:data})
        if(!data?.result){
            alert (data?.message)
        }
        else{
            navigate('/')
        }
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const signIn=(user,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.signIn(user)
        dispatch({type:"AUTH",payload:data})
        if(!data?.result){
            alert (data?.message)
        }
        else{
            navigate('/')
        }
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
