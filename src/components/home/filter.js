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
        
        <div className='px-6 transform translate-y-4'>
        <h1 className="text-2xl text-red-600 font-semibold md:border-b-4 border-red-600 mb-4">Filter your results</h1>
        <div className=" grid grid-cols-8 space-x-4">
                    <div className='col-span-12 lg:col-span-2  space-y-4'>
                    <p>Category  </p>
                    <select test-id='category-filter' name="category" defaultValue="" value={category} onChange={onCategorySelect} className="w-full   bg-white border-2  border-red-600"  >
                                <option value=""  disabled hidden>Choose here</option>
                                <option value="sport" className=" bg-black text-white text-2xl">Sport</option>
                                <option value="cloths" className="bg-black text-white text-2xl">Cloths</option>
                                <option value="furniture" className="bg-black text-white text-2xl">Furntiure</option>
                                <option value="electronics" className="bg-black text-white text-2xl">Electronics</option>
                                <option value="toys" className="bg-black text-white text-2xl">Toys</option>
                                <option value="transports" className="bg-black text-white text-2xl">Transports</option>
                        </select>
                    </div>
                    <div className='col-span-12 lg:col-span-2  space-y-4'>
                    <p>Color  </p>
                    <select  test-id='color-filter'  name="color" defaultValue="" value={color} onChange={onColorSelect} className="w-full  bg-white border-2 border-red-600 "  >
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="pink" className=" text-pink-400 text-2xl">Pink</option>
                            <option value="red" className=" text-red-400 text-2xl">Red</option>
                            <option value="blue" className=" text-blue-400 text-2xl">Blue</option>
                            <option value="green" className=" text-green-400 text-2xl">Green</option>
                            <option value="blue" className=" text-blue-300 text-2xl">blue</option>
                            <option value="orange" className=" text-blue-500 text-2xl">Orange</option>
                            <option value="black" className=" text-black text-2xl">Black</option>
                            <option value="brown" className=" text-blue-700 text-2xl">Brown</option>
                            <option value="white" className=" text-gray-300 text-2xl">White</option>
                        </select>
                    </div>
                    <div className='col-span-12 lg:col-span-2  space-y-4'>
                    <p>Age group  </p>
                    <select  test-id='age-filter'  name="age" defaultValue="" value={ageGroup} onChange={onAgeGroupSelect} className="w-full appearance-none bg-white border-2 border-red-600 "  >
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="babies" className="w-36 bg-black text-white text-2xl">Babies</option>
                            <option value="kids" className="bg-black text-white text-2xl">Kids</option>
                            <option value="teens" className="bg-black text-white text-2xl">Teens</option>
                            <option value="adults" className="bg-black text-white text-2xl">Adults</option>
                            <option value="old" className="bg-black text-white text-2xl">Old</option>
                            <option value="all" className="bg-black text-white text-2xl">All</option>        
                        </select>
                    </div>
                    <div className='col-span-12 lg:col-span-2  space-y-4'>
                    <p>Gender  </p>
                    <select  test-id='gender-filter'  name="gender" defaultValue="" value={gender} onChange={onGenderSelect} className="w-full appearance-none bg-white border-2 border-red-600">
                            <option value=""  disabled hidden>Choose here</option>
                            <option value="male" className="bg-white text-blue-400 text-2xl">Male</option>
                            <option value="female" className="bg-white text-pink-400 text-2xl">Female</option>
                            <option value="neutral" className="bg-white text-black text-2xl">Neutral</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center pb-6">
                    <button test-id='resetFilter-button' onClick={reset} className="w-60 h-12 bg-red-600 hover:bg-red-600 rounded mt-8 text-2xl text-white">Reset all filters</button>
                </div>
                
               </div>
    )
}    
