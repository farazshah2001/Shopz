import React , {useEffect} from 'react'

import {useGlobalContext} from '../context'
import Categories from '../components/home/categories'
import Filter from '../components/home/filter'
import Items from '../components/home/items'
import Navigation from '../components/home/navigation'
export default function Home() {
    const {loggIn} = useGlobalContext();
    useEffect(() => {
        if(localStorage.getItem("loggedUser")){
            loggIn(localStorage.getItem("loggedUser"));
        }
    }, []);
    return (
        <>
         <Navigation page="home" />
         <Categories />
            <div className=" "><Filter /> </div>
            <div className='px-4'>

            <h1 className="text-2xl text-red-600 font-semibold md:border-b-4 border-red-600 mb-4 ">Select your Item</h1>
            </div>
            <div className=""><Items /></div>
         
           
        </>
    )
}
