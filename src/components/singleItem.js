import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { Link , useHistory} from 'react-router-dom';

import {useGlobalContext} from '../context'
export default function SingleItem() {
    const history = useHistory();
    const [singleItem, setsingleItem] = useState(JSON.parse(localStorage.getItem("singleItem")));
    const {reviewDToggle} = useGlobalContext();
    const {reviewDisplay} = useGlobalContext();

    useEffect(() => {
    setsingleItem(JSON.parse(localStorage.getItem("singleItem")));
    console.log("latest : ",JSON.parse(localStorage.getItem("singleItem")));
    }, [reviewDisplay]);
    
    
    
    
    return (
        <div className="p-4 m-6  bg-gray-100 lg:grid lg:grid-cols-5">
            
            <div className="border lg:col-span-4" >
                <h1 className="text-center text-2xl mb-4">{singleItem.name}</h1>
                <div className="">
                    <img className="  lg:w-80 lg:h-80 mx-auto" src="data:image/jpeg;base64,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" ></img>
                </div>
                <div className=" mt-12 px-4">
                <h1 className="text-4xl text-bold mb-4">Info</h1>
                    <div className=" grid grid-cols-4 mt-4 py-4  m-y-2 ">
                        <div className="col-span-2 space-y-5">
                        <p className="text-gray-600 text-xl text-semibold">Price</p>
                            <p className="text-gray-600 text-xl text-semibold">Category</p>
                            <p  className="text-gray-600 text-xl text-semibold">Gender</p>
                            <p  className="text-gray-600 text-xl text-semibold">Color</p>
                            <p  className="text-gray-600 text-xl text-semibold">Age group</p>
                            <p  className="text-gray-600 text-xl text-semibold">Description</p>
                        </div>
                        <div className="col-span-2 space-y-4">
                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.price}</p>
                            <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.description.category}</p>
                            <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.description.gender}</p>
                            <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.description.color}</p>
                            <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.description.ageGroup}</p>
                            <p className="text-gray-800 text-xl md:text-2xl font-semibold">{singleItem.description.text}</p>
                        </div>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <button onClick={()=>{history.push('/buy')}} className="my-8 mx-4 w-24 h-16 bg-green-400 hover:bg-green-600 rounded text-white text-2xl">Buy</button>
                    <Link to="/" ><button className="my-8 mx-4 w-24 h-16 bg-red-400 hover:bg-red-600 rounded text-white text-2xl">Back</button></Link>
                </div>
            </div>
            
            <div className="mx-auto ">
                <div className="border-2 border-gray-400 px-8 py-4">
                    <h1 className="text-4xl text-semibold border-b-2 border-gray-600 text-center mb-8">Reviews</h1>
                   <div className="divide-y divide-light-blue-400">
                    {singleItem.reviews &&
                        singleItem.reviews.map((review)=>{
                            return(
                                <div>
                                    <p>{'* '.repeat(review.rating)}</p>
                                    <p>{review.comment}</p>
                                </div>
                            )
                        })
                    }
                   </div>
                   {reviewDisplay && <ReviewForm itemId={singleItem._id} />}
                   {!reviewDisplay && <button onClick={()=>{reviewDToggle(true)}} className="w-full h-12 bg-blue-400 hover:bg-blue-500 rounded mt-2">Add review</button>}
                </div>
            </div>
        </div>
    )
}

function ReviewForm({itemId}) {
    const {reviewDToggle} = useGlobalContext();
    const {loggedIn} = useGlobalContext();
    const [reviewInput, setreviewInput] = useState("");
    const [ratingInput, setratingInput] = useState();

    const onreviewInputChange = (e) => {
        setreviewInput(e.target.value);
    }
    const onratingInputChange = (e) => {
        if(e.target.value >=0 && e.target.value<6){
            setratingInput(e.target.value);
        }
        
    }
    const addReview = async (e) => {
        e.preventDefault();
        const addReviewResult =  await axios({
            url:"http://localhost:5000/items/addReview",
            method:"post",
            data:{
                id:itemId,
                rating:ratingInput,
                comment:reviewInput,
                buyer:loggedIn
            }
        });
        console.log(addReviewResult);
        const newItemResult =  await axios({
            url:`http://localhost:5000/items/${itemId}`,
            method:"get"
        });
        localStorage.setItem("singleItem",JSON.stringify(newItemResult.data));
        reviewDToggle(false);
    }
    return (
        <form className="mt-4">
            <textarea value={reviewInput} onChange={onreviewInputChange}  placeholder="write your review" className="w-full h-24"></textarea>
            <input value={ratingInput} onChange={onratingInputChange} type="number"  placeholder="rating" className="w-full"></input>
            <button onClick={addReview} className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded mt-2 text-white text-xl">Add</button>
            <button onClick={()=>{reviewDToggle(false)}} className="w-full h-12 bg-red-500 hover:bg-red-600 rounded mt-2 text-white text-xl">Back</button>
        </form>
    )
}
