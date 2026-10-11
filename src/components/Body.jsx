import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)
  const fetchUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/view`, {
      withCredentials: true,
    });

    console.log("REFRESH PROFILE:", res.data);

    dispatch(addUser(res.data));
  } catch (err) {
    navigate("/login")
    console.log("REFRESH ERROR:", err.response?.status);
    console.log("REFRESH ERROR:", err.response?.data);
  }
};

useEffect(() => {
  if(!userData){

    fetchUser();
  }
}, []);
 
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
