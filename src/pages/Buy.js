import React , {useEffect} from 'react'

import {useGlobalContext} from '../context'
import Payment from '../components/payment';
export default function Buy() {
    const {loggIn} = useGlobalContext();

    useEffect(() => {
        if(localStorage.getItem("loggedUser"))
        loggIn(localStorage.getItem("loggedUser"));
    }, []);
    return (
        <div>
            <Payment />
        </div>
    )
}
