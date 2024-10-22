import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchAllBuses } from "@/store/buses-slice";
import { getAllBookings } from "@/store/admin-slice/booking-slice";
import { useEffect } from "react";

function AdminDashboard() {
    const { bookingListForAdmin } = useSelector((state) => state.admin);
    const { busesList } = useSelector((state) => state.adminBuses);

    const totalBookings = bookingListForAdmin?.length || 0;
    const totalBuses = busesList?.length || 0;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBuses())
        dispatch(getAllBookings())
    }, [dispatch])

    return (
        <div className="p-6 text-gray-300">
            <h2 className="text-3xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Bookings</h3>
                    <p className="text-4xl font-bold mt-2">{totalBookings}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Active Buses</h3>
                    <p className="text-4xl font-bold mt-2">{totalBuses}</p>
                </div>
            </div>

            <div className="mt-6 flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {navigate("/admin/bookings")}}>
                    Manage Bookings
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {navigate("/admin/buses")}}>
                    Manage Buses
                </Button>
            </div>
        </div>
    );
}

export default AdminDashboard;
