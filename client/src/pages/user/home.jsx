import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { bookTicketFormElements } from "@/config";
import { toast } from "@/hooks/use-toast";
import { fetchAllBuses } from "@/store/buses-slice";
import { createNewBooking, getAllBookingsByUserId } from "@/store/user-slice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialFormData = {
    studentId: "",
    name: "",
    email: "",
    branch: "",
    academicYear: "",
    studentMobile: "",
    parentMobile: "",
    destination: "",
    busFare: "0",
};


function Home() {
    const dispatch = useDispatch();
    const { busesList } = useSelector((state) => state.adminBuses);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [openBookTicketDialog, setOpenBookTicketDialog] = useState(false);
    const [errors, setErrors] = useState([]);

    let listOfDestinations = busesList.map((item) => ({
        id: item.endPoint,
        label: item.endPoint.charAt(0).toUpperCase() + item.endPoint.slice(1) + "  ₹" + item.busFare.toString(),
    }));

    let ticketPrice = busesList.filter((item) => item.endPoint === formData?.destination)[0]?.busFare;

    ticketPrice ? (formData.busFare = ticketPrice) : "0";

    const destinationObject = {
        name: "destination",
        label: "Destination",
        componentType: "select",
        options: listOfDestinations,
    };

    const busFareObject = {
        label: "Bus Fare",
        name: "busFare",
        componentType: "input", // Input field for capacity
        type: "number", // Number type for bus capacity
        isElementDisabled: true,
    };

    const newFormControls = [...bookTicketFormElements, destinationObject, busFareObject];

    function handleViewTickets() {
        navigate("/user/tickets");
    }

    function handleTicketBooking(event) {
        event.preventDefault();

        const bookingData = {
            userId: user.id,
            ...formData,
            bookingDate: new Date(),
        };

        dispatch(createNewBooking(bookingData))
        .unwrap()
        .then((data) => {
        if (data.success) {
            // Booking successful
            dispatch(getAllBookingsByUserId(user?.id));
            setFormData(initialFormData);
            setOpenBookTicketDialog(false);
            toast({
            title: "Booking Confirmed",
            });
            navigate("/user/success");
        }
        })
        .catch((error) => {
        if (error.errors) {
            setErrors(error.errors);
        } else {
            toast({
            title: error.message || "Something went wrong",
            variant: "destructive",
            });
        }
        });
    }

    // let payment_data = {
    //     name : "Prasad",
    //     amount : 1,
    //     number:"9999999999",
    //     MID : "MID" + Date.now(),
    //     transactionId : "T" + Date.now()
    // }

    // async function handlePayment(){
    //     try{
    //         await axios.post(`${import.meta.env.VITE_API_URL}/api/user/booking/order`,payment_data).then(res=>{
    //             console.log(res.data); 
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }
    //     catch(e){
    //         console.log(e);
            
    //     }
    // }

    useEffect(() => {
        dispatch(fetchAllBuses());
        dispatch(getAllBookingsByUserId(user?.id));
    }, [dispatch]);
    

    return (
        <div className="h-screen bg-gray-800 text-gray-300">
            <img
                src="https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/311892/banner_banner.jpg"
                className="w-full auto object-cover"
            />
            <div className="flex justify-center items-center my-5">
                <Button onClick={() => setOpenBookTicketDialog(true)} className="w-52 mr-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-500 text-white">
                    Book Ticket
                </Button>
                <Sheet open={openBookTicketDialog} onOpenChange={() => setOpenBookTicketDialog(false)}>
                    <SheetContent side="right" className="overflow-auto bg-gray-800 text-gray-300">
                        <SheetHeader>
                            <SheetTitle className="text-white">{"Book Your Ticket"}</SheetTitle>
                        </SheetHeader>
                        <div className="py-6">
                            <CommonForm 
                                onSubmit={handleTicketBooking} 
                                formData={formData} 
                                setFormData={setFormData} 
                                formControls={newFormControls} 
                                buttonText={"Confirm Booking"} 
                            />
                            {/* Display form errors */}
                            {errors && errors.length > 0 && (
                                <div className="error-messages">
                                    <ul>
                                {errors.map((error, index) => (
                                 <li key={index} className="text-red-500">{error}</li>
                                 ))}
                                 </ul>
                                </div>
                                 )}
                        </div>
                    </SheetContent>
                </Sheet>
                <Button onClick={handleViewTickets} className="w-52 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-500 text-white">
                    View Ticket's
                </Button>
                {/* <Button onClick={handlePayment}>Pay Now</Button> */}
            </div>
        </div>
    );
}

export default Home;

