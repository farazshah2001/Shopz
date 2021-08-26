import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { Link , useHistory} from 'react-router-dom';

import {useGlobalContext} from '../context'
export default function Sell() {
    const history = useHistory();

    const {loggedIn} = useGlobalContext();
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("");
    const [color, setcolor] = useState("");
    const [ageGroup, setageGroup] = useState("");
    const [gender, setgender] = useState("");
    const [description, setdescription] = useState("");

    const onNameChange = (e) => {
        setname(e.target.value);
    }
    const onPriceChange = (e) => {
        setprice(e.target.value);
    }
    const onDescriptionChange = (e) => {
        setdescription(e.target.value);
    }
    const onCategorySelect = (e) => {
        setcategory(e.target.value);
    }
    const onColorSelect = (e) => {
        setcolor(e.target.value);
    }
    const onAgeGroupSelect = (e) => {
        setageGroup(e.target.value);
    }
    const onGenderSelect = (e) => {
        setgender(e.target.value);
    }
    const sellItem = async (e) => {
        e.preventDefault();
        const sellResult =  await axios({
            url:"http://localhost:5000/items/add",
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
                images:['www.image.com'],
                reviews:[],
                seller:loggedIn
            }
    }); 
    if(sellResult.data == "Item added !"){
        setname("");
        setprice("");
        setcategory("");
        setcolor("");
        setageGroup("");
        setgender("");
        setdescription("");
    }
    console.log(sellResult);             
    }
    useEffect(() => {
		if (!localStorage.getItem("loggedUser")) {
		  history.push("/");
		}
    },[]);
    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <form className="p-8 bg-white shadow-xl self-center w-full md:w-1/2 xl:w-1/3 md:border-2 border-gray-300 rounded">
                <div className=" grid grid-cols-3">
                    <div className="space-y-10">
                        <p>item  name</p>
                        <p>price</p>
                        <p>Category  </p>
                        <p>Color  </p>
                        <p>Age group  </p>
                        <p>Gender  </p>
                        <p>Description  </p>  
                    </div>
                    <div className="col-span-2 space-y-4">
                        <input type="text" value={name} onChange={onNameChange} className="border-blue-400 w-full"></input>
                        <input type="text" value={price} onChange={onPriceChange} className="border-blue-400 w-full"></input>
                        <select name="category" value={category} onChange={onCategorySelect} className="w-full   w-36 h-12 bg-white border-2  border-blue-400"  >
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="sport" className=" bg-black text-white text-2xl">Sport</option>
                                <option value="cloths" className="bg-black text-white text-2xl">Cloths</option>
                                <option value="furniture" className="bg-black text-white text-2xl">Furntiure</option>
                                <option value="electronics" className="bg-black text-white text-2xl">Electronics</option>
                        </select>
                        <select  name="color" value={color} onChange={onColorSelect}  className="w-full appearance-none w-36 h-12 bg-white border-2 border-blue-400 "  >
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="pink" className=" text-pink-400 text-2xl">Pink</option>
                            <option value="red" className=" text-red-400 text-2xl">Red</option>
                            <option value="blue" className=" text-blue-400 text-2xl">Blue</option>
                            <option value="green" className=" text-green-400 text-2xl">Green</option>
                            <option value="yellow" className=" text-yellow-300 text-2xl">Yellow</option>
                            <option value="orange" className=" text-yellow-600 text-2xl">Orange</option>
                            <option value="black" className=" text-black text-2xl">Black</option>
                        </select>
                        <select name="age" value={ageGroup} onChange={onAgeGroupSelect} className="w-full appearance-none w-36 h-12 bg-white border-2 border-blue-400 "  >
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="babies" className="w-36 bg-black text-white text-2xl">Babies</option>
                            <option value="kids" className="bg-black text-white text-2xl">Kids</option>
                            <option value="teens" className="bg-black text-white text-2xl">Teens</option>
                            <option value="adults" className="bg-black text-white text-2xl">Adults</option>
                            <option value="old" className="bg-black text-white text-2xl">Old</option>    
                        </select>
                        <select name="gender" value={gender} onChange={onGenderSelect} className="w-full appearance-none w-36 h-12 bg-white border-2 border-blue-400">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="male" className="bg-white text-blue-400 text-2xl">Male</option>
                            <option value="female" className="bg-white text-pink-400 text-2xl">Female</option>
                            <option value="neutral" className="bg-white text-black text-2xl">Neutral</option>
                        </select>
                        <textarea type="text" value={description} onChange={onDescriptionChange} className="w-full border-2 border-blue-400 w-36 h-24"></textarea>
                    </div>
                </div>
               <div className="flex justify-center space-x-4">
                    <button onClick={sellItem} className="mt-12 w-32 h-16 text-2xl bg-blue-500 hover:bg-blue-600 rounded">Sell</button>
                    <Link to="/"><button className="mt-12 w-32 h-16 text-2xl bg-red-500 hover:bg-red-600 rounded">Back</button></Link>
               </div>
            </form>     
        </div>
    )
}
