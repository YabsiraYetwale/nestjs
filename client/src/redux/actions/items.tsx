import { CREATE, END_LOADING, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
export const createItem=(item:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createItem(item)
        dispatch({type:CREATE,payload:data})
        router.push('/invoices')
        console.log(data)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateItem=(id:String,item:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateItem(id,item)
        dispatch({type:UPDATE,payload:data})
        router.push('/')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateCompany=(id:String,company:any,router:any)=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.updateCompany(id,company)
        console.log('data',data)
        dispatch({type:UPDATE,payload:data})
        // router.push(`/invoices/template/${id}`)
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

