import {END_LOADING, FETCH_ALL, FETCH_USER, LOGIN, SIGNUP, START_LOADING } from '../actionTypes/index'
import * as api from '../api/index'

export const signUp=(user,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.signUp(user)
        alert(data.message)
        dispatch({type:SIGNUP,payload:data})
        router.push('/sign-in')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
        alert('register was not successful')
    }
}
export const signIn=(user,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.signIn(user)
        localStorage.setItem('InvoiceAuth',JSON.stringify({data})) 
        dispatch({type:LOGIN,payload:data})
        if(data?.token){
            router.push('/')
        }
        else{
            alert (data?.message)   
         }
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
        alert('login was not successful')
    }
}


export const fetchCurrentUser=()=>async(dispatch)=>{

    try {
     const {data}= await api.fetchCurrentUser()
       return data
    } catch (error) {
        console.log(error)
    }
}
