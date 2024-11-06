// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { bookTicketFormElements } from "@/config";
// import { toast } from "@/hooks/use-toast";
// import { fetchAllBuses } from "@/store/buses-slice";
// import { createNewBooking, getAllBookingsByUserId } from "@/store/user-slice";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const initialFormData = {
//     studentId: "",
//     name: "",
//     email: "",
//     branch: "",
//     academicYear: "",
//     studentMobile: "",
//     parentMobile: "",
//     destination: "",
//     busFare: "0",
// };


// function Home() {
//     const dispatch = useDispatch();
//     const { busesList } = useSelector((state) => state.adminBuses);
//     const { user } = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState(initialFormData);
//     const [openBookTicketDialog, setOpenBookTicketDialog] = useState(false);
//     const [errors, setErrors] = useState([]);

//     let listOfDestinations = busesList.map((item) => ({
//         id: item.endPoint,
//         label: item.endPoint.charAt(0).toUpperCase() + item.endPoint.slice(1) + "  ₹" + item.busFare.toString(),
//     }));

//     let ticketPrice = busesList.filter((item) => item.endPoint === formData?.destination)[0]?.busFare;

//     ticketPrice ? (formData.busFare = ticketPrice) : "0";

//     const destinationObject = {
//         name: "destination",
//         label: "Destination",
//         componentType: "select",
//         options: listOfDestinations,
//     };

//     const busFareObject = {
//         label: "Bus Fare",
//         name: "busFare",
//         componentType: "input", // Input field for capacity
//         type: "number", // Number type for bus capacity
//         isElementDisabled: true,
//     };

//     const newFormControls = [...bookTicketFormElements, destinationObject, busFareObject];

//     function handleViewTickets() {
//         navigate("/user/tickets");
//     }

//     function handleTicketBooking(event) {
//         event.preventDefault();

//         const bookingData = {
//             userId: user.id,
//             ...formData,
//             bookingDate: new Date(),
//         };

//         dispatch(createNewBooking(bookingData))
//         .unwrap()
//         .then((data) => {
//         if (data.success) {
//             // Booking successful
//             dispatch(getAllBookingsByUserId(user?.id));
//             setFormData(initialFormData);
//             setOpenBookTicketDialog(false);
//             toast({
//             title: "Booking Confirmed",
//             });
//             navigate("/user/success");
//         }
//         })
//         .catch((error) => {
//         if (error.errors) {
//             setErrors(error.errors);
//         } else {
//             toast({
//             title: error.message || "Something went wrong",
//             variant: "destructive",
//             });
//         }
//         });
//     }

//     useEffect(() => {
//         dispatch(fetchAllBuses());
//         dispatch(getAllBookingsByUserId(user?.id));
//     }, [dispatch]);
    

//     return (
//         <div className="h-full bg-gray-800 text-gray-300">
//             <img
//                 src="https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/311892/banner_banner.jpg"
//                 className="w-full auto object-cover"
//             />
//             <div className="flex justify-center items-center my-5">
//                 <Button onClick={() => setOpenBookTicketDialog(true)} className="w-52 mr-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-500 text-white">
//                     Book Ticket
//                 </Button>
//                 <Sheet open={openBookTicketDialog} onOpenChange={() => setOpenBookTicketDialog(false)}>
//                     <SheetContent side="right" className="overflow-auto bg-gray-800 text-gray-300">
//                         <SheetHeader>
//                             <SheetTitle className="text-white">{"Book Your Ticket"}</SheetTitle>
//                         </SheetHeader>
//                         <div className="py-6">
//                             <CommonForm 
//                                 onSubmit={handleTicketBooking} 
//                                 formData={formData} 
//                                 setFormData={setFormData} 
//                                 formControls={newFormControls} 
//                                 buttonText={"Confirm Booking"} 
//                             />
//                             {/* Display form errors */}
//                             {errors && errors.length > 0 && (
//                                 <div className="error-messages">
//                                     <ul>
//                                 {errors.map((error, index) => (
//                                  <li key={index} className="text-red-500">{error}</li>
//                                  ))}
//                                  </ul>
//                                 </div>
//                                  )}
//                         </div>
//                     </SheetContent>
//                 </Sheet>
//                 <Button onClick={handleViewTickets} className="w-52 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-500 text-white">
//                     View Ticket's
//                 </Button>
//                 {/* <Button onClick={handlePayment}>Pay Now</Button> */}
//             </div>
                                 

