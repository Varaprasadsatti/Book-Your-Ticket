import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addBusFormElements, busTypeMap, destinationMap } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewBus, deleteBus, editBus, fetchAllBuses } from "@/store/buses-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import AdminBusDetails from "@/components/admin/bus-details";

const initialFormData = {
  busType: "",
  capacity: 0,
  startPoint: "",
  endPoint: "",
  busFare: 0,
};

function AdminBuses() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [openAddBusDialog, setOpenAddBusDialog] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [openBusDetailsDialog, setOpenBusDetailsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [busDetails, setBusDetails] = useState(null);

  const { busesList } = useSelector((state) => state.adminBuses);

  function onHandleSubmit(event) {
    event.preventDefault();

    const { busType, capacity, startPoint, endPoint, busFare } = formData;
    if (!busType || !capacity || !startPoint || !endPoint || !busFare) {
    toast({ title: "Please fill out all fields", variant: "destructive" });
    return;
    }

    if (currentEditingId !== null) {
      dispatch(editBus({ id: currentEditingId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllBuses());
          setCurrentEditingId(null);
          setFormData(initialFormData);
          toast({ title: "Changes Saved" });
          setOpenAddBusDialog(false);
        }
      });
    } else {
      dispatch(addNewBus({ ...formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllBuses());
          setFormData(initialFormData);
          toast({ title: "Bus Added Successfully" });
          setOpenAddBusDialog(false);
        }
      });
    }
  }

  function onHandleEdit(eachBus) {
    setCurrentEditingId(eachBus?._id);
    setOpenAddBusDialog(true);
    setFormData(eachBus);
  }

  function onDeleteBus(id) {
    dispatch(deleteBus(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllBuses());
        toast({ title: "Bus Deleted Successfully" });
      }
    });
  }

  function handleViewBusDetails(eachBus) {
    setOpenBusDetailsDialog(true);
    setBusDetails(eachBus);
  }

  useEffect(() => {
    dispatch(fetchAllBuses());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-3 flex justify-end w-full">
        <Button onClick={() => setOpenAddBusDialog(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          Add New Bus
        </Button>
      </div>
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-lg">
        <Table className="min-w-full divide-y divide-gray-600">
          <TableCaption className="text-gray-400">All Available Buses</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Bus Type</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Destination</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Fare</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                <span className="sr-only">Edit</span>
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                <span className="sr-only">Delete</span>
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                <span className="sr-only">View Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {busesList && busesList.length > 0 ? (
              busesList.map((eachBus) => (
                <TableRow key={eachBus?._id} className="hover:bg-gray-600 transition">
                  <TableCell className="px-4 py-2 border-b border-gray-600">{busTypeMap[eachBus?.busType]}</TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-600">{destinationMap[eachBus?.endPoint]}</TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-600">₹{eachBus?.busFare}</TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-600">
                    <Button onClick={() => onHandleEdit(eachBus)} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell
                    onClick={() => onDeleteBus(eachBus?._id)}
                    className="cursor-pointer px-4 py-2 border-b border-gray-600"
                  >
                    <Trash2 className="text-red-600 hover:text-red-700" />
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-600">
                    <Dialog open={openBusDetailsDialog} onOpenChange={() => setOpenBusDetailsDialog(false)}>
                      <Button
                        onClick={() => handleViewBusDetails(eachBus)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View Details
                      </Button>
                      <AdminBusDetails busDetails={busDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No buses available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Sheet open={openAddBusDialog} onOpenChange={() => setOpenAddBusDialog(false)}>
        <SheetContent side="right" className="overflow-auto bg-gray-800 text-white">
          <SheetHeader>
            <SheetTitle>{currentEditingId ? "Edit Bus Details" : "Add New Bus"}</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditingId ? "Save Changes" : "Add Bus"}
              onSubmit={onHandleSubmit}
              formControls={addBusFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminBuses;

