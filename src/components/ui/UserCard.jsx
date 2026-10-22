import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../../utils/feedSlice'

const UserCard = ({users}) => {
  const dispatch = useDispatch();
  const handleConnectionRequest = async(status,id)=>{
    try{
      const res = axios.post(`${BASE_URL}/request/send/${status}/${id}`,{},{withCredentials:true})
      dispatch(removeUserFromFeed(id))
    }catch(err){
      console.log("Something went wrong while sending connection req: ", err)
    }
  }
    const {firstName, lastName, age, gender, photoUrl, about, skills, _id} = users;
  return (
    <div className="card bg-base-300 p-2 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}</h2>
    <h2>{lastName}</h2>
    <p>{about}</p>
    <p>{gender}</p>
    <p>{skills && skills.map((p)=>{
      <p>{p}</p>
    })}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleConnectionRequest("interested",_id)} className="btn btn-secondary">Interested</button>
      <button onClick={()=>handleConnectionRequest("ignored",_id)} className="btn btn-primary">Ignored</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
