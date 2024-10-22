import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TicketDetails from "@/components/user/ticketDetails"
import { getAllBookingsByUserId } from "@/store/user-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Tickets(){

    const { user } = useSelector((state) => state.auth)
    const { bookingList } = useSelector((state) => state.user)

    const [openViewDetailsDialog, setOpenViewDetailsDialog] = useState(false)
    const [ticketDetails, setTicketDetails] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBookingsByUserId(user?.id))
    }, [dispatch])

    return (
        <div className="h-screen bg-gray-900 text-gray-300">
            <h3 className="font-semibold text-3xl text-center my-6 text-gray-100">Your Tickets</h3>
            <div className="overflow-x-auto bg-gray-800 shadow-md rounded-lg">
                <Table className="min-w-full divide-y divide-gray-700">
                    <TableCaption className="text-gray-400">All Your Tickets</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-700">
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Name</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Year</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Branch</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Destination</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Fare</TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300 sr-only">View Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            bookingList && bookingList.length > 0 ? 
                            bookingList.map((bookingItem) => (
                                <TableRow key={bookingItem?.id} className="hover:bg-gray-700 transition">
                                    <TableCell className="px-4 py-2 border-b border-gray-700">{bookingItem?.name}</TableCell>
                                    <TableCell className="px-4 py-2 border-b border-gray-700">{bookingItem?.academicYear}</TableCell>
                                    <TableCell className="px-4 py-2 border-b border-gray-700">{bookingItem?.branch}</TableCell>
                                    <TableCell className="px-4 py-2 border-b border-gray-700">{bookingItem?.destination}</TableCell>
                                    <TableCell className="px-4 py-2 border-b border-gray-700">₹{bookingItem?.busFare}</TableCell>
                                    <TableCell className="px-4 py-2 border-b border-gray-700">
                                        <Dialog 
                                            open={openViewDetailsDialog} 
                                            onOpenChange={() => setOpenViewDetailsDialog(false)} 
                                        >
                                            <Button 
                                                onClick={() => {
                                                    setOpenViewDetailsDialog(true)
                                                    setTicketDetails(bookingItem)
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                View Details
                                            </Button>
                                            <TicketDetails ticketDetails={ticketDetails} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                            : <TableRow>
                                <TableCell colSpan={6} className="px-4 py-2 text-center text-gray-400">
                                    No tickets available
                                </TableCell>
                              </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Tickets
