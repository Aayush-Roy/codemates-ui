// // import axios from 'axios';
// // import React, { use, useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { BASE_URL } from '../../utils/constants';
// // import UserCard from './UserCard';
// // import { addUser } from '../../utils/userSlice';

// // const EditProfile = ({user}) => {
// //   console.log("users from props", {user})
 
// //      const [firstName, setFirstName] = useState(user?.firstName);
// //        const [lastName,setLastName] = useState(user.lastName);
// //        const [age,setAge] = useState(user.age || "")
// //        const [about, setAbout] = useState(user.about || "")
// //        const [gender, setGender] = useState(user.gender || "");
// //        const[error,setError] = useState("")
// //        const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
// //        const dispatch = useDispatch();
// //       //  const handleEditProfile = async()=>{
// //       //   try{
// //       //       const res = await axios.patch(`${BASE_URL}/profile/edit`,{
// //       //           firstName, lastName, age, about, gender, photoUrl
// //       //       }, {withCredentials:true})
// //       //       console.log("profile updated", res.data)
// //       //   }catch(err){
// //       //       console.log("Something went wrong in Edit profile: ", err)
// //       //   }
// //       //  }

// //       const handleEditProfile = async () => {
// //   try {
// //      setError("")
// //     const res = await axios.patch(
// //       `${BASE_URL}/profile/edit`,
// //       {
// //         firstName,
// //         lastName,
// //         age: age === "" ? undefined : Number(age),
// //         about,
// //         gender,
// //         photoUrl,
// //       },
// //       { withCredentials: true }
// //     );
// //     addUser(res.data?.data)
// //     console.log("Profile updated:", res.data);
// //     setError("");
// //   } catch (err) {
// //     console.log("profile Edit Error: ", err)
// //     console.error(
// //       "Edit profile error:",
// //       err.response?.data || err.message
// //     );
// //     setError(err.response?.data?.message || err.message);
// //   }
// // };
// //   return (
// //     <>
// //     <div className='flex justify-center items-center' >

// //     <div className="flex justify-center items-center mt-0">

    
// //     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
// //   <legend className="fieldset-legend">Edit your Profile</legend>

// //   <label className="label">First Name</label>
// //   <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input" placeholder="Fisrt Name" />

// //   <label className="label">Last Name</label>
// //   <input value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="input" placeholder="Last Name" />

  
// //   <label className="label">PhotoUrl</label>
// //   <input value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}  className="input" placeholder="Enter your photo" />

// //    <label className="label">Age</label>
// //   <input value={age} onChange={(e)=>setAge(e.target.value)}  className="input" type='number' />

// //   <label className="label">Gender</label>
// //   <input value={gender} onChange={(e)=>setGender(e.target.value)}  className="input"  />

// //    <label className="label">About</label>
// //   <textarea value={about} onChange={(e)=>setAbout(e.target.value)}  className="input" placeholder="Your Bio" />
// //   <p className="text-red-500">{error}</p>
// //   <button onClick={handleEditProfile} className="btn btn-neutral mt-4">Update Profile</button>
// // </fieldset>
// // </div>

// //     {/* {profile info} */}
// //     <UserCard users={{firstName, lastName, age, gender, about, photoUrl}}/>

// //     </div>
// //     </>
   
// //   )
// // }

// // export default EditProfile


// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../../utils/constants";
// import { addUser } from "../../utils/userSlice";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");
//   const [age, setAge] = useState(user?.age || "");
//   const [about, setAbout] = useState(user?.about || "");
//   const [gender, setGender] = useState(user?.gender || "");
//   const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
//   const [error, setError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const dispatch = useDispatch();

//   const handleEditProfile = async () => {
//     try {
//       setError("");
//       setSaved(false);
//       setSaving(true);
//       const res = await axios.patch(
//         `${BASE_URL}/profile/edit`,
//         {
//           firstName,
//           lastName,
//           age: age === "" ? undefined : Number(age),
//           about,
//           gender,
//           photoUrl,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data?.data));
//       setSaved(true);
//       setTimeout(() => setSaved(false), 3000);
//     } catch (err) {
//       console.error("Edit profile error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-8 lg:flex-row lg:items-start lg:justify-center">
//       {/* Form */}
//       <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
//         <h2 className="text-2xl font-bold">Edit your Profile</h2>
//         <p className="mb-5 text-sm text-base-content/60">
//           Right side mein dekho, tumhara card aisa dikhega
//         </p>

//         <div className="grid grid-cols-2 gap-3">
//           <label className="form-control">
//             <span className="mb-1 text-sm text-base-content/70">First name</span>
//             <input
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="input input-bordered w-full"
//               placeholder="First name"
//             />
//           </label>
//           <label className="form-control">
//             <span className="mb-1 text-sm text-base-content/70">Last name</span>
//             <input
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="input input-bordered w-full"
//               placeholder="Last name"
//             />
//           </label>
//         </div>

//         <label className="form-control mt-3">
//           <span className="mb-1 text-sm text-base-content/70">Photo URL</span>
//           <input
//             value={photoUrl}
//             onChange={(e) => setPhotoUrl(e.target.value)}
//             className="input input-bordered w-full"
//             placeholder="https://..."
//           />
//         </label>

//         <div className="mt-3 grid grid-cols-2 gap-3">
//           <label className="form-control">
//             <span className="mb-1 text-sm text-base-content/70">Age</span>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="input input-bordered w-full"
//               placeholder="22"
//             />
//           </label>
//           <label className="form-control">
//             <span className="mb-1 text-sm text-base-content/70">Gender</span>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </label>
//         </div>

