import React , {useState,useEffect} from 'react'
import { Link , useNavigate  } from 'react-router-dom';
import {Elements,CardElement , useElements , useStripe} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios';

import {useGlobalContext} from '../context'

const stripePublicKey = "pk_test_51JMDlmI039zhfrBWIwkUjTm3VmgOEL0gw97PHh8Jt4wo5cTGY5dyfwlQpj7uPRAwzg6bOerxJ8U0BaS6qtlsFDfC00aZ56arHe";



export default function Payment() {
        const stripeTestPromise = loadStripe(stripePublicKey); 
        const history = useNavigate ();
        useEffect(() => {
            if (!localStorage.getItem("loggedUser")) {
              history("/login");
            }
        },[]);
    return (
        <Elements stripe={stripeTestPromise}>
            <Form />
        </Elements>
    )
};


function Form() {
    //address form
    const user = JSON.parse(localStorage.getItem("user"))
    const [address, setaddress] = useState("");
    const [paymentAddr, setpaymentAddr] = useState("");
    const onaddressChange = (e) =>{
        setpaymentAddr(e.target.value)
        setaddress(e.target.value);
    }
    ///
    const history = useNavigate ();
    const [itemPrice, setitemPrice] = useState(JSON.parse(localStorage.getItem("singleItem")).price);
    console.log("price : ",itemPrice);
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error , paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card:elements.getElement(CardElement)
        })
        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post(`https://shopz-express-rest-api.herokuapp.com/stripePayment`,{
                    amount:itemPrice,
                    id
                });
                if (response.data.success){
                    console.log("successful payment");
                    const buyResult =  await axios({
                        url:`https://shopz-express-rest-api.herokuapp.com/buyOrders/add`,
                        method:"post",
                        data:{
                            item:localStorage.getItem("singleItemId"),
                            buyer:localStorage.getItem("loggedUser"),
                            address:paymentAddr
                        }
                    });
                    
                    console.log(buyResult.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} > 
            <div className=" mt-16">
            <div className="flex justify-center my-12">
                <h1 className="text-3xl font-semibold ">Select Address</h1>
            </div>
            <div className="flex justify-center">
            <select defaultValue="" value={address} onChange={onaddressChange} className="w-72 md:w-auto">
                <option value=""  disabled hidden>Choose here</option>
                {
                    user.addresses.map((addr)=>{
                        return(
                            <option key={addr._id} value={addr._id} className="text-md md:text-xl ">House#{addr.house} , Str#{addr.street} , {addr.area} , {addr.city} , {addr.country}</option>
                        )
                    })
                }
            </select>
            </div>
            
        </div>
            <div className="flex justify-center">
                <CardElement className="w-full md:w-3/4 lg:w-1/2 mt-8 py-12 border-2 border-black bg-gray-600 rounded"
                options={{
                    style: {
                    base: {
                        
                        fontSize: '16px',
                        backgroundColor:"black",
                        color: 'white',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: 'red',
                    },
                    },
                }} />
            </div>
            
            <div className="flex justify-center mt-16">
                <button onClick={()=>{
                    setTimeout(()=>{history('/');},3000);
                    }} className="bg-green-500 hover:bg-green-600 w-32 h-12 mx-4 rounded">pay</button>
                <Link to="/singleItem" className="bg-red-500 hover:bg-red-600 w-32 h-12 text-center py-3 mx-4 rounded">Back</Link>
            </div>            
            
        </form>
    )
}

