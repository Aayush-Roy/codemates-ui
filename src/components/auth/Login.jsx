import { useState } from "react"


const Login = () => {
   const [emailId, setEmailId] = useState("");
   const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center items-center mt-30">

    
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
</div>
)
}

export default Login
