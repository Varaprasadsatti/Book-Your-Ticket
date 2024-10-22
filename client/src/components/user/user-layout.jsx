import UserHeader from "./header";

import { Outlet } from "react-router-dom";


function UserLayout(){
    return (
        <div className="flex flex-col bg-white overflow-hidden" >
            <UserHeader/>
            <main className="flex flex-col w-full" >
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout