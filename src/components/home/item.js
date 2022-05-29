import React from 'react'
import { useHistory } from 'react-router';
import {useGlobalContext} from '../../context'
export default function Item({item}) {
    const history = useHistory();
    const itemClicked = () => {
        localStorage.setItem("singleItem",JSON.stringify(item));
        localStorage.setItem("singleItemId",item._id);
        history.push("/singleItem");
    }
////// rating logic
    let rating=0;
    let count =0;
    let stars =0;
    item.reviews.map((rev)=>{rating+=rev.rating;count++});
    stars = rating/count;
    let star = '*';
    let review = star.repeat(stars);
//////
    return (
        //<img src ={item.images[0]}></img>
        <div onClick={itemClicked} className="cursor-pointer  border-2 border-gray-900 bg-gray-800 mx-auto my-4">
            <img className="w-64 h-60" src={item.images[0]} ></img>
            <div className='px-3 py-5 pb-3 space-y-q'>
                <div className='flex justify-between'>
                <h1 className='text-white font-bold'>{item.name}</h1>
                <p className='text-white'>${item.price}</p> 
                </div>
                <p className='text-white font-black'>{review}</p>
            </div>
        </div>
    )
}
