import axios, { HttpStatusCode } from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";


const Login = () => {
  const[firstName,setFirstName] = useState("")
  const[lastName,setLastName] = useState("")
  const[isLoginForm,setIsLoginForm] = useState(true)
   const [email, setEmailId] = useState("");
   const [password, setPassword] = useState("");
   const[error,setError] = useState("")
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
       
        setError(err.response?.data?.message)
        console.log("Error",err.response)
      }
    }  

    const handleSignUp= async()=>{
      try{
        const res = await axios.post(`${BASE_URL}/signup`,{firstName, lastName,email,password},{withCredentials:true}); 
        dispatch(addUser(res.data?.data));
        navigate('/profile')
      }catch(err){
        console.log("Something went wrong while Signup: ", err);
         setError(err.response?.data?.message)
      }
    }

  return (
    <div className="flex justify-center items-center mt-30">

    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">{ isLoginForm ?  'Login' : 'Sign-up'}</legend>

     {!isLoginForm && <> <label className="label">First Name</label>
  <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input" placeholder="first name" />

  <label className="label">Last Name</label>
  <input value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="input" placeholder="last name" />
  </>
  }
  
  <label className="label">Email</label>
  <input value={email} onChange={(e)=>setEmailId(e.target.value)} type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
  
  <p className="text-red-500">{error}</p>
  <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-neutral mt-4">{isLoginForm ? "Login" : "Signup"}</button>
  <p className="cursor-pointer" onClick={()=>setIsLoginForm(value=>!value)}>{isLoginForm ? "New User? Signup here" : "Existing user? Login here"}</p>
</fieldset>
</div>
)
}

export default Login
