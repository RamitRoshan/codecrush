import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

//showing connection onUI
const Connections = () => {

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL+ "/user/connections", 
                {withCredentials: true}
            );
            console.log(res.data.data);
        }catch(err){
            throw new Error("Something failed: " + err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="flex justify-center my-10">
            <h1 className="font-bold text-xl">Connections</h1>
        </div>
    );
}

export default Connections;