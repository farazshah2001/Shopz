import React , {useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useGlobalContext} from '../context'
export default function Profile() {
    const history = useHistory();

    const {profileDisplay} = useGlobalContext();
    const user = JSON.parse(localStorage.getItem("user"));
    const {fetchUser} = useGlobalContext();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        console.log("user changing , loading : ",loading);
        if(user){
            setloading(false);
        }else{
            setloading(true);
            fetchUser();
        }
    }, [user]);
    
    useEffect(() => {
		if (!localStorage.getItem("loggedUser")) {
		  history.push("/");
		}
    },[]);
    return (
        <div className="h-screen bg-gray-100 mt-20">
               {
                    loading && <h1 className="text-7xl text-black text-center mt-36">Loading..</h1> 
               }
               {
                   !loading && profileDisplay == "profile" ? <Display />:<div></div>
               }
               {
                    !loading && profileDisplay == "pass" ? <ChangePassword />:<div></div>
               }
               {
                    !loading && profileDisplay == "address" ? <Address />:<div></div>
               } 
        </div>
    )
}

function Display() {
    const {setProfileDisplay} = useGlobalContext();
    const {fetchUser} = useGlobalContext();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
    console.log("logged in user info",user);
    useEffect(() => {
        fetchUser();
    }, []);
    const deleteAddress = async (addrId) => {
        console.log("address id : ",addrId);
        const addressRemoveResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/users/${user._id}/deleteAddress`,
            method:"post",
            data:{
                id:addrId
            }
        });
        console.log("address deleted from user : ",addressRemoveResult);
        const deleteaddrResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/addresses/delete`,
            method:"post",
            data:{
                id:addrId
            }
        });
        const userResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/users/${user._id}`,
            method:"get"
        });
        localStorage.setItem("user",JSON.stringify(userResult.data));
        setuser(JSON.parse(localStorage.getItem("user")));
        console.log("address deleted from db : ",deleteaddrResult);
    }
    return (
        
        <div className="w-full pt-4  bg-white shadow-lg ">
        <div className=" grid grid-cols-4 px-12">
            <div className="col-span-1 md:col-span-2 space-y-12">
                <p className="text-gray-600 text-xl text-semibold">Name</p>
                <p className="text-gray-600 text-xl text-semibold">Email</p>
                <p className="text-gray-600 text-xl text-semibold">Password</p>
                <p className="text-gray-600 text-xl text-semibold">Addresses</p>
            </div>
            <div className="col-span-3 md:col-span-2 space-y-12">
                <p className="text-2xl font-semibold">{user.name}</p>
                <p className="text-xl md:text-2xl font-semibold">{user.email}</p>
                <p className="text-2xl font-semibold">{user.password}</p>
                <div className="w-11/12 md:w-3/4 p-2 md:p-8 border border-gray-900 divide-y divide-gray-900">
                    {
                    user.addresses &&    user.addresses.map((addr)=>{
                        return(
                            <div className='px-12'>
                                <div className=" grid grid-cols-4 mt-4 py-4  m-y-2 ">
                                    <div className="col-span-2 space-y-5">
                                        <p className="text-gray-600 text-xl text-semibold">House</p>
                                        <p  className="text-gray-600 text-xl text-semibold">Street</p>
                                        <p  className="text-gray-600 text-xl text-semibold">Area</p>
                                        <p  className="text-gray-600 text-xl text-semibold">City</p>
                                        <p  className="text-gray-600 text-xl text-semibold">Country</p>
                                    </div>
                                    <div className="col-span-2 space-y-4">
                                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">{addr.house}</p>
                                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">{addr.street}</p>
                                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">{addr.area}</p>
                                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">{addr.city}</p>
                                        <p  className="text-gray-800 text-xl md:text-2xl font-semibold">{addr.country}</p>
                                    </div>
                                </div>
                                <div onClick={()=>{deleteAddress(addr._id)}} className="flex justify-center"><button className="w-16 h-12 my-4 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded">Delete</button></div>
                                
                            </div>
                                
                        )
                        })
                    }
                    
                </div>
            </div>
        </div>
        <div className="flex justify-center">
            <button onClick={()=>{setProfileDisplay("pass")}} className="mx-4 h-16 bg-gray-900 hover:bg-gray-900 text-white rounded my-8 px-4 hover:shadow-xl">Change Password</button>
            <button onClick={()=>{setProfileDisplay("address")}} className="mx-4 h-16 bg-gray-900 hover:bg-gray-900 text-white rounded my-8 px-4 hover:shadow-xl">Add Address</button>
        </div>
        </div>
    )
}


 function ChangePassword() {
    const {setProfileDisplay} = useGlobalContext();
    const {loggedIn} = useGlobalContext();

    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
    const [oldpass, setoldpass] = useState("");
    const [newpass, setnewpass] = useState("");
    const [oldpassError, setoldpassError] = useState("none");
    const [newpassError, setnewpassError] = useState(false);
    const onoldpassChange = (e) => {
        setoldpass(e.target.value);
    }
    const onnewpassChange = (e) => {
        setnewpassError(false);
        setnewpass(e.target.value);
    }
    const checkoldPas = () => {
        if(user.password != oldpass){
            setoldpassError(true);
        }else{
            setoldpassError(false);
        }
    }

    const changePassword = async () => {
        
        if(!newpass){
            setnewpassError(true);
        }else{
            const changePassResult =  await axios({
                url:`https://shopz-express-rest-api.herokuapp.com/users/update`,
                method:"post",
                data:{
                    _id:loggedIn,
                    password:newpass
                }
            });
            console.log("pass change result",changePassResult);
            const userResult =  await axios({
                url:`https://shopz-express-rest-api.herokuapp.com/users/${user._id}`,
                method:"get"
            });
            localStorage.setItem("user",JSON.stringify(userResult.data));
            setProfileDisplay("profile");
        }
    }
    return (

        <div className="flex justify-center">
            <div className=" mt-12 bg-white shadow-lg w-11/12 md:w-3/4 p-2 md:p-8 border border-pink-300">
                <div className=" grid grid-cols-4 ">
                    <div className="col-span-2 space-y-16">
                        <p className="text-gray-600 text-xl text-semibold">Old password</p>
                        <p  className="text-gray-600 text-xl text-semibold">New password</p>
                    </div>
                    <div className=" col-span-2 space-y-4">
                        <div>
                            <input onBlur={checkoldPas} value={oldpass} onChange={onoldpassChange} className={`w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400 ${oldpassError == true ? "text-red-600" : ""} ${oldpassError == false? "text-green-600" : ""}`}></input>
                        </div>
                        <div>
                            <input value={newpass} onChange={onnewpassChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            {newpassError && <p className="text-red-700">Password cannot be empty</p>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-12">
                    <button onClick={changePassword} className="h-16 w-24 mx-4 border-2 border-green-400 hover:bg-green-500  hover:text-white rounded  px-4">Change </button>
                    <button onClick={()=>{setProfileDisplay("profile")}} className="h-16 w-24 mx-4 border-2 border-red-400 hover:bg-red-500 hover:text-white rounded px-4">Back </button>
                </div>
            </div>
        </div>
       
    )
}


 function Address() {
    const user = JSON.parse(localStorage.getItem("user"));
    const {setProfileDisplay} = useGlobalContext();
    const {loggedIn} = useGlobalContext();

    const [house, sethouse] = useState("");
    const [street, setstreet] = useState("");
    const [area, setarea] = useState("");
    const [city, setcity] = useState("");
    const [country, setcountry] = useState("");
    const [zip, setzip] = useState("");

    const onhouseChange = (e) => {
        sethouse(e.target.value);
    }
    const onstreetChange = (e) => {
        setstreet(e.target.value);
    }
    const onareaChange = (e) => {
        setarea(e.target.value);
    }
    const oncityChange = (e) => {
        setcity(e.target.value);
    }
    const oncountryChange = (e) => {
        setcountry(e.target.value);
    }
    const onzipChange = (e) => {
        setzip(e.target.value);
    }

    const addAddr = async () => {
        const addressAddResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/addresses/add`,
            method:"post",
            data:{
                map:"",
                zip,
                house,
                street,
                area,
                city,
                country
            }
        });
       // console.log("add address result",addressAddResult);
        const addAddressResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/users/${loggedIn}/addAddress`,
            method:"post",
            data:{
                id:addressAddResult.data
            }
        });
        console.log("add address result",addAddressResult);
        const userResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/users/${user._id}`,
            method:"get"
        });
        localStorage.setItem("user",JSON.stringify(userResult.data));
        setProfileDisplay("profile");
    }
    
    return (
        <div className="flex justify-center ">
            <div className="bg-white shadow-lg w-11/12 md:w-3/4 p-2 md:p-8 border border-pink-200 my-8">
                <div className=" grid grid-cols-4 mt-2">
                        <div className="col-span-2 space-y-14">
                            <p className="text-gray-600 text-xl text-semibold">House</p>
                            <p  className="text-gray-600 text-xl text-semibold">Street</p>
                            <p className="text-gray-600 text-xl text-semibold">Area</p>
                            <p  className="text-gray-600 text-xl text-semibold">City</p>
                            <p className="text-gray-600 text-xl text-semibold">Country</p>
                            <p  className="text-gray-600 text-xl text-semibold">Zip code</p>
                        </div>
                        <div className=" col-span-2 space-y-4">
                            <div>
                                <input value={house} onChange={onhouseChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            <div>
                                <input value={street} onChange={onstreetChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            <div>
                                <input value={area} onChange={onareaChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            <div>
                                <input value={city} onChange={oncityChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            <div>
                                <input value={country} onChange={oncountryChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            <div>
                                <input value={zip} onChange={onzipChange} className="w-40 md:w-full text-xl py-4 md:p-4 font-semibold bg-gray-50 border-2 border-gray-400"></input>
                            </div>
                            
                        </div>
                    </div>
                <div className="flex justify-center mt-12">
                        <button onClick={addAddr} className="h-16 w-24 mx-4 border-2 border-green-400 hover:bg-green-500  hover:text-white rounded  px-4">Add </button>
                        <button onClick={()=>{setProfileDisplay("profile")}} className="h-16 w-24 mx-4 border-2 border-red-400 hover:bg-red-500 hover:text-white rounded px-4">Back </button>
                </div>
            </div>
        </div>
        
    )
}
