import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async()=>{
    try{
      const res = await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true})
      dispatch(removeUser())
      navigate("/login")
    }catch(err){
      console.log(err);
    }
  }
 
  return (
    <div className="navbar bg-neutral shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Code Mates</Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input w-24 md:w-auto" />
    {user && <div className="dropdown dropdown-end">
       
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       
        <div className="w-10 rounded-full">
          
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
            
        </div>
        
      </div>
      <p>{user.firstName}</p>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>

        <Link to="/connections"><a>My connections</a></Link>
        </li>
         <li>

        <Link to="/requests"><a>Requests</a></Link>
        </li>

        <li>

        <Link to="/premium"><a>Premium</a></Link>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Navbar