//         <label className="form-control mt-3">
//           <span className="mb-1 text-sm text-base-content/70">About</span>
//           <textarea
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             rows={4}
//             className="textarea textarea-bordered w-full"
//             placeholder="Apne baare mein likho..."
//           />
//         </label>

//         {error && <p className="mt-3 text-sm text-error">{error}</p>}
//         {saved && <p className="mt-3 text-sm text-success">✓ Profile updated</p>}

//         <button
//           onClick={handleEditProfile}
//           disabled={saving}
//           className="btn mt-5 w-full rounded-full border-0 bg-gradient-to-r from-primary to-secondary text-white"
//         >
//           {saving ? <span className="loading loading-spinner loading-sm" /> : "Update Profile"}
//         </button>
//       </div>

//       {/* Live preview */}
//       <div className="w-full max-w-sm">
//         <p className="mb-2 text-center text-xs uppercase tracking-wider text-base-content/50">
//           Preview
//         </p>
//         <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
//           <div className="relative h-96 bg-base-300">
//             {photoUrl ? (
//               <img
//                 src={photoUrl}
//                 alt={firstName}
//                 className="h-full w-full object-cover"
//                 onError={(e) => (e.currentTarget.style.display = "none")}
//               />
//             ) : (
//               <div className="flex h-full items-center justify-center text-7xl font-bold text-base-content/30">
//                 {(firstName || "?").charAt(0).toUpperCase()}
//               </div>
//             )}
//             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16 text-white">
//               <h3 className="text-2xl font-bold">
//                 {firstName} {lastName}
//                 {age !== "" && <span className="ml-2 font-normal">{age}</span>}
//               </h3>
//               {gender && <p className="text-sm capitalize text-white/80">{gender}</p>}
//               {about && <p className="mt-1 line-clamp-3 text-sm text-white/90">{about}</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  const addSkill = () => {
    // comma se bhi alag-alag skills add ho jayengi: "react, node"
    const newSkills = skillInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (newSkills.length === 0) return;

    setSkills((prev) => {
      const merged = [...prev];
      newSkills.forEach((s) => {
        const exists = merged.some((m) => m.toLowerCase() === s.toLowerCase());
        if (!exists && merged.length < 10) merged.push(s);
      });
      return merged;
    });
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // comma type hone se roko
      addSkill();
    } else if (e.key === "Backspace" && !skillInput && skills.length) {
      setSkills((prev) => prev.slice(0, -1)); // khali input pe backspace = last chip hatao
    }
  };

  const handleEditProfile = async () => {
    try {
      setError("");
      setSaved(false);
      setSaving(true);
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age: age === "" ? undefined : Number(age),
          about,
          gender,
          photoUrl,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Edit profile error:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-8 lg:flex-row lg:items-start lg:justify-center">
      {/* Form */}
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
        <h2 className="text-2xl font-bold">Edit your Profile</h2>
        <p className="mb-5 text-sm text-base-content/60">
          Right side mein dekho, tumhara card aisa dikhega
        </p>

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

        <label className="form-control mt-3">
          <span className="mb-1 text-sm text-base-content/70">Photo URL</span>
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://..."
          />
        </label>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="form-control">
            <span className="mb-1 text-sm text-base-content/70">Age</span>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
              placeholder="22"
            />
          </label>
          <label className="form-control">
            <span className="mb-1 text-sm text-base-content/70">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
        </div>

        {/* Skills */}
        <label className="form-control mt-3 block">
          <span className="mb-1 block text-sm text-base-content/70">
            Skills{" "}
            <span className="text-base-content/40">
              (Enter dabao add karne ke liye, max 10)
            </span>
          </span>

          <div className="flex flex-wrap items-center gap-2 rounded-field border border-base-300 bg-base-100 p-2 focus-within:border-primary">
            {skills.map((s) => (
              <span key={s} className="badge badge-primary badge-lg gap-1.5">
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="text-xs opacity-70 hover:opacity-100"
                  aria-label={`Remove ${s}`}
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              onBlur={addSkill}
              placeholder={skills.length ? "" : "React, Node, TypeScript..."}
              className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm outline-none"
            />
          </div>
        </label>

        <label className="form-control mt-3">
          <span className="mb-1 text-sm text-base-content/70">About</span>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Apne baare mein likho..."
          />
        </label>

        {error && <p className="mt-3 text-sm text-error">{error}</p>}
        {saved && <p className="mt-3 text-sm text-success">✓ Profile updated</p>}

        <button
          onClick={handleEditProfile}
          disabled={saving}
          className="btn mt-5 w-full rounded-full border-0 bg-gradient-to-r from-primary to-secondary text-white"
        >
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Update Profile"}
        </button>
      </div>

      {/* Live preview */}
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center text-xs uppercase tracking-wider text-base-content/50">
          Preview
        </p>
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
          <div className="relative h-96 bg-base-300">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={firstName}
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl font-bold text-base-content/30">
                {(firstName || "?").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16 text-white">
              <h3 className="text-2xl font-bold">
                {firstName} {lastName}
                {age !== "" && <span className="ml-2 font-normal">{age}</span>}
              </h3>
              {gender && <p className="text-sm capitalize text-white/80">{gender}</p>}
              {about && <p className="mt-1 line-clamp-3 text-sm text-white/90">{about}</p>}
              {skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skills.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs backdrop-blur"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;