import React , {useState} from 'react'
import axios from 'axios';
import {HiOutlineMail} from 'react-icons/hi'
import {BsLock} from 'react-icons/bs'
// import {GoogleLogin , GoogleLogout} from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import {FcGoogle} from 'react-icons/fc';
import {useNavigate ,Link} from 'react-router-dom'

import { useGlobalContext } from '../context';

export default function Login() {
    
    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");
    const [emailE, setemailE] = useState("");
    const [passE, setpassE] = useState("");

    const {loggIn} = useGlobalContext();

    const history = useNavigate ();

    const onEmailChange = (e) => {
        setemailE("");
        setloginEmail( e.target.value);
    }
    const onPasswordChange = (e) => {
        setpassE("");
        setloginPassword( e.target.value);
    }
    // const googleClientId = "864441893771-10l8ej3pvulgj1j90jk7j16akcu9virk.apps.googleusercontent.com";
    // const facebookAppId = "262010328760513";
    const onLoginSuccess = (res) => {
        console.log(res.profileObj.email,res.profileObj.googleId);
        console.log("login success");
        setloginEmail(res.profileObj.email);
        setloginPassword(res.profileObj.googleId);
        login(res.profileObj.email,res.profileObj.googleId);
    }
    const onLoginFailure = (res) => {
        console.log(res);
        console.log("login failed");
    }
    
    // const onFacebookLogin = (res) => {
    //     console.log("facebok : ",res);
    //     setloginEmail(res.email);
    //     setloginPassword(res.userID);
    //     login(res.email,res.userID);
    // }
    // const onFacebookClicked = (res) => {
    //     console.log("clicked",res);
    // }
    const login = async (loginEmail,loginPassword) => {
        const loginResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/users/login`,
            method:"post",
            data:{
                email:loginEmail,
                password:loginPassword
            }
        });
        if(loginResult.data.message){
            if(loginResult.data.message == "not a user"){
                setemailE("invalid user email");
            }else if(loginResult.data.message == "incorrect password"){
                setpassE("invalid Password");
            }
            console.log(loginResult.data.message);
        }else{
            loggIn(loginResult.data);
            localStorage.setItem("loggedUser", loginResult.data);
            const userResult =  await axios({
                url:`https://shopz-express-rest-api.herokuapp.com/users/${loginResult.data}`,
                method:"get"
            });
            localStorage.setItem("user",JSON.stringify(userResult.data));
            console.log("user id = ",loginResult.data);
            setloginEmail("");
            setloginPassword("");
            history("/");
        }
        console.log(loginResult.data.message);
    }
   
    return (
        <>
        
        <div className="flex  justify-center h-screen bg-black bg-opacity-80 bg-white">

            <div className="rounded bg-red-600 h-auto w-full self-center  md:w-4/5 md:my-16   lg:w-1/2  px-10 py-6 z-20">
                <h1 className="text-6xl text-white text-center pb-5 font-black ">Login</h1>
                <div className="mb-10">
                    <div className="my-5">
                        <p className="font-semibold  text-white transform translate-y-5">Email</p>
                        <HiOutlineMail className=" w-6 h-6    transform translate-y-9 " />
                        <input test-id='email-input' type="email" placeholder="Type your  email" name="email" value={loginEmail} onChange={onEmailChange}
                                className={`h-10  w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2  ${emailE ? "border-red-600 text-red-800" : ""} `}>
                         </input>
                         {emailE && <p className="text-red-600">Invalid email</p>}
                    </div>
                    <div className="my-5">
                        <p className="font-semibold  text-white transform translate-y-5">Password</p>
                        <BsLock className=" w-6 h-6    transform translate-y-9 " />
                        <input test-id='password-input' type="password" placeholder="Type your password" name="password" value={loginPassword} onChange={onPasswordChange}
                         className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2 ${passE ? "border-red-600 text-red-800" : ""} `}>

                         </input>
                         {passE && <p className="text-red-600">Invalid password</p>}
                    </div>                   
                   
                    <div className="flex justify-center">
                        <button test-id='login-button' onClick={()=>{login(loginEmail,loginPassword)}} className="bg-white rounded-full w-40 h-10 text-red-600 ">LOGIN</button>
                    </div>                    
                </div>
                <div className='w-full text-center'>
                <Link test-id='signup-link' to="/signup"><p className={` font-bold hover:text-black text-white mt-8`}>Signup</p></Link>     

                </div>
                
            </div>
        </div>
        
        
        </>
        
    )
    
}
