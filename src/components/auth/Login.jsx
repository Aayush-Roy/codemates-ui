// import axios, { HttpStatusCode } from "axios";
// import { useState } from "react"
// import { useDispatch } from "react-redux";
// import { addUser } from "../../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../utils/constants";


// const Login = () => {
//   const[firstName,setFirstName] = useState("")
//   const[lastName,setLastName] = useState("")
//   const[isLoginForm,setIsLoginForm] = useState(true)
//    const [email, setEmailId] = useState("");
//    const [password, setPassword] = useState("");
//    const[error,setError] = useState("")
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//     const handleLogin = async()=>{
//       try{
//         const res = await axios.post(`${BASE_URL}/login`,{
//           email,password
//         },{withCredentials:true})
//         console.log("login btn clicked")
//         console.log(res);
//         dispatch(addUser(res.data));
//         return navigate("/")
//       }catch(err){
       
//         setError(err.response?.data?.message)
//         console.log("Error",err.response)
//       }
//     }  

//     const handleSignUp= async()=>{
//       try{
//         const res = await axios.post(`${BASE_URL}/signup`,{firstName, lastName,email,password},{withCredentials:true}); 
//         dispatch(addUser(res.data?.data));
//         navigate('/profile')
//       }catch(err){
//         console.log("Something went wrong while Signup: ", err);
//          setError(err.response?.data?.message)
//       }
//     }

//   return (
//     <div className="flex justify-center items-center mt-30">

    
//     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
//   <legend className="fieldset-legend">{ isLoginForm ?  'Login' : 'Sign-up'}</legend>

//      {!isLoginForm && <> <label className="label">First Name</label>
//   <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input" placeholder="first name" />

//   <label className="label">Last Name</label>
//   <input value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="input" placeholder="last name" />
//   </>
//   }
  
//   <label className="label">Email</label>
//   <input value={email} onChange={(e)=>setEmailId(e.target.value)} type="email" className="input" placeholder="Email" />

//   <label className="label">Password</label>
//   <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
  
//   <p className="text-red-500">{error}</p>
//   <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-neutral mt-4">{isLoginForm ? "Login" : "Signup"}</button>
//   <p className="cursor-pointer" onClick={()=>setIsLoginForm(value=>!value)}>{isLoginForm ? "New User? Signup here" : "Existing user? Login here"}</p>
// </fieldset>
// </div>
// )
// }

// export default Login

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log("Error", err.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log("Something went wrong while Signup: ", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Enter dabane pe bhi submit hoga
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white shadow-lg">
            {"</>"}
          </div>
          <h1 className="text-3xl font-extrabold">
            {isLoginForm ? "Welcome back" : "Join "}
            {!isLoginForm && (
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Code Mates
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-base-content/60">
            {isLoginForm
              ? "Apne dev match se connect ho jao"
              : "Apna account banao aur devs se connect karo"}
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl"
        >
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-3">
              <label className="form-control">
                <span className="mb-1 text-sm text-base-content/70">First name</span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="First name"
                />
              </label>
              <label className="form-control">
                <span className="mb-1 text-sm text-base-content/70">Last name</span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Last name"
                />
              </label>
            </div>
          )}

          <label className="form-control mt-3 block">
            <span className="mb-1 block text-sm text-base-content/70">Email</span>
            <input
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
          </label>

          <label className="form-control mt-3 block">
            <span className="mb-1 block text-sm text-base-content/70">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <div className="mt-4 rounded-xl bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn mt-5 w-full rounded-full border-0 bg-gradient-to-r from-primary to-secondary text-white"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign up"
            )}
          </button>

          <p className="mt-4 text-center text-sm text-base-content/70">
            {isLoginForm ? "New user? " : "Existing user? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginForm((v) => !v);
                setError("");
              }}
              className="font-semibold text-primary hover:underline"
            >
              {isLoginForm ? "Sign up here" : "Login here"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;