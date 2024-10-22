const mongoose = require("mongoose")
const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");
const authRouter = require("./routes/auth/auth-routes");
const busRouter = require("./routes/admin/bus-routes")
const bookingRouter = require("./routes/user/booking-routes")
const bookingRouterForAdmin = require("./routes/admin/booking-routes")

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connection successful"))
.catch((error)=>console.log("error while connecting with mongodb database",error))

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials : true,
}))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use("/api/auth", authRouter);

app.use("/api/admin/buses", busRouter);

app.use("/api/user/booking", bookingRouter);

app.use("/api/admin/booking", bookingRouterForAdmin);


app.listen(PORT,() => console.log(`server running on port ${PORT}`));


