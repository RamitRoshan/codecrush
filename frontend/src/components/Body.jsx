import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch(); //update
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);


  //profile view(user is loggedIn or not)
  const fetchUser = async() => {
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL+ "/profile/view", {
        withCredentials: true //to access cookies
      });
      dispatch(addUser(res.data));

    }catch(err){
      if(err.status === 401){
        navigate("/login");
      }
      console.error(err);
    }
  };
  
  //after the component load(initial render), then this useEffect will be called
  useEffect(() => { 
    fetchUser();
    
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <NavBar/>
      {/* Main Content */}
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>

    </div>
  )
}

export default Body


 