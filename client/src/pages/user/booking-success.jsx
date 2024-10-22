import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function BookingSuccessPage(){

    const navigate = useNavigate()

    function handleViewTicket(){
        navigate("/user/tickets")
    }

    return (
        <div className="h-screen flex flex-col items-center">
            <div className="flex my-10">
                <img className="h-10 w-10 m-0" src="https://cdn.pixabay.com/photo/2021/08/07/22/32/verified-6529513_1280.png" />
                <h1 className="font-bold m-0 ml-3 text-3xl">Booking Confirmed</h1>
            </div>
            <Button onClick={handleViewTicket} className="w-1/5">View Ticket</Button>
        </div>
    )
}

export default BookingSuccessPage