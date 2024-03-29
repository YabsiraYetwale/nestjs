import * as api from '../api'
export const createTour=(tour,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.createTour(tour)
        dispatch({type:"CREATE",payload:data})
        navigate('/')
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const fetchTours=()=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.fetchTours()
        dispatch({type:"FETCH_ALL",payload:data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const fetchTour=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.fetchTour(id)
        dispatch({type:"FETCH",payload:data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const fetchTourByUser=(userId,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.fetchTourByUser(userId)
        if (data?.tours?.length === 0){
            navigate(`/dashboard/no_result`) 
        }
        dispatch({type:"FETCH_BY_USER",payload:data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const fetchTourBySearch=(searchQuery,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.fetchTourBySearch(searchQuery)
        const title= data.tours.map(tour=>(tour.title))
        if(title?.length){ 
           dispatch({type:"SEARCH",payload:data})
           navigate(`/tours/search?searchQuery=${searchQuery}`) 
        }
        else{
            navigate(`/tours/search/no_result`) 
        }
       dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const updateTour=(id,tour,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.updateTour(id,tour)
        dispatch({type:"UPDATE",payload:data})
        navigate('/dashboard')
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const deleteTour=(id,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        await api.deleteTour(id)
        dispatch({type:"DELETE",payload:id})
        navigate('/dashboard')
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const likeTour=(id,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.likeTour(id)
        dispatch({type:"LIKE",payload:data})
        navigate('/')
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const commentTour=(id,comment,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        const {data}= await api.commentTour(id,comment)
        dispatch({type:"COMMENT",payload:data})
        navigate(`/tour/${id}`)
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}