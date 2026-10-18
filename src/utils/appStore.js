import { configureStore } from '@reduxjs/toolkit'
import userStore from "./userSlice";
import feedStore from "./feedSlice";
import connectionStore from "./connectionsSlice"
import requsetStore from "./requestSlice"
export const store = configureStore(
    { 
        reducer: {
            user:userStore,
            feed:feedStore,
            connection:connectionStore,
            request:requsetStore
        } 
    }
)

export default store;