
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector(
    (store) => store.connection
  );

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/connections`,
        { withCredentials: true }
      );

      console.log("API response:", res.data);

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(
        "Error fetching connections:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    console.log("Updated connections:", connections);
  }, [connections]);

  if(!connections) return;
  if(connections.length<0) return <h1>No connections</h1>
  return (
    <div className="flex justify-center items-center">
     
        <div className="p-10">
             <h1>My Connections</h1>
      {connections?.map((c) => (
        
        <div className="w-40  my-2" key={c._id}>
            <div className="flex p-2 rounded-md justify-between gap-4 border-2 border-amber-50">
            <img className="w-10 rounded-full" src={c?.photoUrl} alt="" />
          <h2>{c?.firstName}</h2>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Connections;
