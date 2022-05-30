import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

import {useGlobalContext} from '../context'
export default function Sell() {
    const history = useNavigate ();

    const {loggedIn} = useGlobalContext();
    /// input form controlled logic
    const [name, setname] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("");
    const [color, setcolor] = useState("");
    const [ageGroup, setageGroup] = useState("");
    const [gender, setgender] = useState("");
    const [description, setdescription] = useState("");

    const onNameChange = (e) => {
        setname(e.target.value);
        setnameerror(false);
    }
    const onImageUrlChange = (e) => {
        setimageUrl(e.target.value);
        setimageerror(false);
    }
    const onPriceChange = (e) => {
        setprice(e.target.value);
        setpriceerror(false);
    }
    const onDescriptionChange = (e) => {
        setdescription(e.target.value);
        setdescriptionerror(false);
    }
    const onCategorySelect = (e) => {
        setcategory(e.target.value);
        setcategoryerror(false);
    }
    const onColorSelect = (e) => {
        setcolor(e.target.value);
        setcolorerror(false);
    }
    const onAgeGroupSelect = (e) => {
        setageGroup(e.target.value);
        setageerror(false);
    }
    const onGenderSelect = (e) => {
        setgender(e.target.value);
        setgendererror(false);
    }
    ///
    /// input error state
    const [nameerror, setnameerror] = useState(false);
    const [imageerror, setimageerror] = useState(false);
    const [priceerror, setpriceerror] = useState(false);
    const [descriptionerror, setdescriptionerror] = useState(false);
    const [categoryerror, setcategoryerror] = useState(false);
    const [colorerror, setcolorerror] = useState(false);
    const [ageerror, setageerror] = useState(false);
    const [gendererror, setgendererror] = useState(false);
    ///
    /// sell item method
    const sellItem = async (e) => {
        e.preventDefault();
        if(!name){
            setnameerror(true);
        }else if(!imageUrl){
            setimageerror(true);
        }else if(!price){
            setpriceerror(true);
        }else if(!category){
            setcategoryerror(true);
        }else if(!color){
            setcolorerror(true);
        }else if(!ageGroup){
            setageerror(true);
        }else if(!gender){
            setgendererror(true);
        }else if(!description){
            setdescriptionerror(true);
        }else{
            const sellResult =  await axios({
                url:`https://shopz-express-rest-api.herokuapp.com/items/add`,
                // url:`http://localhost:5000/items/add`,
                method:"post",
            
                data:{
                    name,
                    price,
                    description:{
                        text:description,
                        gender,
                        color,
                        ageGroup,
                        category
                    },
                    images:[imageUrl],
                    reviews:[],
                    seller:loggedIn
                }
        }); 
        if(sellResult.data == "Item added !"){
            setname("");
            setimageUrl("");
            setprice("");
            setcategory("");
            setcolor("");
            setageGroup("");
            setgender("");
            setdescription("");
        }
        console.log(sellResult);  
        history("/");
        }
                   
    }
    ///
    useEffect(() => {
		if (!localStorage.getItem("loggedUser")) {
		  history("/");
		}
    },[]);
    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <form className="p-8 bg-white shadow-xl self-center w-full md:w-1/2 xl:w-1/3 md:border-2 border-gray-300 rounded">
                <div className=" grid grid-cols-3">
                    <div className="space-y-10">
                        <p>item  name</p>
                        <p>Image Url</p>
                        <p>price</p>
                        <p>Category  </p>
                        <p>Color  </p>
                        <p>Age group  </p>
                        <p>Gender  </p>
                        <p>Description  </p>  
                    </div>
                    <div className="col-span-2 space-y-5">
                        <input type="text" value={name} onChange={onNameChange} className={` w-full border-2 ${nameerror ? ' border-red-600 ' :'border-gray-900'}`}></input>
                        <input type="text" value={imageUrl} onChange={onImageUrlChange} className={`w-full border-2  ${imageerror ? ' border-red-600 ' :'border-gray-900'}`}></input>
                        <input type="text" value={price} onChange={onPriceChange} className={`w-full border-2  ${priceerror ? ' border-red-600 ' :'border-gray-900'}`}></input>
                        <select name="category" value={category} onChange={onCategorySelect} className={`${categoryerror ? ' border-red-600 ' :'border-gray-900'} w-full flex   bg-white border-2  `}  >
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="sport" className=" bg-black text-white text-2xl">Sport</option>
                                <option value="cloths" className="bg-black text-white text-2xl">Cloths</option>
                                <option value="furniture" className="bg-black text-white text-2xl">Furntiure</option>
                                <option value="electronics" className="bg-black text-white text-2xl">Electronics</option>
                                <option value="toys" className="bg-black text-white text-2xl">Toys</option>
                                <option value="transports" className="bg-black text-white text-2xl">Transports</option>
                        </select>
                        <select  name="color" value={color} onChange={onColorSelect}  className={`${colorerror ? ' border-red-600 ' :'border-gray-900'} w-full flex appearance-none  bg-white border-2  `}  >
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="pink" className=" text-pink-400 text-2xl">Pink</option>
                            <option value="red" className=" text-red-400 text-2xl">Red</option>
                            <option value="blue" className=" text-blue-400 text-2xl">Blue</option>
                            <option value="green" className=" text-green-400 text-2xl">Green</option>
                            <option value="yellow" className=" text-yellow-300 text-2xl">Yellow</option>
                            <option value="orange" className=" text-yellow-500 text-2xl">Orange</option>
                            <option value="black" className=" text-black text-2xl">Black</option>
                            <option value="brown" className=" text-yellow-700 text-2xl">Brown</option>
                            <option value="white" className=" text-gray-300 text-2xl">White</option>
                        </select>
                        <select name="age" value={ageGroup} onChange={onAgeGroupSelect} className={`${ageerror ? ' border-red-600 ' :'border-gray-900'} w-full flex appearance-none  bg-white border-2  `}  >
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="babies" className="w-36 bg-black text-white text-2xl">Babies</option>
                            <option value="kids" className="bg-black text-white text-2xl">Kids</option>
                            <option value="teens" className="bg-black text-white text-2xl">Teens</option>
                            <option value="adults" className="bg-black text-white text-2xl">Adults</option>
                            <option value="old" className="bg-black text-white text-2xl">Old</option> 
                            <option value="all" className="bg-black text-white text-2xl">All</option>    
                        </select>
                        <select name="gender" value={gender} onChange={onGenderSelect} className={`${gendererror ? ' border-red-600 ' :'border-gray-900'} w-full flex appearance-none  bg-white border-2 `}>
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="male" className="bg-white text-gray-900 text-2xl">Male</option>
                            <option value="female" className="bg-white text-pink-400 text-2xl">Female</option>
                            <option value="neutral" className="bg-white text-black text-2xl">Neutral</option>
                        </select>
                        <textarea type="text" value={description} onChange={onDescriptionChange} className={`${descriptionerror ? ' border-red-600 ' :'border-gray-900'} w-full border-2 `}></textarea>
                    </div>
                </div>
               <div className="flex justify-center space-x-4">
                    <button onClick={sellItem} className="mt-12 w-32 h-16 text-2xl bg-gray-900 hover:bg-gray-900 rounded text-white hover:shadow-2xl">Sell</button>
                    <Link to="/"><button className="mt-12 w-32 h-16 text-2xl bg-gray-900 hover:bg-gray-900 rounded text-white hover:shadow-2xl">Back</button></Link>
               </div>
            </form>     
        </div>
    )
}
