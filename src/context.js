import React , {useContext,useReducer} from 'react'
import axios from 'axios'
import {reducer} from './reducer'

const AppContext = React.createContext();
let initialState = {
    user:null,
    loggedIn : false,
    items : [],
    profileDisplay:"profile",
    reviewDisplay:false
};

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
   
    const loggIn =  (id) => {
        dispatch({ type: 'LOGGED_IN', payload: id })
    }
    const reviewDToggle =  (display) => {
        dispatch({ type: 'REVIEW_D_TOGGLE', payload: display })
    } 
    const fetchItems = async () => {
        const itemsResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/items`,
            method:"get"
        });
        dispatch({ type: 'FETCH_ITEMS', payload: itemsResult.data})
    }
    const fetchCategory = async (category,gender,ageGroup,color) => {
        const itemsResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/items`,
            method:"get"
        });
        dispatch({ type: 'FETCH_CATEGORY', payload: {data:itemsResult.data,category,gender,ageGroup,color}})
    }
    const fetchUser = async () => {
        // const userResult =  await axios({
        //     url:`http://localhost:5000/users/${state.loggedIn}`,
        //     method:"get"
        // });
        const userResult =  await axios({
            url:`${process.env.REACT_APP_BACKEND_SERVER}users/${localStorage.getItem("loggedUser")}`,
            method:"get"
        });
        
        dispatch({ type: 'FETCH_USER', payload: userResult.data})
    }
    const filterCategory = async (category) => {
        dispatch({ type: 'FILTER_CATEGORY', payload: category})
    }
    const filterColor = async (color) => {
        dispatch({ type: 'FILTER_COLOR', payload: color})
    }
    const filterAge = async (age) => {
        dispatch({ type: 'FILTER_AGE', payload: age})
    }
    const filterGender = async (gender) => {
        dispatch({ type: 'FILTER_GENDER', payload: gender})
    }
   
    
    const setProfileDisplay = async (display) => {
        dispatch({ type:'SET_PROFILE_DISPLAY', payload: display})
    }
    
    return(
        <AppContext.Provider value={{...state,loggIn,fetchItems,fetchCategory,
            filterCategory,filterColor,filterAge,filterGender,setProfileDisplay,fetchUser,reviewDToggle
        }}>{children}</AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}