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
      console.error("Get Feed failed:", err);
    }
  }

  //asa page loads, we'll call the getFeed
  useEffect(() => {
    getFeed();
  }, []);

  //edge cases(feed is empty)
  if(!feed) return;

  if(feed.length <= 0){
    return <h1 className="flex justify-center my-10 font-semibold">No new users founds!</h1>
  }

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  );
};

export default Feed;