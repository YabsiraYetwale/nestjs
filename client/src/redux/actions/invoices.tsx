import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, FETCH_BY_SEARCH, PAID, READ, START_LOADING, UNPAID, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
export const createInvoice=(invoice,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createInvoice(invoice)
        dispatch({type:CREATE,payload:data})
        // router.push('/')
        console.log(data)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchInvoices=()=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchInvoices()
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchInvoice=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchInvoice(id)
        dispatch({type:FETCH,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const fetchInvoicesBySearch=(searchQuery,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchInvoicesBySearch(searchQuery)
        // const title= data.Invoices.map(Invoice=>(Invoice.title))
        // if(title?.length){ 
        //    dispatch({type:FETCH_BY_SEARCH,payload:data})
        //    router.push(`/invoices/search?searchQuery=${searchQuery}`) 
        // }
        // else{
        //     router.push(`/invoices/search/no_result`) 
        // }
       dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusPaid=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusPaid(id)
        dispatch({type:PAID,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusUnPaid=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusUnPaid(id)
        dispatch({type:UNPAID,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const markInvoiceStatusRead=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.markInvoiceStatusRead(id)
        dispatch({type:READ,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateInvoice=(id,invoice,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateInvoice(id,invoice)
        dispatch({type:UPDATE,payload:data})
        router.push('/')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteInvoice=(id,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        await api.deleteInvoice(id)
        dispatch({type:DELETE,payload:id})
        router.push('/')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
