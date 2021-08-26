import React , {useState} from 'react'
import axios from 'axios';
import {BsPerson} from 'react-icons/bs'
import {BsLock} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import {GoogleLogin , GoogleLogout} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {FcGoogle} from 'react-icons/fc'
import {useHistory,Link} from 'react-router-dom';
export default function Signup() {
    const googleClientId = "864441893771-10l8ej3pvulgj1j90jk7j16akcu9virk.apps.googleusercontent.com";
    const facebookAppId = "262010328760513";

    const history = useHistory();

    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [nameE, setnameE] = useState("");
    const [emailE, setemailE] = useState("");
    const [passE, setpassE] = useState("");

    const onNameChange = (e) => {
        setnameE("");
        setSignupName( e.target.value);
    }
    const onEmailChange = (e) => {
        setemailE("");
        setSignupEmail( e.target.value);
    }
    const onPasswordChange = (e) => {
        setpassE("");
        setSignupPassword( e.target.value);
    }

    const signup = async (signupName,signupEmail,signupPassword) => {
        console.log("signing up");
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
            if(signupName == ""){
                setnameE("name cannot be empty");
            }
            else if(signupEmail == ""){
                setemailE("email cannot be empty")
            }
            else if(re.test(String(signupEmail).toLowerCase()) == false){
                setemailE("invalid email");
            }
            else if(signupPassword == ""){
                setpassE("password cannot be empty");
            }
        if(!nameE && !emailE && !passE){
            console.log("no errors");
            if(signupName != "" && signupEmail != "" && signupPassword != ""){ // a double check
                console.log("double check completed");
                const registerResult =  await axios({
                    url:`https://shopz-express-rest-api.herokuapp.com/users/add`,
                    method:"post",
                    data:{
                        name:signupName,
                        email:signupEmail,
                        password:signupPassword
                    }
                });
                console.log(registerResult);
                if(registerResult.data.message){
                    setemailE(registerResult.data.message);
                }else{
                    setSignupName("");
                    setSignupEmail("");
                    setSignupPassword("");
                    history.push("/login");
                }
               
            }
        }
    }

    
    const onLoginSuccess = (res) => {
        console.log(res.profileObj.name,res.profileObj.email,res.profileObj.googleId);
        setSignupName(res.profileObj.name);
        setSignupEmail(res.profileObj.email);
        setSignupPassword(res.profileObj.googleId);
        signup(res.profileObj.name,res.profileObj.email,res.profileObj.googleId);
    }
    const onLoginFailure = (res) => {
        console.log(res);
        console.log("login failed");
    }
    
    const onFacebookCallback = async (res) => {
        setSignupName(res.name);
        setSignupEmail(res.email);
        setSignupPassword(res.userID );

        signup(res.name,res.email,res.userID);
        
    }
    const onFacebookClicked = (res) => {
        console.log("clicked",res);
    }
    return (
        <>
        
        <div className="flex  justify-center h-screen bg-black bg-opacity-80 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400">
            <div className="fixed -top-20 -left-60  w-96 h-96 bg-white  bg-opacity-10 transform -rotate-45"> </div>
            <div className="fixed -bottom-60 left-60  w-96 h-96 bg-white  bg-opacity-10 transform -rotate-45"> </div>
            <div className="fixed bottom-40 -right-44  w-64 h-96 bg-black  bg-opacity-10 transform rotate-135"> </div>

            <div className="bg-white h-full w-full self-center  md:w-4/5 md:h-5/6 lg:w-2/6 lg:h-5/6  px-10 py-6 z-20 ">
                <h1 className="text-5xl text-center pb-5 font-black ">Signup</h1>
                <div className="mb-7">
                    <div className="mb-3">
                        <p className="font-semibold transform translate-y-5">Name</p>
                        <BsPerson className=" w-6 h-6    transform translate-y-9 " />
                        <input type="text" placeholder="Type your  name" value={signupName} onChange={onNameChange}
                            className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2
                            ${nameE ? "border-red-600 text-red-800" : ""} `} >
                        </input>
                        {nameE && <p className="text-red-600">Invalid name</p>}
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold transform translate-y-5">Email</p>
                        <HiOutlineMail className=" w-6 h-6    transform translate-y-9 " />
                        <input type="email" placeholder="Type your  email" value={signupEmail} onChange={onEmailChange}
                              className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2
                            ${emailE ? "border-red-600 text-red-800" : ""} `} >
                        </input>
                        {emailE && <p className="text-red-600">{emailE}</p>}
                    </div>
                    <div className="mb-3">
                        <p className="font-semibold transform translate-y-5">Password</p>
                        <BsLock className=" w-6 h-6    transform translate-y-9 " />
                        <input type="password" placeholder="Type your password" value={signupPassword} onChange={onPasswordChange}
                             className={`h-10 w-full border-b border-gray-400 pl-10 focus:border-blue-500 focus:border-b-2
                            ${emailE ? "border-red-600 text-red-800" : ""} `} >
                        </input>
                        {passE && <p className="text-red-600">Invalid password</p>}
                    </div>                   
                   
                    <div className="flex justify-center">
                        <button onClick={()=>{signup(signupName,signupEmail,signupPassword)}} className="bg-red-600 rounded-full w-5/6 h-10 text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">SIGNUP</button>
                    </div>                    
                </div>
                <div className="text-center">
                    <p>Or register using</p>
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
                                        callback={onFacebookCallback}
                                        cssClass="rounded-full w-10 h-10 bg-blue-800 text-white"
                                        textButton=""
                                        icon="fa-facebook" />
                            </div>
                    </div>
                    
                         
                    <Link to="/login"><p className={`mt-4 font-bold text-pink-600 $`}>Already have an account?</p></Link>     
                         
                </div>
                
            </div>
        </div>
        </>
        
    )
}