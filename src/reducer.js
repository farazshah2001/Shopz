export  const  reducer = (state,action) => {
  
    if(action.type === "LOGGED_IN"){
        return({...state,loggedIn:action.payload})
    }
    if(action.type === "REVIEW_D_TOGGLE"){
        return({...state,reviewDisplay:action.payload})
    }
    if(action.type === "FETCH_ITEMS"){
        return({...state,items:action.payload})
    }
    if(action.type === "FETCH_CATEGORY"){
        return({...state,items:action.payload.data.filter((item)=>{
            if(action.payload.gender){
                if(action.payload.category){
                    return(item.description.category==action.payload.category && item.description.gender==action.payload.gender)
                }else{
                    return(item.description.gender==action.payload.gender)
                }
            }else if(action.payload.category){
                if(action.payload.ageGroup){
                    return(item.description.category==action.payload.category && item.description.ageGroup==action.payload.ageGroup)
                }else if(action.payload.color){
                    return(item.description.category==action.payload.category && item.description.color==action.payload.color)
                }
                else{
                    return(item.description.category==action.payload.category)
                }
            }else if(action.payload.ageGroup){
                if(action.payload.color){
                    return(item.description.ageGroup==action.payload.ageGroup && item.description.color==action.payload.color)
                }else{
                    return(item.description.ageGroup==action.payload.ageGroup)
                }
            }
        })})
    }
    if(action.type === "FETCH_USER"){
        return({...state,user:action.payload})
    }
    if(action.type === "FILTER_CATEGORY"){
        console.log("reducer function filter category",state.items);
        return({...state,items:state.items.filter((item)=>(item.description.category==action.payload))})
    }
    if(action.type === "FILTER_COLOR"){
        console.log("reducer function filter COLOR",state.items);
        return({...state,items:state.items.filter((item)=>(item.description.color==action.payload))})
    }
    if(action.type === "FILTER_AGE"){
        console.log("reducer function filter AGE",state.items);
        return({...state,items:state.items.filter((item)=>(item.description.ageGroup==action.payload))})
    }
    if(action.type === "FILTER_GENDER"){
        console.log("reducer function filter GEDER",state.items);
        return({...state,items:state.items.filter((item)=>(item.description.gender==action.payload))})
    }
    
    if(action.type === "SET_PROFILE_DISPLAY"){
        return({...state,profileDisplay:action.payload})
    }
   
    throw new Error('no matching action type');
}