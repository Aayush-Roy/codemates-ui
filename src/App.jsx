


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import store from "./utils/appStore";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

import Body from "./components/Body";
import Profile from "./Profile";
import Login from "./components/auth/Login";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Premium from "./components/Premium";
import Chat from "./components/chat/Chat";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Request />} />
          <Route path="premium" element={<Premium />} />
        </Route>

        <Route path="/chat/:targetUserId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
