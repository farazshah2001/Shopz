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
         <div className="lg:grid lg:grid-cols-10 mt-4">
            <div className="lg:col-span-2"><Filter /> </div>
            <div className="lg:col-span-8"><Items /></div>
         </div>
         
           
        </>
    )
}
