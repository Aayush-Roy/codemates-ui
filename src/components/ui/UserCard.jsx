import React from 'react'

const UserCard = ({users}) => {
    const {firstName, lastName, age, gender, photoUrl, about, skills} = users;
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
      <button className="btn btn-secondary">Interested</button>
      <button className="btn btn-primary">Ignored</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
