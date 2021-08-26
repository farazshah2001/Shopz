import React , {useEffect} from 'react'

import {useGlobalContext} from '../context'
import SellC from '../components/sell'
export default function Sell() {
    const {loggIn} = useGlobalContext();

    useEffect(() => {
        if(localStorage.getItem("loggedUser")){
            loggIn(localStorage.getItem("loggedUser"));
        }
        
    }, []);
    return (
        <div>
            <SellC />
        </div>
    )
}
