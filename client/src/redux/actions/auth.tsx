import {DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_USER, LOGIN, SIGNUP, START_LOADING, UPDATE } from '../actionTypes/index'
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
export const fetchUsers=()=>async(dispatch)=>{
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
export const fetchUser=(id)=>async(dispatch)=>{
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
export const createUser=(user,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.signUp(user)
        alert(data.message)
        dispatch({type:SIGNUP,payload:data})
        router.push('/users')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
        // alert('create user was not successful')
    }
}
export const updateUser=(id,user,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateUser(id,user)
        dispatch({type:UPDATE,payload:data})
        router.push(`/users/details/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteUser=(id,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        await api.deleteUser(id)
        dispatch({type:DELETE,payload:id})
        router.push('/users')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}