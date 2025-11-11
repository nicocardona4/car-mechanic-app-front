import { createSlice } from "@reduxjs/toolkit"

const API_URL = 'https://car-mechanic-ten.vercel.app';

const initialState = {
  services: [],
  loading: false,
  error: null,
    updateTrigger: 0
};

export const servicesSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        deleteService: (state, action) => {
            const id = action.payload;
            state.services = state.services.filter(service => service.id !== id)
        },
        updateService: (state, action) => {
            console.log("Updating service with payload:", action.payload);
            const id = action.payload.id;
            const updatedService = action.payload.updatedService;
            state.services = state.services.map(service => 
                service.id === id ? {...service, ...updatedService} : service
            )
            console.log("Services after update:", state.updateTrigger);
            state.updateTrigger += 1;
            console.log("Service updated. New updateTrigger:", state.updateTrigger);
        },
        setServicesLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const {  setServicesLoading, setServices, addService, deleteService, updateService } = servicesSlice.actions;

export default servicesSlice.reducer;