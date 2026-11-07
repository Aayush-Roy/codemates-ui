
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../../utils/socket";
// import { useSelector } from "react-redux";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [message, setMessage] = useState("");
//   const[newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);
//   const user = useSelector(store=>store.user);
//   const userId = user?._id;
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hey! How are you?", sender: "other", time: "10:30 AM" },
//     { id: 2, text: "I'm good! What about you?", sender: "me", time: "10:32 AM" },
//     { id: 3, text: "What are you working on?", sender: "other", time: "10:33 AM" },
//     { id: 4, text: "Building something awesome 🚀", sender: "me", time: "10:35 AM" },
//   ]);


//   useEffect(()=>{
//     if (!userId) return;
//     const socket = createSocketConnection();
//     socket.emit("joinChat",{firstName: user.firstName, userId, targetUserId})
//     return()=>{
//       socket.disconnect()
//     }
//   },[userId, targetUserId])

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = ()=>{
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName:user.firstName,
//       userId,
//       targetUserId,
//       test:newMessage
//     })
//   }

//   return (
//     <div className="flex flex-col h-[calc(100dvh-64px)] min-h-0 w-full bg-base-100 overflow-hidden">

//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 shrink-0">
//         <div className="flex items-center gap-3">
//           <div className="avatar placeholder">
//             <div className="w-11 rounded-full bg-primary text-primary-content">
//               <span className="font-semibold">U</span>
//             </div>
//           </div>

//           <div>
//             <h2 className="font-semibold text-base-content">User</h2>
//             <p className="text-xs text-success">Online</p>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <button className="btn btn-ghost btn-circle btn-sm">📞</button>
//           <button className="btn btn-ghost btn-circle btn-sm">⋮</button>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 min-h-0 overflow-y-auto px-3 py-5 sm:px-6">

//         <div className="text-center mb-6">
//           <span className="text-xs text-base-content/50 bg-base-200 px-3 py-1 rounded-full">
//             Today
//           </span>
//         </div>

//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex w-full mb-4 ${
//               msg.sender === "me" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`flex flex-col max-w-[80%] sm:max-w-[65%] ${
//                 msg.sender === "me" ? "items-end" : "items-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
//                   msg.sender === "me"
//                     ? "bg-primary text-primary-content rounded-br-sm"
//                     : "bg-base-200 text-base-content rounded-bl-sm"
//                 }`}
//               >
//                 {msg.text}
//               </div>

//               <span className="text-[10px] text-base-content/40 mt-1 px-1">
//                 {msg.time}
//               </span>
//             </div>
//           </div>
//         ))}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="shrink-0 p-3 sm:p-4 border-t border-base-300 bg-base-100">
//         <form  className="flex items-center gap-2 max-w-5xl mx-auto">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="input input-bordered bg-base-200 border-base-300 focus:outline-none focus:border-primary flex-1 min-w-0 rounded-full"
//           />

//           <button
//             type="submit"
           
//             onClick={sendMessage}
//             className="btn btn-primary btn-circle shrink-0"
//           >
//             ➤
//           </button>
//         </form>
//       </div>

//     </div>
//   );
// };

// export default Chat;


import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (data) => {
      console.log("Message received:", data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `${Date.now()}-${Math.random()}`,
          text: data.text,
          sender: data.userId === userId ? "me" : "other",
          time: new Date(data.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] min-h-0 w-full bg-base-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="w-11 rounded-full bg-primary text-primary-content">
              <span className="font-semibold">U</span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-base-content">User</h2>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-5 sm:px-6">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full mb-4 ${
              msg.sender === "me"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col max-w-[80%] sm:max-w-[65%] ${
                msg.sender === "me"
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-content rounded-br-sm"
                    : "bg-base-200 text-base-content rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>

              <span className="text-[10px] text-base-content/40 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="shrink-0 p-3 sm:p-4 border-t border-base-300 bg-base-100">
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 max-w-5xl mx-auto"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input input-bordered bg-base-200 border-base-300 focus:outline-none focus:border-primary flex-1 min-w-0 rounded-full"
          />

          <button
            type="submit"
            className="btn btn-primary btn-circle shrink-0"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
