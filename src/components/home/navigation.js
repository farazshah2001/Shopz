import React  from 'react'
import {useHistory,Link} from 'react-router-dom'

import {useGlobalContext} from '../../context'
export default function Navigation({page}) {
    const {loggedIn} = useGlobalContext();
    
    return (
        <ul className="bg-pink-300 py-4 absolute top-0 flex  w-full justify-center md:justify-end ">
                <li className="z-10  sm:absolute sm:left-6  text-2xl md:text-3xl lg:text-5xl font-bold text-pink-600">Shopz</li>
{page == "home" ? loggedIn && <Link to="/profile"> <li className="z-10  text-xl md:text-2xl lg:text-4xl  mx-2 md:mx-8 border-2 border-pink-800 hover:border-white rounded-full px-2 md:py-2">Profile</li> </Link>  : 
                <Link to="/"> <li className="z-10  text-xl md:text-2xl lg:text-4xl  mx-2 md:mx-8 border-2 border-pink-800 hover:border-white rounded-full px-2 md:py-2">Home</li> </Link>   } 
{loggedIn && <Link to="/sell"><li className="z-10  text-xl md:text-2xl lg:text-4xl mx-2 md:mx-8 border-2 border-pink-800 hover:border-white rounded-full px-2 md:py-2">Sell</li> </Link>}      
                <Link to="/login"> <li className="z-10  text-xl md:text-2xl lg:text-4xl mx-2 md:mx-8 border-2 border-pink-800 hover:border-white rounded-full px-2 md:py-2">{loggedIn ? <p onClick={()=>{localStorage.setItem("loggedUser", "")}}>Logout</p> : <p>Login</p>}</li>    </Link>    
        </ul>
    )
}
