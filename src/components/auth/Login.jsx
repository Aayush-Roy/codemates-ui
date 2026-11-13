
// import axios from "axios";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../utils/constants";

// const Login = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [email, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.post(
//         `${BASE_URL}/login`,
//         { email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data?.data));
//       return navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       console.log("Error", err.response);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.post(
//         `${BASE_URL}/signup`,
//         { firstName, lastName, email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data?.data));
//       navigate("/profile");
//     } catch (err) {
//       console.log("Something went wrong while Signup: ", err);
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Enter dabane pe bhi submit hoga
//     isLoginForm ? handleLogin() : handleSignUp();
//   };

//   return (
//     <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-10">
//       <div className="w-full max-w-sm">
//         {/* Brand */}
//         <div className="mb-6 text-center">
//           <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl  text-2xl font-bold text-white shadow-lg">
//            <img src="/logo.png" alt="" />
//           </div>
//           <h1 className="text-3xl font-extrabold">
//             {isLoginForm ? "Welcome back" : "Join "}
//             {!isLoginForm && (
//               <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                
//                 Code Mates
//               </span>
//             )}
//           </h1>
//           <p className="mt-1 text-sm text-base-content/60">
//             {isLoginForm
//               ? "Apne dev match se connect ho jao"
//               : "Apna account banao aur devs se connect karo"}
//           </p>
//         </div>

//         {/* Card */}
//         <form
//           onSubmit={handleSubmit}
//           className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl"
//         >
//           {!isLoginForm && (
//             <div className="grid grid-cols-2 gap-3">
//               <label className="form-control">
//                 <span className="mb-1 text-sm text-base-content/70">First name</span>
//                 <input
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="input input-bordered w-full"
//                   placeholder="First name"
//                 />
//               </label>
//               <label className="form-control">
//                 <span className="mb-1 text-sm text-base-content/70">Last name</span>
//                 <input
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="input input-bordered w-full"
//                   placeholder="Last name"
//                 />
//               </label>
//             </div>
//           )}

//           <label className="form-control mt-3 block">
//             <span className="mb-1 block text-sm text-base-content/70">Email</span>
//             <input
//               value={email}
//               onChange={(e) => setEmailId(e.target.value)}
//               type="email"
//               className="input input-bordered w-full"
//               placeholder="you@example.com"
//             />
//           </label>

//           <label className="form-control mt-3 block">
//             <span className="mb-1 block text-sm text-base-content/70">Password</span>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               className="input input-bordered w-full"
//               placeholder="••••••••"
//             />
//           </label>

//           {error && (
//             <div className="mt-4 rounded-xl bg-error/10 px-3 py-2 text-sm text-error">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn mt-5 w-full rounded-full border-0 bg-gradient-to-r from-primary to-secondary text-white"
//           >
//             {loading ? (
//               <span className="loading loading-spinner loading-sm" />
//             ) : isLoginForm ? (
//               "Login"
//             ) : (
//               "Sign up"
//             )}
//           </button>

