import { DialogContent, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"

function TicketDetails({ ticketDetails }) {
    return (
        <DialogContent className="bg-white rounded-lg shadow-md">
            <DialogTitle className="text-2xl font-bold text-gray-800">Ticket Details</DialogTitle>
            <div className="grid gap-4 mt-4">
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Ticket ID:</p>
                    <Label className="text-gray-800">{ticketDetails?._id}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Student Name:</p>
                    <Label className="text-gray-800">{ticketDetails?.name}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Student ID:</p>
                    <Label className="text-gray-800">{ticketDetails?.studentId}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Branch:</p>
                    <Label className="text-gray-800">{ticketDetails?.branch}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Academic Year:</p>
                    <Label className="text-gray-800">{ticketDetails?.academicYear}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Student Mobile:</p>
                    <Label className="text-gray-800">{ticketDetails?.studentMobile}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Parent Mobile:</p>
                    <Label className="text-gray-800">{ticketDetails?.parentMobile}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Student Email:</p>
                    <Label className="text-gray-800">{ticketDetails?.email}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Destination:</p>
                    <Label className="text-gray-800">{ticketDetails?.destination}</Label>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Ticket Fare:</p>
                    <Label className="text-gray-800">₹{ticketDetails?.busFare}</Label>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Order Date:</p>
                    <Label className="text-gray-800">{ticketDetails?.createdAt.split("T")[0]}</Label>
                </div>
            </div>
        </DialogContent>
    )
}

export default TicketDetails
