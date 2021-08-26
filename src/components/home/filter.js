import React , {useState} from 'react'

import {useGlobalContext} from '../../context';
export default function Filter() {
    const {fetchItems,filterCategory,filterColor,filterAge,filterGender} = useGlobalContext();

    
    const [name, setname] = useState("");
    const [category, setcategory] = useState("");
    const [color, setcolor] = useState("");
    const [ageGroup, setageGroup] = useState("");
    const [gender, setgender] = useState("");

    const onNameChange = (e) => {
        setname(e.target.value);
    }
    
    const onCategorySelect = (e) => {
        setcategory(e.target.value);
        filterCategory(e.target.value);
    }
    const onColorSelect = (e) => {
        setcolor(e.target.value);
        filterColor(e.target.value);
    }
    const onAgeGroupSelect = (e) => {
        setageGroup(e.target.value);
        filterAge(e.target.value);
    }
    const onGenderSelect = (e) => {
        setgender(e.target.value);
        filterGender(e.target.value);
    }
    const reset = () => {
        setname("");
        setcategory("");
        setcolor("");
        setageGroup("");
        setgender("");
        fetchItems();
    }
    return(
        
        <>
        <h1 className="text-2xl text-red-800 font-semibold md:border-2 border-yellow-500 mb-4">Filter your results</h1>
        <div className=" grid grid-cols-4">
                    <div className="col-span-2 space-y-12">
                        {/* <p>item  name</p> */}
                        <p>Category  </p>
                        <p>Color  </p>
                        <p>Age group  </p>
                        <p>Gender  </p>
                         
                    </div>
                    <div className="col-span-2 space-y-6">
                        {/* <input type="text" value={name} onChange={onNameChange} className="border-blue-400 w-full"></input> */}
                        <select name="category" defaultValue="" value={category} onChange={onCategorySelect} className="w-full   w-36 h-12 bg-white border-2  border-blue-400"  >
                                <option value=""  disabled hidden>Choose here</option>
                                <option value="sport" className=" bg-black text-white text-2xl">Sport</option>
                                <option value="cloths" className="bg-black text-white text-2xl">Cloths</option>
                                <option value="furniture" className="bg-black text-white text-2xl">Furntiure</option>
                                <option value="electronics" className="bg-black text-white text-2xl">Electronics</option>
                        </select>
                        <select  name="color" defaultValue="" value={color} onChange={onColorSelect} className="w-full  w-36 h-12 bg-white border-2 border-blue-400 "  >
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="pink" className=" text-pink-400 text-2xl">Pink</option>
                            <option value="red" className=" text-red-400 text-2xl">Red</option>
                            <option value="blue" className=" text-blue-400 text-2xl">Blue</option>
                            <option value="green" className=" text-green-400 text-2xl">Green</option>
                            <option value="yellow" className=" text-yellow-300 text-2xl">Yellow</option>
                            <option value="orange" className=" text-yellow-600 text-2xl">Orange</option>
                            <option value="black" className=" text-black text-2xl">Black</option>
                        </select>
                        <select name="age" defaultValue="" value={ageGroup} onChange={onAgeGroupSelect} className="w-full appearance-none w-36 h-12 bg-white border-2 border-blue-400 "  >
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="babies" className="w-36 bg-black text-white text-2xl">Babies</option>
                            <option value="kids" className="bg-black text-white text-2xl">Kids</option>
                            <option value="teens" className="bg-black text-white text-2xl">Teens</option>
                            <option value="adults" className="bg-black text-white text-2xl">Adults</option>
                            <option value="old" className="bg-black text-white text-2xl">Old</option>    
                        </select>
                        <select name="gender" defaultValue="" value={gender} onChange={onGenderSelect} className="w-full appearance-none w-36 h-12 bg-white border-2 border-blue-400">
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="male" className="bg-white text-blue-400 text-2xl">Male</option>
                            <option value="female" className="bg-white text-pink-400 text-2xl">Female</option>
                            <option value="neutral" className="bg-white text-black text-2xl">Neutral</option>
                        </select>
                        
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={reset} className="w-1/2 lg:w-full h-12 bg-pink-600 hover:bg-pink-700 rounded mt-8 text-2xl text-white">Reset all filters</button>
                </div>
                
               </>
    )
}    
