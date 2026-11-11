

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();

//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState([]);

  

//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   const user = useSelector((store) => store.user);
//   console.log(user)
//   const userId = user?._id;

//   const fetchMessages = async()=>{
//     try{
//       const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`,{
//         withCredentials:true
//       })
//       console.log(chat?.data?.messages)
//       const chatMessages = chat?.data?.messages.map((msg)=>{
//         return {
//           firstName:msg?.senderId?.firstName,
//           lastName:msg?.senderId?.lastName,
//           text:msg?.text
//         }
//       })
//       setMessages(chatMessages)
//     }catch(err){
//       console.log(err);
//     }
//   }

  

//   useEffect(()=>{
//     fetchMessages()
//   },[])

//   useEffect(() => {
//     if (!userId || !targetUserId) return;

//     const socket = createSocketConnection();
//     socketRef.current = socket;

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", (data) => {
//       console.log("Message received:", data);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           id: `${Date.now()}-${Math.random()}`,
//           text: data.text,
//           sender: data.userId === userId ? "me" : "other",
//           time: new Date(data.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     });

//     return () => {
//       socket.off("messageReceived");
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [userId, targetUserId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();

//     if (!newMessage.trim() || !socketRef.current) return;

//     socketRef.current.emit("sendMessage", {
//       firstName: user.firstName,
//       lastName:user.lastName,
//       userId,
//       targetUserId,
//       text: newMessage.trim(),
//     });

//     setNewMessage("");
//   };

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
//             <h2 className="font-semibold text-base-content">{user?.firstName}</h2>
//             <p className="text-xs text-success">Online</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 min-h-0 overflow-y-auto px-3 py-5 sm:px-6">

//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex w-full mb-4 ${
//               msg.sender === "me"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >
//             <div
//               className={`flex flex-col max-w-[80%] sm:max-w-[65%] ${
//                 msg.sender === "me"
//                   ? "items-end"
//                   : "items-start"
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
//         <form
//           onSubmit={sendMessage}
//           className="flex items-center gap-2 max-w-5xl mx-auto"
//         >
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="input input-bordered bg-base-200 border-base-300 focus:outline-none focus:border-primary flex-1 min-w-0 rounded-full"
//           />

//           <button
//             type="submit"
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
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Convert API/socket message into a consistent format
  const formatMessage = (msg) => {
    const senderId =
      typeof msg.senderId === "object"
        ? msg.senderId?._id
        : msg.senderId || msg.userId;

    return {
      id: msg._id || msg.id || `${senderId}-${msg.createdAt}-${msg.text}`,
      text: msg.text,
      sender: senderId === userId ? "me" : "other",
      time: msg.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
    };
  };

  // Fetch previous messages
  useEffect(() => {
    if (!userId || !targetUserId) return;

    let isMounted = true;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        const chat = await axios.get(
          `${BASE_URL}/chat/${targetUserId}`,
          {
            withCredentials: true,
          }
        );

        const chatMessages = (chat?.data?.messages || []).map(
          formatMessage
        );

        if (isMounted) {
          setMessages(chatMessages);
        }
      } catch (err) {
        console.error("Fetch messages error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, [userId, targetUserId]);

  // Socket connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    const handleMessageReceived = (data) => {
      console.log("Message received:", data);

      const formattedMessage = formatMessage(data);

      setMessages((prevMessages) => {
        // Prevent duplicate messages
        const alreadyExists = prevMessages.some(
          (msg) => msg.id === formattedMessage.id
        );

        if (alreadyExists) return prevMessages;

        return [...prevMessages, formattedMessage];
      });
    };

    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    const text = newMessage.trim();

    if (!text || !socketRef.current || !userId) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text,
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
              <span className="font-semibold">
                U
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-base-content">
              {user?.firstName}
            </h2>

            <p className="text-xs text-base-content/50">
              Conversation
            </p>
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-5 sm:px-6">

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm text-base-content/50">
              No messages yet. Say hello!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
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
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${
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
          ))
        )}

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
            disabled={!newMessage.trim() || !userId}
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
