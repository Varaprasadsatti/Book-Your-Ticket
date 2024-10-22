import { DialogContent, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"

function AdminBusDetails({ busDetails }) {
    return (
        <DialogContent className="bg-white rounded-lg shadow-md p-6">
            <DialogTitle className="text-2xl font-bold text-gray-800">Bus Details</DialogTitle>
            <div className="grid gap-4 mt-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Bus ID:</p>
                    <Label className="text-gray-800">{busDetails?._id}</Label>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Origin:</p>
                    <Label className="text-gray-800">{busDetails?.startPoint}</Label>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Destination:</p>
                    <Label className="text-gray-800">{busDetails?.endPoint}</Label>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Capacity:</p>
                    <Label className="text-gray-800">{busDetails?.capacity}</Label>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">Bus Fare:</p>
                    <Label className="text-gray-800">₹{busDetails?.busFare}</Label>
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminBusDetails

