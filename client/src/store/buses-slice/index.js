import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    busesList : [],
}

export const addNewBus = createAsyncThunk("/buses/addNewBus",
    async (formData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/buses/add`,formData,{
            headers : {
                "Content-Type" : "application/json",
            }
        })

        return result?.data
    }
)

export const fetchAllBuses = createAsyncThunk("/buses/fetchAllBuses",
    async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/buses/get`)

        return result?.data
    }
)

export const editBus = createAsyncThunk("/buses/editBus",
    async ({id,formData}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/buses/edit/${id}`,formData,{
            headers : {
                "Content-Type" : "application/json",
            }
        })

        return result?.data
    }
)

export const deleteBus = createAsyncThunk("/buses/deleteBus",
    async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/buses/delete/${id}`)
        return result?.data
    }
)


const AdminBusesSlice = createSlice({
    name : "adminBuses",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllBuses.pending,(state,action) => {
            state.isLoading = true
        })
        .addCase(fetchAllBuses.fulfilled,(state,action) => {
            state.isLoading = false
            state.busesList = action.payload.data
            
        })
        .addCase(fetchAllBuses.rejected,(state,action) => {
            state.isLoading = false
            state.busesList = []
        })
    }
})

export default AdminBusesSlice.reducer;