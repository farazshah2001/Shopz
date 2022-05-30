import React from 'react'
import SignupC from '../components/signup'

import { useGlobalContext } from '../context';

export default function Signup() {
    // const {loggedIn} = useGlobalContext();
    // console.log("global context",loggedIn);
    return (
        <div>
            <SignupC />
        </div>
    )
}
