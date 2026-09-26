import { configureStore } from '@reduxjs/toolkit'
import userStore from "./userSlice";
export const store = configureStore(
    { 
        reducer: {
            user:userStore
        } 
    }
)

export default store;