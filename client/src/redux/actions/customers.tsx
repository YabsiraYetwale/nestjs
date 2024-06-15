import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'

export const createCustomer=(customer:any,router:any,localActive:any)=>async(dispatch:any)=>{

    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createCustomer(customer)
        dispatch({type:CREATE,payload:data})
        router.push(`/dashboard/customers`)
        console.log(data)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchCustomers=(searchQuery:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCustomers(searchQuery)
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
        // console.log(data.allClients)
        return data.clients
    } catch (error) {
        console.log(error)
    }
}
export const fetchCustomersBySearch=(searchQuery:any,router:any,localActive:any)=>async(dispatch:any)=>{

    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCustomers(searchQuery)
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
        if(searchQuery || data.clients.map((id:string)=>id)){
            router.push(`/dashboard/customers?searchQuery=${searchQuery}`)
        }
        if(!searchQuery){
            router.push(`/dashboard/customers`)
        }
       else if(data==="No matching clients found."){
            router.push(`/dashboard/customers/no-result`)
        }
        return data.clients
    } catch (error) {
        console.log(error)
    }
}
export const fetchCustomer=(id:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCustomer(id)
        dispatch({type:FETCH,payload:data})
        dispatch({type:END_LOADING})
        return data.client
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomer=(id:String,customer:any,router:any,localActive:any)=>async(dispatch:any)=>{

    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateCustomer(id,customer)
        dispatch({type:UPDATE,payload:data})
        router.push(`/dashboard/customers/details/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomerTemplate=(id:String,customer:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateCustomer(id,customer)
        console.log(data)
        dispatch({type:UPDATE,payload:data})
        // router.push(`/customers/details/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteCustomer=(id:String,router:any,localActive:any)=>async(dispatch:any)=>{

    try {
        dispatch({type:START_LOADING})
        await api.deleteCustomer(id)
        dispatch({type:DELETE,payload:id})
        router.push(`/dashboard/customers`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
