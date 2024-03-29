import { CREATE, DELETE, END_LOADING, FETCH, FETCH_ALL, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api'
export const createCustomer=(customer,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createCustomer(customer)
        dispatch({type:CREATE,payload:data})
        navigate('/')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchCustomers=()=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCustomers()
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const fetchCustomer=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCustomer(id)
        dispatch({type:FETCH,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomer=(id,customer,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateCustomer(id,customer)
        dispatch({type:UPDATE,payload:data})
        navigate('/dashboard')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const deleteCustomer=(id,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        await api.deleteCustomer(id)
        dispatch({type:DELETE,payload:id})
        navigate('/dashboard')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
