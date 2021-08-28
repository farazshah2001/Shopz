import React from 'react'

import {useGlobalContext} from '../../context'
export default function Categories() {
    const {fetchCategory} =  useGlobalContext();
    return (
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            
                        <div onClick={()=>{fetchCategory("cloths","male","","")}} className="cursor-pointer h-40 md:h-60 bg-green-600 hover:bg-green-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl">
                            <div className=" h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-green-200 ">
                                <h1  className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Men Cloths</h1>
                            </div>
                            
                        </div>
                        <div onClick={()=>{fetchCategory("cloths","female","","")}} className="cursor-pointer h-40 md:h-60 bg-yellow-600 hover:bg-yellow-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl ">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-yellow-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Female Cloths</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("sport","","","")}} className="cursor-pointer h-40 md:h-60 bg-pink-600  hover:bg-pink-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-pink-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-20 -translate-y-6 lg:translate-x-28 lg:-translate-y-16 ">Sports</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("","","kids","")}} className=" h-40 md:h-60 bg-red-600 hover:bg-red-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-red-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Kids</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("cloths","","","black")}} className="cursor-pointer h-40 md:h-60 bg-indigo-600 hover:bg-indigo-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-indigo-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Black dress</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("furniture","","","")}} className="cursor-pointer h-40 md:h-60 bg-blue-600 hover:bg-blue-700 m-2 overflow-hidden flex justify-start hover:shadow-2xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-blue-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-16 +translate-y-16 lg:translate-x-28 lg:-translate-y-16 ">Furniture</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("electronics","","teens","")}} className="hidden xl:block cursor-pointer h-40 md:h-60 bg-purple-600 hover:bg-purple-700 m-2 overflow-hidden flex justify-start hover:shadow-xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-purple-300">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Gadgets</h1>
                            </div>
                        </div>
                        <div onClick={()=>{fetchCategory("","","old","")}} className="hidden xl:block cursor-pointer h-40 md:h-60 bg-gray-600 hover:bg-gray-700 m-2 overflow-hidden flex justify-start hover:shadow-xl">
                            <div className="  h-40 w-40 md:h-60 md:w-60 transform rotate-45 -translate-x-20 bg-gray-300  ">
                            <h1 className=":text-4xl lg:text-5xl xl:text-6xl text-white font-bold  transform -rotate-45 translate-x-24 -translate-y-12 lg:translate-x-28 lg:-translate-y-16 ">Old people </h1>
                            </div>
                        </div>
        </div>
    )
}
