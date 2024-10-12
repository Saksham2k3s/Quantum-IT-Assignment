import { configureStore } from '@reduxjs/toolkit'
import allUsersReducer from './slices/getAllUserSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
    reducer: {
       allUsers: allUsersReducer,
       auth: authReducer
    }
});

