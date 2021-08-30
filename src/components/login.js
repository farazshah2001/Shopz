import React , {useState} from 'react'
import axios from 'axios';
import {HiOutlineMail} from 'react-icons/hi'
import {BsLock} from 'react-icons/bs'
import {GoogleLogin , GoogleLogout} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {FcGoogle} from 'react-icons/fc';
import {useHistory,Link} from 'react-router-dom'

import { useGlobalContext } from '../context';

export default function Login() {
    
    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");
    const [emailE, setemailE] = useState("");
    const [passE, setpassE] = useState("");

    const {loggIn} = useGlobalContext();

    const history = useHistory();

    const onEmailChange = (e) => {
        setemailE("");
        setloginEmail( e.target.value);
    }
    const onPasswordChange = (e) => {
        setpassE("");
        setloginPassword( e.target.value);
    }
    const googleClientId = "864441893771-10l8ej3pvulgj1j90jk7j16akcu9virk.apps.googleusercontent.com";
    const facebookAppId = "262010328760513";
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
    
    const onFacebookLogin = (res) => {
        console.log("facebok : ",res);
        setloginEmail(res.email);
        setloginPassword(res.userID);
        login(res.email,res.userID);
    }
    const onFacebookClicked = (res) => {
        console.log("clicked",res);
    }
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
            history.push("/");
        }
        console.log(loginResult.data.message);
    }
   
    return (
        <>
        
        <div className="flex  justify-center h-screen bg-black bg-opacity-80 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400">
            <div className="fixed -top-20 -left-60  w-96 h-96 bg-white  bg-opacity-10 transform -rotate-45"> </div>
            <div className="fixed -bottom-60 left-60  w-96 h-96 bg-white  bg-opacity-10 transform -rotate-45"> </div>
            <div className="fixed bottom-40 -right-44  w-64 h-96 bg-black  bg-opacity-10 transform rotate-135"> </div>

            <div className="bg-white h-auto w-full self-center  md:w-4/5 md:my-16   lg:w-2/6  px-10 py-6 z-20">
                <h1 className="text-6xl text-center pb-5 font-black ">Login</h1>
                <div className="mb-10">
                    <div className="my-5">
                        <p className="font-semibold transform translate-y-5">Email</p>
                        <HiOutlineMail className=" w-6 h-6    transform translate-y-9 " />
                        <input type="email" placeholder="Type your  email" name="email" value={loginEmail} onChange={onEmailChange}
                                className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2  ${emailE ? "border-red-600 text-red-800" : ""} `}>
                         </input>
                         {emailE && <p className="text-red-600">Invalid email</p>}
                    </div>
                    <div className="my-5">
                        <p className="font-semibold transform translate-y-5">Password</p>
                        <BsLock className=" w-6 h-6    transform translate-y-9 " />
                        <input type="password" placeholder="Type your password" name="password" value={loginPassword} onChange={onPasswordChange}
                         className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2 ${passE ? "border-red-600 text-red-800" : ""} `}>

                         </input>
                         {passE && <p className="text-red-600">Invalid password</p>}
                    </div>                   
                   
                    <div className="flex justify-center">
                        <button onClick={()=>{login(loginEmail,loginPassword)}} className="bg-red-600 rounded-full w-5/6 h-10 text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">LOGIN</button>
                    </div>                    
                </div>
                <div className="text-center">
                    <p>Or login using</p>
                    <div className="flex flex-row justify-center mt-2">
                            <div className="mx-2">
                                <GoogleLogin
                                    clientId={googleClientId}
                                    render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="text-2xl bg-gray-100 rounded-full w-10 h-10 pl-2 "><FcGoogle /></button>
                                    )}
                                    buttonText=""
                                    onSuccess={onLoginSuccess}
                                    onFailure={onLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div className="mx-2">
                                <FacebookLogin
                                        appId={facebookAppId}
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        onClick={onFacebookClicked}
                                        callback={onFacebookLogin}
                                        cssClass="rounded-full w-10 h-10 bg-blue-800 text-white"
                                        textButton=""
                                        icon="fa-facebook" />
                            </div>
                    </div>
                    
                    <Link to="/signup"><p className={` font-bold text-pink-600 mt-8`}>Signup</p></Link>     
                    
                </div>
                
            </div>
        </div>
        
        
        </>
        
    )
    
}
