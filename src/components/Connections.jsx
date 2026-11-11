
// import axios from "axios";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { addConnection } from "../utils/connectionsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const Connections = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const connections = useSelector(
//     (store) => store.connection
//   );

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/user/connections`,
//         { withCredentials: true }
//       );

//       console.log("API response:", res.data);

//       dispatch(addConnection(res.data.data));
//     } catch (err) {
//       console.log(
//         "Error fetching connections:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   useEffect(() => {
//     console.log("Updated connections:", connections);
//   }, [connections]);

//   if(!connections) return;
//   if(connections.length<0) return <h1>No connections</h1>
  
// if (!connections) return null;

// return (
//   <div className="min-h-screen bg-base-200 px-4 py-8">
//     <div className="mx-auto max-w-5xl">
//       <h1 className="mb-6 text-3xl font-bold">
//         My Connections
//       </h1>

//       {connections.length === 0 ? (
//         <div className="card bg-base-100 shadow-sm">
//           <div className="card-body items-center text-center py-12">
//             <h2 className="text-xl font-semibold">
//               No Connections Yet
//             </h2>
//             <p className="text-base-content/60">
//               Your connections will appear here.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {connections.map((c) => (
//             <div
//               key={c._id}
//               className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="card-body items-center text-center">
//                 {c.photoUrl && (
//                   <img
//                     src={c.photoUrl}
//                     alt={c.firstName || "Connection"}
//                     className="h-20 w-20 rounded-full object-cover border-2 border-base-300"
//                   />
//                 )}

//                 {c.firstName && (
//                   <h2 className="card-title text-xl">
//                     {c.firstName}
//                     {c.lastName ? ` ${c.lastName}` : ""}
//                   </h2>
//                 )}

//                 {(c.age != null || c.gender) && (
//                   <div className="flex flex-wrap justify-center gap-2">
//                     {c.age != null && (
//                       <span className="badge badge-outline">
//                         {c.age} years
//                       </span>
//                     )}

//                     {c.gender && (
//                       <span className="badge badge-outline">
//                         {c.gender}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {c.about && (
//                   <p className="text-sm text-base-content/70 mt-2">
//                     {c.about}
//                   </p>
//                 )}
//                 <Link to={`/chat/${c._id}`}>
                
//                 <button className="cursor-pointer bg-blue-600 px-6 py-4">Chat</button>
//                 </Link>
                
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// );

// };

// export default Connections;

import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

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

  if (!connections) return null;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Connections</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Apne connections ke saath chat karo
            </p>
          </div>
          <span className="badge badge-primary badge-lg">
            {connections.length}
          </span>
        </div>

        {connections.length === 0 ? (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center text-center py-16">
              <div className="text-5xl">🤝</div>
              <h2 className="text-xl font-semibold">No Connections Yet</h2>
              <p className="text-base-content/60">
                Your connections will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((c) => (
              <div
                key={c._id}
                className="group card bg-base-100 border border-base-300 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="card-body items-center text-center p-6">
                  {/* Avatar */}
                  <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-[3px]">
                    {c.photoUrl ? (
                      <img
                        src={c.photoUrl}
                        alt={c.firstName || "Connection"}
                        className="h-24 w-24 rounded-full border-4 border-base-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-base-100 bg-base-300 text-3xl font-semibold">
                        {(c.firstName || "?").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  {c.firstName && (
                    <h2 className="mt-3 text-xl font-semibold">
                      {c.firstName}
                      {c.lastName ? ` ${c.lastName}` : ""}
                    </h2>
                  )}

                  {/* Age / gender */}
                  {(c.age != null || c.gender) && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {c.age != null && (
                        <span className="badge badge-outline">{c.age} years</span>
                      )}
                      {c.gender && (
                        <span className="badge badge-outline capitalize">
                          {c.gender}
                        </span>
                      )}
                    </div>
                  )}

                  {/* About */}
                  {c.about && (
                    <p className="mt-1 line-clamp-2 text-sm text-base-content/70">
                      {c.about}
                    </p>
                  )}

                  {/* Chat button */}
                  <Link to={`/chat/${c._id}`} className="mt-4 w-full">
                    <button className="btn btn-primary w-full rounded-full">
                      💬 Chat
                    </button>
                  </Link>
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