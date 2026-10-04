import { Outlet } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
  const dispatch = useDispatch();
  // const fetchUser = async()=>{
  //   try{
  //     const res = await axios.get(`${BASE_URL}/profile/view`, {
  //       withCredentialsL:true
  //     });
  //     console.log(res.data)
  //     dispatch(addUser(res.data));
  //   }catch(err){
  //     console.log("Error", err)
  //   }
  // }
  const fetchUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/view`, {
      withCredentials: true,
    });

    console.log("REFRESH PROFILE:", res.data);

    dispatch(addUser(res.data));
  } catch (err) {
    console.log("REFRESH ERROR:", err.response?.status);
    console.log("REFRESH ERROR:", err.response?.data);
  }
};

useEffect(() => {
  fetchUser();
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