//           <p className="mt-4 text-center text-sm text-base-content/70">
//             {isLoginForm ? "New user? " : "Existing user? "}
//             <button
//               type="button"
//               onClick={() => {
//                 setIsLoginForm((v) => !v);
//                 setError("");
//               }}
//               className="font-semibold text-primary hover:underline"
//             >
//               {isLoginForm ? "Sign up here" : "Login here"}
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

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
    <div className="grid min-h-[calc(100dvh-64px)] lg:grid-cols-2">
      {/* LEFT: Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="mb-8">
            <img src="/logo.png" alt="Code Mates" className="mb-4 h-12 w-12 object-contain" />
            <h1 className="text-4xl font-extrabold tracking-tight">
              {isLoginForm ? "Welcome back" : "Join "}
              {!isLoginForm && (
                <span className="bg-gradient-to-r from-[#fd267a] to-[#ff7854] bg-clip-text text-transparent">
                  Code Mates
                </span>
              )}
            </h1>
            <p className="mt-2 text-sm text-base-content/60">
              {isLoginForm
                ? "Apne dev match se connect ho jao"
                : "Apna account banao aur devs se connect karo"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <label className="form-control">
                  <span className="mb-1 text-sm text-base-content/70">First name</span>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full rounded-full focus:border-[#fd267a] focus:outline-[#fd267a]"
                    placeholder="First name"
                  />
                </label>
                <label className="form-control">
                  <span className="mb-1 text-sm text-base-content/70">Last name</span>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full rounded-full focus:border-[#fd267a] focus:outline-[#fd267a]"
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
                className="input input-bordered w-full rounded-full focus:border-[#fd267a] focus:outline-[#fd267a]"
                placeholder="you@example.com"
              />
            </label>

            <label className="form-control mt-3 block">
              <span className="mb-1 block text-sm text-base-content/70">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input input-bordered w-full rounded-full focus:border-[#fd267a] focus:outline-[#fd267a]"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <div className="mt-4 rounded-2xl bg-error/10 px-4 py-2 text-sm text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn mt-6 h-12 w-full rounded-full border-0 bg-gradient-to-r from-[#fd267a] to-[#ff7854] text-base font-bold text-white shadow-lg shadow-[#fd267a]/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : isLoginForm ? (
                "Login"
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-base-content/50">
            <span className="h-px flex-1 bg-base-300" />
            or
            <span className="h-px flex-1 bg-base-300" />
          </div>

          {/* Google button (UI only — onClick baad me lagana) */}
          <button
            type="button"
            className="btn h-12 w-full rounded-full border-2 border-base-300 bg-base-100 font-semibold hover:border-[#fd267a]/60 hover:bg-base-200"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
              <path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 16.4 0 20.1 0 24s1 7.6 2.6 10.8l7.8-6.1z" />
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.4-5.7c-2 1.4-4.7 2.2-7.8 2.2-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-base-content/70">
            {isLoginForm ? "New user? " : "Existing user? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginForm((v) => !v);
                setError("");
              }}
              className="font-semibold text-[#fd267a] hover:underline"
            >
              {isLoginForm ? "Sign up here" : "Login here"}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT: Textured Tinder-style panel (sirf desktop pe) */}
      <div
        className="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px), linear-gradient(135deg, #fd267a 0%, #ff4b5c 45%, #ff7854 100%)",
          backgroundSize: "22px 22px, 100% 100%",
        }}
      >
        {/* soft glow blobs */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#ffb199]/40 blur-3xl" />

        <div className="relative flex flex-col items-center px-10 text-center text-white">
          {/* Card stack */}
          <div className="relative mb-12 h-72 w-64">
            <div className="absolute inset-0 -rotate-12 rounded-3xl bg-white/25 shadow-xl backdrop-blur" />
            <div className="absolute inset-0 rotate-6 rounded-3xl bg-white/40 shadow-xl backdrop-blur" />
            <div className="absolute inset-0 -rotate-2 rounded-3xl bg-white p-4 text-left text-neutral shadow-2xl">
              <div className="flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fd267a]/15 to-[#ff7854]/25 text-6xl">
                👩‍💻
              </div>
              <p className="mt-3 text-lg font-bold">Riya, 24</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-[#fd267a]/10 px-2.5 py-0.5 text-xs font-medium text-[#fd267a]">React</span>
                <span className="rounded-full bg-[#fd267a]/10 px-2.5 py-0.5 text-xs font-medium text-[#fd267a]">Node.js</span>
                <span className="rounded-full bg-[#fd267a]/10 px-2.5 py-0.5 text-xs font-medium text-[#fd267a]">Postgres</span>
              </div>
            </div>
            {/* swipe badges */}
            <span className="absolute -left-6 top-6 -rotate-12 rounded-lg border-4 border-white px-2 py-0.5 text-lg font-extrabold tracking-wide text-white">
              NOPE
            </span>
            <span className="absolute -right-8 top-10 rotate-12 rounded-lg border-4 border-[#4ade80] bg-white/90 px-2 py-0.5 text-lg font-extrabold tracking-wide text-[#16a34a]">
              LIKE
            </span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight">
            Swipe right on
            <br />
            your next dev partner
          </h2>
          <p className="mt-3 max-w-xs text-sm text-white/85">
            Find developers who match your stack, your goals and your ideas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;