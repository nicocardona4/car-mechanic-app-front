import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./features/servicesSlice";

export const store = configureStore ({
    reducer: {
        services: servicesReducer
    }
})
 