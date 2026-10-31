import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
  const handleBuy= async (type)=>{
    console.log("fe", type)
    try{
      const order = await axios.post(`${BASE_URL}/payment/create`,{
        membershipType:type,
      },{withCredentials:true})

      const {amount, keyId, currency, notes, orderId} = order.data;
      console.log("amount", amount)
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'Codemates',
        description: 'Test Transaction',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName+" " +notes.lastname,
          email: notes.emailId,

        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(order)
    }catch(err){
      console.log("Something went wrong while purchasing",err)
    }
  }
  return (
    <div className='flex m-10 justify-center items-center gap-10'>
     <div className='bg-zinc-900 p-10'>
        <h1>Silver Membership</h1>
        <button onClick={()=>handleBuy("silver")} className='bg-teal-300 px-10 py-2'>Silver</button>
     </div>
     OR
     <div  className='bg-zinc-900 p-10'>
        <h1>Gold Membership</h1>
        <button onClick={()=>handleBuy("gold")} className='bg-amber-300 px-10 py-2'>gold</button>
     </div>
    </div>
  )
}

export default Premium
