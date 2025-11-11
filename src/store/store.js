import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./features/servicesSlice";
import userReducer from "./features/userSlice"; 

export const store = configureStore ({
    reducer: {
        services: servicesReducer,
        user: userReducer
    }
})
 