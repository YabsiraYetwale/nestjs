import {DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_USER, LOGIN, SIGNUP, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'

export const signUp=(user:any,router:any,localActive:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.signUp(user)
        alert(data.message)
        dispatch({type:SIGNUP,payload:data})
        // router.push(`/${localActive}/sign-in`)
        dispatch({type:END_LOADING})
    } catch (error:any) {
        console.log(error)
        alert(error.response.data.message)
    }
}
export const activateAccount=(post:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.activateAccount(post)
        dispatch({type:LOGIN,payload:data})
        alert(data.message)
        
        dispatch({type:END_LOADING})
    } catch (error:any) {
        console.log(error)
        alert(error.response.data.message)
    }
}
export const signIn=(user:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.signIn(user)
        // localStorage.setItem('InvoiceAuth',JSON.stringify({data})) 
        dispatch({type:LOGIN,payload:data})
        if(data?.accessToken){
            alert(data.message)
            // router.push('/')
        }      
        dispatch({type:END_LOADING})
    } catch (error:any) {
        console.log(error)
        alert(error.response.data.message)
    }
}

export const forgotPassword=(email:String,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.forgotPassword(email)
        dispatch({type:LOGIN,payload:data})
        alert(data.message)
        
        dispatch({type:END_LOADING})
    } catch (error:any) {
        console.log(error)
        alert(error.response.data.message)
    }
}
export const resetPassword=(post:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.resetPassword(post)
        dispatch({type:LOGIN,payload:data})
        alert(data.message)
        
        dispatch({type:END_LOADING})
    } catch (error:any) {
        console.log(error)
        alert(error.response.data.message)
    }
}



export const fetchCurrentUser=()=>async(dispatch:any)=>{

    try {
     const {data}= await api.fetchCurrentUser()
       return data
    } catch (error) {
        console.log(error)
    }
}
export const fetchUsers=()=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchUsers()
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
        return data.allUsers
    } catch (error) {
        console.log(error)
    }
}
export const fetchUser=(id:String)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchUser(id)
        dispatch({type:FETCH,payload:data})
        dispatch({type:END_LOADING})
        return data.user
    } catch (error) {
        console.log(error)
    }
}
export const createUser=(user:any,router:any,localActive:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.addUser(user)
        alert(data.message)
        dispatch({type:SIGNUP,payload:data})
        router.push(`/${localActive}/users`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
        // alert('create user was not successful')
    }
}
export const updateUser=(id:String,user:any,router:any,localActive:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateUser(id,user)
        dispatch({type:UPDATE,payload:data})
        router.push(`/${localActive}/users/details/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteUser=(id:String,router:any,localActive:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        await api.deleteUser(id)
        dispatch({type:DELETE,payload:id})
        router.push(`/${localActive}/users`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}