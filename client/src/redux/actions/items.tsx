import { CREATE, END_LOADING, START_LOADING, UPDATE } from '../actionTypes/index'
import * as api from '../api/index'
export const createItem=(item,router)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}= await api.createItem(item)
        dispatch({type:CREATE,payload:data})
        router.push('/')
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error)
    }
}
export const updateItem=(id,item,router)=>async(dispatch)=>{
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

