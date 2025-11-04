import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  services: []
};



export const servicesSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            const newService = action.payload;
            const newId = state.services.length === 0 ? 1 : state.services[state.services.length - 1].id + 1
            newService.id = newId;
            //immer
            state.services.push(newService);
        },
        deleteService: (state, action) => {
            const id = action.payload;
            state.services = state.services.filter(service => service.id !== id)
        },
        updateService: (state, action) => {
            const id = action.payload.id;
            const updatedService = action.payload.updatedService;

           // const {id, updatedTodo} = action.payload
            state.services = state.services.map(service => service.id === id ? {...service, ...updatedService} : service)
        },
        setServicesLoading: (state, action) => {
            state.isLoading = action.payload;
        }

        
    }
})

export const {  setServicesLoading, setServices, addService, deleteService, updateService } = servicesSlice.actions;

export default servicesSlice.reducer;