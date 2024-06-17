import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_BY_SEARCH, PAID, READ, START_LOADING, UNPAID, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
import {toast } from 'react-toastify';

export const fetchReciepts=()=>async(dispatch:any)=>{
    try {
        const {data}= await api.fetchReciepts()
        return data?.reciepts
    } catch (error) {
        console.log(error)
    }
}
export const fetchReciept=(id:any)=>async(dispatch:any)=>{
    try {
        const {data}= await api.fetchReciept(id)
        return data?.reciept
    } catch (error) {
        console.log(error)
    }
}


export const fetchRecieptsBySearch=(searchQuery:any,router:any)=>async(dispatch:any)=>{
  
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchRecieptsBySearch(searchQuery)
        
        if(searchQuery || data?.reciepts?.map((id:string)=>id)){
            
                router.push(`/dashboard/reciepts?searchQuery=${searchQuery}`)
        }
        if(!searchQuery){

            router.push(`/dashboard/reciepts`)
        }
       else if(data==="No matching reciepts found."){
            router.push(`/dashboard/reciepts/no-result`)
        }
       dispatch({type:END_LOADING})
       return data?.reciepts
    } catch (error) {
        console.log(error)
    }
}


export const updateRecieptTemplate=(id:String,reciept:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateInvoice(id,reciept)
        dispatch({type:UPDATE,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}



export const sendReciept=(id:any)=>async(dispatch:any)=>{
    try {
        const {data}= await api.sendInvoice(id)
        toast.success("reciept send successfully!");
    } catch (error) {
        console.log(error)
    }
}