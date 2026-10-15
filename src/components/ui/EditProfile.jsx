import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import UserCard from './UserCard';

const EditProfile = ({user}) => {
     const [firstName, setFirstName] = useState(user?.firstName);
       const [lastName,setLastName] = useState(user.lastName);
       const [age,setAge] = useState(user.age || "")
       const [about, setAbout] = useState(user.about || "")
       const [gender, setGender] = useState(user.gender || "");
       const[error,setError] = useState("")
       const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
       const handleEditProfile = async()=>{
        try{
            const res = await axios.patch(`${BASE_URL}/profile/edit`,{
                firstName, lastName, age, about, gender, photoUrl
            }, {withCredentials:true})
            console.log("profile updated", res.data)
        }catch(err){
            console.log("Something went wrong in Edit profile: ", err)
        }
       }
  return (
    <>
    <div className='flex justify-center items-center' >

    <div className="flex justify-center items-center mt-0">

    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Edit your Profile</legend>

  <label className="label">First Name</label>
  <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input" placeholder="Fisrt Name" />

  <label className="label">Last Name</label>
  <input value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="input" placeholder="Last Name" />

  
  <label className="label">PhotoUrl</label>
  <input value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}  className="input" placeholder="Enter your photo" />

   <label className="label">Age</label>
  <input value={age} onChange={(e)=>setAge(e.target.value)}  className="input" type='number' />

  <label className="label">Gender</label>
  <input value={gender} onChange={(e)=>setGender(e.target.value)}  className="input"  />

   <label className="label">About</label>
  <textarea value={about} onChange={(e)=>setAbout(e.target.value)}  className="input" placeholder="Your Bio" />
  <p className="text-red-500">{error}</p>
  <button onClick={handleEditProfile} className="btn btn-neutral mt-4">Update Profile</button>
</fieldset>
</div>

    {/* {profile info} */}
    <UserCard/>

    </div>
    </>
   
  )
}

export default EditProfile
