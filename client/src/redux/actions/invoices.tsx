import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_BY_SEARCH, PAID, READ, START_LOADING, UNPAID, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
import {toast } from 'react-toastify';

export const createInvoice=(invoice:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createInvoice(invoice)
        dispatch({type:CREATE,payload:data})
        // router.push('/invoices')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchInvoices=()=>async(dispatch:any)=>{
    try {
        const {data}= await api.fetchInvoices()
        return data?.invoices
    } catch (error) {
        console.log(error)
    }
}
export const fetchInvoice=(id:any)=>async(dispatch:any)=>{
    try {
        const {data}= await api.fetchInvoice(id)
        return data.invoice
    } catch (error) {
        console.log(error)
    }
}


export const fetchInvoicesBySearch=(searchQuery:any,router:any)=>async(dispatch:any)=>{
  
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchInvoicesBySearch(searchQuery)
        
        if(searchQuery || data?.invoices?.map((id:string)=>id)){
            
                router.push(`/dashboard/invoices?searchQuery=${searchQuery}`)
        }
        if(!searchQuery){

            router.push(`/dashboard/invoices`)
        }
       else if(data==="No matching invoices found."){
            router.push(`/dashboard/invoices/no-result`)
        }
       dispatch({type:END_LOADING})
       return data?.invoices
    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusPaid=(id:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusPaid(id)
        dispatch({type:PAID,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusUnPaid=(id:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusUnPaid(id)
        dispatch({type:UNPAID,payload:data})
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusRead=(id:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusRead(id)
        dispatch({type:READ,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateInvoice=(id:String,invoice:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateInvoice(id,invoice)
        dispatch({type:UPDATE,payload:data})
        router.push(`/dashboard/invoices/details/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateInvoiceTemplate=(id:String,invoice:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateInvoice(id,invoice)
        dispatch({type:UPDATE,payload:data})
        // router.push(`/invoices/template/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteInvoice=(id:String,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        await api.deleteInvoice(id)
        dispatch({type:DELETE,payload:id})
        router.push(`/dashboard/invoices`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}


export const sendInvoice=(id:any)=>async(dispatch:any)=>{
    try {
        const {data}= await api.sendInvoice(id)
        toast.success("email send successfully!");
    } catch (error) {
        console.log(error)
    }
}