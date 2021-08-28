import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { Link , useHistory} from 'react-router-dom';

import {useGlobalContext} from '../context'
export default function SingleItem() {
    
    const history = useHistory();
    const [singleItem, setsingleItem] = useState(JSON.parse(localStorage.getItem("singleItem")));
    const [canReview, setcanReview] = useState(false);
    const loggedUser = localStorage.getItem("loggedUser");
    const {reviewDToggle} = useGlobalContext();
    const {reviewDisplay} = useGlobalContext();

    useEffect(() => {
    setsingleItem(JSON.parse(localStorage.getItem("singleItem")));
    console.log("latest : ",JSON.parse(localStorage.getItem("singleItem")));
    }, [reviewDisplay]);
    
    const canReviewCheck = async () => {
        const ordersResult =  await axios({
            url:`https://shopz-express-rest-api.herokuapp.com/buyOrders`,
            method:"get"
        });
        const orders =  ordersResult.data;
        orders.map((order)=>{
            if(order.item && order.buyer && order.item._id == singleItem._id && order.buyer._id == loggedUser){// clean database , secure forms and remove the unneceray code
                console.log("he ought thsis");
                setcanReview(true);
            }
        });
        console.log("checking for buying");
    }
    useEffect(() => {
        canReviewCheck();
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className="p-4 m-6  bg-gray-100 lg:grid lg:grid-cols-5">
            <div className="border lg:col-span-4" >
                <h1 className="text-center text-2xl mb-4">{singleItem.name}</h1>
                <div className="">
                    <img className="  lg:w-80 lg:h-80 mx-auto" src={singleItem.images[0]} ></img>
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
                        <p className="text-gray-800 text-xl md:text-2xl font-semibold">$ {singleItem.price}</p>
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
                   {!reviewDisplay && loggedUser && canReview && <button onClick={()=>{reviewDToggle(true)}} className="w-full h-12 bg-blue-400 hover:bg-blue-500 rounded mt-2">Add review</button>}
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
            url:`https://shopz-express-rest-api.herokuapp.com/items/addReview`,
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
            url:`https://shopz-express-rest-api.herokuapp.com/items/${itemId}`,
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
