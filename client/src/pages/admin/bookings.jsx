import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TicketDetails from "@/components/user/ticketDetails"
import { academicYearMap, bookTicketFormElements, branchMap, destinationMap } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { fetchAllBuses } from "@/store/buses-slice"
import { deleteBookingDetails, editBookingDetails, getAllBookings } from "@/store/admin-slice/booking-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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
}

function AdminBookings() {
    const [formData, setFormData] = useState(initialFormData)

    const { toast } = useToast()
    const { bookingListForAdmin } = useSelector((state) => state.admin)
    const { busesList } = useSelector((state) => state.adminBuses)

    const [openViewDetailsDialog, setOpenViewDetailsDialog] = useState(false)
    const [ticketDetails, setTicketDetails] = useState()
    const [openBookTicketDialog, setOpenBookTicketDialog] = useState(false)
    const [currentEdititngId, setCurrentEdititngId] = useState(null)

    let listOfDestinations = busesList.map((item) => ({
        id: item.endPoint,
        label: item.endPoint.charAt(0).toUpperCase() + item.endPoint.slice(1) + "  ₹" + item.busFare.toString()
    }));

    let ticketPrice = busesList.filter((item) => item.endPoint === formData?.destination)[0]?.busFare

    let newFormDataObject;

    ticketPrice ? newFormDataObject = { ...formData, busFare: ticketPrice } : null

    const dispatch = useDispatch()

    const destinationObject = {
        name: "destination",
        label: "Destination",
        componentType: "select",
        options: listOfDestinations,
    }

    const busFareObject = {
        label: "Bus Fare",
        name: "busFare",
        componentType: "input",
        type: "number",
        isElementDisabled: true,
    }

    const newFormControls = [...bookTicketFormElements, destinationObject, busFareObject]

    function handleTicketEdititng(event) {
        event.preventDefault()
        dispatch(editBookingDetails({ id: currentEdititngId, formData: newFormDataObject })).then((data) => {
            if (data?.payload?.success) {
                setFormData(initialFormData)
                toast({
                    title: "Changes Saved"
                })
                setOpenBookTicketDialog(false)
                setCurrentEdititngId(null)
                dispatch(getAllBookings())
            }
        })
    }

    function handleEdit(bookingItem) {
        setOpenBookTicketDialog(true)
        setCurrentEdititngId(bookingItem?._id)
        setFormData(bookingItem)
    }

    function handleDelete(id) {
        dispatch(deleteBookingDetails(id)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Booking Deleted Successfully"
                })
                dispatch(getAllBookings())
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllBuses())
        dispatch(getAllBookings())
    }, [dispatch])

    

    return (
        <div className="h-screen text-gray-300">
            <h3 className="font-semibold text-3xl text-center my-3">Your Tickets</h3>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <Table className="min-w-full divide-y divide-gray-700">
                    <TableCaption className="text-gray-400">All Your Tickets</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-700">
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Student Id</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Year</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Branch</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Destination</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Fare</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                                <span className="sr-only">View Details</span>
                            </TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                                <span className="sr-only">Edit</span>
                            </TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                                <span className="sr-only">Delete</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            bookingListForAdmin && bookingListForAdmin.length > 0 ?
                            bookingListForAdmin.map((bookingItem) => {
                                    return (
                                        <TableRow key={bookingItem?._id} className="hover:bg-gray-600">
                                            <TableCell className="px-4 py-2 border-b border-gray-700">{bookingItem?.studentId}</TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">{academicYearMap[bookingItem?.academicYear]}</TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">{branchMap[bookingItem?.branch]}</TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">{destinationMap[bookingItem?.destination]}</TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">₹{bookingItem?.busFare}</TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">
                                                <Dialog open={openViewDetailsDialog} onOpenChange={() => {
                                                    setOpenViewDetailsDialog(false)
                                                }} >
                                                    <Button onClick={() => {
                                                        setOpenViewDetailsDialog(true)
                                                        setTicketDetails(bookingItem)
                                                    }} className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        View Details
                                                    </Button>
                                                    <TicketDetails ticketDetails={ticketDetails} />
                                                </Dialog>
                                            </TableCell>
                                            <TableCell className="px-4 py-2 border-b border-gray-700">
                                                <Button
                                                    onClick={() => handleEdit(bookingItem)}
                                                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell className="cursor-pointer px-4 py-2 border-b border-gray-700">
                                                <Button
                                                    onClick={() => handleDelete(bookingItem?._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="px-4 py-2 text-center text-gray-400">No bookings available</TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <Sheet open={openBookTicketDialog} onOpenChange={() => {
                setOpenBookTicketDialog(false)
            }}>
                <SheetContent side="right" className="overflow-auto bg-gray-800">
                    <SheetHeader>
                        <SheetTitle className="text-gray-300">{"Edit Student's Ticket"}</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                        <CommonForm onSubmit={handleTicketEdititng} formData={formData} setFormData={setFormData} formControls={newFormControls} buttonText={"Save Changes"} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AdminBookings