//             {/* About Us Section */}
//         <section id="about" className="bg-gray-800 text-gray-300 py-12 px-6 lg:px-16">
//             <div className="max-w-7xl mx-auto text-center">
//                 <h2 className="text-3xl font-bold text-blue-400 mb-6">About Us</h2>
//                 <p className="text-lg mb-6">
//                     Welcome to the <strong>Book Your Ticket</strong> platform, created specifically for the girl students of IIIT Srikakulam campus.
//                     Our mission is to simplify the bus ticket booking process, especially during vacations, by providing a seamless online experience.
//                 </p>
//                 <p className="text-lg mb-6">
//                     Gone are the days of standing in long queues in hostels to fill out and submit offline forms to the wardens for bus ticket bookings. 
//                     With this website, students can book their tickets online at their convenience, avoiding the hassle of traditional methods and saving valuable time.
//                 </p>
//                 <p className="text-lg">
//                     We aim to make the bus booking process as smooth and efficient as possible, ensuring that students can focus more on their travel plans rather than paperwork.
//                 </p>
//             </div>
//         </section>
//             {/* Contact Support Section */}
//         <section id="contact" className="py-12 bg-gray-800 text-gray-300">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Need Help? Contact Us</h2>
//                 <p className="text-center text-lg mb-6">
//                     Our support team is available 24/7 to assist you with any queries or issues regarding your bookings.
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
//                     {/* Support Hotline */}
//                     <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
//                         <h3 className="text-xl font-semibold mb-3 text-blue-400">📞 Support Hotline</h3>
//                         <p className="text-lg">+91 9542991305</p>
//                         <p className="mt-2 text-sm text-gray-400">Available 24/7 for immediate support</p>
//                     </div>

//                     {/* Email */}
//                     <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
//                         <h3 className="text-xl font-semibold mb-3 text-blue-400">✉️ Email Us</h3>
//                         <p className="text-lg">support@bookyourticket.com</p>
//                         <p className="mt-2 text-sm text-gray-400">We'll respond within 24 hours</p>
//                     </div>

//                     {/* Address */}
//                     <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
//                         <h3 className="text-xl font-semibold mb-3 text-blue-400">📍 Our Office</h3>
//                         <p className="text-lg">IIIT Srikakulam Campus</p>
//                         <p className="mt-2 text-sm text-gray-400">Andhra Pradesh, India</p>
//                     </div>
//                 </div>

//                 <p className="text-center mt-10 text-sm text-gray-400">
//                     Feel free to reach out to us via phone, email, or visit our office for any assistance. We're here to help!
//                 </p>
//             </div>
//         </section>
//         {/* Footer Section */}
//         <footer id="privacy" className="bg-gray-900 text-gray-400 py-8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
//                     {/* Logo and Site Name */}
//                     <div className="mb-6 md:mb-0">
//                         <h1 className="text-2xl font-bold text-blue-400">Book Your Ticket</h1>
//                         <p className="text-sm mt-2">Convenient and hassle-free bus booking services.</p>
//                     </div>

//                     {/* Navigation Links */}
//                     <div className="flex space-x-6">
//                         <a href="/" className="hover:text-white transition duration-300">Home</a>
//                         <a href="#about" className="hover:text-white transition duration-300">About Us</a>
//                         <a href="#contact" className="hover:text-white transition duration-300">Contact Us</a>
//                         <a href="#privacy" className="hover:text-white transition duration-300">Privacy Policy</a>
//                     </div>
//                 </div>

//                 {/* Footer Bottom Text */}
//                 <div className="text-center mt-8 text-sm text-gray-500">
//                     <p>© 2024 Book Your Ticket. All Rights Reserved.</p>
//                     <p>Designed and developed by Vara Prasad Satti.</p>
//                 </div>
//             </div>
//         </footer>
//         </div>
//     );
// }

