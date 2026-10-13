import React from 'react'

const UserCard = ({users}) => {
    const {firstName, lastName, age, gender, photoUrl, about} = users;
  return (
    <div className="card bg-base-300 p-2 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-secondary">Interested</button>
      <button className="btn btn-primary">Ignored</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
