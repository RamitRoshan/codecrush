import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";

const Premium = () =>{

    const [isUserPremium, setIsUserPremium] = useState(false);

    

    const verifyPremiumUser = async () => {
    try{
        const res = await axios.get(BASE_URL +"/premium/verify" , {
            withCredentials: true,
        });

        if(res.data.isPremium){
            setIsUserPremium(true);
        }
    }catch(err){
        console.log(err);
    }
    };

    useEffect(() => { 
        verifyPremiumUser();
    }, []);


    const handleBuyClick = async (type) => {
        //make an api call and create an server(order created)
        const order = await axios.post(BASE_URL + "/payment/create",
            {
                membershipType: type,
            },
            {withCredentials: true}
        );

        //It should open the razorpay Dialog box for payment and pass the order details to it.

        const {amount, keyId, currency, notes, orderId} = order.data; //order details from backend

        // Open Razorpay Checkout
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount, // Amount is in currency subunits.
            currency,
            name: 'Code Crush',
            description: 'Connect to other developers and grow together',
            order_id: orderId, // This is the order_id created in the backend 
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
            //when payment is successful then it will call this handler function and pass the response to it.
            handler: verifyPremiumUser,
        };
       
        const rzp = new window.Razorpay(options); //window.Razorpay is available because we have added the razorpay script in index.html file
        rzp.open(); //it will open the razorpay dialog box
    };

    return isUserPremium ? (
        "You are already a premium user"
    ) : (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - 100 connection Requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("silver")} className="btn btn-secondary">Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - Infinite connection Requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("gold")} className="btn btn-primary">Buy Gold</button>
                </div>
            </div>
        </div>  
    )
}
export default Premium;