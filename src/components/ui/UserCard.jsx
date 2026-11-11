// import axios from 'axios'
// import React from 'react'
// import { BASE_URL } from '../../utils/constants'
// import { useDispatch } from 'react-redux'
// import { removeUserFromFeed } from '../../utils/feedSlice'

// const UserCard = ({users}) => {
//   const dispatch = useDispatch();
//   const handleConnectionRequest = async(status,id)=>{
//     try{
//       const res = axios.post(`${BASE_URL}/request/send/${status}/${id}`,{},{withCredentials:true})
//       dispatch(removeUserFromFeed(id))
//     }catch(err){
//       console.log("Something went wrong while sending connection req: ", err)
//     }
//   }
//     const {firstName, lastName, age, gender, photoUrl, about, skills, _id} = users;
//   return (
//     <div className="card bg-base-300 p-2 w-96 shadow-sm">
//   <figure>
//     <img
//       src={photoUrl}
//       alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{firstName}</h2>
//     <h2>{lastName}</h2>
//     <p>{about}</p>
//     <p>{gender}</p>
//     <p>{skills && skills.map((p)=>{
//       <p>{p}</p>
//     })}</p>
//     <div className="card-actions justify-end">
//       <button onClick={()=>handleConnectionRequest("interested",_id)} className="btn btn-secondary">Interested</button>
//       <button onClick={()=>handleConnectionRequest("ignored",_id)} className="btn btn-primary">Ignored</button>
//     </div>
//   </div>
// </div>
//   )
// }

// export default UserCard

import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";

const UserCard = ({ users }) => {
  const dispatch = useDispatch();

  const handleConnectionRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.log("Something went wrong while sending connection req: ", err);
    }
  };

  const { firstName, lastName, age, gender, photoUrl, about, skills, _id } = users;

  return (
    <div className="card w-96 max-w-full overflow-hidden border border-base-300 bg-base-100 shadow-xl">
      <figure className="h-80 bg-base-300">
        {photoUrl ? (
          <img src={photoUrl} alt={firstName} className="h-full w-full object-cover" />
        ) : (
          <div className="text-6xl font-bold text-base-content/30">
            {(firstName || "?").charAt(0).toUpperCase()}
          </div>
        )}
      </figure>

      <div className="card-body gap-2">
        <h2 className="card-title text-2xl">
          {firstName} {lastName}
          {age != null && <span className="font-normal text-base-content/60">{age}</span>}
        </h2>
        {gender && <p className="text-sm capitalize text-base-content/60">{gender}</p>}
        {about && <p className="line-clamp-3 text-sm">{about}</p>}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="badge badge-outline badge-primary">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions mt-3 justify-center gap-4">
          <button
            onClick={() => handleConnectionRequest("ignored", _id)}
            className="btn btn-circle btn-lg border-error bg-base-100 text-xl text-error hover:bg-error hover:text-error-content"
            aria-label="Ignore"
          >
            ✕
          </button>
          <button
            onClick={() => handleConnectionRequest("interested", _id)}
            className="btn btn-circle btn-lg border-success bg-base-100 text-xl text-success hover:bg-success hover:text-success-content"
            aria-label="Interested"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;