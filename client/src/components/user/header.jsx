import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { BusFrontIcon } from "lucide-react";

function UserHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        navigate("/auth/login");
    }

    function goToHome(){
        navigate("/user/home")
    }

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div onClick={goToHome} className="flex items-center cursor-pointer">
                <BusFrontIcon size="icon" height={30} width={30} className="text-white" />
                <h1 className="font-extrabold text-lg ml-3">Book Your Ticket</h1>
            </div>
            <Button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 px-4 py-2 rounded-lg">Logout</Button>
        </div>
    );
}

export default UserHeader;
