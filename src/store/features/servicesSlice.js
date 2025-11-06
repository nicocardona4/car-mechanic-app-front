import { createSlice } from "@reduxjs/toolkit"

const API_URL = 'https://car-mechanic-ten.vercel.app';

const initialState = {
  services: [],
  loading: false,
  error: null
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
            state.services = state.services.filter(service => service._id !== id)
        },
        updateService: (state, action) => {
            const id = action.payload.id;
            const updatedService = action.payload.updatedService;
            state.services = state.services.map(service => 
                service._id === id ? {...service, ...updatedService} : service
            )
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