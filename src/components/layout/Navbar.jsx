// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../utils/constants";
// import { removeUser } from "../../utils/userSlice";

// const Navbar = () => {
//   const user = useSelector(store=>store.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleLogout = async()=>{
//     try{
//       const res = await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true})
//       dispatch(removeUser())
//       navigate("/login")
//     }catch(err){
//       console.log(err);
//     }
//   }
 
//   return (
//     <div className="navbar bg-neutral shadow-sm">
//   <div className="flex-1">
//     <Link to="/" className="btn btn-ghost text-xl">Code Mates</Link>
//   </div>
//   <div className="flex gap-2">
//     <input type="text" placeholder="Search" className="input w-24 md:w-auto" />
//     {user && <div className="dropdown dropdown-end">
       
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       
//         <div className="w-10 rounded-full">
          
//           <img
//             alt="Tailwind CSS Navbar component"
//             src={user.photoUrl} />
            
//         </div>
        
//       </div>
//       <p>{user.firstName}</p>
//       <ul
//         tabIndex={-1}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <Link to="/profile" className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </Link>
//         </li>
//         <li>

//         <Link to="/connections"><a>My connections</a></Link>
//         </li>
//          <li>

//         <Link to="/requests"><a>Requests</a></Link>
//         </li>

//         <li>

//         <Link to="/premium"><a>Premium</a></Link>
//         </li>
//         <li><a onClick={handleLogout}>Logout</a></li>
//       </ul>
//     </div>}
//   </div>
// </div>
//   )
// }

// export default Navbar

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 h-16 border-b border-base-300 bg-base-100/80 px-4 backdrop-blur">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl ">
          <img src="/logo.png" alt="" />
          </span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-extrabold text-transparent">
            Code Mates
          </span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-base-content/70 sm:block">
            Hi, <span className="font-semibold text-base-content">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100"
            >
              <div className="w-10 rounded-full">
                {user.photoUrl ? (
                  <img alt={user.firstName} src={user.photoUrl} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary font-semibold text-primary-content">
                    {(user.firstName || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  👤 Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">💬 My Connections</Link>
              </li>
              <li>
                <Link to="/requests">📩 Requests</Link>
              </li>
              <li>
                <Link to="/premium">⭐ Premium</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} className="text-error">
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;