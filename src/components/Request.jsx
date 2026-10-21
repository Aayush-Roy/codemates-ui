import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Request = () => {
    const dispatch = useDispatch()
    const requests = useSelector(store=>store.request)
    const handleAccecptConnectionRequest = async(requsetId,status)=>{
      try{
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${requsetId}`,{},{withCredentials:true})
        dispatch(removeRequest(requsetId));
      }catch(err){
        console.log("Something went wrong from accepting connection request", err)
      }
    }
    const fetchRequset = async()=>{
        try{
            const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {withCredentials:true})
           
            dispatch(addRequest(res?.data?.data))

        }catch(err){
            console.log("Something went wrong while fetching connections requests",err)
        }
    }
    useEffect(()=>{
        fetchRequset()
    },[])
    console.log("requests", requests)
 
return (
  <div className="min-h-screen bg-base-200 px-4 py-8">
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        My Requests
      </h1>

      {requests && requests.length > 0 ? (
        <div className="flex flex-col gap-4">
          {requests.map((req) => (
            <div
              key={req?._id}
              className="card card-side bg-base-100 shadow-md border border-base-300"
            >
              <figure className="p-4">
                <img
                  src={req?.fromUserId?.photoUrl || "https://placehold.co/100x100"}
                  alt="User"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </figure>

              <div className="card-body flex-row items-center justify-between gap-3 p-4">
                <div>
                  <h2 className="card-title text-lg">
                    {req?.fromUserId?.firstName || "Unknown User"}
                  </h2>
                  <p className="text-sm text-base-content/60">
                    Wants to connect with you
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button onClick={()=>handleAccecptConnectionRequest(req?._id,"accepted")} className="btn btn-success btn-sm">
                    Accept
                  </button>
                  <button className="btn btn-error btn-outline btn-sm">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center py-12 text-center">
            <h2 className="text-xl font-semibold">
              No Requests Yet
            </h2>
            <p className="text-base-content/60">
              When someone sends you a connection request, it will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)

}

export default Request
