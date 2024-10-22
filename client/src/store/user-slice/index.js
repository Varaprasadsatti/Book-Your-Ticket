import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    bookingId : null,
    bookingList : [],
    bookingDetails : null,
}

export const createNewBooking = createAsyncThunk(
    "/booking/createNewBooking",
    async (bookingData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/booking/create`, bookingData);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: "An unknown error occurred" });
      }
    }
  );

export const getAllBookingsByUserId = createAsyncThunk("/booking/getAllBookingsByUserId",async(userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/booking/list/${userId}`)
    
    return response.data
})
export const getBookingDetails = createAsyncThunk("/user/getBookingDetails",async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/booking/details/${id}`)

    return response.data
})


const bookingSlice = createSlice({
    name:"bookingSlice",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createNewBooking.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createNewBooking.fulfilled,(state,action)=>{
            state.isLoading = false
            state.bookingId = action.payload.bookingId
            
            sessionStorage.setItem("currentBookingId",JSON.stringify(action.payload.bookingId))
        })
        .addCase(createNewBooking.rejected,(state)=>{
            state.isLoading = false
            state.bookingId = null
        })


        .addCase(getAllBookingsByUserId.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllBookingsByUserId.fulfilled,(state,action)=>{
            state.isLoading = false
            state.bookingList = action.payload.data
    
        })
        .addCase(getAllBookingsByUserId.rejected,(state)=>{
            state.isLoading = false
        })

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
    }
});


export default bookingSlice.reducer;