import { configureStore } from '@reduxjs/toolkit'
import userStore from "./userSlice";
import feedStore from "./feedSlice";
import connectionStore from "./connectionsSlice"
export const store = configureStore(
    { 
        reducer: {
            user:userStore,
            feed:feedStore,
            connection:connectionStore
        } 
    }
)

export default store;