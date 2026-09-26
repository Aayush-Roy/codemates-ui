import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";


const Login = () => {
   const [email, setEmailId] = useState("kajal@gmail.com");
   const [password, setPassword] = useState("Kajal@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogin = async()=>{
    try{
      const res = await axios.post(`${BASE_URL}/login`,{
        email,password
      },{withCredentials:true})
      console.log("login btn clicked")
      console.log(res);
      dispatch(addUser(res.data));
      return navigate("/")
    }catch(err){
      console.log("something went wrong while login", err)
    }
   }

  return (
    <div className="flex justify-center items-center mt-30">

    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input value={email} onChange={(e)=>setEmailId(e.target.value)} type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

  <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
</fieldset>
</div>
)
}

export default Login
