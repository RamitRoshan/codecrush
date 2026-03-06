import axios from "axios"
import { BASE_URL } from "../utils/constants"
import {useDispatch, useSelector} from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {

  //read feed
  const feed = useSelector((store) => store.feed);

  //dispatch actions to update a feed
  const dispatch = useDispatch();

  const getFeed = async() => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL+ "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err);
    }
  }

  //asa page loads, we'll call the getFeed
  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  );
};

export default Feed;