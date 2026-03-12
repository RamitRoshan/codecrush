import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () =>{

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
        };
       
        const rzp = new window.Razorpay(options); //window.Razorpay is available because we have added the razorpay script in index.html file
        rzp.open(); //it will open the razorpay dialog box
    };

    return (
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