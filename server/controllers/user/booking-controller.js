const Booking = require("../../models/Booking")
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

// const createOrder = async (req,res) => {
//     try{

//         let merchantTransactionId = req.body.transactionId
//         console.log("iam here");
//         const data = {
//             merchantId : merchant_id,
//             merchantTransactionId : merchantTransactionId,
//             name : req.body.name,
//             amount : req.body.amount * 100 ,
//             redirectUrl : `http://localhost:5000/status?id=${merchantTransactionId}`,
//             redirectMode : "POST",
//             mobileNumber : req.body.number,
//             paymentInstrument : {
//                 type : "PAY_PAGE"
//             }
//         }
//         console.log("iam here");

//         const payload = JSON.stringify(data)
//         const payloadMain = Buffer.from(payload).toString("base64")
//         const keyIndex = 1
//         const string = payloadMain + '/pg/v1/pay' + salt_key;
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + "###" + keyIndex
//         const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        
//         const options = {
//             method : "POST",
//             url : prod_URL,
//             headers : {
//                 accept : "application/json",
//                 "Content-Type" : 'application/json',
//                 "X-VERIFY" : checksum,
//             },
//             data : {
//                 request : payloadMain
//             }
//         }

//         await axios(options).then(function(response){
//             console.log(response.data);
//             return res.json(response.data)
//         }).catch(function(error){
//             console.log(error);
//         })

//     }
//     catch(e){
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while creating the order",
//         });
//     }
// }

const createBooking = async (req,res)=>{
    try{

        const {userId,studentId,name,email,branch,academicYear,studentMobile,parentMobile,
            destination,busFare,bookingDate} = req.body

            const newlyCreatedBooking = new Booking({
                    userId,studentId,name,email,branch,academicYear,studentMobile,parentMobile,
                    destination,busFare,bookingDate
                })
                
                await newlyCreatedBooking.validate();

                await newlyCreatedBooking.save();

                res.status(201).json({
                    success : true,
                    data : newlyCreatedBooking,
                })

    }
    catch(error){
        if (error.name === 'ValidationError') {
            // If a validation error occurs, extract the validation messages
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            
            return res.status(400).json({
              success: false,
              message: "Validation failed",
              errors, // Send the array of validation error messages to the client
            });
          }

        // Other errors (e.g. server errors)
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the booking",
        });
    }
}

const getAllBookingsByUser = async (req,res) => {
    try{
        const {userId} = req.params
        const bookings = await Booking.find({userId})

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


module.exports = {createBooking,getAllBookingsByUser,getBookingDetails}