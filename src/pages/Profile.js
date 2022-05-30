import React , {useEffect} from 'react'

import {useGlobalContext} from '../context'
import ProfileC from '../components/profile'
import Navigation from '../components/home/navigation'
export default function Profile() {
    const {loggIn} = useGlobalContext();

    useEffect(() => {
        if(localStorage.getItem("loggedUser")){
            loggIn(localStorage.getItem("loggedUser"));
        }
        
    }, []);
    return (
        <>
            <Navigation page="profile" />
            <ProfileC />
        </>
    )
}
