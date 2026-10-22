import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './ui/UserCard';

const Feed = () => {
  const feed = useSelector(store=>store.feed)
  const dispatch = useDispatch();
  const getUserFeed = async()=>{
      
    try{
      const res = await axios.get(`${BASE_URL}/feed`,{withCredentials:true});
      dispatch(addFeed(res.data))
      console.log("feed:", res)
    }catch(err){
      console.log("Error fetching in Feed:", err);
    }

  }
  useEffect(()=>{
    getUserFeed();
  },[])
  if(!feed) return;
  if(feed.length <=0) return <h1>No New Users Found!</h1>
  return (
    feed && (
       <div className='flex justify-center items-center my-10'>
     <UserCard users={feed[0]}/>
    </div>
    )
   
  )
}

export default Feed