// export default Home;

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
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

    const settings = {
        dots: true,                // Show dots for navigation
        infinite: true,            // Loop through images infinitely
        speed: 500,                // Transition speed
        slidesToShow: 1,           // Show one image at a time
        slidesToScroll: 1,         // Scroll one image at a time
        autoplay: true,            // Automatically transition between images
        autoplaySpeed: 5000,       // 5 seconds per image
        arrows: true,              // Show arrow icons for navigation
    };

    useEffect(() => {
        dispatch(fetchAllBuses());
        dispatch(getAllBookingsByUserId(user?.id));
    }, [dispatch]);
    

    return (
        <div className="h-full bg-gray-800 text-gray-300">
            {/* Image Carousel or New Images Section */}
            {/* Image Carousel */}
            <div className="w-full my-8">
                <Slider {...settings}>
                    {/* Replace these placeholders with actual image URLs */}
                    <div>
                        <img
                            src={banner1}
                            alt="Campus Bus Service"
                            className="w-full object-cover h-48 md:h-64 lg:h-[500px] rounded-lg"
                        />
                    </div>
                    <div>
                        <img
                            src={banner2}
                            alt="Hassle-Free Bookings"
                            className="w-full object-cover h-48 md:h-64 lg:h-[500px] rounded-lg"
                        />
                    </div>
                    <div>
                        <img
                            src={banner3}
                            alt="Comfortable Travel"
                            className="w-full object-cover h-48 md:h-64 lg:h-[500px] rounded-lg"
                        />
                    </div>
                </Slider>
            </div>

            {/* Booking and View Tickets Section */}
            <div className="flex justify-center items-center my-5">
                <Button
                    onClick={() => setOpenBookTicketDialog(true)}
                    className="w-52 mr-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 hover:bg-blue-500 text-white"
                >
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
            </div>

            {/* About Us Section */}
            <section id="about" className="py-12 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-400 mb-6">About Us</h2>
                    <p className="text-lg mb-6">
                        Welcome to the <strong>Book Your Ticket</strong> platform, created specifically for the girl students of IIIT Srikakulam campus.
                        Our mission is to simplify the bus ticket booking process, especially during vacations, by providing a seamless online experience.
                    </p>
                    <p className="text-lg mb-6">
                    Gone are the days of standing in long queues in hostels to fill out and submit offline forms to the wardens for bus ticket bookings. 
                    With this website, students can book their tickets online at their convenience, avoiding the hassle of traditional methods and saving valuable time.
                </p>
                <p className="text-lg">
                    We aim to make the bus booking process as smooth and efficient as possible, ensuring that students can focus more on their travel plans rather than paperwork.
                </p>
                </div>
            </section>

            {/* Contact Support Section */}
            <section id="contact" className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-blue-400">Need Help? Contact Us</h2>
                    <p className="text-lg mb-6">Our support team is available 24/7 to assist you with any queries or issues regarding your bookings.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Support Hotline */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">📞 Support Hotline</h3>
                            <p className="text-lg">+91 9542991305</p>
                            <p className="mt-2 text-sm text-gray-400">Available 24/7 for immediate support</p>
                        </div>

                        {/* Email */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">✉️ Email Us</h3>
                            <p className="text-lg">support@bookyourticket.com</p>
                            <p className="mt-2 text-sm text-gray-400">We'll respond within 24 hours</p>
                        </div>

                        {/* Address */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">📍 Our Office</h3>
                            <p className="text-lg">IIIT Srikakulam Campus</p>
                            <p className="mt-2 text-sm text-gray-400">Andhra Pradesh, India</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="privacy" className="bg-gray-900 text-gray-400 py-8 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center pb-6">
                        <div className="mb-6 md:mb-0">
                            <h1 className="text-2xl font-bold text-blue-400">Book Your Ticket</h1>
                            <p className="text-sm mt-2">Convenient and hassle-free bus booking services.</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="/" className="hover:text-white transition duration-300">Home</a>
                            <a href="#about" className="hover:text-white transition duration-300">About Us</a>
                            <a href="#contact" className="hover:text-white transition duration-300">Contact Us</a>
                            <a href="#privacy" className="hover:text-white transition duration-300">Privacy Policy</a>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-gray-500">© 2024 Book Your Ticket. All Rights Reserved.</p>
                    <p>Designed and developed by Vara Prasad Satti.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;

