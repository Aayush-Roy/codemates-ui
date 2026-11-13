// import axios from 'axios'
// import React from 'react'
// import { BASE_URL } from '../utils/constants'

// const Premium = () => {
//   const handleBuy= async (type)=>{
//     console.log("fe", type)
//     try{
//       const order = await axios.post(`${BASE_URL}/payment/create`,{
//         membershipType:type,
//       },{withCredentials:true})

//       const {amount, keyId, currency, notes, orderId} = order.data;
//       console.log("amount", amount)
//       const options = {
//         key: keyId, // Replace with your Razorpay key_id
//         amount: amount, // Amount is in currency subunits.
//         currency: 'INR',
//         name: 'Codemates',
//         description: 'Test Transaction',
//         order_id: orderId, // This is the order_id created in the backend
//         prefill: {
//           name: notes.firstName+" " +notes.lastname,
//           email: notes.emailId,

//         },
//         theme: {
//           color: '#F37254'
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//       console.log(order)
//     }catch(err){
//       console.log("Something went wrong while purchasing",err)
//     }
//   }
//   return (
//     <div className='flex m-10 justify-center items-center gap-10'>
//      <div className='bg-zinc-900 p-10'>
//         <h1>Silver Membership</h1>
//         <button onClick={()=>handleBuy("silver")} className='bg-teal-300 px-10 py-2'>Silver</button>
//      </div>
//      OR
//      <div  className='bg-zinc-900 p-10'>
//         <h1>Gold Membership</h1>
//         <button onClick={()=>handleBuy("gold")} className='bg-amber-300 px-10 py-2'>gold</button>
//      </div>
//     </div>
//   )
// }

// export default Premium

import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const plans = [
  {
    type: "silver",
    name: "Silver",
    emoji: "🥈",
    tagline: "Shuruaat ke liye",
    features: [
      "Chat with connections",
      "100 connection requests / day",
      "Blue tick",
      "3 months validity",
    ],
    accent: "from-slate-300 to-slate-500",
  },
  {
    type: "gold",
    name: "Gold",
    emoji: "🥇",
    tagline: "Sabse popular",
    popular: true,
    features: [
      "Chat with connections",
      "Unlimited connection requests",
      "Blue tick",
      "6 months validity",
    ],
    accent: "from-primary to-secondary",
  },
];

const Premium = () => {
  const handleBuy = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: "INR",
        name: "Codemates",
        description: "Test Transaction",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#fd267a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Something went wrong while purchasing", err);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold">
          Go{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Premium
          </span>
        </h1>
        <p className="mt-2 text-base-content/60">
          Apna plan chuno aur zyada devs se connect karo
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.type}
            className={`relative flex flex-col rounded-3xl border bg-base-100 p-8 shadow-lg transition-transform hover:-translate-y-1 ${
              p.popular ? "border-primary shadow-primary/20" : "border-base-300"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-bold text-white">
                MOST POPULAR
              </span>
            )}

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-3xl`}
            >
              {p.emoji}
            </div>

            <h2 className="mt-4 text-2xl font-bold">{p.name} Membership</h2>
            <p className="text-sm text-base-content/60">{p.tagline}</p>

            <ul className="my-6 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="text-success">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(p.type)}
              className={`btn w-full rounded-full border-0 text-white ${
                p.popular
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : "bg-neutral hover:bg-neutral/80"
              }`}
            >
              Buy {p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;