import authSlice from "./auth-slice";
import AdminBusesSlice from "./buses-slice"
import userSlice from "./user-slice"
import bookingSliceForAdmin from "./admin-slice/booking-slice/index"

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer : {
        auth : authSlice,
        adminBuses : AdminBusesSlice,
        user : userSlice,
        admin : bookingSliceForAdmin,
    }
})

export default store