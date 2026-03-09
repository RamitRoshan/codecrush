import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({user}) => {

    const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user; 

    const handleSendRequest = async (status, userId) => {
        try{
            //{} -> empty, 2nd parameter is data which we have to pass in POSTand we dont have so empty
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {withCredentials: true},
            );
        }catch(err){
            throw new Error("Send Request failed: " + err.message);
        }
    }

    return ( 
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                src= {user.photoUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age+ ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;