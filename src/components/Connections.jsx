
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
  
if (!connections) return null;

return (
  <div className="min-h-screen bg-base-200 px-4 py-8">
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-3xl font-bold">
        My Connections
      </h1>

      {connections.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-12">
            <h2 className="text-xl font-semibold">
              No Connections Yet
            </h2>
            <p className="text-base-content/60">
              Your connections will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {connections.map((c) => (
            <div
              key={c._id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body items-center text-center">
                {c.photoUrl && (
                  <img
                    src={c.photoUrl}
                    alt={c.firstName || "Connection"}
                    className="h-20 w-20 rounded-full object-cover border-2 border-base-300"
                  />
                )}

                {c.firstName && (
                  <h2 className="card-title text-xl">
                    {c.firstName}
                    {c.lastName ? ` ${c.lastName}` : ""}
                  </h2>
                )}

                {(c.age != null || c.gender) && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {c.age != null && (
                      <span className="badge badge-outline">
                        {c.age} years
                      </span>
                    )}

                    {c.gender && (
                      <span className="badge badge-outline">
                        {c.gender}
                      </span>
                    )}
                  </div>
                )}

                {c.about && (
                  <p className="text-sm text-base-content/70 mt-2">
                    {c.about}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default Connections;
