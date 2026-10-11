import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useSelector } from 'react-redux';

const Feed = () => {
  const [feed,setFeed] = useState([]);
  const userData = useSelector((store)=>store.user)
  const getUserFeed = async()=>{
      
    try{
      const res = await axios.get(`${BASE_URL}/feed`,{withCredentials:true});
      console.log("feed:", res)
    }catch(err){
      console.log(err);
    }

  }
  useEffect(()=>{
    getUserFeed();
  },[])
  return (
    <div>
      Feed
    </div>
  )
}

export default Feed
