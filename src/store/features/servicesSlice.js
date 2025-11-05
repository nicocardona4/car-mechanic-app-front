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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})


export const fetchServices = (token) => {
    return (dispatch, getState) => {
        console.log('Fetching services with token: v1/services', token);
        dispatch(setLoading(true));
        
        fetch(`${API_URL}/v1/services`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
            dispatch(setServices(data));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        });
    }
};

export const createService = (serviceData) => {
    return (dispatch) => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        fetch(`${API_URL}/v1/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth': `${user.token}`
            },
            body: JSON.stringify(serviceData)
        })
        .then(response => {
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Error creating service');
            }
            return response.json();
        })
        .then(newService => {
            dispatch(addService(newService));
        })
        .catch(error => {
            console.error('Error:', error);
            dispatch(setError(error.message));
        });
    }
};

export const removeService = (id) => {
    return (dispatch) => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        fetch(`${API_URL}/v1/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Auth': `${user.token}`
            }
        })
        .then(response => {
            if (response.status !== 200 && response.status !== 204) {
                throw new Error('Error while deleting service');
            }
            dispatch(deleteService(id));
        })
        .catch(error => {
            console.error('Error:', error);
            dispatch(setError(error.message));
        });
    }
};

export const modifyService = (id, updates) => {
    return (dispatch) => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        fetch(`${API_URL}/v1/services/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            },
            body: JSON.stringify(updates)
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error updating service');
            }
            return response.json();
        })
        .then(updatedService => {
            dispatch(updateService({ id, updatedService }));
        })
        .catch(error => {
            console.error('Error:', error);
            dispatch(setError(error.message));
        });
    }
};

export const { setServices, addService, deleteService, updateService, setLoading, setError } = servicesSlice.actions;

export default servicesSlice.reducer;