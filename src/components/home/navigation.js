import React  from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import {useGlobalContext} from '../../context'
export default function Navigation({page}) {
    const {loggedIn} = useGlobalContext();
    
    return (
        <>
        {/* <ul className="bg-blue-800 py-4 absolute top-0 flex  w-full justify-center md:justify-end ">
                <li className="z-10  sm:absolute sm:left-6  text-2xl md:text-3xl lg:text-5xl font-bold text-blue-900">Shopz</li>
{page == "home" ? loggedIn && <Link to="/profile"> <li className="z-10  text-xl md:text-2xl lg:text-4xl  mx-2 md:mx-8 border-2 border-blue-800 hover:border-white rounded-full px-2 md:py-2">Profile</li> </Link>  : 
                <Link to="/"> <li className="z-10  text-xl md:text-2xl lg:text-4xl  mx-2 md:mx-8 border-2 border-blue-800 hover:border-white rounded-full px-2 md:py-2">Home</li> </Link>   } 
{loggedIn && <Link to="/sell"><li className="z-10  text-xl md:text-2xl lg:text-4xl mx-2 md:mx-8 border-2 border-blue-800 hover:border-white rounded-full px-2 md:py-2">Sell</li> </Link>}      
                <Link to="/login"> <li className="z-10  text-xl md:text-2xl lg:text-4xl mx-2 md:mx-8 border-2 border-blue-800 hover:border-white rounded-full px-2 md:py-2">{loggedIn ? <p onClick={()=>{localStorage.setItem("loggedUser", "")}}>Logout</p> : <p>Login</p>}</li>    </Link>    
        </ul> */}


        <nav class="bg-red-600 border-gray-200 px-2 sm:px-4 py-2.5 ">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="" class="flex items-center">
        {/* <img src="/favicon.ico" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
        <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Mrtsnp</span>
    </a>
    <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
            {page == "home" ? loggedIn && <Link to="/profile"><a href="#" test-id='profile-link' class="hover:text-red-900 block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 ">Profile</a></Link>:
                 <Link to="/"><a href="#" test-id='home-link' class="hover:text-red-900 block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 ">Home</a></Link>
            }
        </li>
        <li>
           {loggedIn && <Link to="/sell"><a test-id='sell-link' href="#" class=" hover:text-red-900 block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 ">Sell</a></Link>}
        </li>
        <li>
          <Link to="login"><a href="#" test-id='login-link' class=" hover:text-red-900 block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 ">{loggedIn ? <p onClick={()=>{localStorage.setItem("loggedUser", "")}}>Logout</p> : <p>Login</p>}</a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>        
        </>
    )
}
