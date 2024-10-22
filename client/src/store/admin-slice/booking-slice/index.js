import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    bookingListForAdmin : [],
    bookingDetails : null,
}

export const getBookingDetails = createAsyncThunk("/admin/getBookingDetails",async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/booking/details/${id}`)

    return response.data
})

export const editBookingDetails = createAsyncThunk("/admin/editBookingDetails",async({id,formData})=>{
    
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/booking/edit/${id}`,formData,
        {
            headers : {
                "Content-Type" : "application/json",
            }
        }
    )

    return response.data
})

export const deleteBookingDetails = createAsyncThunk("/admin/deleteBookingDetails",async(id)=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/booking/delete/${id}`)

    return response.data
})

export const getAllBookings = createAsyncThunk("/admin/getAllBookings",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/booking/all`)

    return response.data
})

const bookingSliceForAdmin = createSlice({
    name:"bookingSliceForAdmin",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder

        .addCase(getBookingDetails.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBookingDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.bookingDetails = action.payload.data
    
        })
        .addCase(getBookingDetails.rejected,(state)=>{
            state.isLoading = false
        })
        .addCase(getAllBookings.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllBookings.fulfilled,(state,action)=>{
            state.isLoading = false
            state.bookingListForAdmin = action.payload.data
        })
        .addCase(getAllBookings.rejected,(state)=>{
            state.isLoading = false
        })
        .addCase(deleteBookingDetails.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBookingDetails.fulfilled,(state,action)=>{
            state.isLoading = false
        })
        .addCase(deleteBookingDetails.rejected,(state)=>{
            state.isLoading = false
        })
    }
});


export default bookingSliceForAdmin.reducer;