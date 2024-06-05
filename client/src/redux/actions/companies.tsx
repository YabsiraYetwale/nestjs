import { CREATE, END_LOADING, FETCH_ALL, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
export const fetchCompanies=()=>async(dispatch:any)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.fetchCompanies()
        dispatch({type:FETCH_ALL,payload:data})
        dispatch({type:END_LOADING})
        return data.allCompanies
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