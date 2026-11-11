// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux';
// import { addFeed } from '../utils/feedSlice';
// import UserCard from './ui/UserCard';

// const Feed = () => {
//   const feed = useSelector(store=>store.feed)
//   const dispatch = useDispatch();
//   const getUserFeed = async()=>{
      
//     try{
//       const res = await axios.get(`${BASE_URL}/feed`,{withCredentials:true});
//       dispatch(addFeed(res.data))
//       console.log("feed:", res)
//     }catch(err){
//       console.log("Error fetching in Feed:", err);
//     }

//   }
//   useEffect(()=>{
//     getUserFeed();
//   },[])
//   if(!feed) return;
//   if(feed.length <=0) return <h1>No New Users Found!</h1>
//   return (
//     feed && (
//        <div className='flex justify-center items-center my-10'>
//      <UserCard users={feed[0]}/>
//     </div>
//     )
   
//   )
// }

// export default Feed


// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFeed } from '../utils/feedSlice';
// import UserCard from './ui/UserCard';

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getUserFeed = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/feed`, {
//         withCredentials: true,
//       });

//       dispatch(addFeed(res.data));
//       console.log('Feed:', res.data);
//     } catch (err) {
//       console.error(
//         'Feed error:',
//         err.response?.status,
//         err.response?.data || err.message
//       );
//     }
//   };

//   useEffect(() => {
//     getUserFeed();
//   }, []);

//   if (!feed) return null;

//   if (feed.length <= 0) {
//     return <h1>No New Users Found!</h1>;
//   }

//   return (
//     <div className="flex justify-center items-center my-10">
//       <UserCard users={feed[0]} />
//     </div>
//   );
// };

// export default Feed;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const THRESHOLD = 100; // itna kheencho to swipe count hoga

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [dx, setDx] = useState(0);
  const [startX, setStartX] = useState(null);
  const [leaving, setLeaving] = useState(false);

  const getUserFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Feed error:", err.response?.status, err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-2 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="text-xl font-semibold">No New Users Found!</h1>
        <p className="text-sm text-base-content/60">Thodi der baad dobara check karo.</p>
      </div>
    );
  }

  const user = feed[0];

  // dir: "left" (ignore) | "right" (interested) | "skip" (sirf next, request nahi)
  const act = async (dir) => {
    if (leaving) return;
    setLeaving(true);
    setDx(dir === "left" ? -700 : dir === "right" ? 700 : 0);

    if (dir !== "skip") {
      const status = dir === "right" ? "interested" : "ignored";
      // ⚠️ apne request route ke hisaab se check kar lena (neeche note dekho)
      axios
        .post(`${BASE_URL}/request/send/${status}/${user._id}`, {}, { withCredentials: true })
        .catch((err) => console.error("Request error:", err.response?.data || err.message));
    }

    setTimeout(() => {
      dispatch(addFeed(feed.slice(1)));
      setDx(0);
      setLeaving(false);
    }, 250);
  };

  const onPointerDown = (e) => {
    if (leaving) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setStartX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (startX === null) return;
    setDx(e.clientX - startX);
  };
  const onPointerUp = () => {
    if (startX === null) return;
    setStartX(null);
    if (dx > THRESHOLD) act("right");
    else if (dx < -THRESHOLD) act("left");
    else setDx(0);
  };

  const dragging = startX !== null;
  const rotate = dx / 20;
  const likeOpacity = Math.min(Math.max(dx / THRESHOLD, 0), 1);
  const nopeOpacity = Math.min(Math.max(-dx / THRESHOLD, 0), 1);

  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-6 overflow-hidden px-4 py-6">
      {/* Card */}
      <div
        key={user._id}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          transform: `translateX(${dx}px) rotate(${rotate}deg)`,
          transition: dragging ? "none" : "transform 0.25s ease",
          touchAction: "pan-y",
        }}
        className="relative w-full max-w-sm cursor-grab select-none overflow-hidden rounded-3xl bg-base-100 shadow-xl active:cursor-grabbing"
      >
        {/* Photo */}
        <div className="relative h-[28rem] w-full bg-base-300">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.firstName}
              draggable={false}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl font-bold text-base-content/30">
              {(user.firstName || "?").charAt(0).toUpperCase()}
            </div>
          )}

          {/* Bottom gradient + info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16 text-white">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
              {user.age != null && <span className="ml-2 font-normal">{user.age}</span>}
            </h2>
            {user.gender && (
              <p className="text-sm capitalize text-white/80">{user.gender}</p>
            )}
            {user.about && (
              <p className="mt-1 line-clamp-2 text-sm text-white/90">{user.about}</p>
            )}
            {user.skills?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {user.skills.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs backdrop-blur">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* LIKE / NOPE stamps */}
          <div
            style={{ opacity: likeOpacity }}
            className="absolute left-5 top-6 -rotate-12 rounded-lg border-4 border-green-400 px-3 py-1 text-2xl font-extrabold tracking-wider text-green-400"
          >
            INTERESTED
          </div>
          <div
            style={{ opacity: nopeOpacity }}
            className="absolute right-5 top-6 rotate-12 rounded-lg border-4 border-red-400 px-3 py-1 text-2xl font-extrabold tracking-wider text-red-400"
          >
            IGNORE
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => act("left")}
          disabled={leaving}
          className="btn btn-circle btn-lg border-red-400 bg-base-100 text-2xl text-red-500 shadow-md hover:bg-red-500 hover:text-white"
          aria-label="Ignore"
        >
          ✕
        </button>

        <button
          onClick={() => act("skip")}
          disabled={leaving}
          className="btn btn-circle btn-md bg-base-100 text-lg shadow-md"
          aria-label="Next"
          title="Next (skip)"
        >
          ➜
        </button>

        <button
          onClick={() => act("right")}
          disabled={leaving}
          className="btn btn-circle btn-lg border-green-400 bg-base-100 text-2xl text-green-500 shadow-md hover:bg-green-500 hover:text-white"
          aria-label="Interested"
        >
          ♥
        </button>
      </div>

      <p className="text-xs text-base-content/50">
        ← ignore · interested → · ➜ sirf next
      </p>
    </div>
  );
};

export default Feed;