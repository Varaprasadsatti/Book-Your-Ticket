const Booking = require("../../models/Booking")
require("dotenv").config();

const getBookingDetails = async (req,res) => {
    try{
        const {id} = req.params

        const booking = await Booking.findById(id)

        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Booking Not Found"
            })
        }



        res.status(200).json({
            success  :true,
            data : booking
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}

const editBookingDetails = async (req,res) => {
    try{
        const {id} = req.params
        const {userId,studentId,name,email,branch,academicYear,studentMobile,parentMobile,
            destination,busFare,bookingDate} = req.body
        const booking = await Booking.findById(id)

        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Booking Not Found"
            })
        }

        booking.userId = userId || booking.userId
        booking.studentId = studentId || booking.studentId
        booking.name = name || booking.name
        booking.email = email || booking.email
        booking.branch = branch || booking.branch
        booking.academicYear = academicYear || booking.academicYear
        booking.studentMobile = studentMobile || booking.studentMobile
        booking.parentMobile = parentMobile || booking.parentMobile
        booking.destination = destination || booking.destination
        booking.busFare = busFare || booking.busFare
        booking.bookingDate = bookingDate || booking.bookingDate

        await booking.save()

        res.status(200).json({
            success  :true,
            data : booking
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}


const deleteBooking = async (req,res) => {
    try{
        
        const {id} = req.params
        console.log(id);
        
        const booking = await Booking.findByIdAndDelete(id)
        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Bus Not Found"
            })
        }

        res.status(201).json({
            success : true,
            message : "Ticket Deleted Successfully",
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}

const getAllBookings = async (req,res) => {
    try{
        const bookings = await Booking.find()

        if(!bookings.length){
            return res.status(404).json({
                success : false,
                message : "No Bookings Found"
            })
        }

        res.status(200).json({
            success  :true,
            data : bookings
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}



module.exports = {getBookingDetails,editBookingDetails,deleteBooking,getAllBookings}