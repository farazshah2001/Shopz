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
        <div onClick={itemClicked} className=" w-64 h-80 border-2 border-gray-800 bg-gray-100 mx-auto my-4">
            <img className="w-64 h-60" src={item.images[0]} ></img>
            <h1>{item.name}</h1>
            <p>${item.price}</p> 
            <p>{review}</p>
        </div>
    )
}
