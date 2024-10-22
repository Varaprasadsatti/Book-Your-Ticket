import { Route, Routes} from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminBuses from "./pages/admin/buses";
import AdminBookings from "./pages/admin/bookings";
import AdminLayout from "./components/admin/layout";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "./components/user/user-layout";
import Home from "./pages/user/home";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import Tickets from "./pages/user/tickets";
import BookingSuccessPage from "./pages/user/booking-success";


function App() {

  const dispatch = useDispatch();

  const {user, isAuthenticated,isLoading} = useSelector((state)=>state.auth)

  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem("token"))
    dispatch(checkAuth(token))
  },[dispatch])

  if (isLoading) return <Skeleton className="w-[800px] h-[600px]" />
  

  return (
    <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/" element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              </CheckAuth>
          } />
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <AuthLayout />
            </CheckAuth>
          }>
              <Route path="login" element={<AuthLogin/>} />
              <Route path="register" element={<AuthRegister/>} />
          </Route>
          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>} >
            <Route path="dashboard" element={<AdminDashboard />}/>
            <Route path="buses" element={<AdminBuses />}/>
            <Route path="bookings" element={<AdminBookings />}/>
        </Route>
        <Route path="/user" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<Home />}/>
          <Route path="tickets" element={<Tickets />}/>
          <Route path="success" element={<BookingSuccessPage />}/>
        </Route>
        </Routes>
    </div>
  )
}

export default App