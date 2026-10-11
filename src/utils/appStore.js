import { configureStore } from '@reduxjs/toolkit'
import userStore from "./userSlice";
import feedStore from "./feedSlice";
export const store = configureStore(
    { 
        reducer: {
            user:userStore,
            feed:feedStore
        } 
    }
)

export default store;