import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  services: [
    {
      id: 1,
      customerName: "Juan Pérez",
      status: "pending",
      licensePlate: "ABC-123",
      serviceType: "repair"
    },
    {
      id: 2,
      customerName: "María Gómez",
      status: "in-progress",
      licensePlate: "XYZ-987",
      serviceType: "repair"
    },
    {
      id: 3,
      customerName: "Carlos López",
      status: "completed",
      licensePlate: "LMN-456",
      serviceType: "maintenance"
    }
  ]
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
        }
    }
})

export const {  setServices, addService, deleteService, updateService } = servicesSlice.actions;

export default servicesSlice.reducer;